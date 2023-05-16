//all boolean virables
const NORMAL_MODE = 'normal';
const COLOR_MODE = 'color';
const BLAKER_MODE ='blacker';
let mode = NORMAL_MODE;


//all the buttons
const button = document.querySelector('.header .inputbutton'); //the clear button
const NMbut = document.querySelector('#normalButton');
const CLbut = document.querySelector('#colorButton');
const BLbut = document.querySelector('#blackerButton');

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
    createGrid(gridInput.value);
});
CLbut.addEventListener('click', () => {
    mode = COLOR_MODE;
    createGrid(gridInput.value);
});
BLbut.addEventListener('click', () => mode = BLAKER_MODE);

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
function createGrid(gridNumber) {

    if (gridNumber < 1) gridNumber = 1;
    if (gridNumber > 100) gridNumber = 100;
    gridNumber = Math.floor(gridNumber);

    board.style.gridTemplateColumns = `repeat(${gridNumber}, 1fr)`
    board.style.gridTemplateRows = `repeat(${gridNumber}, 1fr)`

    board.innerHTML = '';
    if (mode == NORMAL_MODE) {
        for (let i = 0; i < gridNumber*gridNumber; i++) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('boardsquare');
            gridItem.addEventListener('mouseover', function() {
                if (mouseDown) {
                    gridItem.classList.add('pixelizedsquare');
                }
                
            });
            gridItem.addEventListener('mousedown', function() {
                gridItem.classList.add('pixelizedsquare');
            });
            board.appendChild(gridItem);
            
        }
    }

    else if (mode == COLOR_MODE) {
        for (let i = 0; i < gridNumber*gridNumber; i++) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('boardsquare');
            gridItem.addEventListener('mouseover', function() {
                if (mouseDown) {
                    gridItem.style.backgroundColor = `${getRandomRGB()}`;
                }
                
            });
            gridItem.addEventListener('mousedown', function() {
                gridItem.style.backgroundColor = `${getRandomRGB()}`;
            });
            board.appendChild(gridItem);
            
        }
    }
    else if (mode == BLAKER_MODE) {}
    
}

//show the dimension of the gridboard to the screen
const text = document.querySelector('#gridNumberText');
gridInput.addEventListener('input', function() {
    console.log(gridInput.value);
    text.textContent = `x${gridInput.value}`;
})

//the clear button
button.addEventListener('click', function() {
    createGrid(gridInput.value);
})




//generate the defaults
createGrid(gridInput.value);
text.textContent = `${gridInput.value} x ${gridInput.value}`;