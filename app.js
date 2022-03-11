const root = document.documentElement;
const grid = document.querySelector("#grid");
const p1score = document.querySelector("#p1--score");
const p2score = document.querySelector("#p2--score");

const p1_name = document.getElementById("p1--name");
const p2_name = document.getElementById("p2--name");
const edit_p1_button = document.getElementById("edit-p1-button");
const edit_p2_button = document.getElementById("edit-p2-button");

let p1wins = 0;
let p2wins = 0;
let currentPlayer = "p1";
let noWinner = true;


edit_p1_button.addEventListener("click", editOrSaveP1);
function editOrSaveP1(){
    if (edit_p1_button.innerText === "Edit Name"){
        p1_name.contentEditable = true;
        edit_p1_button.innerText = "Save";
        p1_name.style.backgroundColor = "#333333";
    } else {
        p1_name.contentEditable = false;
        root.style.setProperty('--p1-name', '"' + p1_name.innerText + '"');
        edit_p1_button.innerText = "Edit Name";
        p1_name.style.backgroundColor = "black";
    }
}

edit_p2_button.addEventListener("click", editOrSaveP2);
function editOrSaveP2(){
    if (edit_p2_button.innerText === "Edit Name"){
        p2_name.contentEditable = true;
        edit_p2_button.innerText = "Save";
        p2_name.style.backgroundColor = "#333333";
    } else {
        p2_name.contentEditable = false;
        root.style.setProperty('--p2-name', '"' + p2_name.innerText + '"');
        edit_p2_button.innerText = "Edit Name";
        p2_name.style.backgroundColor = "black";
    }
}


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

const changeDisplay = (addClass) => {
    const display = document.querySelector("#turn-display");
    display.className = "";
    display.classList.add(addClass);
}

const checkWin = (player) => {
    const squares = grid.children;
    const markPosition = [];
    for (const square of squares) {
        if (square.className == player) {
            markPosition.push(1);
        } else {
            markPosition.push(0);
        }
    }
    for (w of winningArrays) {
        if (markPosition[w[0]] && markPosition[w[1]] && markPosition[w[2]]) {
            for (let i = 0; i < 3; i++) {
                squares[w[i]].classList.add("square--win");
            }
            return true;
        }
    }
    return false;
}

const givePoint = (player) => {
    if (player == "p1") {
        p1score.innerText = ++p1wins;
    }
    if (player == "p2") {
        p2score.innerText = ++p2wins;
    }
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
    for (let i = 0; i < 9; i++) {
        const square = document.createElement("div");
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