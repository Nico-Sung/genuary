// JAN. 13 (credit: Jos Vromans)
// Self portrait — autoportrait génératif avec variations
// ----------------------------------------------------
let DESSIN = 208;
let NP = 640;

// ----------------------------------------------------
function setup() {
    PALETTE("NEW_BLUE");
    INIT();
    noLoop();

    background(BG_COLOR);

    let cols = 3;
    let rows = 2;
    let margin = NP * 0.05;
    let spacing = (NP - 2 * margin) / cols;

    randomSeed(42);

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let x = margin + c * spacing + spacing / 2;
            let y = margin + r * spacing + spacing / 2;

            push();
            translate(x, y);
            let scale_factor = spacing / (NP * 0.35);
            scale(scale_factor);
            drawPortrait(c + r * cols);
            pop();
        }
    }
}

// ----------------------------------------------------
function drawPortrait(variation) {
    randomSeed(variation + 100);

    let faceW = NP * 0.22;
    let faceH = NP * 0.28;
    let eyeY = -NP * 0.04;
    let eyeSpacing = NP * 0.06;
    let eyeSize = NP * 0.035;

    let hairStyle = variation % 3;
    let eyeShape = floor(random(3));
    let mouthStyle = floor(random(3));

    drawHair(faceW, faceH, hairStyle);
    drawFace(faceW, faceH);
    drawEyes(eyeSpacing, eyeY, eyeSize, eyeShape);
    drawNose();
    drawMouth(mouthStyle);
    drawDetails(variation);
}

function drawHair(faceW, faceH, style) {
    let c = color(STROKE_COLOR);
    c.setAlpha(200);
    fill(c);
    noStroke();

    if (style === 0) {
        for (let i = 0; i < 12; i++) {
            let angle = map(i, 0, 11, -PI * 0.7, -PI * 0.3);
            let x = cos(angle) * faceW * 0.5;
            let y = sin(angle) * faceH * 0.6 - faceH * 0.15;
            ellipse(x, y, faceW * 0.15, faceH * 0.3);
        }
    } else if (style === 1) {
        for (let i = 0; i < 20; i++) {
            let angle = map(i, 0, 19, -PI * 0.8, -PI * 0.2);
            let x = cos(angle) * faceW * 0.5;
            let y = sin(angle) * faceH * 0.6 - faceH * 0.1;
            c.setAlpha(180 + random(-30, 30));
            fill(c);
            ellipse(
                x,
                y,
                faceW * 0.08 + random(-2, 2),
                faceH * 0.4 + random(-5, 5),
            );
        }
    } else {
        arc(0, -faceH * 0.35, faceW * 1.1, faceH * 0.6, 0, PI);
    }
}

function drawFace(w, h) {
    let c = color(STROKE_COLOR);
    c.setAlpha(80);
    fill(c);
    stroke(STROKE_COLOR);
    strokeWeight(2);
    ellipse(0, 0, w, h);
}

function drawEyes(spacing, y, size, shape) {
    let c = color(STROKE_COLOR);
    c.setAlpha(220);
    fill(c);
    noStroke();

    for (let side = -1; side <= 1; side += 2) {
        let x = side * spacing;

        if (shape === 0) {
            ellipse(x, y, size, size);
        } else if (shape === 1) {
            ellipse(x, y, size * 1.3, size * 0.8);
        } else {
            arc(
                x,
                y,
                size * 1.2,
                size * 1.2,
                shape === 2 ? 0 : PI,
                shape === 2 ? PI : TWO_PI,
            );
        }

        c.setAlpha(250);
        fill(c);
        ellipse(x, y, size * 0.5, size * 0.5);

        drawEyelashes(x, y, size, side);
    }
}

function drawEyelashes(x, y, size, side) {
    let c = color(STROKE_COLOR);
    c.setAlpha(180);
    stroke(c);
    strokeWeight(0.8);

    for (let i = 0; i < 5; i++) {
        let angle = map(i, 0, 4, -PI * 0.4, -PI * 0.1);
        let x1 = x + cos(angle) * size * 0.6;
        let y1 = y + sin(angle) * size * 0.6;
        let x2 = x + cos(angle) * size * 1.1;
        let y2 = y + sin(angle) * size * 1.1;
        line(x1, y1, x2, y2);
    }
}

function drawNose() {
    let c = color(STROKE_COLOR);
    c.setAlpha(150);
    stroke(c);
    strokeWeight(1.5);
    noFill();

    arc(0, NP * 0.02, NP * 0.02, NP * 0.04, 0, PI);
    line(-NP * 0.01, NP * 0.02, -NP * 0.015, NP * 0.04);
    line(NP * 0.01, NP * 0.02, NP * 0.015, NP * 0.04);
}

function drawMouth(style) {
    let c = color(STROKE_COLOR);
    c.setAlpha(200);
    stroke(c);
    strokeWeight(2);
    noFill();

    let y = NP * 0.09;
    let w = NP * 0.06;

    if (style === 0) {
        arc(0, y, w, NP * 0.03, 0, PI);
    } else if (style === 1) {
        line(-w * 0.5, y, w * 0.5, y);
    } else {
        beginShape();
        vertex(-w * 0.5, y);
        bezierVertex(
            -w * 0.2,
            y + NP * 0.02,
            w * 0.2,
            y + NP * 0.02,
            w * 0.5,
            y,
        );
        endShape();
    }
}

function drawDetails(variation) {
    let c = color(STROKE_COLOR);
    c.setAlpha(120);
    stroke(c);
    strokeWeight(1);
    noFill();

    if (variation % 2 === 0) {
        arc(-NP * 0.06, -NP * 0.05, NP * 0.05, NP * 0.02, -PI * 0.2, PI * 0.8);
        arc(NP * 0.06, -NP * 0.05, NP * 0.05, NP * 0.02, PI * 0.2, PI * 1.2);
    }

    if (variation % 3 === 1) {
        c.setAlpha(60);
        fill(c);
        noStroke();
        ellipse(-NP * 0.08, NP * 0.05, NP * 0.01, NP * 0.01);
        ellipse(NP * 0.08, NP * 0.05, NP * 0.01, NP * 0.01);
    }
}
