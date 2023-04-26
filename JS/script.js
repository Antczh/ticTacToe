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

function showX(event) {
  const cell = event.target;
  const imgX = document.createElement("img");
  imgX.src = "fontawesome-free-6.3.0-web/svgs/solid/x-solid.svg";
  cell.appendChild(imgX);
}

gridItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    showX(event);
    console.log("Cell clicked");
  });
});

function showO() {}
