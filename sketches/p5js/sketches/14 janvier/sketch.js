// JAN. 14 (credit: Roni)
// Everything fits perfectly — tessellation et emboîtement parfait
// ----------------------------------------------------
let DESSIN = 210;
let NP = 640;

// ----------------------------------------------------
function setup() {
    PALETTE("NEW_BLUE");
    INIT();
    noLoop();

    background(BG_COLOR);
    translate(NP / 2, NP / 2);

    drawHexagonTiling();
    drawInterlockingCircles();
    drawPerfectSquares();
    drawTriangleMosaic();
}

// ----------------------------------------------------
function drawHexagonTiling() {
    let hexSize = NP * 0.05;
    let hexH = hexSize * sqrt(3);
    let cols = 14;
    let rows = 12;

    let startX = -cols * hexSize * 0.75;
    let startY = -rows * hexH * 0.5;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            let x = startX + col * hexSize * 1.5;
            let y = startY + row * hexH + ((col % 2) * hexH) / 2;

            let d = dist(x, y, 0, 0) / (NP * 0.5);
            if (d < 0.7) {
                let c = color(STROKE_COLOR);
                c.setAlpha(100 + d * 80);
                stroke(c);
                strokeWeight(1);
                noFill();

                drawHexagon(x, y, hexSize);
            }
        }
    }
}

function drawHexagon(x, y, r) {
    beginShape();
    for (let i = 0; i < 6; i++) {
        let angle = (TWO_PI / 6) * i;
        let px = x + cos(angle) * r;
        let py = y + sin(angle) * r;
        vertex(px, py);
    }
    endShape(CLOSE);
}

function drawInterlockingCircles() {
    let radius = NP * 0.08;
    let spacing = radius * 1.8;
    let rings = 4;

    for (let ring = 1; ring <= rings; ring++) {
        let count = ring * 6;
        for (let i = 0; i < count; i++) {
            let angle = (TWO_PI * i) / count;
            let x = cos(angle) * spacing * ring;
            let y = sin(angle) * spacing * ring;

            let c = color(STROKE_COLOR);
            c.setAlpha(140 - ring * 20);
            stroke(c);
            strokeWeight(1.5);
            noFill();

            ellipse(x, y, radius * 2, radius * 2);

            // Arcs d'interconnexion
            if (i % 2 === 0) {
                let nextAngle = (TWO_PI * (i + 1)) / count;
                let nx = cos(nextAngle) * spacing * ring;
                let ny = sin(nextAngle) * spacing * ring;
                let midX = (x + nx) / 2;
                let midY = (y + ny) / 2;

                c.setAlpha(80);
                stroke(c);
                strokeWeight(0.8);
                arc(midX, midY, radius * 0.8, radius * 0.8, angle, angle + PI);
            }
        }
    }
}

function drawPerfectSquares() {
    let baseSize = NP * 0.22;
    let layers = 6;

    for (let i = 0; i < layers; i++) {
        let size = baseSize - i * NP * 0.032;
        let angle = i * 0.15;

        let c = color(STROKE_COLOR);
        c.setAlpha(180 - i * 25);
        stroke(c);
        strokeWeight(1.8 - i * 0.2);
        noFill();

        push();
        rotate(angle);
        rect(-size / 2, -size / 2, size, size);

        // Coins emboîtés
        let cornerSize = size * 0.12;
        for (let corner = 0; corner < 4; corner++) {
            push();
            rotate(corner * HALF_PI);
            translate(size / 2, size / 2);
            rect(-cornerSize, -cornerSize, cornerSize, cornerSize);
            pop();
        }
        pop();
    }
}

function drawTriangleMosaic() {
    let triSize = NP * 0.15;
    let positions = [
        [0, -NP * 0.35],
        [NP * 0.3, -NP * 0.2],
        [NP * 0.3, NP * 0.2],
        [0, NP * 0.35],
        [-NP * 0.3, NP * 0.2],
        [-NP * 0.3, -NP * 0.2],
    ];

    for (let i = 0; i < positions.length; i++) {
        let [x, y] = positions[i];
        let angle = atan2(y, x) + HALF_PI;

        let c = color(STROKE_COLOR);
        c.setAlpha(120);
        stroke(c);
        strokeWeight(1.2);

        if (i % 2 === 0) {
            fill(c);
        } else {
            noFill();
        }

        push();
        translate(x, y);
        rotate(angle);
        drawTriangle(0, 0, triSize);
        pop();
    }
}

function drawTriangle(x, y, size) {
    let h = (size * sqrt(3)) / 2;
    beginShape();
    vertex(x, y - h / 1.5);
    vertex(x - size / 2, y + h / 3);
    vertex(x + size / 2, y + h / 3);
    endShape(CLOSE);
}
