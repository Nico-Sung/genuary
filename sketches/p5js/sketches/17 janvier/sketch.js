// JAN. 17 (credit: Ivan Dianov)
// Wallpaper group — pavage avec symétries planaires
// ----------------------------------------------------
let DESSIN = 242;
let NP = 640;

// ----------------------------------------------------
function setup() {
    PALETTE("NEW_BLUE");
    INIT();
    noLoop();

    background(BG_COLOR);

    // Pavage P4M (symétrie carrée avec miroirs)
    drawP4MPattern();
}

// ----------------------------------------------------
function drawP4MPattern() {
    // P4M: 4-fold rotation + miroir (comme les carreaux de céramique)
    let tileSize = NP / 8;

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            let x = col * tileSize;
            let y = row * tileSize;

            push();
            translate(x + tileSize / 2, y + tileSize / 2);

            // Pattern de base avec symétrie 4-fold
            for (let rot = 0; rot < 4; rot++) {
                push();
                rotate(rot * HALF_PI);
                drawMotif(tileSize);

                // Miroir
                push();
                scale(-1, 1);
                drawMotif(tileSize);
                pop();

                pop();
            }

            pop();
        }
    }

    // Ajouter des détails P3M1 dans les coins (symétrie triangulaire)
    drawP3M1Corner(NP * 0.1, NP * 0.1, NP * 0.15);
    drawP3M1Corner(NP * 0.9, NP * 0.1, NP * 0.15);
    drawP3M1Corner(NP * 0.1, NP * 0.9, NP * 0.15);
    drawP3M1Corner(NP * 0.9, NP * 0.9, NP * 0.15);
}

function drawMotif(size) {
    let c = color(STROKE_COLOR);
    c.setAlpha(140);
    stroke(c);
    strokeWeight(1);
    noFill();

    let s = size * 0.35;

    // Forme de base
    beginShape();
    vertex(0, -s * 0.3);
    bezierVertex(s * 0.2, -s * 0.4, s * 0.4, -s * 0.2, s * 0.3, 0);
    bezierVertex(s * 0.4, s * 0.2, s * 0.2, s * 0.4, 0, s * 0.3);
    endShape();

    // Détails
    c.setAlpha(180);
    stroke(c);
    line(0, -s * 0.2, s * 0.15, -s * 0.15);
    line(s * 0.15, -s * 0.15, s * 0.2, 0);

    c.setAlpha(100);
    fill(c);
    noStroke();
    ellipse(s * 0.15, -s * 0.08, s * 0.08, s * 0.08);
}

function drawP3M1Corner(x, y, size) {
    // P3M1: 3-fold rotation avec miroirs (comme un kaleidoscope)
    push();
    translate(x, y);

    let c = color(STROKE_COLOR);
    c.setAlpha(160);
    stroke(c);
    strokeWeight(1.5);
    noFill();

    for (let i = 0; i < 3; i++) {
        push();
        rotate((i * TWO_PI) / 3);

        // Triangle avec miroir
        for (let mirror = 0; mirror < 2; mirror++) {
            push();
            if (mirror === 1) scale(-1, 1);

            beginShape();
            vertex(0, 0);
            vertex(size * 0.8, 0);
            vertex(size * 0.4, -size * 0.7);
            endShape(CLOSE);

            // Détails internes
            c.setAlpha(120);
            stroke(c);
            line(size * 0.2, -size * 0.1, size * 0.4, -size * 0.35);

            c.setAlpha(140);
            fill(c);
            noStroke();
            ellipse(size * 0.4, -size * 0.2, size * 0.1, size * 0.1);

            c.setAlpha(160);
            stroke(c);
            noFill();

            pop();
        }

        pop();
    }

    // Centre
    c.setAlpha(200);
    fill(c);
    noStroke();
    ellipse(0, 0, size * 0.15, size * 0.15);

    pop();
}

// Fonction alternative: P6M (symétrie hexagonale - la plus complexe)
function drawP6MHoneycomb() {
    let hexSize = NP * 0.08;
    let hexH = hexSize * sqrt(3);

    for (let row = -2; row < 10; row++) {
        for (let col = -2; col < 10; col++) {
            let x = col * hexSize * 1.5 + NP * 0.1;
            let y = row * hexH + ((col % 2) * hexH) / 2 + NP * 0.1;

            if (
                x > -hexSize &&
                x < NP + hexSize &&
                y > -hexSize &&
                y < NP + hexSize
            ) {
                drawP6MHexMotif(x, y, hexSize);
            }
        }
    }
}

function drawP6MHexMotif(x, y, size) {
    push();
    translate(x, y);

    let c = color(STROKE_COLOR);

    // 6-fold rotation avec miroirs
    for (let i = 0; i < 6; i++) {
        push();
        rotate((i * TWO_PI) / 6);

        for (let mirror = 0; mirror < 2; mirror++) {
            push();
            if (mirror === 1) scale(-1, 1);

            // Pétale
            c.setAlpha(140);
            stroke(c);
            strokeWeight(0.8);
            noFill();

            beginShape();
            vertex(0, 0);
            bezierVertex(
                size * 0.3,
                -size * 0.1,
                size * 0.4,
                -size * 0.3,
                size * 0.5,
                -size * 0.5,
            );
            vertex(size * 0.4, -size * 0.4);
            bezierVertex(
                size * 0.2,
                -size * 0.2,
                size * 0.1,
                -size * 0.1,
                0,
                0,
            );
            endShape();

            c.setAlpha(180);
            fill(c);
            noStroke();
            ellipse(size * 0.25, -size * 0.25, size * 0.08, size * 0.08);

            pop();
        }

        pop();
    }

    // Hexagone central
    c.setAlpha(200);
    stroke(c);
    strokeWeight(1);
    noFill();
    beginShape();
    for (let i = 0; i < 6; i++) {
        let angle = (i * TWO_PI) / 6;
        vertex(cos(angle) * size * 0.2, sin(angle) * size * 0.2);
    }
    endShape(CLOSE);

    pop();
}
