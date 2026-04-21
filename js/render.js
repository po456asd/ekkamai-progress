/* ═══════════════════════════════════════════════════════════
   KPI CARDS
═══════════════════════════════════════════════════════════ */
function renderKPIs(){
  const row = document.getElementById('kpiRow');
  const R = 28, C = 2 * Math.PI * R;
  row.innerHTML = CAT.map(c => {
    const avgA = buildingAvg('A', c.key);
    const avgB = buildingAvg('B', c.key);
    const avg  = Math.round((avgA + avgB) / 2);
    const off  = C - (C * avg / 100);
    const subLabel = {
      str:'Structural Works', arc:'Architectural Works',
      int:'Interior & Fit-Out', mep:'Electrical / HVAC / Water'
    }[c.key];
    return `
    <div class="kpi-card ${c.cls}">
      <div class="kpi-head">${c.label}</div>
      <div class="kpi-body">
        <div class="kpi-ring">
          <svg viewBox="0 0 72 72">
            <circle class="track-circle" cx="36" cy="36" r="${R}" fill="none" stroke="${c.track||'#1a1a1a'}" stroke-width="7"/>
            <circle class="fill-circle" cx="36" cy="36" r="${R}" fill="none" stroke="${c.color}" stroke-width="7"
              stroke-linecap="round"
              stroke-dasharray="${C.toFixed(1)}"
              stroke-dashoffset="${C.toFixed(1)}"
              data-target="${off.toFixed(1)}"
              data-circ="${C.toFixed(1)}"
            />
          </svg>
          <div class="kpi-num" style="color:${c.color}" data-count="${avg}">0%</div>
        </div>
        <div class="kpi-info">
          <div class="kpi-pct" data-count="${avg}">0%</div>
          <div class="kpi-sub">${subLabel}</div>
          <div style="margin-top:8px;font-size:10px;color:var(--muted)">
            A: <span style="color:${c.color};font-weight:600">${avgA}%</span>
            &nbsp;B: <span style="color:${c.color};font-weight:600">${avgB}%</span>
          </div>
          ${c.key === 'mep' ? `<div style="margin-top:4px;font-size:10px;color:var(--muted)">Tested &nbsp;A: <span style="color:#3DBE7C;font-weight:600">${buildingAvg('A','mep_test')}%</span> &nbsp;B: <span style="color:#3DBE7C;font-weight:600">${buildingAvg('B','mep_test')}%</span></div>` : ''}
        </div>
      </div>
    </div>`;
  }).join('');

  // Animate circles & counters
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    document.querySelectorAll('.fill-circle').forEach(el=>{
      el.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1)';
      el.style.strokeDashoffset = el.dataset.target;
    });
    animateCounters();
  }));
}

function animateCounters(){
  document.querySelectorAll('[data-count]').forEach(el=>{
    const target = parseInt(el.dataset.count);
    let current = 0;
    const step = Math.max(1, Math.round(target / 50));
    const id = setInterval(()=>{
      current = Math.min(current + step, target);
      el.textContent = current + '%';
      if(current >= target) clearInterval(id);
    }, 25);
  });
}

/* ═══════════════════════════════════════════════════════════
   BUILDING TABS
═══════════════════════════════════════════════════════════ */
function switchBuilding(bld){
  curBuilding = bld;
  if(!DATA[curBuilding].floors[curFloor]) curFloor = '1';
  document.querySelectorAll('.btab').forEach((b,i)=>{
    b.classList.toggle('active', (i===0 && bld==='A') || (i===1 && bld==='B'));
  });
  renderBuilding();
  updateCharts();
}

