context.font = '48px serif';
context.fillText('Hello world', 10, 50);



function main() {
    makeTree();
    setInterval(() => {
        draw();
    }, 16);
}

main();