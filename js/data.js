/* ═══════════════════════════════════════════════════════════
   BUILD METADATA — Updated on each push
═══════════════════════════════════════════════════════════ */
const BUILD_META = {
  timestamp: "2026-04-20T01:00:00Z",   // UTC time (browser converts to device timezone)
  revision: 1                          // Increment on each Claude push
};

/* ═══════════════════════════════════════════════════════════
   SITE VISITS & EVENTS
═══════════════════════════════════════════════════════════ */
const EVENTS = [
  { date: "2026-04-24", type: "site-visit", title: "Site Visit", detail: "Check example light on 2B Floor ceiling light", attendees: ["K Bee", "K Note", "K Atin"] }
];

/* ═══════════════════════════════════════════════════════════
   PROJECT DATA — Edit these values each week
   All values are percentages (0–100)
   Floors: B=Basement, 1–8=Floors, R=Roof (Bldg A only)
═══════════════════════════════════════════════════════════ */
const DATA = {
  A: {
    name: "Building A",
    floors: {
      R:  { label:"Roof Floor", isRoof:true,
            spaces:["Water Tank Area","Swimming Pool","Swimming Pool Balcony","Kids Area"],
            flooring:100, walls:0, stairs:0, arc:0, int:0, skim:0, elec_done:0, elec_test:0, hvac_done:0, hvac_test:0, water_done:0, water_test:0, fire_done:0, fire_test:0  },
      8:  { label:"Floor 8",
            spaces:["2 Guest Rooms","Guest Bathroom","4 Public Toilets","Fitness Room","Toilet 10","Toilet 11","Toilet 12","Corridor","Pump Room"],
            flooring:100, walls:100, stairs:0, arc:0, int:0, skim:0, elec_done:0, elec_test:0, hvac_done:0, hvac_test:0, water_done:5, water_test:0, fire_done:0, fire_test:0  },
      7:  { label:"Floor 7",
            spaces:["14 Guest Rooms","Guest Bathroom","Corridor"],
            flooring:100, walls:100, stairs:0, arc:0, int:0, skim:0, elec_done:0, elec_test:0, hvac_done:0, hvac_test:0, water_done:0, water_test:0, fire_done:0, fire_test:0  },
      6:  { label:"Floor 6",
            spaces:["14 Guest Rooms","Guest Bathroom","Corridor"],
            flooring:100, walls:100, stairs:0, arc:0, int:0, skim:0, elec_done:0, elec_test:0, hvac_done:0, hvac_test:0, water_done:0, water_test:0, fire_done:0, fire_test:0  },
      5:  { label:"Floor 5",
            spaces:["14 Guest Rooms","Guest Bathroom","Corridor"],
            flooring:100, walls:100, stairs:0, arc:0, int:0, skim:0, elec_done:0, elec_test:0, hvac_done:0, hvac_test:0, water_done:0, water_test:0, fire_done:0, fire_test:0  },
      4:  { label:"Floor 4",
            spaces:["14 Guest Rooms","Guest Bathroom","Corridor"],
            flooring:100, walls:100, stairs:0, arc:48, int:0, skim:0, elec_done:0, elec_test:0, hvac_done:35, hvac_test:0, water_done:0, water_test:0, fire_done:0, fire_test:0  },
      3:  { label:"Floor 3",
            spaces:["14 Guest Rooms","Guest Bathroom","Corridor"],
            flooring:100, walls:100, stairs:0, arc:100, int:0, skim:0, elec_done:50, elec_test:0, hvac_done:35, hvac_test:0, water_done:0, water_test:0, fire_done:0, fire_test:0  },
      2:  { label:"Floor 2",
            spaces:["14 Guest Rooms","Guest Bathroom","Corridor"],
            flooring:100, walls:100, stairs:0, arc:100, int:0, skim:0, elec_done:95, elec_test:95, hvac_done:70, hvac_test:0, water_done:100, water_test:0, fire_done:0, fire_test:0  },
      1:  { label:"Floor 1",
            spaces:["Shop 1","Lobby","Office 1","Office 2","Staff Locker","Staff Toilet","Landscape","Parking","Toilet 1","Toilet 2","Toilet 3","Toilet 4","Toilet 5"],
            flooring:100, walls:100, stairs:0, arc:0, int:0, skim:0, elec_done:0, elec_test:0, hvac_done:0, hvac_test:0, water_done:0, water_test:0, fire_done:0, fire_test:0  },
      B:  { label:"Basement", isBasement:true,
            spaces:["Parking Lot","Shop 2","Shop 3","All Day Dining","Kitchen"],
            flooring:100, walls:100, stairs:0, arc:0, int:0, skim:0, elec_done:0, elec_test:0, hvac_done:0, hvac_test:0, water_done:0, water_test:0, fire_done:0, fire_test:0  },
    }
  },
  B: {
    name: "Building B",
    floors: {
      R:  { label:"Roof Floor", isRoof:true,
            spaces:["Blank Roof Area","Water Tank"],
            flooring:100, walls:0, stairs:0, arc:0, int:0, skim:0, elec_done:0, elec_test:0, hvac_done:0, hvac_test:0, water_done:0, water_test:0, fire_done:0, fire_test:0  },
      8:  { label:"Floor 8",
            spaces:["14 Guest Rooms","Guest Bathroom","Corridor"],
            flooring:100, walls:100, stairs:0, arc:0, int:0, skim:0, elec_done:0, elec_test:0, hvac_done:0, hvac_test:0, water_done:0, water_test:0, fire_done:0, fire_test:0  },
      7:  { label:"Floor 7",
            spaces:["14 Guest Rooms","Guest Bathroom","Corridor"],
            flooring:100, walls:100, stairs:0, arc:0, int:0, skim:0, elec_done:0, elec_test:0, hvac_done:0, hvac_test:0, water_done:0, water_test:0, fire_done:0, fire_test:0  },
      6:  { label:"Floor 6",
            spaces:["14 Guest Rooms","Guest Bathroom","Corridor"],
            flooring:100, walls:100, stairs:0, arc:5, int:0, skim:0, elec_done:0, elec_test:0, hvac_done:0, hvac_test:0, water_done:0, water_test:0, fire_done:0, fire_test:0  },
      5:  { label:"Floor 5",
            spaces:["14 Guest Rooms","Guest Bathroom","Corridor"],
            flooring:100, walls:100, stairs:0, arc:30, int:0, skim:0, elec_done:0, elec_test:0, hvac_done:0, hvac_test:0, water_done:20, water_test:0, fire_done:0, fire_test:0  },
      4:  { label:"Floor 4",
            spaces:["14 Guest Rooms","Guest Bathroom","Corridor"],
            flooring:100, walls:100, stairs:0, arc:50, int:0, skim:0, elec_done:0, elec_test:0, hvac_done:0, hvac_test:0, water_done:0, water_test:0, fire_done:0, fire_test:0  },
      3:  { label:"Floor 3",
            spaces:["14 Guest Rooms","Guest Bathroom","Corridor"],
            flooring:100, walls:100, stairs:0, arc:100, int:0, skim:0, elec_done:20, elec_test:0, hvac_done:40, hvac_test:0, water_done:85, water_test:85, fire_done:0, fire_test:0  },
      2:  { label:"Floor 2",
            spaces:["16 Guest Rooms","Guest Bathroom","Corridor"],
            flooring:100, walls:100, stairs:0, arc:100, int:10, skim:81, elec_done:100, elec_test:0, hvac_done:85, hvac_test:0, water_done:100, water_test:100, fire_done:0, fire_test:0  },
      1:  { label:"Floor 1",
            spaces:["Shop 1","Lobby","Office 1","Office 2","Staff Locker","Staff Toilet","Landscape","Parking","Toilet 1","Toilet 2","Toilet 3","Toilet 4","Toilet 5"],
            flooring:100, walls:100, stairs:0, arc:0, int:0, skim:0, elec_done:0, elec_test:0, hvac_done:0, hvac_test:0, water_done:0, water_test:0, fire_done:0, fire_test:0  },
      B:  { label:"Basement", isBasement:true,
            spaces:["Parking Lot","Shop 2","Shop 3","All Day Dining","Kitchen"],
            flooring:100, walls:100, stairs:0, arc:0, int:0, skim:0, elec_done:0, elec_test:0, hvac_done:0, hvac_test:0, water_done:0, water_test:0, fire_done:0, fire_test:0  },
    }
  }
};

