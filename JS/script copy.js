// const winnerCombos = [
//   [box1, box2, box3],
//   [box4, box5, box6],
//   [box7, box8, box9],
//   [box1, box4, box7],
//   [box2, box5, box8],
//   [box3, box6, box9],
//   [box1, box5, box9],
//   [box3, box5, box7],
// ];

const board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const gridItems = document.querySelectorAll(".gridBox");

function getRandomEmptyCell(max) {
  let row, col;
  while (!row) {
    let randomRow = Math.floor(Math.random() * 2);
    let randomCol = Math.floor(Math.random() * 2);

    if (board[randomRow][randomCol] == null) {
      row = randomRow;
      col = randomCol;
    }
  }

  return [row, col];
}

function showX(event) {
  const cell = event.target;
  const imgX = document.createElement("img");
  imgX.src = "fontawesome-free-6.3.0-web/svgs/solid/x-solid.svg";
  imgX.classList.add("x-image");
  imgX.classList.add("appendedImg");
  cell.appendChild(imgX);

  board[cell.getAttribute("data-row")][cell.getAttribute("data-col")] = "X";
  console.log(board);
}

function showO(cell) {
  const imgO = document.createElement("img");
  imgO.src = "fontawesome-free-6.3.0-web/svgs/solid/o-solid.svg";
  imgO.classList.add("o-image");
  imgO.classList.add("appendedImg");
  cell.appendChild(imgO);

  board[cell.getAttribute("data-row")][cell.getAttribute("data-col")] = "O";
  console.log(board);
}

gridItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    showX(event);
    console.log("Cell clicked");

    const randomIndex = getRandomEmptyCell(gridItems.length);
    // won't need gridItems.length

    console.log(randomIndex);
    setTimeout(function () {
      let cell = document.querySelector("[data-row=0][data-col=0]");
      showO(gridItems[randomIndex]);
    }, 1000);
  });
});

function playNewGame() {
  const grid = document.querySelector(".grid-container");
  const appendedImages = document.querySelectorAll(".appendedImg");
  appendedImages.forEach((img) => img.remove());
}

const playAgainBtn = document
  .getElementById("playAgain")
  .addEventListener("click", playNewGame);

//
