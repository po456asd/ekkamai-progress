/* ═══════════════════════════════════════════════════════════
   PAGE SWITCHING
═══════════════════════════════════════════════════════════ */
function switchPage(page){
  document.querySelectorAll('.ptab').forEach((b,i)=>{
    b.classList.toggle('active', (i===0 && page==='progress') || (i===1 && page==='materials'));
  });
  document.getElementById('progressPage').classList.toggle('hide', page !== 'progress');
  document.getElementById('materialsPage').classList.toggle('show', page === 'materials');
}

/* ═══════════════════════════════════════════════════════════
   HEADER DATE / BUILD STAMP
═══════════════════════════════════════════════════════════ */
function updateHeader(){
  const d = document.getElementById('inputDate').value;
  if(d){
    const dt = new Date(d + 'T00:00:00');
    document.getElementById('headerDate').textContent = dt.toLocaleDateString('en-GB',{
      day:'numeric', month:'long', year:'numeric'
    });

    const buildDate = dt.toISOString().slice(0,10).replace(/-/g,'');
    const pushTime  = new Date(BUILD_META.timestamp);
    const timeStr   = pushTime.toLocaleTimeString('en-US',{hour12:true,hour:'2-digit',minute:'2-digit',second:'2-digit'});

    document.getElementById('headerBuild').textContent = `UPDATED: ${timeStr} | BUILD: V${buildDate} | R ${BUILD_META.revision}`;
  }
}

/* ═══════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════ */
window.addEventListener('DOMContentLoaded', () => {
  const today = new Date();
  document.getElementById('inputDate').value = today.toISOString().split('T')[0];
  updateHeader();

  document.getElementById('inputDate').addEventListener('input', updateHeader);

  renderNotes();
  renderKPIs();
  renderBuilding();
  renderCharts();
  renderMaterials();
});
