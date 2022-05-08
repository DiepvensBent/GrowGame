let colorChoice = [];
let selectedChoices = [];


let codeLength = 4;
let currentSelectedColors = document.getElementById("selectedColors");
let previousSelections = document.getElementById("previousSelections");
previousSelections.innerHTML = "";

const availableColors = ["red", "green", "blue", "yellow", "purple", "gray"];
const code = randomCode();



document.querySelectorAll('.colorDiv').forEach(e => {
    e.addEventListener('click', i => {
        const color = e.classList[0];
        selectColor(color);

    })
});

function selectColor(color) {

    colorChoice.push(color);
    let chosenColor = document.createElement('div');
    chosenColor.classList.add(color);
    chosenColor.classList.add("colorDiv");
    currentSelectedColors.appendChild(chosenColor);

    if (colorChoice.length === codeLength) {

        selectedChoices.push(currentSelectedColors);
        currentSelectedColors.innerHTML = null;
        let previousSelection = document.createElement("div");
        previousSelection.classList.add("colors")

        for (const choice of colorChoice) {
            const o = document.createElement("div");
            o.classList.add(choice);
            o.classList.add("colorDiv");
            previousSelection.appendChild(o);
        }

        previousSelections.appendChild(previousSelection);
        const hints = calculateHints(colorChoice);
        let hr = document.createElement("hr");
        previousSelection.appendChild(hr);

        for (const hint of hints) {
            const div = document.createElement("div");
            div.classList.add("colorDiv");
            if (hint === "rightPosition") {
                div.classList.add("rightPosition");
            } else {
                div.classList.add("rightColor");
            }
            previousSelection.appendChild(div);
        }


        colorChoice.length = 0;
        if (hints.length === code.length && hints.every(hint => hint === "rightPosition")) {
            window.alert("Congratulations! You won the game!")
        }
    }
}

function randomCode() {
    const newCode = [...new Array(codeLength)].map(f => {
        const random = Math.floor(Math.random() * Math.floor(availableColors.length));
        return availableColors[random];
    });
    console.log(newCode);
    return newCode;
}

function calculateHints(chosenColors) {
    const hints = [];
    const duplicates = [];
    const test = [];

    chosenColors.forEach((color, i) => {
        if (code[i] === color) {
            hints.push("rightPosition");
            duplicates.push(color);
        }
    });
    console.log(test);
    chosenColors.forEach((color, i) => {
        if (!duplicates.includes(color) && code.includes(color)) {
            hints.push("rightColor");

        }
    });
    return hints;
}