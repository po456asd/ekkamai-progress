/* ═══════════════════════════════════════════════════════════
   SHARED DATE CONSTANTS
═══════════════════════════════════════════════════════════ */
const CAL_DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const CAL_MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_MS  = 86400000;
const WEEK_MS = 7 * DAY_MS;

function parseISO(s){ return new Date(s + 'T00:00:00'); }
function todayMidnight(){ const d = new Date(); d.setHours(0,0,0,0); return d; }

function statusOf(dateStr){
  const today = todayMidnight();
  const diff = parseISO(dateStr) - today;
  if(diff < 0) return 'arrived';
  if(diff <= WEEK_MS) return 'upcoming';
  return 'future';
}

/* ═══════════════════════════════════════════════════════════
   DAILY DELIVERY DETAILS (click on calendar day)
═══════════════════════════════════════════════════════════ */
window.showDayDetails = function(dateStr){
  function statusLabel(s){
    return s === 'arrived' ? 'ARRIVED' : s === 'upcoming' ? 'UPCOMING' : 'FUTURE';
  }

  // Find all suppliers delivering on this date
  const suppliers = [];
  MATERIALS.forEach(mat => {
    const delivery = mat.dates.find(d => d.date === dateStr);
    if(delivery){
      suppliers.push({
        name: mat.name,
        category: mat.category,
        supplier: mat.supplier,
        contact: mat.contact || '—',
        tel: mat.tel,
        status: statusOf(dateStr),
      });
    }
  });

  // Check for events on this date
  const evt = EVENTS.find(e => e.date === dateStr);

  if(suppliers.length === 0 && !evt){
    document.getElementById('matDayDetails').style.display = 'none';
    return;
  }

  // Format date display
  const d = parseISO(dateStr);
  const dateDisplay = `${d.getDate()} ${CAL_MONTHS[d.getMonth()]} ${d.getFullYear()} (${CAL_DAYS[d.getDay()]})`;

  const eventHtml = evt ? `
    <div class="mat-day-event">
      <div class="mat-day-event-title">${evt.title}</div>
      ${evt.detail ? `<div class="mat-day-event-detail">${evt.detail}</div>` : ''}
      <div class="mat-day-event-attendees">
        <strong>Attendees:</strong> ${evt.attendees.join(', ')}
      </div>
    </div>
  ` : '';

  const supplierHtml = suppliers.map(s => `
    <div class="mat-day-supplier">
      <div class="mat-day-supplier-name">${s.name}</div>
      <div class="mat-day-supplier-info">
        <div>Supplier: <strong>${s.supplier}</strong> · ${s.category}</div>
        <div>Contact: <strong>${s.contact}</strong> · Tel: <strong>${s.tel || '—'}</strong></div>
      </div>
      <div class="mat-day-supplier-status ${s.status}">${statusLabel(s.status)}</div>
    </div>
  `).join('');

  document.getElementById('matDayDetails').innerHTML = `
    <div class="mat-day-details">
      <div class="mat-day-details-head">
        <div class="mat-day-details-date">${dateDisplay}</div>
        <button class="mat-day-details-close" onclick="document.getElementById('matDayDetails').style.display='none'">✕</button>
      </div>
      <div class="mat-day-details-list">
        ${eventHtml}
        ${supplierHtml}
      </div>
    </div>
  `;
  document.getElementById('matDayDetails').style.display = 'block';
};

