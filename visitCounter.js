function updateVisitCounter() {
    let visitData = localStorage.getItem('visitData');
    if (!visitData) {
        visitData = { count: 0, lastVisit: new Date().toLocaleString() };
    } else {
        visitData = JSON.parse(visitData);
        visitData.count++;
        visitData.lastVisit = new Date().toLocaleString();
    }
    localStorage.setItem('visitData', JSON.stringify(visitData));
}

function displayVisitInfo() {
    const visitData = JSON.parse(localStorage.getItem('visitData'));
    if (visitData) {
        const visitInfo = `Esta página foi visitada ${visitData.count} vezes. A última visita foi: ${visitData.lastVisit}`;
        const footer = document.querySelector('footer');
        const p = document.createElement('p');
        p.textContent = visitInfo;
        footer.appendChild(p);
    } else {
        console.log("Nenhuma informação de visita encontrada.");
    }
}

document.addEventListener('DOMContentLoaded', function () {
    updateVisitCounter(); // Atualiza o contador de visitas sempre que a página é carregada
    displayVisitInfo();
});


