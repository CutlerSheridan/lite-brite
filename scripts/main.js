const gridContainer = document.querySelector(".grid-container");
let pegBase;
let newPegBase;
let pegHoles;
let litColor = "rgb(255,0,0)";
let unlitColor;
setUnlitColor(litColor);
let partyIsOn = false;
let lightIsOn = true;
let placedPegs = [];
let expanding;


const resetButton = document.querySelector("#reset-button");
resetButton.addEventListener("click", clearBoard);

const randomColorBtn = document.querySelector("#random-color");
randomColorBtn.addEventListener("click", randomizeColor);

const partyBtn = document.querySelector("#party-btn");
partyBtn.addEventListener("click", () => {
    partyIsOn = true;
    const allBtns = document.querySelectorAll(".btn");
    allBtns.forEach(btn => btn.addEventListener("click", endParty));
});

const lightSwitch = document.querySelector("#light-switch");
lightSwitch.addEventListener("click", toggleLight);

const colorPicker = document.getElementById("color-picker")
colorPicker.addEventListener("input", (e) => {
    litColor = `rgb(${convertHexToRgbNums(e.target.value)})`;
    setUnlitColor(litColor);
    endParty();
    console.log(litColor);
});

const slider = document.querySelector(".slider");
pegBase = slider.value;
const gridSizeDisplay = document.querySelector("#grid-size");
gridSizeDisplay.textContent = `${slider.value} x ${slider.value}`;
slider.addEventListener("mouseup", alterGrid);
slider.addEventListener("input", (e) => {document.querySelector("#grid-size").textContent = `${e.target.value} x ${e.target.value}`});

createGrid();

// LOGIC FUNCTIONS START
function createGrid() {
    const totalPegs = pegBase ** 2;
    for (let i = 0; i < totalPegs; i++) {
        createHole(i);
    }
    gridContainer.style.gridTemplate = `repeat(${pegBase}, 1fr) / repeat(${pegBase}, 1fr)`;
    pegHoles = document.querySelectorAll(".peg-hole");
    //addListenersToHoles();
}
function createHole(loc) {
    const peg = document.createElement("div");
    peg.classList.add("peg-hole");
    gridContainer.childNodes[loc].after(peg);
    addListenerToHole(peg);
}

function addListenerToHole(peg) {
        peg.addEventListener("mouseenter", insertPeg, {once: true});
        peg.addEventListener("mouseleave", lightPeg, {once: true});
}

function insertPeg() {
    // conditional so hovering over lit pegs doesn't unlight them
    if (this.classList.contains("peg-lit")) {
        return;
    } else {
        if (partyIsOn) {
            randomizeColor();
        }
        unlight(this);
        placedPegs.push(this);
    }
}
function unlight(peg) {
    peg.style.backgroundColor = unlitColor;
    peg.style.borderColor = unlitColor;
    peg.classList.add("peg-unlit");
    peg.style.boxShadow = "none";
}
function lightPeg() {
    if (lightIsOn) {
        this.classList.remove("peg-unlit");
        this.style.backgroundColor = litColor;
        this.style.borderColor = litColor;
        this.style.boxShadow = `0 0 .8rem .5rem ${litColor}`;
        // if I decide to get rid of the grey circle on the lit pegs, re-add
        // this.style.backgroundClip = "border-box";
        this.classList.add("peg-lit");
    }
}
function light(peg) {
    if (lightIsOn) {
        peg.classList.remove("peg-unlit");
        peg.style.backgroundColor = litColor;
        peg.style.borderColor = litColor;
        peg.style.boxShadow = `0 0 .8rem .5rem ${litColor}`;
        // if I decide to get rid of the grey circle on the lit pegs, re-add
        // this.style.backgroundClip = "border-box";
        peg.classList.add("peg-lit");
    }
}

