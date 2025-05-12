const cellElements = document.querySelectorAll("[data-cell]");
const cellsElement = document.querySelector(".cells");
const player1Score = document.querySelector(".player1Score");
const player2Score = document.querySelector(".player2Score");
const player1 = document.querySelector(".p1");
const player2 = document.querySelector(".p2");
const restartButton = document.querySelector(".restartButton");
const drawText = document.querySelector(".draw");

const x_class = "x";
const circle_class = "circle";
let circleTurn;

startGame();
function startGame() {
  circleTurn = true;
  changeTurn();
  cellElements.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
  });
  setCellsHover();
}
function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? circle_class : x_class;
  placeMark(cell, currentClass);
  changeTurn();
  setCellsHover();
  if (checkWinner(currentClass)) {
    changeScore(circleTurn);
    clearCells();
  } else if (isDraw()) {
    drawText.style.display = "flex";
    drawText.classList.add("slide-in");
    setTimeout(() => {
      drawText.classList.remove("slide-in");
    }, 700);
    setTimeout(() => {
      drawText.classList.add("slide-out");
    }, 1300);
    setTimeout(() => {
      drawText.classList.remove("slide-out");
    }, 2500);
    setTimeout(() => {
      drawText.style.display = "none";
    }, 2500);
    clearCells();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function changeTurn() {
  circleTurn = !circleTurn;
  player2.style.color = "rgb(39, 53, 74)";
  player1.style.color = "rgb(39, 53, 74)";
  if (circleTurn) {
    player2.style.color = "rgb(85, 116, 163)";
  } else {
    player1.style.color = "rgb(85, 116, 163)";
  }
}

function setCellsHover() {
  cellsElement.classList.remove(x_class);
  cellsElement.classList.remove(circle_class);
  if (circleTurn) {
    cellsElement.classList.add(circle_class);
  } else {
    cellsElement.classList.add(x_class);
  }
}

function checkWinner(currentClass) {
  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(x_class) || cell.classList.contains(circle_class)
    );
  });
}
let p1Color = { r: 39, g: 53, b: 74 };
let p2Color = { r: 39, g: 53, b: 74 };
function brightenColor(color) {
  const brightenFactor = 0.2;
  return {
    r: Math.min(Math.round(color.r - (255 - color.r) * brightenFactor), 0),
    g: Math.min(Math.round(color.g + (255 - color.g) * brightenFactor), 250),
    b: Math.min(Math.round(color.b + (255 - color.b) * brightenFactor), 200),
  };
}

function changeScore(circleTurn) {
  if (circleTurn) {
    player1Score.innerHTML++;
    p1Color = brightenColor(p1Color);
    player1Score.style.color = `rgb(${p1Color.r}, ${p1Color.g}, ${p1Color.b})`;
  } else {
    player2Score.innerHTML++;
    p2Color = brightenColor(p2Color);
    player2Score.style.color = `rgb(${p2Color.r}, ${p2Color.g}, ${p2Color.b})`;
  }
}

function clearCells() {
  cellElements.forEach((cell) => {
    cell.classList.remove(x_class);
    cell.classList.remove(circle_class);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
}

restartButton.addEventListener("click", () => {
  clearCells();
  let p1Color = { r: 39, g: 53, b: 74 };
  let p2Color = { r: 39, g: 53, b: 74 };
  player1Score.innerHTML = 0;
  player1Score.style.color = `rgb(${p1Color.r}, ${p1Color.g}, ${p1Color.b})`;
  player2Score.innerHTML = 0;
  player2Score.style.color = `rgb(${p2Color.r}, ${p2Color.g}, ${p2Color.b})`;
});
