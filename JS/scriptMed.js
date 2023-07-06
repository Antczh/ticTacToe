const xWinAlert = document.getElementById("xAlertBox");
const oWinAlert = document.getElementById("oAlertBox");

const winnerCombos = [
    [
        [true, true, true],
        [null, null, null],
        [null, null, null],
    ],
    [
        [null, null, null],
        [true, true, true],
        [null, null, null],
    ],
    [
        [null, null, null],
        [null, null, null],
        [true, true, true],
    ],

    [
        [true, null, null],
        [true, null, null],
        [true, null, null],
    ],
    [
        [null, true, null],
        [null, true, null],
        [null, true, null],
    ],
    [
        [null, null, true],
        [null, null, true],
        [null, null, true],
    ],

    [
        [true, null, null],
        [null, true, null],
        [null, null, true],
    ],
    [
        [null, null, true],
        [null, true, null],
        [true, null, null],
    ],
];

const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

const gridItems = document.querySelectorAll(".gridBox");

function getRandomEmptyCell() {
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

        if (!nullFound && checkIfAllCellsFilled()) {
            break;
        }
    }

    if (!row) {
        return null;
    }

    return [row, col];
}

function checkIfAllCellsFilled() {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === null) {
                return false;
            }
        }
    }

    return true;
}

function showX(event) {
    const cell = event.target;
    const imgX = document.createElement("img");
    imgX.src = "fontawesome-free-6.3.0-web/svgs/solid/x-solid.svg";
    imgX.classList.add("x-image");
    imgX.classList.add("appendedImg");
    cell.appendChild(imgX);

    board[cell.getAttribute("data-row")][cell.getAttribute("data-col")] = "X";
    // console.log(board);

    ONextTurn();
}

function showO(cell) {
    const imgO = document.createElement("img");
    imgO.src = "fontawesome-free-6.3.0-web/svgs/solid/o-solid.svg";
    imgO.classList.add("o-image");
    imgO.classList.add("appendedImg");
    cell.appendChild(imgO);

    board[cell.getAttribute("data-row")][cell.getAttribute("data-col")] = "O";
    // console.log(board);

    ONextTurn();
}

gridItems.forEach((item) => {
    item.addEventListener("click", (event) => {
        if (winnerDecided) {
            return;
        }
        showX(event);
        // console.log("Cell clicked");

        const randomIndex = getRandomEmptyCell();

        console.log(randomIndex);

        setTimeout(function () {
            let [row, col] = getRandomEmptyCell();
            let cell = document.querySelector(
                `[data-row="${row}"][data-col="${col}"]`
            );
            if (winnerDecided) {
                return;
            }

            showO(cell);
        }, 1000);
    });
});

// ----------------------------------------------------------------------------------------------------
let winnerDecided = false;
let winningSymbol = "";

function ONextTurn() {
    let foundEmpty = false;
    let row, col;

    winnerCombos.every(function (winnerCombo) {
        let winningBoxes = [];

        winnerCombo.forEach(function (row, row_index) {
            row.forEach(function (winningBox, col_index) {
                if (winningBox) {
                    let cell = document.querySelector(
                        `[data-row="${row_index}"][data-col="${col_index}"]`
                    );
                    winningBoxes.push(cell.innerHTML);
                    console.log("winningBoxes", winningBoxes);
                }
            });
        });

        if (
            (winningBoxes[0] &&
                winningBoxes[1] === "X" &&
                winningBoxes[2] === null) ||
            (winningBoxes[1] === "X" &&
                winningBoxes[2] === "X" &&
                winningBoxes[0] === null) ||
            (winningBoxes[0] &&
                winningBoxes[2] === "X" &&
                winningBoxes[1] === null)
        ) {
            // Stop "X" from winning by appending "O" to the null value
            winnerCombo.forEach(function (row, row_index) {
                row.forEach(function (winningBox, col_index) {
                    if (winningBox === null) {
                        row = row_index;
                        col = col_index;
                        foundEmpty = true;
                    }
                });
            });

            if (foundEmpty) {
                // Call showO() with the position
                let cell = document.querySelector(
                    `[data-row="${row}"][data-col="${col}"]`
                );
                showO(cell);

                return false; // Exit the every() loop
            }
        } else if (
            (winningBoxes[0] &&
                winningBoxes[1] === "O" &&
                winningBoxes[2] === null) ||
            (winningBoxes[1] === "O" &&
                winningBoxes[2] === "O" &&
                winningBoxes[0] === null) ||
            (winningBoxes[0] &&
                winningBoxes[2] === "O" &&
                winningBoxes[1] === null)
        ) {
            // Append "O" to the null value for potential winning move
            winnerCombo.forEach(function (row, row_index) {
                row.forEach(function (winningBox, col_index) {
                    if (winningBox === null) {
                        row = row_index;
                        col = col_index;
                        foundEmpty = true;
                    }
                });
            });

            if (foundEmpty) {
                // Call showO() with the position
                let cell = document.querySelector(
                    `[data-row="${row}"][data-col="${col}"]`
                );
                showO(cell);

                return false; // Exit the every() loop
            }
        } else if (
            winningBoxes[0] !== "" &&
            winningBoxes[0] === winningBoxes[1] &&
            winningBoxes[1] === winningBoxes[2]
        ) {
            winnerDecided = true;
            winningSymbol =
                winningBoxes[0].search("x-solid.svg") > 0 ? "X" : "O";
            // console.log(winningSymbol + " wins");

            if (winnerDecided) {
                if (winningSymbol === "X") {
                    xWinAlert.style.display = "block";
                } else if (winningSymbol === "O") {
                    oWinAlert.style.display = "block";
                }
            }
            return false;
        }
        return true;
    });
}

