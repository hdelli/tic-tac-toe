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
        // root.style.setProperty("--p1-name", p1_name.innerText); 
        p1_name.contentEditable = false;
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
            for (const square of squares) {
                if (square.getAttribute("id") == winningArray[0]){
                    square.style.backgroundColor = "grey";
                }
                if (square.getAttribute("id") == winningArray[1]){
                    square.style.backgroundColor = "grey";
                }
                if (square.getAttribute("id") == winningArray[2]){
                    square.style.backgroundColor = "grey";
                }
            }
            // get squares in those positions and change background colour
            return true;
        }
    }
    return false;

    // go through each of the winning arrays
    // check if those particular positions in the playerSquareArray are all equal to eachother

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
    for (let i = 0; i < 9; i++) {
        const square = document.createElement("div");
        square.setAttribute("id",i);
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





// function init () {
// 	// Attach the mousemove event handler
// 	canvas.addEventListener('mousemove', ev_mousemove, false);
// }

// // The mousemove event handler
// var started = false;
// function ev_mousemove (ev) {
// 	var x, y;

// 	// Get the mouse position relative to the <canvas> element
// 	if (ev.layerX || ev.layerX == 0) { // Firefox
// 		x = ev.layerX;
// 		y = ev.layerY;
// 	} else if (ev.offsetX || ev.offsetX == 0) { // Opera
// 		x = ev.offsetX;
// 		y = ev.offsetY;
// 	}

// 	// The event handler works like a drawing pencil which
// 	// tracks the mouse movements. We start drawing a path made up of lines
// 	if (!started) {
// 		context.beginPath();
// 		context.moveTo(x, y);
// 		started = true;
// 	} else {
// 		context.lineTo(x, y);
// 		context.stroke();
// 	}
// }


const paintCanvas = document.querySelector( '.js-paint' );
const context = paintCanvas.getContext( '2d' );
context.lineCap = 'round';

const colorPicker = document.querySelector( '.js-color-picker');

colorPicker.addEventListener( 'change', event => {
    context.strokeStyle = event.target.value; 
} );

const lineWidthRange = document.querySelector( '.js-line-range' );
const lineWidthLabel = document.querySelector( '.js-range-value' );

lineWidthRange.addEventListener( 'input', event => {
    const width = event.target.value;
    lineWidthLabel.innerHTML = width;
    context.lineWidth = width;
} );

let x = 0, y = 0;
let isMouseDown = false;

const stopDrawing = () => { isMouseDown = false; }
const startDrawing = event => {
    isMouseDown = true;   
   [x, y] = [event.offsetX, event.offsetY];  
}
const drawLine = event => {
    if ( isMouseDown ) {
        const newX = event.offsetX;
        const newY = event.offsetY;
        context.beginPath();
        context.moveTo( x, y );
        context.lineTo( newX, newY );
        context.stroke();
        //[x, y] = [newX, newY];
        x = newX;
        y = newY;
    }
}

paintCanvas.addEventListener( 'mousedown', startDrawing );
paintCanvas.addEventListener( 'mousemove', drawLine );
paintCanvas.addEventListener( 'mouseup', stopDrawing );
paintCanvas.addEventListener( 'mouseout', stopDrawing );













// const paintCanvas = document.querySelector( '.js-paint' );
// const context = paintCanvas.getContext( '2d' );


//         let x = 0, y = 0;
//         let isMouseDown = false;
        
//         const stopDrawing = () => { isMouseDown = false; }
//         const startDrawing = event => {
//             isMouseDown = true;   
//            [x, y] = [event.offsetX, event.offsetY];  
//         }
//         const drawLine = event => {
//             if ( isMouseDown ) {
//                 const newX = event.offsetX;
//                 const newY = event.offsetY;
//                 context.beginPath();
//                 context.moveTo( x, y );
//                 context.lineTo( newX, newY );
//                 context.stroke();
//                 //[x, y] = [newX, newY];
//                 x = newX;
//                 y = newY;
//             }
//         }
        
//         paintCanvas.addEventListener( 'mousedown', startDrawing );
//         paintCanvas.addEventListener( 'mousemove', drawLine );
//         paintCanvas.addEventListener( 'mouseup', stopDrawing );
//         paintCanvas.addEventListener( 'mouseout', stopDrawing );

