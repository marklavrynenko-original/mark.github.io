const container = document.getElementById('container');
const WIDTH = 28, HEIGHT = 17;
let pixelWidth = Math.floor(window.innerWidth / WIDTH);
let pixelHeight = Math.floor(window.innerHeight / HEIGHT);
console.log(pixelWidth, pixelHeight);
let algo = 0;

function getLineSide(row, column) {
    const D = window.innerWidth * row - window.innerHeight * column;
    // console.log(row, column, D);
    return D >= 0
}

function getPixelColor(sides, color1, color2) {
    let c1 = c2 = 0;
    for (let side of sides) {
        if (side) {
            c1 += 1;
        } else {
            c2 += 1;
        }
    }
    const total = c1 + c2,
        c1Percent = 100 * c1 / total,
        c2Percent = 100 * c2 / total;
    return `color-mix(in srgb, ${color1} ${c1Percent}%, ${color2} ${c2Percent}%)`;
}
function render() {
    document.body.replaceChildren();
    for (let i = 0; i < HEIGHT; ++i) {
        const row = document.createElement('div');
        row.className = 'row';
        row.style.height = pixelHeight + 'px';
        for (let j = 0; j < WIDTH; ++j) {
            const cell = document.createElement('div');
            cell.className = 'cell'
            // cell.textContent = `(${i}, ${j})`;
            let color;
            if (algo == 0) {
                color = getLineSide(i * pixelHeight + pixelHeight * 0.5, j * pixelWidth + pixelWidth * 0.5) ? 'yellow' : 'blue';
            } else if (algo == 1) {
                const side1 = getLineSide(i * pixelHeight + pixelHeight * 0.25, j * pixelWidth + pixelWidth * 0.25);
                const side2 = getLineSide(i * pixelHeight + pixelHeight * 0.25, j * pixelWidth + pixelWidth * 0.75);
                const side3 = getLineSide(i * pixelHeight + pixelHeight * 0.75, j * pixelWidth + pixelWidth * 0.25);
                const side4 = getLineSide(i * pixelHeight + pixelHeight * 0.75, j * pixelWidth + pixelWidth * 0.75);
                color = getPixelColor([side1, side2, side3, side4], 'yellow', 'blue');
            } else {
                const sides = [];
                for (let k = 0; k < 5; k++) {
                    sides.push(
                        getLineSide(i * pixelHeight + pixelHeight * Math.random(), j * pixelWidth + pixelWidth * Math.random())
                    );
                }
                color = getPixelColor(sides, 'yellow', 'blue');
            }
            
            cell.style.backgroundColor = color;
            cell.style.height = pixelHeight + 'px';
            cell.style.width = pixelWidth + 'px';
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}
render();
document.addEventListener('keypress', () => {
    algo = (algo + 1) % 3;
    render();
})
// console.log(window.innerWidth + ' ' + window.innerHeight);
// console.log(window.outerWidth + ' ' + window.outerHeight);