// function ONextTurn() {
//     let foundEmpty = false;
//     let row, col;

//     winnerCombos.every(function (winnerCombo) {
//         let winningBoxes = [];

//         winnerCombo.forEach(function (row, row_index) {
//             row.forEach(function (winningBox, col_index) {
//                 if (winningBox) {
//                     let cell = document.querySelector(
//                         `[data-row="${row_index}"][data-col="${col_index}"]`
//                     );
//                     winningBoxes.push(cell.innerHTML);
//                     console.log("winningBoxes", winningBoxes);
//                 }
//             });
//         });

//         if (
//             (winningBoxes[0] &&
//                 winningBoxes[1] === "O" &&
//                 winningBoxes[2] === null) ||
//             (winningBoxes[1] === "O" &&
//                 winningBoxes[2] === "0" &&
//                 winningBoxes[0] === null) ||
//             (winningBoxes[0] &&
//                 winningBoxes[2] === "O" &&
//                 winningBoxes[1] === null)
//         ) {
//             // Append "O" to the null value
//             winnerCombo.forEach(function (row, row_index) {
//                 row.forEach(function (winningBox, col_index) {
//                     if (winningBox === null) {
//                         row = row_index;
//                         col = col_index;
//                         foundEmpty = true;
//                     }
//                 });
//             });

//             if (foundEmpty) {
//                 // Call showO() with the position
//                 let cell = document.querySelector(
//                     `[data-row="${row}"][data-col="${col}"]`
//                 );
//                 showO(cell);

//                 return false; // Exit the every() loop
//             }
//         } else if (
//             winningBoxes[0] !== "" &&
//             winningBoxes[0] === winningBoxes[1] &&
//             winningBoxes[1] === winningBoxes[2]
//         ) {
//             winnerDecided = true;
//             winningSymbol =
//                 winningBoxes[0].search("x-solid.svg") > 0 ? "X" : "O";
//             // console.log(winningSymbol + " wins");

//             if (winnerDecided) {
//                 if (winningSymbol === "X") {
//                     xWinAlert.style.display = "block";
//                 } else if (winningSymbol === "O") {
//                     oWinAlert.style.display = "block";
//                 }
//             }
//             return false;
//         }
//         return true;
//     });
// }

// function ONextTurn() {
//     winnerCombos.every(function (winnerCombo) {
//         let winningBoxes = [];

//         winnerCombo.forEach(function (row, row_index) {
//             row.forEach(function (winningBox, col_index) {
//                 if (winningBox) {
//                     let cell = document.querySelector(
//                         `[data-row="${row_index}"][data-col="${col_index}"]`
//                     );
//                     winningBoxes.push(cell.innerHTML);
//                     console.log("winningBoxes", winningBoxes);
//                 }
//             });
//         });
//         if (
//             (winningBoxes[0] &&
//                 winningBoxes[1] === "O" &&
//                 winningBoxes[2] === null) ||
//             (winningBoxes[1] === "O" &&
//                 winningBoxes[2] === "0" &&
//                 winningBoxes[0] === null) ||
//             (winningBoxes[0] &&
//                 winningBoxes[2] === "O" &&
//                 winningBoxes[1] === null)
//         ) {
//             // do the search

//             winningBoxes[0].search("o-solid.svg") > 0;
//             return [row, col];
//         } else if (
//             winningBoxes[0] !== "" &&
//             winningBoxes[0] === winningBoxes[1] &&
//             winningBoxes[1] === winningBoxes[2]
//         ) {
//             winnerDecided = true;
//             winningSymbol =
//                 winningBoxes[0].search("x-solid.svg") > 0 ? "X" : "O";
//             // console.log(winningSymbol + " wins");

//             if (winnerDecided) {
//                 if (winningSymbol === "X") {
//                     xWinAlert.style.display = "block";
//                 } else if (winningSymbol === "O") {
//                     oWinAlert.style.display = "block";
//                 }
//             }
//             return false;
//         } else {
//             return true;
//         }
//     });
// }

function playNewGame() {
    const grid = document.querySelector(".grid-container");
    const appendedImages = document.querySelectorAll(".appendedImg");
    appendedImages.forEach((img) => img.remove());
    location.reload();
}

const playAgainBtn = document
    .getElementById("playAgain")
    .addEventListener("click", playNewGame);

// If all bottom rows are full it crashes
