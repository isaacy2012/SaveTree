let canvas = document.getElementById("treeCanvas")
let context = canvas.getContext("2d")
canvas.width = 375;
canvas.height = 500;
let x = 200;
let y = 400;
let width = canvas.width;
let height = canvas.height;
let leafDistance = 90;
let circles = [];

class Circle {
    x;
    y;
    radius;
    tick = 0;
    rgba;
    period;
    xAnim;
    yAnim;
    clockwise;

    constructor(x, y, radius, rgba, canAnimate=true) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.rgba = rgba;

        if(canAnimate){
            this.period = 60 * random(10, 30);
            this.xAnim = random(0.2, 1);
            this.yAnim = random(0.2, 1);
            this.clockwise = random(-1, 1) > 0;
        } else {
            this.period = 1;
            this.xAnim = 0;
            this.yAnim = 0;
            this.clockwise = true;
        }
        
    }

    getXDraw() {
        if (this.clockwise) {
            return this.x + this.xAnim * this.radius * 0.3 * Math.cos(this.tick / this.period * 2 * Math.PI);
        } else {
            return this.x + this.xAnim * this.radius * -0.3 * Math.cos(this.tick / this.period * 2 * Math.PI);
        }
    }

    getYDraw() {
        return this.y + this.yAnim * this.radius * 0.3 * Math.sin(this.tick / this.period * 2 * Math.PI);
    }

    incr() {
        this.tick++;
        if (this.tick > this.period * 60) {
            this.tick = 0;
        }
    }
}


function fillCircle(x, y, r, rgba) {
    context.beginPath();
    context.arc(x, y, r, 0, 2 * Math.PI, false);
    context.fillStyle = rgba;
    context.fill();
    context.lineWidth = 5;
}

function fillRect(x, y, width, height, rgba) {
    context.fillStyle = rgba;
    context.fillRect(x, y, width, height);
}

function rgba(r, g, b, a) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function fuzz(x, diff) {
    return x + random(-diff, diff);
}

function treefunc(x) {
    if (x < 0 || x > 1) {
        console.log("Illegal call to treefunc, x: " + x);
        return NaN;
    }
    if (x < 0.5) {
        return 4 * (Math.pow(x, 2));
    } else {
        return 4 * (Math.pow((x - 1), 2));
    }
}

function getFuzz(row, rowMax) {
    let maxFuzz = 10;
    return row / rowMax * maxFuzz;
}

function normDist(x) {
    let y = 2 * x;
    let a = 0.6;
    let b = 1;
    let left = 1.0 / (a * Math.sqrt(2 * Math.PI));
    let exponent = -0.5 * Math.pow(((y - b) / a), 2);
    let epower = Math.exp(exponent);
    return 2 * left * epower;
}

function getVerticalLeafSize(row, rowMax) {
    let leafSize = 60;
    let kRow = row / rowMax;
    return (kRow / 2.0 + 0.5) * leafSize;
}

function getHorizontalLeafSize(col, colMax) {
    return normDist(col / colMax);
}

function getLeafSize(row, rowMax, col, colMax) {
    return (getVerticalLeafSize(row, rowMax) + getHorizontalLeafSize(col, colMax)) / 2.0;
}

function makeTree() {
    let colorFuzz = 15;
    let baseLeafSize = 50;
    let offset = random(0, Math.PI);
    let centerRadius = height / 5.0;
    let iter = random(6, 8);
    circles.push(new Circle(width/2, height/2, centerRadius, rgba(fuzz(30, colorFuzz), fuzz(179, colorFuzz), fuzz(80, colorFuzz), 1), false));
    for (let i = 0; i < iter; i++) {
        let xc = width/2 + leafDistance * Math.cos(offset + i / iter * 2 * Math.PI);
        let yc = height/2 + leafDistance * Math.sin(offset + i / iter * 2 * Math.PI);
        circles.push(new Circle(fuzz(xc, 10), fuzz(yc, 10), fuzz(baseLeafSize, 20), rgba(fuzz(30, colorFuzz), fuzz(179, colorFuzz * 1.5), fuzz(80, colorFuzz), fuzz(0.9, 0.1))));
    }
}


function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    fillRect(width * 7.0 / 16.0, height / 2.0, width / 8.0, height / 2.0, rgba(87, 56, 33, 0.9));
    for (let circle of circles) {
        fillCircle(circle.getXDraw(), circle.getYDraw(), circle.radius, circle.rgba);
        circle.incr();
    }
}
