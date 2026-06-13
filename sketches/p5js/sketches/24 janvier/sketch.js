// JAN. 24 (credit: Sophia (fractal kitty))
// Perfectionist’s nightmare — grilles presque parfaites mais jamais alignées
// ----------------------------------------------------
let DESSIN = 201;
let NP = 640;

// ----------------------------------------------------
function setup() {
    PALETTE("NEW_BLUE");
    INIT();
    noLoop();

    background(BG_COLOR);
    drawNearPerfectGrid();
    drawOffsetMargins();
    drawAlmostAlignedRows();
    drawMisregisteredLayers();
}

// ----------------------------------------------------
function drawNearPerfectGrid() {
    let cols = 18;
    let rows = 18;
    let margin = NP * 0.08;
    let w = NP - margin * 2;
    let h = NP - margin * 2;
    let cellW = w / cols;
    let cellH = h / rows;

    let c = color(STROKE_COLOR);
    c.setAlpha(90);
    stroke(c);
    strokeWeight(1);
    noFill();

    for (let y = 0; y <= rows; y++) {
        let jitter = y % 3 === 0 ? 0 : y % 2 === 0 ? 0.6 : -0.6;
        line(
            margin + jitter,
            margin + y * cellH,
            margin + w + jitter,
            margin + y * cellH,
        );
    }

    for (let x = 0; x <= cols; x++) {
        let jitter = x % 4 === 0 ? 0 : x % 2 === 0 ? -0.7 : 0.7;
        line(
            margin + x * cellW,
            margin + jitter,
            margin + x * cellW,
            margin + h + jitter,
        );
    }

    // Cellules presque identiques mais jamais exactement
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if ((x + y) % 5 !== 0) continue;
            let cx =
                margin + x * cellW + cellW / 2 + (x % 2 === 0 ? 0.6 : -0.6);
            let cy =
                margin + y * cellH + cellH / 2 + (y % 2 === 0 ? -0.5 : 0.5);
            let size = min(cellW, cellH) * (0.35 + ((x + y) % 3) * 0.02);
            rect(cx - size / 2, cy - size / 2, size, size);
        }
    }
}

function drawOffsetMargins() {
    let c = color(STROKE_COLOR);
    c.setAlpha(140);
    stroke(c);
    strokeWeight(2);
    noFill();

    // Cadres presque alignés
    rect(NP * 0.05, NP * 0.05, NP * 0.9, NP * 0.9);
    rect(NP * 0.055, NP * 0.052, NP * 0.89, NP * 0.896);
    rect(NP * 0.048, NP * 0.058, NP * 0.904, NP * 0.892);
}

function drawAlmostAlignedRows() {
    let c = color(STROKE_COLOR);
    c.setAlpha(120);
    stroke(c);
    strokeWeight(1.5);

    let yBase = NP * 0.72;
    let step = NP * 0.025;
    for (let i = 0; i < 7; i++) {
        let y = yBase + i * step;
        let x1 = NP * 0.08 + (i % 2 === 0 ? 1.2 : -1.2);
        let x2 = NP * 0.92 + (i % 3 === 0 ? -1.5 : 1.5);
        line(x1, y, x2, y);
    }
}

function drawMisregisteredLayers() {
    let c = color(STROKE_COLOR);
    c.setAlpha(70);
    stroke(c);
    strokeWeight(1);
    noFill();

    let cx = NP * 0.72;
    let cy = NP * 0.28;
    let size = NP * 0.18;

    for (let i = 0; i < 4; i++) {
        let dx = i * 1.4;
        let dy = -i * 0.9;
        rect(cx - size / 2 + dx, cy - size / 2 + dy, size, size);
    }

    // Cercles presque concentriques
    for (let i = 0; i < 4; i++) {
        let r = size * (0.35 + i * 0.12);
        ellipse(cx + i * 0.8, cy - i * 0.6, r, r);
    }
}
