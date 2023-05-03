const winnerCombos = [
  [box1, box2, box3],
  [box4, box5, box6],
  [box7, box8, box9],
  [box1, box4, box7],
  [box2, box5, box8],
  [box3, box6, box9],
  [box1, box5, box9],
  [box3, box5, box7],
];

const gridItems = document.querySelectorAll(".gridBox");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function showX(event) {
  const cell = event.target;
  const imgX = document.createElement("img");
  imgX.src = "fontawesome-free-6.3.0-web/svgs/solid/x-solid.svg";
  imgX.classList.add("x-image");
  imgX.classList.add("appendedImg");
  cell.appendChild(imgX);
}

function showO(cell) {
  const imgO = document.createElement("img");
  imgO.src = "fontawesome-free-6.3.0-web/svgs/solid/o-solid.svg";
  imgO.classList.add("o-image");
  imgO.classList.add("appendedImg");
  cell.appendChild(imgO);
}

gridItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    showX(event);
    console.log("Cell clicked");
    // computer's move - generate random cell index
    const randomIndex = getRandomInt(gridItems.length);
    showO(gridItems[randomIndex]);
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
