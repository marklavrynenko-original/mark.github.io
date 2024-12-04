const container = document.getElementById('container');
const PIXEL_SIZE = 48;
const WIDTH = Math.floor(window.innerWidth / PIXEL_SIZE);
const HEIGHT = Math.floor(window.innerHeight / PIXEL_SIZE);
console.log(WIDTH, HEIGHT);
let algo = 0;

function getLineSide(y, x) {
    const D = window.innerWidth * y - window.innerHeight * x;
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.style.left = x + 'px';
    dot.style.top = y + 'px';
    container.appendChild(dot);
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
        row.style.height = PIXEL_SIZE + 'px';
        for (let j = 0; j < WIDTH; ++j) {
            const cell = document.createElement('div');
            cell.className = 'cell'
            // cell.textContent = `(${i}, ${j})`;
            let color;
            if (algo == 0) {
                // no AA
                color = getLineSide(i * PIXEL_SIZE + PIXEL_SIZE * 0.5, j * PIXEL_SIZE + PIXEL_SIZE * 0.5) ? 'yellow' : 'blue';
            } else if (algo == 1) {
                // 4x SSAA
                const side1 = getLineSide(i * PIXEL_SIZE + PIXEL_SIZE * 0.25, j * PIXEL_SIZE + PIXEL_SIZE * 0.25);
                const side2 = getLineSide(i * PIXEL_SIZE + PIXEL_SIZE * 0.25, j * PIXEL_SIZE + PIXEL_SIZE * 0.75);
                const side3 = getLineSide(i * PIXEL_SIZE + PIXEL_SIZE * 0.75, j * PIXEL_SIZE + PIXEL_SIZE * 0.25);
                const side4 = getLineSide(i * PIXEL_SIZE + PIXEL_SIZE * 0.75, j * PIXEL_SIZE + PIXEL_SIZE * 0.75);
                color = getPixelColor([side1, side2, side3, side4], 'yellow', 'blue');
            } else if (algo == 2) {
                // r random points
                const sides = [];
                for (let k = 0; k < 5; k++) {
                    sides.push(
                        getLineSide(i * PIXEL_SIZE + PIXEL_SIZE * Math.random(), j * PIXEL_SIZE + PIXEL_SIZE * Math.random())
                    );
                }
                color = getPixelColor(sides, 'yellow', 'blue');
            } else {
                // 4 corners + center
                const side1 = getLineSide(i * PIXEL_SIZE, j * PIXEL_SIZE);
                const side2 = getLineSide(i * PIXEL_SIZE, j * PIXEL_SIZE + PIXEL_SIZE);
                const side3 = getLineSide(i * PIXEL_SIZE + PIXEL_SIZE, j * PIXEL_SIZE);
                const side4 = getLineSide(i * PIXEL_SIZE + PIXEL_SIZE, j * PIXEL_SIZE + PIXEL_SIZE);
                const side5 = getLineSide(i * PIXEL_SIZE + PIXEL_SIZE * 0.5, j * PIXEL_SIZE + PIXEL_SIZE * 0.5);
                color = getPixelColor([side1, side2, side3, side4, side5], 'yellow', 'blue');
            }
            
            cell.style.backgroundColor = color;
            cell.style.height = PIXEL_SIZE + 'px';
            cell.style.width = PIXEL_SIZE + 'px';
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}
render();
function update() {
    algo = (algo + 1) % 4;
    render();
}

document.addEventListener('keypress', update);
document.addEventListener('click', update);
