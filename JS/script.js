const gridItems = document.querySelectorAll(".grid-item");

gridItems.forEach((item) => {
  item.addEventListener("click", () => {
    console.log("Cell clicked");
  });
});

function showX() {}

function showO() {}
