/* ═══════════════════════════════════════════════════════════
   CHART DEFAULTS
═══════════════════════════════════════════════════════════ */
const CHART_DEFAULTS = {
  color: {
    text: '#7A6A50',
    grid: '#1e1a10',
    border: '#2a2010',
  }
};

/* ═══════════════════════════════════════════════════════════
   CHART INIT / UPDATE
═══════════════════════════════════════════════════════════ */
function renderCharts(){
  const barCtx   = document.getElementById('barChart').getContext('2d');
  const radarCtx = document.getElementById('radarChart').getContext('2d');
  Chart.defaults.color = CHART_DEFAULTS.color.text;

  barChartInst   = new Chart(barCtx,   barConfig());
  radarChartInst = new Chart(radarCtx, radarConfig());
}

function updateCharts(){
  if(!barChartInst || !radarChartInst) return;
  const bc = barConfig();
  barChartInst.data = bc.data;
  barChartInst.update('active');

  const rc = radarConfig();
  radarChartInst.data = rc.data;
  radarChartInst.update('active');
}

/* ═══════════════════════════════════════════════════════════
   BAR CHART CONFIG
═══════════════════════════════════════════════════════════ */
function barConfig(){
  const floors = DATA[curBuilding].floors;
  const keys   = getFloorKeys(curBuilding).slice().reverse().filter(k=>k!=='R');
  const labels = keys.map(k=> floors[k].label);

  return {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Structure',
          data: keys.map(k=>{
            const f = floors[k];
            return Math.round((f.flooring + f.walls + f.stairs) / 3);
          }),
          backgroundColor: 'rgba(74,144,226,.55)',
          borderColor: 'rgba(74,144,226,.9)',
          borderWidth: 1, borderRadius: 4,
        },
        {
          label: 'Architecture',
          data: keys.map(k=>floors[k].arc),
          backgroundColor: 'rgba(155,127,232,.55)',
          borderColor: 'rgba(155,127,232,.9)',
          borderWidth: 1, borderRadius: 4,
        },
        {
          label: 'Interior',
          data: keys.map(k=>floors[k].int),
          backgroundColor: 'rgba(61,190,124,.55)',
          borderColor: 'rgba(61,190,124,.9)',
          borderWidth: 1, borderRadius: 4,
        },
        {
          label: 'MEP',
          data: keys.map(k=>mep(floors[k])),
          backgroundColor: 'rgba(232,135,58,.55)',
          borderColor: 'rgba(232,135,58,.9)',
          borderWidth: 1, borderRadius: 4,
        },
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      animation: { duration: 800 },
      plugins: {
        legend: { labels: { font: {size:10}, padding: 12, color:'#7A6A50' } }
      },
      scales: {
        x: {
          grid: { color: CHART_DEFAULTS.color.grid },
          ticks: { font:{size:10} }
        },
        y: {
          min: 0, max: 100,
          grid: { color: CHART_DEFAULTS.color.grid },
          ticks: { callback: v=>v+'%', font:{size:10} }
        }
      }
    }
  };
}

/* ═══════════════════════════════════════════════════════════
   RADAR CHART CONFIG
═══════════════════════════════════════════════════════════ */
function radarConfig(){
  const labels = ['Structure','Architecture','Interior','MEP'];
  const avgA = labels.map((_,i)=>buildingAvg('A',['str','arc','int','mep'][i]));
  const avgB = labels.map((_,i)=>buildingAvg('B',['str','arc','int','mep'][i]));
  return {
    type: 'radar',
    data: {
      labels,
      datasets: [
        {
          label: 'Building A',
          data: avgA,
          backgroundColor: 'rgba(201,168,76,.15)',
          borderColor: 'rgba(201,168,76,.8)',
          borderWidth: 2, pointBackgroundColor:'rgba(201,168,76,.9)',
          pointRadius: 4,
        },
        {
          label: 'Building B',
          data: avgB,
          backgroundColor: 'rgba(74,144,226,.12)',
          borderColor: 'rgba(74,144,226,.7)',
          borderWidth: 2, pointBackgroundColor:'rgba(74,144,226,.9)',
          pointRadius: 4,
        }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      animation: { duration: 800 },
      plugins: {
        legend: { labels: { font:{size:10}, color:'#7A6A50' } }
      },
      scales: {
        r: {
          min: 0, max: 100,
          angleLines: { color: CHART_DEFAULTS.color.grid },
          grid: { color: CHART_DEFAULTS.color.grid },
          pointLabels: { font:{size:11}, color:'#A09070' },
          ticks: { display:false, stepSize: 25 }
        }
      }
    }
  };
}
