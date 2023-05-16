
//the clear button
const button = document.querySelector('.header .button');
//the input slider
let gridInput = document.querySelector('.gridNumber');

let board = document.querySelector('.board');

//assign createGrid function to the input slider
gridInput.addEventListener('input', function() {
    createGrid(Number(gridInput.value));
});

//check if the mouse is pressed
let mouseDown = false;
document.body.addEventListener('mousedown', () => {
    mouseDown = true;
})
document.body.addEventListener('mouseup', () => {
    mouseDown = false;
})


//function to create the grid board
function createGrid(gridNumber) {

    if (gridNumber < 1) gridNumber = 1;
    if (gridNumber > 100) gridNumber = 100;
    gridNumber = Math.floor(gridNumber);

    board.style.gridTemplateColumns = `repeat(${gridNumber}, 1fr)`
    board.style.gridTemplateRows = `repeat(${gridNumber}, 1fr)`

    board.innerHTML = '';
    for (let i = 0; i < gridNumber*gridNumber; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('boardsquare');
        gridItem.addEventListener('mousemove', function() {
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

//show the dimension of the gridboard to the screen
const text = document.querySelector('#gridNumberText');
gridInput.addEventListener('input', function() {
    console.log(gridInput.value);
    text.textContent = `x${gridInput.value}`;
})

//the clear button
button.addEventListener('click', function() {
    const gridboard = document.querySelectorAll('.pixelizedsquare');
    gridboard.forEach((e) => {
        e.classList.remove('pixelizedsquare');
    })
})

