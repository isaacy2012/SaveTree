let money = 0;
let goals = [];

class Goal {
    name
    current
    total

    constructor(name, total) {
        this.name = name;
        this.total = total;
        this.current = 0;
    }

    toString() {
        return `${this.name}, ${this.current}, ${this.total}`
    }
}


function getGoalString() {
    let output = "";
    for (goal of goals) {
        output += goal.toString() + "\n";
    }
    return output;
}

function buttonOnClick() {
    let nameInput = document.getElementById("nameInput");
    let totalInput = document.getElementById("totalInput");
    let textArea = document.getElementById("textArea");

    let name = nameInput.value;
    let total = totalInput.value;

    let number = parseFloat(total)
    if (isNaN(number)) {
        window.alert("Error, not a number. Please try again.")
        return;
    }

    let goal = new Goal(name, number);
    goals.push(goal);
    textArea.innerText = getGoalString();

    // clear the text inputs
    nameInput.value = "";
    totalInput.value = "";
}
