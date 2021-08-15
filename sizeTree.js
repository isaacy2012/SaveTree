let container = document.getElementById("treeContainer")
let p = 1;
let tx = 0;
let ty = 0;

/**
 * Scales the tree to the size relative to the progress
 * @param {int} percentage 
 */
function sizeTree(percent) {
    resetTree();

    percent = Math.min(percent, 100);
    percent = Math.max(percent, 10);
    p = percent / 100;

    let contextWidth = canvas.width * p;
    let contextHeight = canvas.height * p;

    tx = canvas.width/2 - contextWidth/2;
    ty = canvas.height - contextHeight;
    
    context.translate(tx, ty);
    context.scale(p, p);
}

function resetTree(){
    context.scale(1/p, 1/p);
    context.translate(-tx, -ty);
}

function main() {
    makeTree();
    setInterval(() => {
        draw();
    }, 4);
}

main();