/* ═══════════════════════════════════════════════════════════
   SVG BUILDING DIAGRAM
═══════════════════════════════════════════════════════════ */
function renderBuilding(){
  document.getElementById('diagTitle').textContent = DATA[curBuilding].name;
  document.getElementById('matrixTitle').textContent = DATA[curBuilding].name + ' — Floor Progress Matrix';
  document.getElementById('chartSub1').textContent  = DATA[curBuilding].name + ' · All categories avg';

  const svg = document.getElementById('buildingSVG');
  const floors = DATA[curBuilding].floors;
  const W = 200, FH = 34, GAP = 3;
  const orderedKeys = getFloorKeys(curBuilding); // top→bottom
  const startY = 28;

  const totalH = orderedKeys.length * (FH + GAP);
  const hasRoof = orderedKeys[0] === 'R';

  let svgContent = '';

  // Building body background (exclude roof)
  const bodyStart = hasRoof ? startY + (FH + GAP) : startY;
  const bodyCount = hasRoof ? orderedKeys.length - 1 : orderedKeys.length;
  svgContent += `
    <rect x="6" y="${bodyStart}" width="188" height="${bodyCount*(FH+GAP)}" rx="2" fill="#0d0d0d" stroke="#2a2010" stroke-width=".5"/>
  `;

  orderedKeys.forEach((fk, idx) => {
    const f = floors[fk];
    const ov = overallFloor(f);
    const y = startY + idx * (FH + GAP);
    const isBasement = fk === 'B';
    const isRoof     = fk === 'R';
    const isSelected = fk === curFloor;

    let fill, stroke;
    if(isRoof){
      fill   = '#0a1a2a';
      stroke = '#2a6a9a';
    } else if(isBasement){
      fill   = '#0a0a14';
      stroke = floorStroke(ov);
    } else {
      fill   = floorColor(ov);
      stroke = floorStroke(ov);
    }

    const pctWidth = Math.round(188 * ov / 100);
    let flLabel = isBasement ? 'BSMT' : isRoof ? 'ROOF' : 'FL ' + fk;

    if(isRoof){
      svgContent += `
      <g class="fl${isSelected?' sel':''}" onclick="selectFloor('${fk}')" id="fl_${fk}">
        <rect x="6" y="${y}" width="188" height="${FH}" fill="${fill}" stroke="${stroke}" stroke-width="${isSelected?1.8:.8}" rx="3"/>
        <rect x="6" y="${y}" width="${pctWidth}" height="${FH}" fill="${stroke}" opacity=".2" rx="3"/>
        <text x="14" y="${y+FH/2+1}" fill="#7ab8d8" font-size="9" font-family="Inter,sans-serif" font-weight="700" dominant-baseline="middle">⬡ ROOF</text>
        <text x="192" y="${y+FH/2+1}" fill="${stroke}" font-size="9" font-family="Inter,sans-serif" font-weight="700" text-anchor="end" dominant-baseline="middle">${ov}%</text>
        ${isSelected ? `<rect x="6" y="${y}" width="3" height="${FH}" fill="#C9A84C" rx="1"/>` : ''}
      </g>`;
    } else {
      svgContent += `
      <g class="fl${isSelected?' sel':''}" onclick="selectFloor('${fk}')" id="fl_${fk}">
        <rect x="6" y="${y}" width="188" height="${FH}" fill="${fill}" stroke="${stroke}" stroke-width="${isSelected?1.8:.8}" rx="2"/>
        <rect x="6" y="${y}" width="${pctWidth}" height="${FH}" fill="${stroke}" opacity=".25" rx="2"/>
        <text x="14" y="${y+FH/2+1}" fill="#d0c090" font-size="9" font-family="Inter,sans-serif" font-weight="600" dominant-baseline="middle">${flLabel}</text>
        <text x="192" y="${y+FH/2+1}" fill="${stroke}" font-size="9" font-family="Inter,sans-serif" font-weight="700" text-anchor="end" dominant-baseline="middle">${ov}%</text>
        ${isSelected ? `<rect x="6" y="${y}" width="3" height="${FH}" fill="#C9A84C" rx="1"/>` : ''}
      </g>`;
    }
  });

  // Roof triangle above body (only if no Roof floor; building B)
  if(!hasRoof){
    svgContent = `<polygon points="6,${startY} 100,${startY-20} 194,${startY}" fill="#1a1a10" stroke="#C9A84C" stroke-width="1.2"/>` + svgContent;
  }

  // Ground line
  const groundY = startY + totalH;
  svgContent += `<line x1="0" y1="${groundY}" x2="${W}" y2="${groundY}" stroke="#4a3a20" stroke-width="2"/>`;

  svg.innerHTML = svgContent;
  svg.setAttribute('viewBox', `0 0 ${W} ${groundY + 10}`);

  renderFloorDetail(curFloor);
  renderMatrix();
  updateCharts();
}

