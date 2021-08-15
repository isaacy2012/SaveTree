loadGoals();
refresh();

function refresh() {
    let UI_goalsList = document.getElementById("UI_goalsList");
    UI_goalsList.innerHTML = "";
    let textArea = document.getElementById("textArea");
    for (name in goals) {
        UI_goalsList.appendChild(makeGoalElement(name));
    }
}

function makeGoalElement(name) {
    let superElement = document.createElement("div");
    superElement.className = "col";
    let element = document.createElement("div");
    superElement.appendChild(element);
    element.className = "card";
    let linkElement = document.createElement("a");
    linkElement.className = "goalLink";
    linkElement.setAttribute("href", "./goalDetailPage.html?name=" + name);
    linkElement.innerText = goals[name].toString();
    element.appendChild(linkElement);
    let button = document.createElement("button");
    button.className = "btn btn-secondary"
    button.innerText = "+";
    button.onclick = () => {
        incrementFromName(name)

        //refresh the page
        refresh();
    }
    element.append(button);

    return superElement;
}

function addGoal() {
    let nameInput = document.getElementById("nameInput");
    let totalInput = document.getElementById("totalInput");

    let name = nameInput.value;
    let total = totalInput.value;
    let number = parseFloat(total)

    // If the name is empty
    if (name.trim().length === 0) {
        return;
    }

    if (isNaN(number)) {
        window.alert("Error, not a number. Please try again.")
        return;
    }

    mutateData(() => goals[name] = new Goal(name, number), refresh);

    // clear the text inputs
    nameInput.value = "";
    totalInput.value = "";

}

function incrementFromName(name) {
    if (!goals[name]) {
        return;
    }

    mutateData(() => goals[name].increment(), refresh);
}

function incrementCurrent() {
    let editNameInput = document.getElementById("editNameInput");
    let incrementAmountInput = document.getElementById("incrementAmount");

    let name = editNameInput.value;
    let amountToAdd = parseFloat(incrementAmountInput.value);

    // If the name is empty
    if (name.trim().length === 0) {
        return;
    }

    // If there is no goal with this name
    if (!goals[name]) {
        window.alert("Error, that goal name does not exist. Please try again.")
        return;
    }

    // If not a number
    if (isNaN(amountToAdd)) {
        window.alert("Error, not a number. Please try again.")
        return;
    }

    mutateData(() => goals[name].incrementByAmount(amountToAdd), refresh);

    // clear the text inputs
    editNameInput.value = "";
    incrementAmountInput.value = "";

}

