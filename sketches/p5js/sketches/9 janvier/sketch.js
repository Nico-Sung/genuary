// JAN. 9 (credit: PaoloCurtoni)
// Crazy automaton — cellular automata with crazy rules
// ----------------------------------------------------
let DESSIN = 188;
let NP = 640;

let cols = 120;
let rows = 120;
let cell;
let gridA = [];
let gridB = [];
let steps = 160;

// ----------------------------------------------------
function setup() {
    PALETTE("NEW_BLUE");
    INIT();
    noLoop();
    cell = NP / cols;
    initGrids();

    background(BG_COLOR);
    for (let i = 0; i < steps; i++) {
        drawLayer(i / steps);
        stepAutomaton(i);
        swapGrids();
    }
}

// ----------------------------------------------------
function initGrids() {
    for (let y = 0; y < rows; y++) {
        gridA[y] = [];
        gridB[y] = [];
        for (let x = 0; x < cols; x++) {
            let r = dist(x, y, cols * 0.5, rows * 0.5) / (cols * 0.5);
            let seed = noise(x * 0.08, y * 0.08) + random(-0.15, 0.15);
            gridA[y][x] = seed > r * 0.65 ? 1 : 0;
            gridB[y][x] = 0;
        }
    }
}

function drawLayer(t) {
    let alive = color(STROKE_COLOR);
    alive.setAlpha(220 - t * 140);
    let fading = color(STROKE_COLOR);
    fading.setAlpha(60 + t * 60);
    noStroke();

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (gridA[y][x] === 1) {
                fill(alive);
                rect(x * cell, y * cell, cell, cell);
            } else if (random() < 0.02) {
                fill(fading);
                rect(x * cell, y * cell, cell, cell);
            }
        }
    }
}

function stepAutomaton(iter) {
    let chaos = 0.35 + 0.3 * sin(iter * 0.15);
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            let n = countNeighbors(x, y);
            let v = gridA[y][x];
            let twist = (x ^ y ^ iter) & 3;

            let born =
                n === 3 ||
                (n === 6 && twist === 1) ||
                (n === 2 && random() < chaos);
            let stay = n === 2 || n === 3 || (n === 5 && twist === 2);
            let flip = n === 4 && random() < chaos * 0.7;

            if (flip) gridB[y][x] = v === 1 ? 0 : 1;
            else if (v === 1) gridB[y][x] = stay ? 1 : 0;
            else gridB[y][x] = born ? 1 : 0;
        }
    }
}

function countNeighbors(x, y) {
    let total = 0;
    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            let xx = (x + dx + cols) % cols;
            let yy = (y + dy + rows) % rows;
            total += gridA[yy][xx];
        }
    }
    return total;
}

function swapGrids() {
    let tmp = gridA;
    gridA = gridB;
    gridB = tmp;
}
