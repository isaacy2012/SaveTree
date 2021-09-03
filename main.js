loadData();
refresh();

/**
 * Refresh the UI:
 * - Money
 * - Goals
 */
function refresh() {
    let UI_moneyText = document.getElementById("UI_moneyText");
    UI_moneyText.innerText = "You have $" + money;
    let UI_goalsList = document.getElementById("UI_goalsList");
    UI_goalsList.innerHTML = "";
    document.getElementById("textArea");
    for (name in goals) {
        UI_goalsList.appendChild(makeGoalElement(name));
    }
}

/**
 * Make a goal element
 * @param name the name of the goal
 * @returns {HTMLDivElement}
 */
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
    let buttonDiv = document.createElement("div");
    buttonDiv.className = "btn-circle-div";
    let button = document.createElement("button");
    button.className = "w3-circle"
    button.innerText = "+";
    button.onclick = () => {
        incrementFromName(name)
        //refresh the page
        refresh();
    }
    buttonDiv.append(button);
    element.append(buttonDiv)

    return superElement;
}

/**
 * Add a goal, getting the data from the modal
 */
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

/**
 * Increment the goal with this name
 * @param name the name
 */
function incrementFromName(name) {
    if (!goals[name]) {
        return;
    }

    mutateData(() => {
            if (!goals[name].increment()) {
                window.alert("Sorry, you don't have enough money for that");
            }
        }
        , refresh);
}

