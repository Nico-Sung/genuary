// JAN. 18 (credit: Baret LaVida)
// Unexpected path — chemins qui changent selon des règles simples
// ----------------------------------------------------
let DESSIN = 243;
let NP = 640;

// ----------------------------------------------------
function setup() {
    PALETTE("NEW_BLUE");
    INIT();
    noLoop();

    background(BG_COLOR);
    translate(NP / 2, NP / 2);

    drawPathWithModuloRule();
    drawPathWithDistanceRule();
    drawPathWithPrimeRule();
    drawPathWithBitRule();
}

// ----------------------------------------------------
// Règle 1: Tourner selon modulo de la position
function drawPathWithModuloRule() {
    let x = -NP * 0.35;
    let y = -NP * 0.35;
    let angle = 0;
    let step = NP * 0.012;
    let steps = 180;

    let c = color(STROKE_COLOR);
    c.setAlpha(160);
    stroke(c);
    strokeWeight(1.5);
    noFill();

    beginShape();
    vertex(x, y);

    for (let i = 0; i < steps; i++) {
        // Règle simple: tourner selon (i % 7)
        let turnAmount = ((i % 7) - 3) * 0.3;
        angle += turnAmount;

        x += cos(angle) * step;
        y += sin(angle) * step;
        vertex(x, y);

        // Marqueur tous les 10 pas
        if (i % 10 === 0) {
            c.setAlpha(200);
            fill(c);
            noStroke();
            ellipse(x, y, step * 0.6, step * 0.6);
            c.setAlpha(160);
            stroke(c);
            noFill();
        }
    }
    endShape();
}

// Règle 2: Tourner selon la distance au centre
function drawPathWithDistanceRule() {
    let x = NP * 0.35;
    let y = -NP * 0.35;
    let angle = PI;
    let step = NP * 0.011;
    let steps = 200;

    let c = color(STROKE_COLOR);
    c.setAlpha(140);
    stroke(c);
    strokeWeight(1.2);
    noFill();

    beginShape();
    vertex(x, y);

    for (let i = 0; i < steps; i++) {
        let d = dist(x, y, 0, 0);
        // Règle simple: tourner plus fort quand on est loin du centre
        let turnAmount = map(d, 0, NP * 0.5, -0.1, 0.5);
        angle += turnAmount;

        x += cos(angle) * step;
        y += sin(angle) * step;
        vertex(x, y);
    }
    endShape();

    // Point de départ
    c.setAlpha(200);
    fill(c);
    noStroke();
    ellipse(NP * 0.35, -NP * 0.35, step * 0.8, step * 0.8);
}

// Règle 3: Tourner uniquement aux nombres premiers
function drawPathWithPrimeRule() {
    let x = -NP * 0.35;
    let y = NP * 0.35;
    let angle = HALF_PI;
    let step = NP * 0.013;
    let steps = 150;

    let c = color(STROKE_COLOR);
    c.setAlpha(150);
    stroke(c);
    strokeWeight(1.3);
    noFill();

    beginShape();
    vertex(x, y);

    for (let i = 1; i <= steps; i++) {
        // Règle simple: tourner de 90° si i est premier
        if (isPrime(i)) {
            angle += HALF_PI;
            // Marqueur aux nombres premiers
            c.setAlpha(220);
            fill(c);
            noStroke();
            ellipse(x, y, step * 0.7, step * 0.7);
            c.setAlpha(150);
            stroke(c);
            noFill();
        }

        x += cos(angle) * step;
        y += sin(angle) * step;
        vertex(x, y);
    }
    endShape();
}

function isPrime(n) {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    for (let i = 3; i <= sqrt(n); i += 2) {
        if (n % i === 0) return false;
    }
    return true;
}

// Règle 4: Tourner selon les bits de la position
function drawPathWithBitRule() {
    let x = NP * 0.35;
    let y = NP * 0.35;
    let angle = PI;
    let step = NP * 0.01;
    let steps = 220;

    let c = color(STROKE_COLOR);
    c.setAlpha(145);
    stroke(c);
    strokeWeight(1.1);
    noFill();

    beginShape();
    vertex(x, y);

    for (let i = 0; i < steps; i++) {
        // Règle simple: compter les bits à 1 dans i
        let bitCount = countBits(i);
        let turnAmount = map(bitCount, 0, 8, -0.4, 0.4);
        angle += turnAmount;

        x += cos(angle) * step;
        y += sin(angle) * step;
        vertex(x, y);

        // Marqueur quand tous les bits sont pairs
        if (bitCount % 2 === 0 && i % 15 === 0) {
            c.setAlpha(180);
            fill(c);
            noStroke();
            ellipse(x, y, step * 0.5, step * 0.5);
            c.setAlpha(145);
            stroke(c);
            noFill();
        }
    }
    endShape();
}

function countBits(n) {
    let count = 0;
    while (n > 0) {
        count += n & 1;
        n >>= 1;
    }
    return count;
}

// Chemin central qui combine plusieurs règles
function drawCentralPath() {
    let x = 0;
    let y = -NP * 0.15;
    let angle = HALF_PI;
    let step = NP * 0.008;
    let steps = 300;

    let c = color(STROKE_COLOR);
    c.setAlpha(180);
    stroke(c);
    strokeWeight(2);
    noFill();

    beginShape();
    vertex(x, y);

    for (let i = 0; i < steps; i++) {
        // Règle combinée: plusieurs conditions simples
        let turn = 0;

        if (i % 3 === 0) turn += 0.2;
        if (i % 5 === 0) turn -= 0.3;
        if (i % 7 === 0) turn += 0.4;

        angle += turn;

        x += cos(angle) * step;
        y += sin(angle) * step;
        vertex(x, y);
    }
    endShape();

    c.setAlpha(220);
    fill(c);
    noStroke();
    ellipse(0, -NP * 0.15, step * 1.5, step * 1.5);
}
