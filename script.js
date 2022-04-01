// Initialise basic constants
const INITIALGRIDWIDTH = 500;
const INITIALBOXSIZE = 50;
const INITIALGRIDSIZE = 10;

const body = document.querySelector('body');
const slider = document.querySelector('.slider');
const grid = document.querySelector('.grid');
const sizeValue = document.querySelector('.sizeValue');
const eraserBtn = document.querySelector('.eraserBtn');
const clearBtn = document.querySelector('.clearBtn');

const gridWidth = INITIALGRIDWIDTH;
let boxSize = INITIALBOXSIZE;
let arrBox = [];
let mousedownToggle = false;
let eraseToggle = false;
slider.onchange = () => createNew(slider.value);
slider.oninput = () => sizeValue.textContent = `Grid Size: ${slider.value} x ${slider.value}`;
grid.setAttribute('style',
    `grid-template-rows: repeat(${INITIALGRIDSIZE}, ${INITIALBOXSIZE}px);
    grid-template-columns: repeat(${INITIALGRIDSIZE}, ${INITIALBOXSIZE}px);`);
body.addEventListener('mousedown', mouseDown, true);
body.addEventListener('mouseup', mouseUp);
eraserBtn.addEventListener('click', toggleErase);
eraserBtn.addEventListener('mouseenter', buttonHover);
eraserBtn.addEventListener('mouseleave', buttonHover);
clearBtn.addEventListener('click', clearAll)
clearBtn.addEventListener('mouseenter', buttonHover);
clearBtn.addEventListener('mouseleave', buttonHover);

createInitial();

// Creating initial grid
function createInitial(){
    for(let i=0; i<100; i++){
        arrBox[i] = document.createElement('div');
        arrBox[i].classList.add('box');
        arrBox[i].setAttribute('style', `height: ${boxSize}px; width: ${boxSize}px; user-select:none;`);
        arrBox[i].addEventListener('mouseover', hoverColourAdd); 
        arrBox[i].addEventListener('mousedown', hoverColourAdd); 
        arrBox[i].addEventListener('transitionend', hoverColourRemove);
        
        grid.appendChild(arrBox[i]);
    }
}

// Updating grid
function createNew(gridSize){
    boxSize = gridWidth/gridSize; // Calculating width of each Box
    grid.innerHTML = ''; // Clearing previous grid
    arrBox = [];  // Clearing previous array of boxes
    grid.setAttribute('style',
    `grid-template-rows: repeat(${gridSize}, ${boxSize}px);
    grid-template-columns: repeat(${gridSize}, ${boxSize}px);`);
    
    for(let i=0; i<gridSize**2; i++){
        arrBox[i] = document.createElement('div');
        arrBox[i].classList.add('box');
        arrBox[i].setAttribute('style', `height: ${boxSize}px; width: ${boxSize}px; user-select:none;`);
        arrBox[i].addEventListener('mouseover', hoverColourAdd); 
        arrBox[i].addEventListener('transitionend', hoverColourRemove);
        
        grid.appendChild(arrBox[i]);
    }
};

// adds colour when you hover over box
function hoverColourAdd(e){
    if(!this.classList.contains('boxColourChange') && !eraseToggle) this.classList.add('boxHover');
    if(mousedownToggle && !eraseToggle) colourAdd(this); // Adding colour if the mouse is over div, is held down and eraseToggle=true
    else if(mousedownToggle && eraseToggle) colourRemove(this); // Removing colour if the mouse is over div, is held down and eraseToggle=false
}

// removes colour when you hover away from box
function hoverColourRemove(e){
    this.classList.remove('boxHover');
}

function mouseDown(){
    mousedownToggle = true;
    
}
function mouseUp(){
    mousedownToggle = false;
    
}
function colourAdd(box){
    box.classList.add('boxColourChange');
}

function colourRemove(box){
    box.classList.remove('boxColourChange');
}

function toggleErase(){
    if(eraseToggle){
        eraseToggle = false;
        eraserBtn.textContent = 'Eraser: Off';
    } 
    else {
        eraserBtn.textContent = 'Eraser: On';
        eraseToggle = true;
    }
}

function clearAll(){
    createNew(slider.value);
}

// Changes size of div while hovering over with mouse
function buttonHover(){
    this.classList.toggle('buttonHover');
}