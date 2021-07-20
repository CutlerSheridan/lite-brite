const gridContainer = document.querySelector(".grid-container");
let reset = false;
let pegBase = 10;

createGrid();
const resetButton = document.querySelector("#reset-button");
resetButton.addEventListener("click", clearBoard);

// LOGIC FUNCTIONS START
function createGrid() {
    const totalPegs = pegBase * pegBase;
    for (let i = 0; i < totalPegs; i++) {
        const cell = document.createElement("div");
        cell.classList.add("peg-hole");
        gridContainer.appendChild(cell);
    }
    gridContainer.style.gridTemplate = `repeat(${pegBase}, 1fr) / repeat(${pegBase}, 1fr)`;
    toggleListenersOnHoles();
}

function toggleListenersOnHoles() {
    const pegHoles = document.querySelectorAll(".peg-hole");
    if (reset) {
        pegHoles.forEach(peg => {
            peg.classList.remove("peg-lit");
            peg.classList.remove("peg-unlit");
        });
        reset = false;
    } else {
        pegHoles.forEach(peg => {
            peg.addEventListener("mouseenter", insertPeg);
            peg.addEventListener("mouseleave", lightPeg);
        });
    }
}

function insertPeg() {
    this.classList.add("peg-unlit");
}
function lightPeg() {
    this.classList.add("peg-lit");
}

function clearBoard() {
    reset = true;
    toggleListenersOnHoles();
}
// LOGIC FUNCTIONS END

// GENERIC HELPER METHODS
function random(upperBound) {
    return Math.floor(Math.random() * upperBound);
}