//all boolean virables
const NORMAL_MODE = 'normal';
const COLOR_MODE = 'color';
const BLAKER_MODE = 'blacker';
const ERASER_MODE = 'eraser';
let mode = NORMAL_MODE;
let mouseDown = false;
let gridMode = true;


//all the buttons
const button = document.querySelector('.header .inputbutton'); //the clear button
const NMbut = document.querySelector('#normalButton');
const CLbut = document.querySelector('#colorButton');
const ERSbut = document.querySelector('#eraserButton');
const GRDbut = document.querySelector('#gridButton');

//the input slider
let gridInput = document.querySelector('.gridNumber');

let board = document.querySelector('.board');

//assign createGrid function to the input slider
gridInput.addEventListener('input', function() {
    createGrid(gridInput.value);
});

//assign mode when panel's buttons are pressed
NMbut.addEventListener('click', () => {
    mode = NORMAL_MODE;
    NMbut.style.backgroundColor = 'rgb(200, 196, 238)';
    CLbut.style.backgroundColor = 'white';
    ERSbut.style.backgroundColor = 'white';
});
CLbut.addEventListener('click', () => {
    mode = COLOR_MODE;
    NMbut.style.backgroundColor = 'white';
    CLbut.style.backgroundColor = 'rgb(200, 196, 238)';
    ERSbut.style.backgroundColor = 'white';
});
ERSbut.addEventListener('click', () => {
    mode = ERASER_MODE;
    NMbut.style.backgroundColor = 'white';
    CLbut.style.backgroundColor = 'white';
    ERSbut.style.backgroundColor = 'rgb(200, 196, 238)';
});
GRDbut.addEventListener('click', () => {
    if (gridMode) {
        gridMode = false;
        GRDbut.style.backgroundColor = 'white';
        const tmpBoard = document.querySelectorAll('.boardsquare');
        tmpBoard.forEach((e) => { 
            e.style.border = 'none';
        });
    }
    else {
        gridMode = true;
        GRDbut.style.backgroundColor = '#dbbc66';
        const tmpBoard = document.querySelectorAll('.boardsquare');
        tmpBoard.forEach((e) => { 
            e.style.border = '#ddd solid 0.1px';
        });
    }
    
});


//check if the mouse is pressed

document.body.addEventListener('mousedown', () => {
    mouseDown = true;
})
document.body.addEventListener('mouseup', () => {
    mouseDown = false;
})

//function to return random color
function getRandomRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

//function to create the grid board
function painting(node) {
    if (mode == NORMAL_MODE) normalPen(node);
    else if (mode == COLOR_MODE) colorPen(node);
    else if (mode == BLAKER_MODE) blackerPen(node);
    else if (mode == ERASER_MODE) eraserPen(node);
}
function normalPen(node) {
    const color = document.querySelector('#paintingColor');
    node.style.backgroundColor = `${color.value}`;
}
function colorPen(node) {
    node.style.backgroundColor = `${getRandomRGB()}`;
}
function blackerPen(node) {
    node.style.backgroundColor = 'white';
};
function eraserPen(node) {
    node.style.backgroundColor = 'white';
}

function createGrid(gridNumber) {

    board.style.gridTemplateColumns = `repeat(${gridNumber}, 1fr)`
    board.style.gridTemplateRows = `repeat(${gridNumber}, 1fr)`

    board.innerHTML = '';
    for (let i = 0; i < gridNumber*gridNumber; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('boardsquare');
        gridItem.addEventListener('mouseover', () => {
            if(mouseDown) painting(gridItem);
        });
        gridItem.addEventListener('mousedown', () => painting(gridItem));
        board.appendChild(gridItem);
    }
    
}

//show the dimension of the gridboard to the screen
const text = document.querySelector('#gridNumberText');
gridInput.addEventListener('input', function() {
    console.log(gridInput.value);
    text.textContent = `${gridInput.value}x${gridInput.value}`;
})

//the clear button
button.addEventListener('click', function() {
    createGrid(gridInput.value);
})

//generate the defaults
createGrid(gridInput.value);
text.textContent = `${gridInput.value}x${gridInput.value}`;
NMbut.click();