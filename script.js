const body = document.body;
const statusDisplay = document.querySelector('.game-status');
const container = document.querySelector('.game-container');
const restart = document.querySelector('.game-restart');
let result = '';
let count = 1;

const audio = new Audio();


const winningConditions = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6]
];

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const currentPlayerTurn = () => `Сейчас ходит игрок ${currentPlayer}`;

statusDisplay.innerHTML = currentPlayerTurn();

function handleCellClick(event) {
   const clickedCell = event.target;
   const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index')); // getAttribute  возвращает значение указанного атрибута элемента
   if (gameState[clickedCellIndex] !== "" || !gameActive) {
      return;
   }
   gameState[clickedCellIndex] = currentPlayer;
   clickedCell.innerHTML = currentPlayer;
   ResultValidation();
   clickedCell.style = "background-color: #ccc"
}
function ResultValidation() {
   let roundWon = false;
   for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      let a = gameState[winCondition[0]];
      let b = gameState[winCondition[1]];
      let c = gameState[winCondition[2]];
      if (a === '' || b === '' || c === '') {
         continue;
      }
      if (a === b && b === c) {
         roundWon = true;
         break
      }
   }
   if (roundWon) {
      audio.src = "./assets/audio/gta-san-andreas-missiya-vypolnena.mp3";
      audio.play();
      statusDisplay.innerHTML = `Победили ${result}! Количество ходов ${count}`;
      gameActive = false;
      return;
   }
   let roundDraw = !gameState.includes("");
   if (roundDraw) {
      audio.src = "./assets/audio/eralash-shutka-minutka.mp3";
      audio.play();
      statusDisplay.innerHTML = `Игра закончилась вничью! Количество ходов ${count}`;
      gameActive = false;
      return;
   }
   PlayerChange();
}

function PlayerChange() {
   if (currentPlayer === "X") {
      currentPlayer = "O";
      result = 'нолики';
   } else {
      currentPlayer = "X";
      result = 'крестики'
   }
   statusDisplay.innerHTML = currentPlayerTurn();
   count++;
}

// function RestartGame() {
//    count = 1;
//    gameActive = true;
//    currentPlayer = "X";
//    gameState = ["", "", "", "", "", "", "", "", ""];
//    statusDisplay.innerHTML = currentPlayerTurn();
//    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
// }
container.addEventListener('click', handleCellClick);
restart.addEventListener('click', () => location.reload()); // location.reload() перезагурузка страницы 
