/* ═══════════════════════════════════════════════════════════
   WEEKLY NOTES DATA
   — Updated by Claude each time new info is provided
   — cutoff: Monday of the current week
═══════════════════════════════════════════════════════════ */
const NOTES = {
  cutoff: "2026-04-19",   // Monday of current week (YYYY-MM-DD)
  thisWeek: [
    "Structure: All floor slabs complete on both buildings — only roof slab remaining (both buildings)",
    "Structure Bldg A FL4: Corridor and rooms leveled and cleaned; FL3 leveling prep started in corridor (bathroom floors not yet poured)",
    "Structure Bldg A FL8: Surge tank sleeves laid — inspection required during next formwork pour",
    "Architecture Bldg A FL3: Q-con walls 100% complete; FL4 Q-con ~80-90% done (some openings left for worker access); FL2 wall grouting/gap-filling in progress",
    "Architecture Bldg A FL2: Ceiling frames installed (not yet boarded — above-ceiling MEP still active); some rooms started skimming/plastering",
    "Architecture Bldg A: Bathroom tile requests submitted; floor levels set in some bathrooms, plastering required before tiling",
    "Architecture Bldg B: FL3 &amp; FL4 Q-con walls complete; FL5 Q-con ~70% done; leveling buttons placed on FL4 &amp; FL6",
    "Interior Bldg B FL2: Skim coating done in 9/16 rooms; corridor and remaining rooms pending; no ceilings started on any floor",
    "MEP Bldg A FL2: Electrical 95% done / 95% tested; HVAC 70% done; Water 100% done",
    "MEP Bldg A FL3: Electrical 50% done",
    "MEP Bldg A FL3 &amp; FL4: AC piping with insulation installed, units pending (35%); no electrical riser pipes yet",
    "MEP Bldg A FL8: Surge tank sleeves laid (5%)",
    "MEP Bldg B FL2: Electrical 100% done; HVAC 85% done; Water 100% done and tested",
    "MEP Bldg B FL3: Electrical boxes installed (no wiring yet); AC piping done, units pending; Sprinklers pressure-tested (some heads need repositioning)",
    "MEP Bldg B FL5: Fire suppression piping partially installed; water pipes on site, not yet installed",
    "Swimming pool (Roof): Surge tank installed",
    "Recommendation: Bldg A &amp; B FL3 above-ceiling MEP mostly ready — ceiling framing should begin soon",
  ],
  issues: [
    "FL2 Bldg B — HVAC: AC units confirmed wrong spec, work stopped pending full replacement",
    "FL2 Bldg A — HVAC: AC units installed, require full model/capacity verification (risk of wrong spec same as Bldg B)",
    "Basement (both buildings): No work possible — area not yet cleared",
    "Floor 1 (both buildings): No work possible — currently used as site office",
    "Bldg A FL2 — Sprinklers: Some heads may conflict with corner cabinet locations; repositioning may be required before ceiling boards are installed",
    "Bldg B FL3 — Sprinkler heads conflict with planned cabinet locations; repositioning required before ceiling work begins",
    "Bldg A FL8 — Surge tank sleeves: Mandatory inspection required during formwork phase to prevent sinking or shifting",
  ],
  lastWeek: [
    "Architecture Bldg A: Floors 2–4 brick walls complete; Floor 3 partition walls done, floor leveling in progress",
    "Architecture Bldg B: Floors 2–4 brick walls complete, Floor 5 in progress; Floor 2 skim coat done on ~3 rooms",
    "MEP Bldg A FL2: Electrical ~85% (prior estimate); Plumbing 40% done",
    "MEP Bldg B FL2: Electrical 75% done, Plumbing 75% done",
    "MEP vertical routing: Fire suppression reached FL5, Riser reached FL6, Water supply reached FL3",
  ],

  // Backlog — items stay until resolved, do NOT clear weekly
  // Format: { since: "YYYY-MM-DD", item: "description" }
  backlog: [
    { since: "2026-04-14", item: "FL2 Bldg B — HVAC: AC units confirmed wrong spec on entire floor. Full replacement required before other HVAC work on FL2 can proceed." },
    { since: "2026-04-14", item: "Basement (both buildings): Area not yet cleared. No architectural or MEP work can begin until clearance is complete." },
    { since: "2026-04-14", item: "Floor 1 (both buildings): Currently used as site office. No architectural or MEP work can begin until office is relocated." },
    { since: "2026-04-16", item: "Bldg B FL3 — Sprinkler heads conflict with cabinet layout. Heads must be repositioned before ceiling framing can be completed on FL3." },
    { since: "2026-04-16", item: "Bldg A FL2 — HVAC: AC units installed but require full model/capacity verification. Risk of wrong spec same as Bldg B — halt if confirmed incorrect." },
    { since: "2026-04-16", item: "Bldg A FL2 — Sprinklers: Some heads may conflict with corner cabinet locations. Assess and reposition if needed before ceiling boards are installed." },
    { since: "2026-04-16", item: "Bldg A FL8 — Surge tank sleeves: Mandatory inspection during formwork phase to ensure sleeves do not sink or shift before concrete pour." },
  ]
};

