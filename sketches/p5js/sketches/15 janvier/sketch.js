// JAN. 15 (credit: P1xelboy)
// Invisible object — objets invisibles révélés par leurs ombres
// ----------------------------------------------------
let DESSIN = 212;
let NP = 640;

// ----------------------------------------------------
function setup() {
    PALETTE("NEW_BLUE");
    INIT();
    noLoop();

    background(BG_COLOR);

    let lightAngle = -PI / 4;
    let lightX = cos(lightAngle);
    let lightY = sin(lightAngle);

    drawGroundPlane();
    drawInvisibleSphere(NP * 0.3, NP * 0.25, 0.12, lightX, lightY);
    drawInvisibleCube(NP * 0.55, NP * 0.4, 0.08, lightX, lightY);
    drawInvisibleCylinder(NP * 0.45, NP * 0.6, 0.06, lightX, lightY);
    drawInvisibleTorus(NP * 0.65, NP * 0.7, 0.1, lightX, lightY);
    drawFloatingShadows(lightX, lightY);
}

// ----------------------------------------------------
function drawGroundPlane() {
    let c = color(STROKE_COLOR);
    c.setAlpha(30);
    fill(c);
    noStroke();
    rect(0, NP * 0.55, NP, NP * 0.45);

    // Lignes de grille
    c.setAlpha(40);
    stroke(c);
    strokeWeight(0.5);
    for (let i = 0; i <= 10; i++) {
        let y = NP * 0.55 + i * NP * 0.045;
        line(0, y, NP, y);
    }
    for (let i = 0; i <= 12; i++) {
        let x = (i * NP) / 12;
        line(x, NP * 0.55, x, NP);
    }
}

function drawInvisibleSphere(x, y, size, lx, ly) {
    let radius = NP * size;
    let shadowOffset = radius * 0.8;
    let sx = x + lx * shadowOffset;
    let sy = NP * 0.78 + ly * shadowOffset * 0.3;

    let c = color(STROKE_COLOR);
    c.setAlpha(140);
    fill(c);
    noStroke();

    ellipse(sx, sy, radius * 1.8, radius * 0.6);

    // Ombre diffuse
    c.setAlpha(60);
    fill(c);
    ellipse(sx, sy, radius * 2.4, radius * 0.9);

    // Indicateurs subtils de position
    c.setAlpha(25);
    stroke(c);
    strokeWeight(1);
    noFill();
    for (let r = 1; r <= 3; r++) {
        ellipse(x, y, radius * 2 * r * 0.4, radius * 2 * r * 0.4);
    }
}

function drawInvisibleCube(x, y, size, lx, ly) {
    let s = NP * size;
    let shadowOffset = s * 1.2;
    let sx = x + lx * shadowOffset;
    let sy = NP * 0.78 + ly * shadowOffset * 0.3;

    let c = color(STROKE_COLOR);
    c.setAlpha(160);
    fill(c);
    noStroke();

    push();
    translate(sx, sy);
    rotate(PI / 4);
    rect(-s * 0.7, -s * 0.3, s * 1.4, s * 0.6);
    pop();

    // Ombre diffuse
    c.setAlpha(70);
    fill(c);
    push();
    translate(sx, sy);
    rotate(PI / 4);
    rect(-s * 0.9, -s * 0.45, s * 1.8, s * 0.9);
    pop();

    // Position hints
    c.setAlpha(30);
    stroke(c);
    strokeWeight(0.8);
    noFill();
    rect(x - s, y - s, s * 2, s * 2);
}

function drawInvisibleCylinder(x, y, size, lx, ly) {
    let radius = NP * size;
    let height = radius * 2;
    let shadowOffset = height * 0.6;
    let sx = x + lx * shadowOffset;
    let sy = NP * 0.78 + ly * shadowOffset * 0.3;

    let c = color(STROKE_COLOR);
    c.setAlpha(150);
    fill(c);
    noStroke();

    ellipse(sx, sy, radius * 2, radius * 0.8);
    rect(sx - radius, sy - radius * 0.4, radius * 2, radius * 0.8);

    // Ombre diffuse
    c.setAlpha(65);
    fill(c);
    ellipse(sx, sy, radius * 2.6, radius * 1.2);

    // Position hints - cercles concentriques
    c.setAlpha(35);
    stroke(c);
    strokeWeight(0.8);
    noFill();
    ellipse(x, y, radius * 2, radius * 2);
    ellipse(x, y + height * 0.5, radius * 2, radius * 2);
}

function drawInvisibleTorus(x, y, size, lx, ly) {
    let radius = NP * size;
    let shadowOffset = radius * 0.9;
    let sx = x + lx * shadowOffset;
    let sy = NP * 0.78 + ly * shadowOffset * 0.3;

    let c = color(STROKE_COLOR);
    c.setAlpha(130);
    fill(c);
    noStroke();

    // Anneau d'ombre
    for (let a = 0; a < TWO_PI; a += 0.1) {
        let r = radius * 0.8 + cos(a * 3) * radius * 0.2;
        let px = sx + cos(a) * r;
        let py = sy + sin(a) * r * 0.4;
        ellipse(px, py, radius * 0.3, radius * 0.15);
    }

    // Ombre centrale
    c.setAlpha(90);
    fill(c);
    ellipse(sx, sy, radius * 0.8, radius * 0.3);

    // Position hints
    c.setAlpha(40);
    stroke(c);
    strokeWeight(1);
    noFill();
    ellipse(x, y, radius * 2, radius * 2);
    ellipse(x, y, radius * 1.2, radius * 1.2);
}

function drawFloatingShadows(lx, ly) {
    randomSeed(42);
    let particles = 25;

    for (let i = 0; i < particles; i++) {
        let px = random(NP * 0.15, NP * 0.85);
        let py = random(NP * 0.2, NP * 0.5);
        let size = random(NP * 0.01, NP * 0.04);

        let shadowOffset = size * random(8, 15);
        let sx = px + lx * shadowOffset;
        let sy = NP * 0.78 + ly * shadowOffset * 0.3;

        let c = color(STROKE_COLOR);
        c.setAlpha(random(80, 140));
        fill(c);
        noStroke();

        if (random() < 0.5) {
            ellipse(sx, sy, size * 2, size * 0.6);
        } else {
            rect(sx - size * 0.7, sy - size * 0.3, size * 1.4, size * 0.6);
        }

        // Lignes de connexion subtiles
        c.setAlpha(20);
        stroke(c);
        strokeWeight(0.5);
        line(px, py, sx, sy);
    }
}
