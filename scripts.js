let selectedCells = Array(9);
let currentPlayer = "o";
let hasWinner = false;
let isDraw = false;
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const welcomeScreen = document.querySelector(".welcome");
const cells = document.getElementsByClassName("cell");
const statusBarHighlight = document.querySelector(".status_bar_highlight");

const hideWelcomeScreen = () => {
  setTimeout(() => {
    welcomeScreen.classList.add("welcome-hidden");
  }, 1500);
};

const onCellClick = (clickedCell) => {
  if (!hasWinner && !isDraw) {
    const tileNumber = parseInt(clickedCell.classList[1].slice(-1));
    const isEmpty = selectedCells[tileNumber];
    if (!isEmpty) {
      selectedCells[tileNumber] = currentPlayer;
      clickedCell.classList.add(currentPlayer);
      clickedCell.innerHTML = currentPlayer;
      checkWinner(selectedCells);
      togglePlayer();
    }
  }
};

const checkWinner = (selectedCells) => {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (selectedCells[a] && selectedCells[a] === selectedCells[b] && selectedCells[a] === selectedCells[c]) {
      cells[a].classList.add("cell-win");
      cells[b].classList.add("cell-win");
      cells[c].classList.add("cell-win");
      setTimeout(() => {
        alert(`${selectedCells[a]} wins!`);
      }, 0);
      hasWinner = true;
      return;
    }
  }
  checkDraw(selectedCells);
};

const checkDraw = (selectedCells) => {
  if (selectedCells.join("").length === selectedCells.length) {
    setTimeout(() => {
      alert("Draw! Try again.");
    }, 0);
    isDraw = true;
  }
};

const restartGame = () => {
  selectedCells = Array(9);
  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.remove("x", "o", "cell-win");
    cells[i].innerHTML = "";
  }
  currentPlayer = "o";
  hasWinner = false;
  isDraw = false;
  togglePlayer();
};

const togglePlayer = () => {
  currentPlayer = currentPlayer === "x" ? "o" : "x";
  statusBarHighlight.innerHTML = currentPlayer;
  statusBarHighlight.classList.remove("x", "o", "win");
  statusBarHighlight.classList.add(currentPlayer);
};

hideWelcomeScreen();
togglePlayer();
