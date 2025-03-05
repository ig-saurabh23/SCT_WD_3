const cells = document.querySelectorAll('.cell');
const resetBtn = document.querySelector('.reset-btn');
const statusText = document.getElementById('status');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(event) {
  const cellIndex = event.target.getAttribute('data-cell');

  if (gameBoard[cellIndex] || !gameActive) return;

  gameBoard[cellIndex] = currentPlayer;
  event.target.textContent = currentPlayer;

  if (checkWinner()) {
    gameActive = false;
    statusText.textContent = `Player ${currentPlayer} Wins!`;
  } else if (gameBoard.every(cell => cell !== '')) {
    gameActive = false;
    statusText.textContent = 'It\'s a Draw!';
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function checkWinner() {
  return winningConditions.some(condition => {
    const [a, b, c] = condition;
    return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
  });
}

function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s Turn`;

  cells.forEach(cell => {
    cell.textContent = '';
  });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
