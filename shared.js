let money = 100;
let goals = {};

/**
 * Decrement the money in the wallet, returning whether this is possible given the amount of money in the wallet
 * @returns {boolean}
 */
function decrementMoney() {
    if (money <= 0) {
        return false;
    }
    money--;
    return true;
}

/**
 * Decrement the money in the wallet by a particular amount, returning whether this is possible given the amount of money in the wallet
 * @param amount
 * @returns {boolean}
 */
function decrementMoneyByAmount(amount) {
    if (money < amount) {
        return false;
    }
    money -= amount;
    return true;
}

/**
 * Goal class
 */
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
        if (decrementMoney()) {
            this.current++;
            return true;
        }
        return false;
    }

    incrementByAmount(incrementAmount) {
        if (decrementMoneyByAmount(incrementAmount)) {
            this.current = this.current + incrementAmount;
            return true;
        }
        return false;
    }

    /**
     * Convert a POJO to a Goal
     * @param goalObj
     * @returns {Goal}
     */
    static ofObject(goalObj) {
        let goal = new Goal(goalObj.name, goalObj.total);
        goal.current = goalObj.current;
        return goal;
    }

    toString() {
        return `${this.name}, ${this.current}, ${this.total}`
    }
}

/**
 * Mutates the data, saving it
 * @param update the model updating function to call before saving
 * @param refresh the UI refresh function to call after saving
 */
function mutateData(update, refresh) {
    update();
    saveData();
    refresh();
}

/**
 * Saving the data
 */
function saveData() {
    saveGoals();
    saveMoney();
}

/**
 * Loading the data
 */
function loadData() {
    loadGoals();
    loadMoney();
}

/**
 * Saving the goals to localStorage
 */
function saveGoals() {
    localStorage["goals"] = JSON.stringify(goals);
}

/**
 * Loading the goals from local storage
 */
function loadGoals() {
    let ls = localStorage["goals"];
    if (!ls) {
        return;
    }
    let goalObjects = JSON.parse(ls)
    for (goalName in goalObjects) {
        goalObj = goalObjects[goalName];
        let goal = Goal.ofObject(goalObj);
        goals[goalObj.name] = goal;
    }
}

/**
 * Loading the money from local storage
 */
function loadMoney() {
    let ls = localStorage["money"];
    if (!ls) {
        return;
    }
    money = ls;
}

/**
 * Saving the money to local storage
 */
function saveMoney() {
    localStorage["money"] = money;
}