/* ═══════════════════════════════════════════════════════════
   MASTER CALENDAR FOR ALL MATERIALS
═══════════════════════════════════════════════════════════ */
function buildMasterCalendar(mats){
  const today = todayMidnight();

  // Collect all dates from filtered materials
  const allDates = [].concat(...mats.map(m => m.dates.map(d => d.date)));
  if(allDates.length === 0){
    return `<div class="mat-master-cal">
      <div class="sec-head">
        <div class="sec-title">Master Delivery Calendar</div>
        <div class="sec-sub">All suppliers · No deliveries scheduled for this filter</div>
      </div>
      <div style="color:var(--dim);font-style:italic;padding:12px">No delivery dates to display</div>
    </div>`;
  }

  // Build map: date → count of suppliers delivering that day
  const dateToCount = {};
  allDates.forEach(ds => {
    dateToCount[ds] = (dateToCount[ds] || 0) + 1;
  });

  // Show all 12 months of 2026
  const months = [];
  for(let m = 0; m < 12; m++) months.push({ year: 2026, month: m });

  // ── GRID ──
  const calHtml = `<div class="cal-strip">${months.map(({year, month}) => {
    const daysInMonth = new Date(year, month+1, 0).getDate();
    const firstDay = (new Date(year, month, 1).getDay() + 6) % 7; // Mon-first

    let cells = '<div class="cal-day-hdr">M</div><div class="cal-day-hdr">T</div><div class="cal-day-hdr">W</div><div class="cal-day-hdr">T</div><div class="cal-day-hdr">F</div><div class="cal-day-hdr">SA</div><div class="cal-day-hdr">SU</div>';
    for(let i=0;i<firstDay;i++) cells += '<div class="cal-day empty">·</div>';

    for(let d=1;d<=daysInMonth;d++){
      const dateStr = year + '-' + String(month+1).padStart(2,'0') + '-' + String(d).padStart(2,'0');
      let cls = 'cal-day';
      const count = dateToCount[dateStr];
      const evt   = EVENTS.find(e => e.date === dateStr);
      const isToday  = today.getFullYear() === year && today.getMonth() === month && today.getDate() === d;
      const isSunday = new Date(year, month, d).getDay() === 0;

      if(isSunday) cls += ' sunday';
      if(count)    cls += ' has-delivery';
      if(evt)      cls += ' has-event';
      if(isToday)  cls += ' today-mark';

      if(count){
        cells += `<div class="${cls}" style="cursor:pointer" onclick="showDayDetails('${dateStr}')"><span>${d}</span><span class="mat-mc-count">${count}</span></div>`;
      } else if(evt){
        cells += `<div class="${cls}" style="cursor:pointer" onclick="showDayDetails('${dateStr}')">${d}</div>`;
      } else {
        cells += `<div class="${cls}">${d}</div>`;
      }
    }

    return `<div class="cal-month">
      <div class="cal-month-name">${CAL_MONTHS[month]} ${year}</div>
      <div class="cal-grid">${cells}</div>
    </div>`;
  }).join('')}</div>`;

  return `<div class="mat-master-cal">
    <div class="sec-head">
      <div class="sec-title">Master Delivery Calendar</div>
      <div class="sec-sub">All suppliers · ${allDates.length} deliveries scheduled</div>
    </div>
    ${calHtml}
  </div>`;
}

/* ═══════════════════════════════════════════════════════════
   SITE VISIT EVENT CALENDAR
═══════════════════════════════════════════════════════════ */
function buildEventCalendar(){
  const months = [];
  for(let m = 0; m < 12; m++) months.push({ year: 2026, month: m });

  const calHtml = `<div class="cal-strip">${months.map(({year, month}) => {
    const daysInMonth = new Date(year, month+1, 0).getDate();
    const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
    const eventDays = new Set(EVENTS.filter(e => {
      const d = parseISO(e.date);
      return d.getFullYear() === year && d.getMonth() === month;
    }).map(e => parseISO(e.date).getDate()));

    let cells = '<div class="cal-day-hdr">M</div><div class="cal-day-hdr">T</div><div class="cal-day-hdr">W</div><div class="cal-day-hdr">T</div><div class="cal-day-hdr">F</div><div class="cal-day-hdr">SA</div><div class="cal-day-hdr">SU</div>';
    for(let i=0;i<firstDay;i++) cells += '<div class="cal-day empty">·</div>';
    for(let d=1;d<=daysInMonth;d++){
      const dateStr = year + '-' + String(month+1).padStart(2,'0') + '-' + String(d).padStart(2,'0');
      let cls = 'cal-day';
      const hasEvent = eventDays.has(d);
      if(hasEvent) cls += ' has-event';
      if(new Date(year, month, d).getDay() === 0) cls += ' sunday';
      if(hasEvent){
        cells += `<div class="${cls}" style="cursor:pointer" onclick="showDayDetails('${dateStr}')">${d}</div>`;
      } else {
        cells += `<div class="${cls}">${d}</div>`;
      }
    }
    return `<div class="cal-month"><div class="cal-month-name">${CAL_MONTHS[month]} ${year}</div><div class="cal-grid">${cells}</div></div>`;
  }).join('')}</div>`;

  return `<div class="mat-master-cal">
    <div class="sec-head">
      <div class="sec-title">Site Visit Events</div>
      <div class="sec-sub">Scheduled events · ${EVENTS.length} event(s)</div>
    </div>
    ${calHtml}
  </div>`;
}

