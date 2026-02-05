// JAN. 26 (credit: Piero)
// Recursive Grids — découpage récursif de la grille
// ----------------------------------------------------
let DESSIN = 175;

// ----------------------------------------------------
let NP = 640,
    PI = Math.PI;

// ----------------------------------------------------
function setup() {
    PALETTE("NEW_BLUE");
    INIT();
    noLoop();

    background(BG_COLOR);
    stroke(STROKE_COLOR);
    noFill();
    strokeWeight(1);

    let margin = NP * 0.06;
    let size = NP - margin * 2;

    recurseGrid(margin, margin, size, 4);
}

// ----------------------------------------------------
function recurseGrid(x, y, size, depth) {
    if (depth === 0) {
        drawCell(x, y, size);
        return;
    }

    let divisions = depth % 2 === 0 ? 3 : 2;
    let cell = size / divisions;

    // Dessiner les séparations du niveau
    for (let i = 1; i < divisions; i++) {
        line(x + i * cell, y, x + i * cell, y + size);
        line(x, y + i * cell, x + size, y + i * cell);
    }

    // Recurse sur quelques cellules, pas toutes
    for (let j = 0; j < divisions; j++) {
        for (let i = 0; i < divisions; i++) {
            let nx = x + i * cell;
            let ny = y + j * cell;
            let selector = (i + j + depth) % 3;
            if (selector === 0 || depth > 2) {
                recurseGrid(nx, ny, cell, depth - 1);
            } else {
                drawCell(nx, ny, cell);
            }
        }
    }
}

function drawCell(x, y, size) {
    let inset = size * 0.08;
    rect(x + inset, y + inset, size - inset * 2, size - inset * 2);

    let cx = x + size / 2;
    let cy = y + size / 2;
    let r = size * 0.18;

    ellipse(cx, cy, r * 2, r * 2);
    line(cx - r, cy, cx + r, cy);
    line(cx, cy - r, cx, cy + r);
}
