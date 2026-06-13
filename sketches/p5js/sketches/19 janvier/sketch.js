// JAN. 19 (credit: Jos Vromans)
// 16x16 — grille de 16 par 16 cellules
// ----------------------------------------------------
let DESSIN = 240;
let NP = 640;

// ----------------------------------------------------
function setup() {
    PALETTE("NEW_BLUE");
    INIT();
    noLoop();

    background(BG_COLOR);

    let grid = 16;
    let cellSize = NP / grid;

    drawGrid16x16(grid, cellSize);
    drawPatternOverlay(grid, cellSize);
}

// ----------------------------------------------------
function drawGrid16x16(grid, cellSize) {
    randomSeed(42);

    for (let row = 0; row < grid; row++) {
        for (let col = 0; col < grid; col++) {
            let x = col * cellSize;
            let y = row * cellSize;

            // Position relative au centre
            let centerDist = dist(col, row, grid / 2, grid / 2) / (grid / 2);

            // Pattern basé sur la position
            let pattern = (row * grid + col) % 5;

            push();
            translate(x + cellSize / 2, y + cellSize / 2);

            let c = color(STROKE_COLOR);

            if (pattern === 0) {
                // Cercle plein
                c.setAlpha(120 + centerDist * 80);
                fill(c);
                noStroke();
                ellipse(0, 0, cellSize * 0.6, cellSize * 0.6);
            } else if (pattern === 1) {
                // Carré tourné
                c.setAlpha(140 + centerDist * 60);
                stroke(c);
                strokeWeight(1);
                noFill();
                push();
                rotate(PI / 4);
                rect(
                    -cellSize * 0.3,
                    -cellSize * 0.3,
                    cellSize * 0.6,
                    cellSize * 0.6,
                );
                pop();
            } else if (pattern === 2) {
                // Diagonales
                c.setAlpha(130 + centerDist * 70);
                stroke(c);
                strokeWeight(1.5);
                line(
                    -cellSize * 0.3,
                    -cellSize * 0.3,
                    cellSize * 0.3,
                    cellSize * 0.3,
                );
                line(
                    -cellSize * 0.3,
                    cellSize * 0.3,
                    cellSize * 0.3,
                    -cellSize * 0.3,
                );
            } else if (pattern === 3) {
                // Cercle vide avec centre
                c.setAlpha(150 + centerDist * 50);
                stroke(c);
                strokeWeight(1);
                noFill();
                ellipse(0, 0, cellSize * 0.7, cellSize * 0.7);
                c.setAlpha(180);
                fill(c);
                ellipse(0, 0, cellSize * 0.15, cellSize * 0.15);
            } else {
                // Lignes concentriques
                c.setAlpha(140);
                stroke(c);
                strokeWeight(0.8);
                noFill();
                for (let r = 1; r <= 3; r++) {
                    rect(
                        -cellSize * 0.1 * r,
                        -cellSize * 0.1 * r,
                        cellSize * 0.2 * r,
                        cellSize * 0.2 * r,
                    );
                }
            }

            pop();
        }
    }
}

function drawPatternOverlay(grid, cellSize) {
    // Lignes de grille principales
    let c = color(STROKE_COLOR);
    c.setAlpha(60);
    stroke(c);
    strokeWeight(0.5);

    for (let i = 0; i <= grid; i++) {
        line(i * cellSize, 0, i * cellSize, NP);
        line(0, i * cellSize, NP, i * cellSize);
    }

    // Lignes de subdivision à chaque 4 cellules
    c.setAlpha(100);
    stroke(c);
    strokeWeight(1.5);

    for (let i = 0; i <= grid; i += 4) {
        line(i * cellSize, 0, i * cellSize, NP);
        line(0, i * cellSize, NP, i * cellSize);
    }

    // Cadre extérieur
    c.setAlpha(180);
    stroke(c);
    strokeWeight(2);
    noFill();
    rect(0, 0, NP, NP);

    // Motifs dans les zones 4x4
    drawQuadrantPatterns(grid, cellSize);

    // Numérotation subtile
    drawCellNumbers(grid, cellSize);
}

function drawQuadrantPatterns(grid, cellSize) {
    randomSeed(84);

    for (let qRow = 0; qRow < 4; qRow++) {
        for (let qCol = 0; qCol < 4; qCol++) {
            let x = qCol * 4 * cellSize + 2 * cellSize;
            let y = qRow * 4 * cellSize + 2 * cellSize;

            let c = color(STROKE_COLOR);
            c.setAlpha(80);
            stroke(c);
            strokeWeight(1);
            noFill();

            push();
            translate(x, y);

            // Pattern différent pour chaque quadrant 4x4
            let patternType = (qRow + qCol) % 4;

            if (patternType === 0) {
                // Cercles concentriques
                for (let r = 1; r <= 3; r++) {
                    ellipse(0, 0, cellSize * r * 1.2, cellSize * r * 1.2);
                }
            } else if (patternType === 1) {
                // Étoile
                for (let a = 0; a < 8; a++) {
                    let angle = (a * TWO_PI) / 8;
                    line(
                        0,
                        0,
                        cos(angle) * cellSize * 1.5,
                        sin(angle) * cellSize * 1.5,
                    );
                }
            } else if (patternType === 2) {
                // Carré tournant
                for (let r = 1; r <= 3; r++) {
                    push();
                    rotate(r * 0.2);
                    rect(
                        -cellSize * r * 0.5,
                        -cellSize * r * 0.5,
                        cellSize * r,
                        cellSize * r,
                    );
                    pop();
                }
            } else {
                // Spirale
                beginShape();
                for (let t = 0; t < TWO_PI * 2; t += 0.2) {
                    let r = t * cellSize * 0.15;
                    vertex(cos(t) * r, sin(t) * r);
                }
                endShape();
            }

            pop();
        }
    }
}

function drawCellNumbers(grid, cellSize) {
    let c = color(STROKE_COLOR);
    c.setAlpha(40);
    fill(c);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(cellSize * 0.2);

    // Numéroter quelques cellules clés
    for (let i = 0; i < grid; i++) {
        if (i % 4 === 0) {
            // En haut
            text(i, i * cellSize + cellSize / 2, cellSize * 0.3);
            // À gauche
            text(i, cellSize * 0.3, i * cellSize + cellSize / 2);
        }
    }

    // Marquer les coins
    c.setAlpha(180);
    fill(c);
    textSize(cellSize * 0.25);
    text("0,0", cellSize * 0.5, cellSize * 0.5);
    text("15,0", NP - cellSize * 0.5, cellSize * 0.5);
    text("0,15", cellSize * 0.5, NP - cellSize * 0.5);
    text("15,15", NP - cellSize * 0.5, NP - cellSize * 0.5);
}
