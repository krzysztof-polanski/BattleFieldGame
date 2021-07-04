let renderedGrid = document.getElementById('grid-rendered');
function renderGrid() {
    let tr = document.createElement('TR');
    let td = document.createElement('TD');
    for (i = 0; i < 10; i++) {
        for (j = 0; j < 10; j++) {
            tr.appendChild(td);
            td = document.createElement('TD');
        }
        renderedGrid.appendChild(tr);
        tr = document.createElement('TR');
    }
}
renderGrid();