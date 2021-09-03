const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get("name");

loadData();
const goal = goals[name];
refresh();

/**
 * Delete this goal
 */
function deleteGoal() {
    mutateData(() => {delete goals[name]}, () => {window.history.back()});
}

/**
 * Refresh the detail page UI
 */
function refresh() {
    setP(goal.current, goal.total);
    document.getElementById("pageTitle").innerText = goal.name;
    document.getElementById("titleText").innerText = goal.name;
    let UI_currentText = document.getElementById("UI_currentText");
    UI_currentText.innerText = goal.current;
    let UI_goalAmountText = document.getElementById("UI_goalAmountText");
    UI_goalAmountText.innerText = goal.total;
}


/**
 * Increment to this goal, taking money from the wallet.
 */
function detailAdd() {
    let incrementAmountInput = document.getElementById("incrementAmount");

    // let name = editNameInput.value;
    let amountToAdd = parseFloat(incrementAmountInput.value);

    // If not a number
    if (isNaN(amountToAdd)) {
        window.alert("Error, not a number. Please try again.")
        return;
    }

    mutateData(() => {
        if (!goal.incrementByAmount(amountToAdd)) {
            window.alert("Sorry, you don't have enough money for that");
        }
    }, refresh);

    // clear the text inputs
    // editNameInput.value = "";
    incrementAmountInput.value = "";

}

