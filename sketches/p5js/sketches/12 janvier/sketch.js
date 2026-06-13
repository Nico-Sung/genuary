// JAN. 12 (credit: Stranger in the Q)
// Boxes only — composition uniquement avec des boîtes
// ----------------------------------------------------
let DESSIN = 207;
let NP = 640;

// ----------------------------------------------------
function setup() {
    PALETTE("NEW_BLUE");
    INIT();
    noLoop();

    background(BG_COLOR);
    translate(NP / 2, NP / 2);

    drawBoxGrid();
    drawRotatingBoxes();
    drawNestedBoxes();
    drawScatteredBoxes();
}

// ----------------------------------------------------
function drawBoxGrid() {
    let cols = 14;
    let rows = 14;
    let spacing = NP * 0.062;
    let startX = (-cols * spacing) / 2;
    let startY = (-rows * spacing) / 2;

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            let cx = startX + x * spacing;
            let cy = startY + y * spacing;
            let d = dist(cx, cy, 0, 0) / (NP * 0.5);

            if (d < 0.85) {
                let size = spacing * 0.5 * (1 - d * 0.4);
                let c = color(STROKE_COLOR);
                c.setAlpha(100 + d * 80);
                stroke(c);
                strokeWeight(1);
                noFill();
                rect(cx - size / 2, cy - size / 2, size, size);
            }
        }
    }
}

function drawRotatingBoxes() {
    let layers = 12;
    for (let i = 0; i < layers; i++) {
        let size = NP * 0.15 + i * NP * 0.04;
        let angle = i * 0.18;
        let c = color(STROKE_COLOR);
        c.setAlpha(180 - i * 12);
        stroke(c);
        strokeWeight(1.5 - i * 0.08);
        noFill();

        push();
        rotate(angle);
        rect(-size / 2, -size / 2, size, size);
        pop();
    }
}

function drawNestedBoxes() {
    let clusters = 8;
    for (let c = 0; c < clusters; c++) {
        let angle = (c * TWO_PI) / clusters;
        let radius = NP * 0.28;
        let cx = cos(angle) * radius;
        let cy = sin(angle) * radius;

        push();
        translate(cx, cy);
        rotate(angle + HALF_PI);

        for (let i = 0; i < 4; i++) {
            let size = NP * 0.08 - i * NP * 0.015;
            let col = color(STROKE_COLOR);
            col.setAlpha(140 - i * 25);
            stroke(col);
            strokeWeight(1 + i * 0.2);
            noFill();
            rect(-size / 2, -size / 2, size, size);
        }
        pop();
    }
}

function drawScatteredBoxes() {
    randomSeed(42);
    let count = 35;

    for (let i = 0; i < count; i++) {
        let x = random(-NP * 0.4, NP * 0.4);
        let y = random(-NP * 0.4, NP * 0.4);
        let size = random(NP * 0.02, NP * 0.08);
        let angle = random(TWO_PI);

        let d = dist(x, y, 0, 0);
        if (d < NP * 0.15 || d > NP * 0.42) continue;

        push();
        translate(x, y);
        rotate(angle);

        let c = color(STROKE_COLOR);
        c.setAlpha(random(60, 150));

        if (random() < 0.3) {
            fill(c);
            noStroke();
        } else {
            noFill();
            stroke(c);
            strokeWeight(random(0.5, 2));
        }

        rect(-size / 2, -size / 2, size, size);
        pop();
    }
}
