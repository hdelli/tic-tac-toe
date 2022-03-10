// init grid squares

const init = () => {
    
    const grid = document.querySelector("#grid");

    //purge existing grid
    while (grid.firstChild) {
        grid.removeChild(grid.lastChild);
    }

    //init fresh grid
    for (let i = 1; i < 10; i++) {
        const square = document.createElement("div");
        square.setAttribute("id",`s${i}`);
        square.classList.add("p2");
        grid.appendChild(square);
    }
}

init();