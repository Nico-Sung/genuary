// JAN. 10 (credit: Sophia (fractal kitty))
// Polar coordinates — spirales, pétales et ondes
// ----------------------------------------------------
let DESSIN = 215;
let NP = 640;

// ----------------------------------------------------
function setup() {
    PALETTE("NEW_BLUE");
    INIT();
    noLoop();

    background(BG_COLOR);
    translate(NP / 2, NP / 2);
    drawPolarField();
    drawRosettes();
    drawSpiralThreads();
}

// ----------------------------------------------------
function drawPolarField() {
    let rings = 18;
    for (let r = 1; r <= rings; r++) {
        let radius = (r / rings) * NP * 0.46;
        let alpha = 40 + r * 6;
        let c = color(STROKE_COLOR);
        c.setAlpha(alpha);
        stroke(c);
        noFill();
        beginShape();
        for (let a = 0; a <= 360; a += 3) {
            let angle = radians(a);
            let wobble = sin(angle * 3 + r * 0.4) * (NP * 0.003 * r);
            let rr = radius + wobble;
            vertex(rr * cos(angle), rr * sin(angle));
        }
        endShape();
    }
}

function drawRosettes() {
    let petals = [5, 7, 9, 11];
    for (let i = 0; i < petals.length; i++) {
        let k = petals[i];
        let radius = NP * (0.12 + i * 0.09);
        let c = color(STROKE_COLOR);
        c.setAlpha(140 - i * 20);
        stroke(c);
        noFill();
        beginShape();
        for (let a = 0; a <= 360; a += 2) {
            let angle = radians(a);
            let rr = radius * cos(k * angle);
            vertex(rr * cos(angle), rr * sin(angle));
        }
        endShape();
    }
}

function drawSpiralThreads() {
    let threads = 6;
    for (let t = 0; t < threads; t++) {
        let phase = t * (TWO_PI / threads);
        let c = color(STROKE_COLOR);
        c.setAlpha(200 - t * 20);
        stroke(c);
        noFill();
        beginShape();
        for (let a = 0; a <= 720; a += 4) {
            let angle = radians(a);
            let rr = NP * 0.02 + angle * NP * 0.045;
            let ripple = sin(angle * 4 + phase) * NP * 0.02;
            let r = rr + ripple;
            vertex(r * cos(angle + phase), r * sin(angle + phase));
        }
        endShape();
    }
}