function selectFloor(fk){
  curFloor = fk;
  renderBuilding();
}

/* ═══════════════════════════════════════════════════════════
   FLOOR DETAIL PANEL
═══════════════════════════════════════════════════════════ */
function renderFloorDetail(fk){
  const f = DATA[curBuilding].floors[fk];
  const ov       = overallFloor(f);
  const mepVal   = mep(f);
  const mepTestVal = mepTest(f);
  const strVal   = Math.round((f.flooring + f.walls + f.stairs) / 3);
  const archVal  = arch(f);

  const spaceHTML = f.spaces && f.spaces.length ? `
    <div class="spaces-sect">
      <div class="spaces-head">Spaces / Functions</div>
      <div class="spaces-tags">
        ${f.spaces.map(s=>`<span class="stag">${s}</span>`).join('')}
      </div>
    </div>` : '';

  document.getElementById('floorDetail').innerHTML = `
    <div class="fdetail-head">
      <div>
        <div class="fdetail-name">${f.label}</div>
        <div class="fdetail-bld">${DATA[curBuilding].name} · The Quarter Hotel Ekkamai</div>
      </div>
      <div class="fdetail-overall">
        <div class="ov-label">Overall</div>
        <div class="ov-val">${ov}%</div>
      </div>
    </div>
    ${spaceHTML}

    <div class="pbar-item f-str">
      <div class="pbar-row">
        <div class="pbar-label"><span class="pbar-dot"></span> Structure</div>
        <div class="pbar-pct">${strVal}%</div>
      </div>
      <div class="pbar-track">
        <div class="pbar-fill" style="width:0%" data-w="${strVal}%"></div>
      </div>
      <div class="mep-sub">
        <div class="mep-chip">
          <div class="mc-label">Flooring (พื้น)</div>
          <div class="mc-val">${f.flooring}%</div>
        </div>
        <div class="mep-chip">
          <div class="mc-label">Walls (เสา/ผนัง)</div>
          <div class="mc-val">${f.walls}%</div>
        </div>
        <div class="mep-chip">
          <div class="mc-label">Fire Exit Stairs</div>
          <div class="mc-val">${f.stairs}%</div>
        </div>
      </div>
    </div>

    <div class="pbar-item f-arc">
      <div class="pbar-row">
        <div class="pbar-label"><span class="pbar-dot"></span> Architecture</div>
        <div class="pbar-pct">${archVal}%</div>
      </div>
      <div class="pbar-track">
        <div class="pbar-fill" style="width:0%" data-w="${archVal}%"></div>
      </div>
      <div class="mep-sub">
        <div class="mep-chip">
          <div class="mc-label">Walls / Finishes</div>
          <div class="mc-val">${f.arc}%</div>
        </div>
        <div class="mep-chip">
          <div class="mc-label">Skim Coating</div>
          <div class="mc-val">${f.skim}%</div>
        </div>
      </div>
    </div>

    <div class="pbar-item f-int">
      <div class="pbar-row">
        <div class="pbar-label"><span class="pbar-dot"></span> Interior Design</div>
        <div class="pbar-pct">${f.int}%</div>
      </div>
      <div class="pbar-track">
        <div class="pbar-fill" style="width:0%" data-w="${f.int}%"></div>
      </div>
      <div class="mep-sub">
        <div class="mep-chip">
          <div class="mc-label">Furniture / FF&amp;E</div>
          <div class="mc-val">${f.int}%</div>
        </div>
      </div>
    </div>

    <div class="pbar-item f-mep">
      <div class="pbar-row">
        <div class="pbar-label"><span class="pbar-dot"></span> MEP Works</div>
        <div class="pbar-pct">${mepVal}%<span style="font-size:10px;color:#3DBE7C;font-weight:400;margin-left:6px">/ ${mepTestVal}% tested</span></div>
      </div>
      <div class="pbar-track">
        <div class="pbar-fill" style="width:0%" data-w="${mepVal}%"></div>
      </div>
      <div class="mep-sub">
        <div class="mep-chip">
          <div class="mc-label">Electrical</div>
          <div class="mc-val">${f.elec_done}%</div>
          <div class="mc-tested">Tested: <span>${f.elec_test}%</span></div>
        </div>
        <div class="mep-chip">
          <div class="mc-label">HVAC</div>
          <div class="mc-val">${f.hvac_done}%</div>
          <div class="mc-tested">Tested: <span>${f.hvac_test}%</span></div>
        </div>
        <div class="mep-chip">
          <div class="mc-label">Water / Plumbing</div>
          <div class="mc-val">${f.water_done}%</div>
          <div class="mc-tested">Tested: <span>${f.water_test}%</span></div>
        </div>
        <div class="mep-chip">
          <div class="mc-label">Fire Protection</div>
          <div class="mc-val">${f.fire_done}%</div>
          <div class="mc-tested">Tested: <span>${f.fire_test}%</span></div>
        </div>
      </div>
    </div>
  `;

  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    document.querySelectorAll('.pbar-fill[data-w]').forEach(el=>{
      el.style.width = el.dataset.w;
    });
  }));
}

