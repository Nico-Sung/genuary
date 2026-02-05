// JAN. 30 (credit: Bart Simons)
// It's not a bug, it's a feature — glitches contrôlés
// ----------------------------------------------------
let DESSIN = 148;

// ----------------------------------------------------
let NP = 640,
    PI = Math.PI;

// ----------------------------------------------------
function setup() {
    PALETTE("NEW_BLUE");
    INIT();
    noLoop();

    background(BG_COLOR);
    translate(NP / 2, NP / 2);

    drawFeatureGrid();
    drawGlitchStack();
    drawOffsetLabels();
}

// ----------------------------------------------------
function drawFeatureGrid() {
    let c = color(STROKE_COLOR);
    c.setAlpha(70);
    stroke(c);
    strokeWeight(1);
    noFill();

    let size = NP * 0.8;
    let step = size / 12;
    let start = -size / 2;

    for (let i = 0; i <= 12; i++) {
        let jitter = i % 3 === 0 ? 0 : i % 2 === 0 ? 1.5 : -1.5;
        line(
            start,
            start + i * step + jitter,
            start + size,
            start + i * step + jitter,
        );
        line(
            start + i * step + jitter,
            start,
            start + i * step + jitter,
            start + size,
        );
    }
}

function drawGlitchStack() {
    let c = color(STROKE_COLOR);
    c.setAlpha(160);
    stroke(c);
    strokeWeight(2);
    noFill();

    let base = NP * 0.28;
    for (let i = 0; i < 6; i++) {
        let dx = i % 2 === 0 ? i * 2.4 : -i * 1.8;
        let dy = -i * 1.2;
        let size = base - i * NP * 0.03;
        rect(-size / 2 + dx, -size / 2 + dy, size, size);
    }

    // Fenêtres qui ne s'alignent jamais
    for (let i = 0; i < 8; i++) {
        let w = NP * 0.08 + (i % 3) * NP * 0.01;
        let h = NP * 0.04 + (i % 2) * NP * 0.01;
        let x = -NP * 0.2 + i * NP * 0.05 + (i % 2 ? 3 : -3);
        let y = -NP * 0.05 + (i % 3) * NP * 0.03;
        rect(x, y, w, h);
    }
}

function drawOffsetLabels() {
    let c = color(STROKE_COLOR);
    c.setAlpha(200);
    fill(c);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(NP * 0.03);

    text("ITS NOT A BUG", 0, NP * 0.32);
    text("ITS A FEATURE", 0, NP * 0.37);

    c.setAlpha(80);
    fill(c);
    text("ITS NOT A BUG", 2, NP * 0.32 + 2);
    text("ITS A FEATURE", -2, NP * 0.37 + 2);
}