function alterGrid(e) {
    newPegBase = e.target.value;
    const oldTotalPegs = pegBase ** 2;
    const newTotalPegs = newPegBase ** 2;
    const gridDiff = newPegBase - pegBase;
    expanding = (gridDiff > 0 ? true : false);
    if (newPegBase === pegBase) {
        return;
    }

    gridContainer.style.gridTemplate = `repeat(${newPegBase}, 1fr) / repeat(${newPegBase}, 1fr)`;

    const extra = gridDiff * (expanding ? newPegBase : pegBase) + gridDiff;

    if (expanding) {
        addOrRemoveHoles(extra, oldTotalPegs);
        for (let i = oldTotalPegs - 1; i > 0; i--) {
            if (i % pegBase === 0) {
                addOrRemoveHoles(gridDiff, i);
            }
        }
    } else {
        // this locates the final extant peg after removing all the
        // extra stuff at the end IF REDUCING
        const cornerIndex = (pegBase - newPegBase) * (newPegBase - 1) + newTotalPegs;
        addOrRemoveHoles(extra, cornerIndex + 1);
        for (let i = cornerIndex; i > 0; i--) {
            if (i % pegBase === 0) {
                addOrRemoveHoles(gridDiff, i - (pegBase - newPegBase) + 1);
            }
        }
    }
    pegHoles = document.querySelectorAll(".peg-hole");
    pegBase = newPegBase;
}
function addOrRemoveHoles(numOfHoles, loc) {
    if (expanding) {
        for (let i = 0; i < numOfHoles; i++) {
            createHole(loc);
        }
    } else {
        for (let i = 0; i > numOfHoles; i--) {
            gridContainer.removeChild(gridContainer.childNodes[loc]);
        }
    }
}

function clearBoard() {
    placedPegs.forEach(peg => {
        peg.classList.remove("peg-lit");
        peg.style.borderColor = "transparent";
        peg.style.backgroundClip = "content-box";
        peg.style.backgroundColor = "black";
        peg.style.boxShadow = "none";
        peg.classList.remove("peg-unlit");
    });
    placedPegs = [];
    pegHoles.forEach(peg => addListenerToHole(peg));
}

function randomizeColor() {
    let newColorNums = `${random(361)},${random(361)},${random(361)}`;
    litColor = `rgb(${newColorNums})`;
    setUnlitColor(litColor);
}
function extractColorNums(rgbValue) {
    let r, g, b;
    rgbValue = rgbValue.slice(rgbValue.indexOf("(") + 1, rgbValue.length - 1);
    let rgbArray = rgbValue.split(",");
    rgbArray.forEach(num => num.trim());
    r = rgbArray[0];
    g = rgbArray[1];
    b = rgbArray[2];
    // this works if passed rgb OR rgba
    return `${r},${g},${b}`;
}
function setUnlitColor(rgbValue) {
    unlitColor = `rgba(${extractColorNums(rgbValue)},.5)`;
}
function convertHexToRgbNums(hex) {
    hex = hex.slice(1);
    let hexArray = [
        hex.substr(0, 2),
        hex.substr(2, 2),
        hex.substr(4, 2)
    ];
    let rgbArray = [
        parseInt(hexArray[0], 16),
        parseInt(hexArray[1], 16),
        parseInt(hexArray[2], 16)
    ];
    console.log(rgbArray);
    return `${rgbArray[0]},${rgbArray[1]},${rgbArray[2]}`;
}

function endParty() {
    if (partyIsOn && this !== partyBtn) {
        partyIsOn = false;
    }
}

function toggleLight() {
    lightIsOn = !lightIsOn;
    placedPegs.forEach(peg => {
        let pegColor = getComputedStyle(peg).backgroundColor;
        if (!this.checked) {
            peg.classList.remove("peg-lit");
            setUnlitColor(pegColor);
            unlight(peg);
        } else if (this.checked) {
            litColor = `rgb(${extractColorNums(pegColor)})`;
            light(peg);
        }
    });
    document.querySelector(".switch").classList.toggle("switch-on");
}
// LOGIC FUNCTIONS END

// GENERIC HELPER METHODS
function random(upperBound) {
    return Math.floor(Math.random() * upperBound);
}