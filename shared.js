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

    incrementByAmount(incrementAmount) {
        this.current = this.current + incrementAmount;
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
    saveGoals();
    refresh();
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
