let container = document.getElementById("treeContainer")
let p = 0;
let newP = 1;
let tx = 0;
let ty = 0;

/**
 * Scales the tree to the size relative to the progress
 * @param {int} percentage
 */
function sizeTree() {
    resetTree();
    if(p < newP){
        p+= 0.0025;
    }

    let contextWidth = canvas.width * p;
    let contextHeight = canvas.height * p;

    tx = canvas.width/2 - contextWidth/2;
    ty = canvas.height - contextHeight;

    context.translate(tx, ty);
    context.scale(p, p);
}

function setP(current, total) {
    if (total == 0) {
        return;
    }

    newP = current/total;
    newP = Math.min(newP, 1);
    newP = Math.max(newP, 0.1);
}

function resetTree(){
    context.scale(1/p, 1/p);
    context.translate(-tx, -ty);
}

function main() {
    makeTree();
    setInterval(() => {
        sizeTree();
        draw();
    }, 4);
}

main();
