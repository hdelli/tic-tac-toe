let p1wins = 0;
let p2wins = 0;
let currentPlayer = "p1";
const grid = document.querySelector("#grid");
let noWinner = true;

const winningArrays = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
];

const changeDisplay = (player) => {
    const display = document.querySelector("#turn-display");
    display.className = "";
    display.classList.add(player);
}

const checkWin = () => {
    const squares = grid.children;
    const playerSquareArray = [];
    for (const square of squares) {
        playerSquareArray.push(square.className)
    }

    for (winningArray of winningArrays) {
        const position1 = playerSquareArray[winningArray[0]];
        const position2 = playerSquareArray[winningArray[1]];
        const position3 = playerSquareArray[winningArray[2]];
        if (position1==position2 && position1==position3 && position1!=""){
            return true;
        }
    }
    return false;

    // go through each of the winning arrays
    // check if those particular positions in the playerSquareArray are all equal to eachother

}

const givePoint = (player) => {
    if (player == "p1") p1wins++;
    if (player == "p2") p2wins++;
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
        if (checkWin()) {
            //do winnning stuff
            noWinner = false;
            changeDisplay(`${currentPlayer}win`);
            givePoint(currentPlayer);
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
        square.addEventListener("click", squareClick);
        grid.appendChild(square);
    }

    //reset values
    currentPlayer = "p1";
    changeDisplay(currentPlayer);
    noWinner = true;
}

init();

const btn = document.querySelector("#reset-btn");
btn.addEventListener("click", init);