let money = 50;
let goals = {};

function decrementMoney() {
    if (money <= 0) {
        return false;
    }
    money--;
    return true;
}

function decrementMoneyByAmount(amount) {
    if (money < amount) {
        return false;
    }
    money -= amount;
    return true;
}

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

    static ofObject(goalObj) {
        let goal = new Goal(goalObj.name, goalObj.total);
        goal.current = goalObj.current;
        return goal;
    }

    toString() {
        return `${this.name}, ${this.current}, ${this.total}`
    }
}

function mutateData(update, refresh) {
    update();
    saveData();
    refresh();
}

function saveData() {
    saveGoals();
    saveMoney();
}

function loadData() {
    loadGoals();
    loadMoney();
}

function saveGoals() {
    localStorage["goals"] = JSON.stringify(goals);
}

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

function loadMoney() {
    let ls = localStorage["money"];
    if (!ls) {
        return;
    }
    money = ls;
}

function saveMoney() {
    localStorage["money"] = money;
}
