let money = 0;
let goals = {};

loadGoals();

class Goal {
    name
    current
    total

    constructor(name, total) {
        this.name = name;
        this.total = total;
        this.current = 0;
    }

    increment() {
        this.current++;
    }

    toString() {
        return `${this.name}, ${this.current}, ${this.total}`
    }
}

function mutateData(update) {
    update();
    saveGoals();
    refresh();
}


function refresh() {
    let UI_goalsList = document.getElementById("UI_goalsList");
    UI_goalsList.innerHTML = "";
    let textArea = document.getElementById("textArea");
    for (name in goals) {
        UI_goalsList.appendChild(getGoalElement(name));
    }
}


function getGoalElement(name) {
    let element = document.createElement("div");
    element.innerText = goals[name].toString();
    let button = document.createElement("button");
    button.innerText = "+";
    button.onclick = () => {
        incrementFromName(name)

        //refresh the page
        refresh();
    }
    element.append(button);

    return element;
}

function buttonOnClick() {
    let nameInput = document.getElementById("nameInput");
    let totalInput = document.getElementById("totalInput");

    let name = nameInput.value;
    let total = totalInput.value;

    let number = parseFloat(total)
    if (isNaN(number)) {
        window.alert("Error, not a number. Please try again.")
        return;
    }

    mutateData(() => goals[name] = new Goal(name, number));

    // clear the text inputs
    nameInput.value = "";
    totalInput.value = "";

}

function incrementFromName(name) {
    if (!goals[name]) {
        return;
    }

    mutateData(() => goals[name].increment());
}

function saveGoals() {
    localStorage["goals"] = JSON.stringify(goals);
}

function loadGoals() {
    let ls = localStorage["goals"];
    if (!ls) {
        return;
    }
    goals = JSON.parse(ls)
}
