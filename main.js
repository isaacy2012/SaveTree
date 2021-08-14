let money = 0;
let goals = {};

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


function refresh() {
    let textArea = document.getElementById("textArea");
    textArea.innerText = getGoalString();
}

function getGoalString() {
    let output = "";
    for (name in goals) {
        output += goals[name].toString() + "\n";
    }
    return output;
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

    let goal = new Goal(name, number);
    goals[name] = goal;

    // clear the text inputs
    nameInput.value = "";
    totalInput.value = "";

    //refresh the page
    refresh();
}

function incrementCurrent() {
    let editNameInput = document.getElementById("editNameInput");

    let name = editNameInput.value;

    if (!goals[name]) {
        return;
    }

    goals[name].increment();

    //refresh the page
    refresh();
}