/* ═══════════════════════════════════════════════════════════
   MATRIX TABLE
═══════════════════════════════════════════════════════════ */
const MAT_COLORS = {
  str:     'linear-gradient(90deg,#2A6BC4,#4A90E2,#7AB8FF)',
  arc:     'linear-gradient(90deg,#6B50C0,#9B7FE8,#C0A8FF)',
  int:     'linear-gradient(90deg,#258C50,#3DBE7C,#70E8A0)',
  mep:     'linear-gradient(90deg,#B85A1A,#E8873A,#FFB870)',
  overall: 'linear-gradient(90deg,#8B6820,#C9A84C,#E8C97A)',
};

function matBar(pct, type, tested){
  const testedHtml = (tested > 0)
    ? `<div class="mat-tested">✓ ${tested}% tested</div>` : '';
  return `<div>
    <div class="mat-bar">
      <div class="mat-fill" style="width:0%" data-w="${pct}%" data-bg="${MAT_COLORS[type]}"></div>
      <span class="mat-pct">${pct}%</span>
    </div>${testedHtml}</div>`;
}

function renderMatrix(){
  const floors = DATA[curBuilding].floors;
  const thead = `<thead><tr>
    <th>Floor</th>
    <th>Spaces</th>
    <th style="color:var(--blue)">Structure</th>
    <th style="color:var(--purple)">Architecture</th>
    <th style="color:var(--green)">Interior</th>
    <th style="color:var(--orange)">MEP Works</th>
    <th style="color:var(--gold)">Overall</th>
  </tr></thead>`;

  const orderedBottom = getFloorKeys(curBuilding).slice().reverse();

  const tbody = `<tbody>${orderedBottom.map(fk=>{
    const f = floors[fk];
    const ov       = overallFloor(f);
    const mepVal   = mep(f);
    const mepTestVal = mepTest(f);
    const strVal   = Math.round((f.flooring + f.walls + f.stairs) / 3);
    const archVal  = arch(f);
    const spaceSummary = f.spaces ? f.spaces.slice(0,3).join(', ') + (f.spaces.length > 3 ? ` +${f.spaces.length-3}` : '') : '—';
    return `<tr>
      <td class="floor-name" style="cursor:pointer" onclick="selectFloor('${fk}')">${f.label}</td>
      <td style="font-size:10px;color:var(--muted);text-align:left;max-width:180px">${spaceSummary}</td>
      <td>${matBar(strVal, 'str')}</td>
      <td>${matBar(archVal,  'arc')}</td>
      <td>${matBar(f.int,  'int')}</td>
      <td>${matBar(mepVal, 'mep', mepTestVal)}</td>
      <td>${matBar(ov,     'overall')}</td>
    </tr>`;
  }).join('')}</tbody>`;

  document.getElementById('matrixTable').innerHTML = thead + tbody;

  // Animate fills
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    document.querySelectorAll('#matrixTable .mat-fill[data-w]').forEach(el=>{
      el.style.background = el.dataset.bg;
      el.style.width = el.dataset.w;
    });
  }));
}
