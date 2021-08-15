let canvas = document.getElementById("treeCanvas")
let context = canvas.getContext("2d")
canvas.width = 375;
canvas.height = 500;
let circles = [];

class Circle {
    x;
    y;
    circleRadius;
    tick = 0;
    rgba;
    period;
    xAnim;
    yAnim;
    clockwise;

    constructor(x, y, radius, rgba, canAnimate=true) {
        this.x = x;
        this.y = y;
        this.circleRadius = radius;
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
            return this.x + this.xAnim * this.circleRadius * 0.3 * Math.cos(this.tick / this.period * 2 * Math.PI);
        } else {
            return this.x + this.xAnim * this.circleRadius * -0.3 * Math.cos(this.tick / this.period * 2 * Math.PI);
        }
    }

    getYDraw() {
        return this.y + this.yAnim * this.circleRadius * 0.3 * Math.sin(this.tick / this.period * 2 * Math.PI);
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

/**
 * Generates a tree
 */
function makeTree() {
    let colorFuzz = 15;
    let offset = random(0, Math.PI);
    let iter = random(6, 8);
    
    let centerRadius = canvas.height / 5.0;
    let baseLeafSize = centerRadius / 2.0;
    let leafDistance = centerRadius * 0.9;
    
    circles.push(new Circle(canvas.width/2, canvas.height/2, centerRadius, rgba(fuzz(30, colorFuzz), fuzz(179, colorFuzz), fuzz(80, colorFuzz), 1), false));
    for (let i = 0; i < iter; i++) {
        let xc = canvas.width/2 + leafDistance * Math.cos(offset + i / iter * 2 * Math.PI);
        let yc = canvas.height/2 + leafDistance * Math.sin(offset + i / iter * 2 * Math.PI);
        circles.push(new Circle(fuzz(xc, 10), fuzz(yc, 10), fuzz(baseLeafSize, 20), rgba(fuzz(30, colorFuzz), fuzz(179, colorFuzz * 1.5), fuzz(80, colorFuzz), fuzz(0.9, 0.1))));
    }
}

/**
 * Draws a tree 16 times a second
 */
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    fillRect(canvas.width * 7.0 / 16.0, canvas.height / 2.0, canvas.width / 8.0, canvas.height / 2.0, rgba(87, 56, 33, 0.9));
    for (let circle of circles) {
        fillCircle(circle.getXDraw(), circle.getYDraw(), circle.circleRadius, circle.rgba);
        circle.incr();
    }
}
