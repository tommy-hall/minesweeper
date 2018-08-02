document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
  /*var board = {
    cells: [
      {row:0,col:0,isMine:false,hidden:true},
      {row:0,col:1,isMine:false,hidden:true},
      {row:0,col:2,isMine:true,hidden:true},
      {row:1,col:0,isMine:false,hidden:true},
      {row:1,col:1,isMine:false,hidden:true},
      {row:1,col:2,isMine:true,hidden:true},
      {row:2,col:0,isMine:false,hidden:true},
      {row:2,col:1,isMine:true,hidden:true},
      {row:2,col:2,isMine:false,hidden:true},
      {row:0,col:3,isMine:false,hidden:true},
      {row:1,col:3,isMine:false,hidden:true},
      {row:2,col:3,isMine:true,hidden:true},
      {row:3,col:0,isMine:false,hidden:true},
      {row:3,col:1,isMine:true,hidden:true},
      {row:3,col:2,isMine:false,hidden:true},
      {row:3,col:3,isMine:false,hidden:true}
    ]\
  };
*/
/* 
Define your 'board' here! - This is a shorter way to do it. 
Instead of typing out the global board object, write a function to create it.
Each cell will need row, col, isMine, isMarked and hidden properties.
You could start by simply setting every isMine to true, but later you'll 
probably want to have a random number of mines scattered throughout the board. 
*/

// Define your `board` object here!
let gridSize = 4;
var cellNumber = 0;
var board = {cells: []};
var mineArray = [];

// Construst a random pool of 25% mines
function randomiseMines (){
  let mineCount = 0;
  for (let i = 0; i < (gridSize*gridSize); i++){
    if(mineCount < ((gridSize*gridSize) / 4)){
      if ((Math.floor(Math.random()*10)) > 3){
        mineArray.push(0);
      } else {
        mineArray.push(1);
        mineCount++;
      }
    } else {
      mineArray.push(0);
    }
  }
}


// Build the game board
function buildBoard (howLarge) {
  for (let i = 0; i < howLarge; i++){
    for (let j = 0; j < howLarge; j++){
      board.cells.push({row: i, col: j, isMine: mineArray[cellNumber], hidden: true})
      cellNumber++;
    }
  }
}




function startGame () {
  randomiseMines();
  buildBoard(gridSize);
  // Don't remove this function call: it makes the game work!
  for (let i = 0; i < board.cells.length; i++){
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }
  lib.initBoard()
  document.addEventListener("click", checkForWin)
  document.addEventListener("contextmenu", checkForWin)
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  for (let i = 0; i < board.cells.length; i++){
  if(board.cells[i].isMine==false && board.cells[i].hidden==true){
  return
  }
  if(board.cells[i].isMine==true && !board.cells[i].hasOwnProperty('isMarked')){
  return
  }
 }
lib.displayMessage('You win!');
var audioWin = document.getElementById("win");
audioWin.play();
}


  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')


// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  let count = 0;
  for (let i = 0; i < surrounding.length; i++){
    if(surrounding[i].isMine==true){count++}
  }
  return count;
}



// Function to reset the game
function resetGame() {
  document.getElementsByClassName("board")[0].innerHTML = "";
  board = {cells: []};
  mineArray = [];
  cellNumber = 0;
  //var cellNumber = 0;
  startGame();
}