/* ═══════════════════════════════════════════════════════════
   MATERIALS RENDERING
═══════════════════════════════════════════════════════════ */
function renderMaterials(){
  function statusLabel(s){
    return s === 'arrived' ? 'Arrived' : s === 'upcoming' ? 'This Week' : 'Scheduled';
  }

  // ── FILTER STATE ──
  const allCats = ['All', 'Site Visit', ...new Set(MATERIALS.map(m => m.category))];
  let activeCat = 'All';

  function buildFilters(){
    document.getElementById('matFilters').innerHTML = allCats.map(c =>
      `<button class="mat-filter${c===activeCat?' active':''} ${c==='Site Visit'?'site-visit':''}" onclick="setMatFilter('${c}')">${c}</button>`
    ).join('');
  }

  window.setMatFilter = function(cat){
    activeCat = cat;
    buildFilters();
    buildMasterCalendarAndList();
  };

  // ── CALENDAR + LIST ──
  function buildMasterCalendarAndList(){
    if(activeCat === 'All'){
      document.getElementById('matMasterCal').innerHTML = buildMasterCalendar(MATERIALS);
    } else if(activeCat === 'Site Visit'){
      document.getElementById('matMasterCal').innerHTML = buildEventCalendar();
    } else {
      document.getElementById('matMasterCal').innerHTML = buildMasterCalendar(MATERIALS.filter(m=>m.category===activeCat));
    }
    buildMatList();
  }

  // ── SUMMARY BADGES ──
  const today = todayMidnight();
  const totalItems = MATERIALS.length;
  const withDates  = MATERIALS.filter(m=>m.dates.length>0).length;
  const arrivedAll = MATERIALS.reduce((s,m)=>s+m.dates.filter(d=>statusOf(d.date)==='arrived').length,0);
  const totalDels  = MATERIALS.reduce((s,m)=>s+m.dates.length,0);
  document.getElementById('matSummaryBadges').innerHTML = [
    ['Total Items', totalItems, 'var(--muted)'],
    ['Scheduled', withDates, 'var(--gold)'],
    ['Delivered', arrivedAll+'/'+totalDels, 'var(--green)'],
  ].map(([l,v,c])=>`<div style="background:var(--card);border:1px solid var(--border);border-radius:8px;padding:8px 16px;text-align:center">
    <div style="font-size:18px;font-weight:700;color:${c};font-family:'Playfair Display',serif">${v}</div>
    <div style="font-size:9px;color:var(--muted);letter-spacing:1.5px;text-transform:uppercase;margin-top:2px">${l}</div>
  </div>`).join('');

  // ── MATERIAL LIST ──
  function buildMatList(){
    if(activeCat === 'Site Visit'){
      document.getElementById('matList').innerHTML = `<div style="text-align:center;padding:24px;color:var(--dim);font-style:italic">Site Visit events displayed above · No material deliveries</div>`;
      return;
    }
    const filtered = activeCat === 'All' ? MATERIALS : MATERIALS.filter(m=>m.category===activeCat);
    // Group by category
    const groups = {};
    filtered.forEach(m=>{
      if(!groups[m.category]) groups[m.category]=[];
      groups[m.category].push(m);
    });

    document.getElementById('matList').innerHTML = Object.entries(groups).map(([cat, items])=>{
      const catHeader = activeCat === 'All' ? `<div class="mat-cat-header">${cat}</div>` : '';
      const cards = items.map(mat => {
        const total   = mat.dates.length;
        const arrived = mat.dates.filter(d => statusOf(d.date) === 'arrived').length;

        const rows = mat.dates.map(d => {
          const dt     = parseISO(d.date);
          const status = statusOf(d.date);
          return `<div class="delivery-row">
            <div class="del-dot ${status}"></div>
            <div class="del-date-block">
              <div class="del-date">${dt.getDate()} ${CAL_MONTHS[dt.getMonth()].slice(0,3)} ${dt.getFullYear()}</div>
              <div class="del-day">${CAL_DAYS[dt.getDay()]}</div>
              <div class="del-status ${status}">${statusLabel(status)}</div>
            </div>
            <div class="del-info">
              ${d.qty  ? `<div class="del-qty">${d.qty}</div>`   : ''}
              ${d.note ? `<div class="del-note">${d.note}</div>` : ''}
            </div>
          </div>`;
        }).join('');

        const noDateMsg = total === 0
          ? `<div style="color:var(--dim);font-style:italic;font-size:12px;padding:8px 0">No delivery dates scheduled yet</div>` : '';

        return `<div class="mat-timeline-wrap">
          <div class="mat-top">
            <div>
              <div class="mat-item-name">${mat.name}</div>
              <div class="mat-supplier">
                Supplier: <span>${mat.supplier}</span>
                &nbsp;·&nbsp; Contact: <span>${mat.contact || '—'}</span>
                &nbsp;·&nbsp; Tel: <span>${mat.tel || '—'}</span>
                &nbsp;·&nbsp; <span style="color:var(--muted)">${mat.category}</span>
              </div>
            </div>
            <div class="mat-total-badge">
              <div class="tb-num">${total > 0 ? arrived+'/'+total : '—'}</div>
              <div class="tb-label">Deliveries</div>
            </div>
          </div>
          ${noDateMsg}
          ${total > 0 ? `<div class="delivery-timeline">${rows}</div>` : ''}
        </div>`;
      }).join('');
      return catHeader + cards;
    }).join('');
  }

  buildFilters();
  buildMasterCalendarAndList();
}
