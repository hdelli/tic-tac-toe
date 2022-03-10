let currentPlayer = "p1";
const grid = document.querySelector("#grid");
let noWinner = true;

const winningArrays = [
    [1,2,3],
    [1,5,9],
];

const changeDisplay = (player) => {
    const display = document.querySelector("#turn-display");
    display.className = "";
    display.classList.add(player);
}

const checkWin = (player) => {
    
}

const isFull = () => {
    const squares = grid.children;
    for (const square of squares) {
        if (!square.className) {
            return false;
        }
    }
    return true;
}

const squareClick = (event) => {
    if (noWinner) {
        const square = event.target;
        // check square empty
        for (const c of square.classList) {
            if (c == "p1" || c == "p2") {
                return;
            }
        }
        // add mark depending on player
        square.classList.add(currentPlayer);
        //check current player win
        if (checkWin(currentPlayer)) {
            //do winnning stuff
            noWinner = false;
            changeDisplay(`${currentPlayer}win`);
        } else {
            //check if full
            if (isFull()) {
                changeDisplay("draw");
            } else {
                //change player
                if (currentPlayer == "p1") {
                    currentPlayer = "p2";
                } else {
                    currentPlayer = "p1";
                }
                console.log(currentPlayer);
                changeDisplay(currentPlayer);
            }
        }
    }
}

// init grid squares

const init = () => {
    //purge existing grid
    while (grid.firstChild) {
        grid.removeChild(grid.lastChild);
    }

    //init fresh grid
    for (let i = 1; i < 10; i++) {
        const square = document.createElement("div");
        square.setAttribute("id",`s${i}`);
        // square.classList.add("p2")
        square.addEventListener("click", squareClick);
        grid.appendChild(square);
    }

    currentPlayer = "p1";
    changeDisplay(currentPlayer);
    noWinner = true;
}

init();

const btn = document.querySelector("#reset-btn");
btn.addEventListener("click", init);