/* ═══════════════════════════════════════════════════════════
   DERIVED HELPERS
═══════════════════════════════════════════════════════════ */
// Floor display order (top → bottom in SVG, bottom → top in matrix)
const FLOOR_KEYS = { A: ['R','8','7','6','5','4','3','2','1','B'], B: ['R','8','7','6','5','4','3','2','1','B'] };
function getFloorKeys(bld){ return FLOOR_KEYS[bld]; }

const CAT = [
  { key:'str',  label:'Structure',          color:'var(--blue)',   cls:'k-str', track:'#1a2a40', bg:'rgba(74,144,226,.15)' },
  { key:'arc',  label:'Architecture',       color:'var(--purple)', cls:'k-arc', track:'#1e1a40', bg:'rgba(155,127,232,.15)' },
  { key:'int',  label:'Interior Design',    color:'var(--green)',  cls:'k-int', track:'#0e2820', bg:'rgba(61,190,124,.15)' },
  { key:'mep',  label:'MEP Works',          color:'var(--orange)', cls:'k-mep', track:'#30180a', bg:'rgba(232,135,58,.15)' },
];

function mep(f){ return Math.round((f.elec_done + f.hvac_done + f.water_done + f.fire_done) / 4); }
function mepTest(f){ return Math.round((f.elec_test + f.hvac_test + f.water_test + f.fire_test) / 4); }
function arch(f){ return Math.round((f.arc + f.skim) / 2); }

function overallFloor(f){
  const structure = Math.round((f.flooring + f.walls + f.stairs) / 3);
  return Math.round((structure + arch(f) + f.int + mep(f)) / 4);
}

function buildingAvg(bld, key){
  const floors = getFloorKeys(bld).map(k => DATA[bld].floors[k]);
  if(key === 'str')      return Math.round(floors.reduce((s,f)=>s+Math.round((f.flooring+f.walls+f.stairs)/3),0)/floors.length);
  if(key === 'arc')      return Math.round(floors.reduce((s,f)=>s+arch(f),0)/floors.length);
  if(key === 'mep')      return Math.round(floors.reduce((s,f)=>s+mep(f),0)/floors.length);
  if(key === 'mep_test') return Math.round(floors.reduce((s,f)=>s+mepTest(f),0)/floors.length);
  return Math.round(floors.reduce((s,f)=>s+f[key],0)/floors.length);
}

function floorColor(pct){
  if(pct >= 80) return '#0d2a18';
  if(pct >= 55) return '#1a2a08';
  if(pct >= 35) return '#2a2008';
  if(pct >= 15) return '#2a1508';
  return '#200808';
}
function floorStroke(pct){
  if(pct >= 80) return '#2d7a4a';
  if(pct >= 55) return '#5a8020';
  if(pct >= 35) return '#9A7820';
  if(pct >= 15) return '#8A4820';
  return '#702020';
}

/* ═══════════════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════════════ */
let curBuilding = 'A';
let curFloor    = '1';
let barChartInst = null;
let radarChartInst = null;
