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
  let nullFound = false;

  while (!row) {
    let randomRow = Math.floor(Math.random() * 3);
    let randomCol = Math.floor(Math.random() * 3);

    if (board[randomRow][randomCol] == null) {
      row = randomRow;
      col = randomCol;
      nullFound = true;
    }

    // Break out of the loop if no more null values are available
    if (!nullFound && checkIfAllCellsFilled()) {
      break;
    }
  }

  if (!row) {
    return null; // Return null if no empty cell is found
  }

  return [row, col];
}

function checkIfAllCellsFilled() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === null) {
        return false; // Found at least one empty cell, return false
      }
    }
  }

  return true; // All cells are filled, return true
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

    const randomIndex = getRandomEmptyCell();

    console.log(randomIndex);

    setTimeout(function () {
      let [row, col] = getRandomEmptyCell();
      let cell = document.querySelector(
        `[data-row="${row}"][data-col="${col}"]`
      );
      showO(cell);
    }, 1000);
  });
});

// gridItems.forEach((item) => {
//   item.addEventListener("click", (event) => {
//     showX(event);
//     console.log("Cell clicked");

//     const randomIndex = getRandomEmptyCell();

//     if (randomIndex === "draw") {
//       alert("Draw");
//       return;
//     }

//     console.log(randomIndex);

//     setTimeout(function () {
//       let [row, col] = randomIndex;
//       let cell = document.querySelector(
//         `[data-row="${row}"][data-col="${col}"]`
//       );
//       showO(cell);

//       const result = checkResult();
//       if (result !== null) {
//         alert(result);
//       }
//     }, 1000);
//   });
// });

function playNewGame() {
  const grid = document.querySelector(".grid-container");
  const appendedImages = document.querySelectorAll(".appendedImg");
  appendedImages.forEach((img) => img.remove());
}

const playAgainBtn = document
  .getElementById("playAgain")
  .addEventListener("click", playNewGame);

//
