const boxes = document.querySelectorAll(".box");
const gameStatus = document.querySelector(".game-status");
const newGameBtn = document.querySelector(".new-game");
const buttonText = document.getElementsByTagName("button-text");

let currentPlayer;
let filledPositions;

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function startGame() {
  currentPlayer = "X";
  filledPositions = ["", "", "", "", "", "", "", "", ""];
  newGameBtn.classList.remove("activate");
  gameStatus.innerText = `Current Player - ${currentPlayer}`;
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    box.classList = `box box${index + 1}`;
  });
  newGameBtn.classList.remove("activate");
  gameStatus.innerText = `Current Player - ${currentPlayer}`;
}

startGame();

function checkWinner() {
  let winnerPlayer = ""; //
  winningPositions.forEach((position) => {
    if (
      filledPositions[position[0]] !== "" &&
      filledPositions[position[1]] !== "" &&
      filledPositions[position[2]] !== "" &&
      filledPositions[position[0]] === filledPositions[position[1]] &&
      filledPositions[position[0]] === filledPositions[position[2]]
    ) {
      if (filledPositions[position[0]] === "X") winnerPlayer = "X";
      else winnerPlayer = "O";

      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      boxes[position[0]].classList.add("winner"); //
      boxes[position[1]].classList.add("winner");
      boxes[position[2]].classList.add("winner");
    }
  });

  if (winnerPlayer !== "") {
    gameStatus.innerText = `Winner Player - ${winnerPlayer}`;
    newGameBtn.classList.add("activate");
    return;
  }

  let countFilled = 0;
  filledPositions.forEach((box) => {
    if (box !== "") countFilled++;
  });
  if (countFilled === 9) {
    gameStatus.innerText = "Game Tied !";
    newGameBtn.classList.add("activate");
  }
}

function swapPlayerTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  gameStatus.innerText = `Current Player - ${currentPlayer}`;
}

function clickedPosition(index) {
  if (filledPositions[index] === "") {
    boxes[index].innerText = currentPlayer;
    filledPositions[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    swapPlayerTurn();
    checkWinner(); //
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    clickedPosition(index); //
  });
});

newGameBtn.addEventListener("click", startGame);