/* ═══════════════════════════════════════════════════════════
   RENDER NOTES
═══════════════════════════════════════════════════════════ */
function renderNotes(){
  const cutoff = new Date(NOTES.cutoff + 'T00:00:00');
  const weekEnd = new Date(cutoff);
  weekEnd.setDate(cutoff.getDate() + 6);
  const fmt = d => d.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});
  document.getElementById('notesPeriod').textContent =
    'Week of ' + fmt(cutoff) + ' – ' + fmt(weekEnd);

  const render = (id, items) => {
    document.getElementById(id).innerHTML = items.length
      ? items.map(t=>`<div style="display:flex;gap:8px;margin-bottom:6px"><span style="color:var(--gold-d);flex-shrink:0">›</span><span>${t}</span></div>`).join('')
      : `<span style="color:var(--dim);font-style:italic">No updates this week</span>`;
  };

  // Group "This Week's Work" by category
  const NOTE_CATS = [
    { key:'str',   cls:'g-str',   label:'Structure',    match:/^structure\b/i },
    { key:'arc',   cls:'g-arc',   label:'Architecture', match:/^architecture\b/i },
    { key:'int',   cls:'g-int',   label:'Interior',     match:/^interior\b/i },
    { key:'mep',   cls:'g-mep',   label:'MEP',          match:/^mep\b/i },
    { key:'other', cls:'g-other', label:'Other',        match:/.*/ },
  ];
  function categorize(items){
    const buckets = Object.fromEntries(NOTE_CATS.map(c=>[c.key, []]));
    items.forEach(t=>{
      const hit = NOTE_CATS.find(c=> c.match.test(t));
      buckets[hit.key].push(t);
    });
    return buckets;
  }
  function renderGrouped(id, items){
    if(!items.length){
      document.getElementById(id).innerHTML = `<span style="color:var(--dim);font-style:italic">No updates this week</span>`;
      return;
    }
    const buckets = categorize(items);
    const html = NOTE_CATS.filter(c => buckets[c.key].length).map(c => {
      const lines = buckets[c.key].map(t => `<div class="note-line"><span class="note-line-bullet">›</span><span>${t}</span></div>`).join('');
      return `<div class="note-group ${c.cls}"><div class="note-group-head"><span class="note-group-dot"></span>${c.label}</div>${lines}</div>`;
    }).join('');
    document.getElementById(id).innerHTML = html;
  }
  renderGrouped('noteWork', NOTES.thisWeek);
  render('noteIssues',   NOTES.issues);
  render('noteLastWeek', NOTES.lastWeek);

  // Backlog
  const bl = NOTES.backlog || [];
  document.getElementById('backlogCount').textContent = bl.length + ' open';
  document.getElementById('noteBacklog').innerHTML = bl.length
    ? bl.map(b => {
        const d = new Date(b.since + 'T00:00:00');
        const since = d.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});
        return `<div class="backlog-item">
          <div class="backlog-since">Since<br>${since}</div>
          <div class="backlog-text">${b.item}</div>
        </div>`;
      }).join('')
    : `<span style="color:var(--dim);font-style:italic">No open backlog items</span>`;
}
