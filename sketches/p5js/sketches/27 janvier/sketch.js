// JAN. 27 (credit: Manuel Larino)
// Lifeform — croissance organique simulée
// ----------------------------------------------------
let DESSIN = 174;

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

    drawLifeform();
}

// ----------------------------------------------------
function drawLifeform() {
    let c = color(STROKE_COLOR);
    c.setAlpha(140);
    stroke(c);
    strokeWeight(1.2);
    noFill();

    // Tronc principal
    growBranch(0, NP * 0.25, -PI / 2, NP * 0.16, 5);

    // Tentacules latéraux
    for (let i = 0; i < 6; i++) {
        let angle = -PI / 2 + (i - 2.5) * 0.35;
        growBranch(0, NP * 0.18, angle, NP * 0.1, 4);
    }

    // Noyau central pulsant
    drawPulsingCore(0, 0, NP * 0.12);
}

function growBranch(x, y, angle, length, depth) {
    if (depth <= 0) return;

    let steps = 20;
    beginShape();
    for (let i = 0; i <= steps; i++) {
        let t = i / steps;
        let wiggle = sin(t * TWO_PI * 2 + depth) * length * 0.08;
        let dx = cos(angle) * (t * length) + cos(angle + HALF_PI) * wiggle;
        let dy = sin(angle) * (t * length) + sin(angle + HALF_PI) * wiggle;
        vertex(x + dx, y + dy);
    }
    endShape();

    let endX = x + cos(angle) * length;
    let endY = y + sin(angle) * length;

    // Ramification
    let newAngle1 = angle + random(-0.6, -0.2);
    let newAngle2 = angle + random(0.2, 0.6);
    growBranch(endX, endY, newAngle1, length * 0.7, depth - 1);
    growBranch(endX, endY, newAngle2, length * 0.7, depth - 1);

    // Bourgeons
    if (depth === 2) {
        let c = color(STROKE_COLOR);
        c.setAlpha(200);
        fill(c);
        noStroke();
        ellipse(endX, endY, length * 0.18, length * 0.18);
        noFill();
        stroke(c);
    }
}

function drawPulsingCore(x, y, r) {
    let c = color(STROKE_COLOR);
    c.setAlpha(180);
    stroke(c);
    strokeWeight(1.4);
    noFill();

    for (let i = 0; i < 5; i++) {
        let rr = r * (0.4 + i * 0.15);
        beginShape();
        for (let a = 0; a <= 360; a += 6) {
            let ang = radians(a);
            let pulse = sin(ang * 6 + i) * rr * 0.08;
            let px = x + cos(ang) * (rr + pulse);
            let py = y + sin(ang) * (rr + pulse);
            vertex(px, py);
        }
        endShape();
    }
}
