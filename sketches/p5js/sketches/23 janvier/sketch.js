// JAN. 23 (credit: PaoloCurtoni)
// Transparency — superpositions et couches translucides
// ----------------------------------------------------
let DESSIN = 206;
let NP = 640;

// ----------------------------------------------------
function setup() {
    PALETTE("NEW_BLUE");
    INIT();
    noLoop();

    background(BG_COLOR);
    drawTransparentFields();
    drawTransparentOverlaps();
    drawTransparentRibbons();
    drawTransparentGrid();
}

// ----------------------------------------------------
function drawTransparentFields() {
    let base = color(STROKE_COLOR);
    noStroke();

    for (let i = 0; i < 6; i++) {
        let c = color(base);
        c.setAlpha(30 + i * 20);
        fill(c);
        let w = NP * (0.2 + i * 0.08);
        let h = NP * (0.15 + i * 0.06);
        let x = NP * 0.1 + i * NP * 0.08;
        let y = NP * 0.12 + i * NP * 0.07;
        rect(x, y, w, h);
    }
}

function drawTransparentOverlaps() {
    let colors = [
        color(20, 40, 120),
        color(200, 60, 80),
        color(220, 180, 60),
        color(40, 160, 120),
    ];

    for (let i = 0; i < colors.length; i++) {
        colors[i].setAlpha(80);
    }

    noStroke();
    for (let i = 0; i < 4; i++) {
        fill(colors[i]);
        let r = NP * 0.2;
        let angle = (i * TWO_PI) / 4;
        let cx = NP * 0.55 + cos(angle) * NP * 0.08;
        let cy = NP * 0.35 + sin(angle) * NP * 0.08;
        ellipse(cx, cy, r, r);
    }
}

function drawTransparentRibbons() {
    let c = color(STROKE_COLOR);
    c.setAlpha(60);
    stroke(c);
    strokeWeight(2);
    noFill();

    for (let k = 0; k < 5; k++) {
        beginShape();
        for (let i = 0; i <= 240; i++) {
            let t = i / 240;
            let x = NP * 0.05 + t * NP * 0.9;
            let y =
                NP * (0.55 + k * 0.06) + sin(t * TWO_PI * (2 + k)) * NP * 0.04;
            vertex(x, y);
        }
        endShape();
    }
}

function drawTransparentGrid() {
    let c = color(STROKE_COLOR);
    c.setAlpha(40);
    stroke(c);
    strokeWeight(1);
    noFill();

    let step = NP / 10;
    for (let i = 0; i <= 10; i++) {
        let x = i * step;
        let y = i * step;
        line(x, NP * 0.65, x, NP * 0.95);
        line(0, NP * 0.65 + y * 0.3, NP, NP * 0.65 + y * 0.3);
    }

    c.setAlpha(80);
    stroke(c);
    rect(NP * 0.05, NP * 0.65, NP * 0.9, NP * 0.28);
}
