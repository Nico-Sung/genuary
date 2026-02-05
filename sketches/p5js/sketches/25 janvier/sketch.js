// JAN. 25 (credit: Manuel Larino)
// Organic Geometry — formes organiques construites avec des primitives géométriques
// ----------------------------------------------------
let DESSIN = 176;

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

    drawOrganicCells();
    drawVeinNetwork();
    drawRingFlora();
}

// ----------------------------------------------------
function drawOrganicCells() {
    let c = color(STROKE_COLOR);
    c.setAlpha(120);
    stroke(c);
    strokeWeight(1.2);
    noFill();

    let count = 18;
    for (let i = 0; i < count; i++) {
        let angle = (i * TWO_PI) / count;
        let radius = NP * 0.15 + (i % 3) * NP * 0.03;
        let cx = cos(angle) * radius;
        let cy = sin(angle) * radius;
        drawBlob(cx, cy, NP * 0.1 + (i % 4) * NP * 0.015, 6 + (i % 5));
    }

    c.setAlpha(180);
    stroke(c);
    drawBlob(0, 0, NP * 0.22, 8);
}

function drawBlob(cx, cy, r, lobes) {
    beginShape();
    for (let a = 0; a <= 360; a += 6) {
        let ang = radians(a);
        let wobble =
            sin(ang * lobes) * r * 0.15 + cos(ang * (lobes - 2)) * r * 0.08;
        let rr = r + wobble;
        let x = cx + cos(ang) * rr;
        let y = cy + sin(ang) * rr;
        vertex(x, y);
    }
    endShape(CLOSE);
}

function drawVeinNetwork() {
    let c = color(STROKE_COLOR);
    c.setAlpha(90);
    stroke(c);
    strokeWeight(1);
    noFill();

    let branches = 12;
    for (let b = 0; b < branches; b++) {
        let angle = (b * TWO_PI) / branches + (b % 2) * 0.2;
        let len = NP * 0.35;
        beginShape();
        for (let i = 0; i <= 40; i++) {
            let t = i / 40;
            let r = t * len;
            let wave = sin(t * TWO_PI * 3 + b) * NP * 0.01;
            let x = cos(angle) * r + cos(angle + HALF_PI) * wave;
            let y = sin(angle) * r + sin(angle + HALF_PI) * wave;
            vertex(x, y);
        }
        endShape();
    }
}

function drawRingFlora() {
    let c = color(STROKE_COLOR);
    c.setAlpha(160);
    stroke(c);
    strokeWeight(1.4);
    noFill();

    let ringCount = 5;
    for (let r = 1; r <= ringCount; r++) {
        let radius = NP * (0.1 + r * 0.08);
        beginShape();
        for (let a = 0; a <= 360; a += 4) {
            let ang = radians(a);
            let petal = sin(ang * (6 + r)) * NP * 0.01 * r;
            let rr = radius + petal;
            vertex(cos(ang) * rr, sin(ang) * rr);
        }
        endShape();
    }
}
