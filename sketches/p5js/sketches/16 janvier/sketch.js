// JAN. 16 (credit: Ivan Dianov)
// Order and disorder — ordre et chaos en équilibre
// ----------------------------------------------------
let DESSIN = 252;
let NP = 640;

// ----------------------------------------------------
function setup() {
    PALETTE("NEW_BLUE");
    INIT();
    noLoop();

    background(BG_COLOR);
    translate(NP / 2, NP / 2);

    drawOrderedGrid();
    drawTransitionZone();
    drawChaoticParticles();
    drawDisruptionWaves();
    drawOrderRestored();
}

// ----------------------------------------------------
function drawOrderedGrid() {
    // Zone d'ordre pur - grille parfaite
    let c = color(STROKE_COLOR);
    c.setAlpha(180);
    stroke(c);
    strokeWeight(1);
    noFill();

    let spacing = NP * 0.04;
    let cols = 8;
    let rows = 8;
    let startX = (-cols * spacing) / 2;
    let startY = (-rows * spacing) / 2;

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            let px = startX + x * spacing;
            let py = startY + y * spacing;

            // Distance du centre
            let d = dist(px, py, 0, 0) / (NP * 0.4);

            if (d < 0.4) {
                // Zone d'ordre parfait
                rect(
                    px - spacing * 0.4,
                    py - spacing * 0.4,
                    spacing * 0.8,
                    spacing * 0.8,
                );

                c.setAlpha(220);
                fill(c);
                ellipse(px, py, spacing * 0.15, spacing * 0.15);
                noFill();
            }
        }
    }
}

function drawTransitionZone() {
    // Zone de transition - ordre qui se dégrade
    randomSeed(42);
    let rings = 15;

    for (let r = 5; r < rings; r++) {
        let radius = r * NP * 0.025;
        let points = floor(r * 6);
        let chaos = map(r, 5, rings, 0, 1);

        let c = color(STROKE_COLOR);
        c.setAlpha(160 - chaos * 80);
        stroke(c);
        strokeWeight(1.5 - chaos);
        noFill();

        beginShape();
        for (let i = 0; i <= points; i++) {
            let angle = (TWO_PI * i) / points;
            let noise_val = noise(r * 0.3, i * 0.2);
            let offset = chaos * NP * 0.08 * (noise_val - 0.5);
            let rr = radius + offset;
            let px = cos(angle) * rr;
            let py = sin(angle) * rr;
            vertex(px, py);
        }
        endShape();

        // Points qui deviennent désordonnés
        if (random() < chaos) {
            c.setAlpha(100 + chaos * 80);
            fill(c);
            noStroke();
            for (let i = 0; i < points; i++) {
                if (random() < 0.3) {
                    let angle =
                        (TWO_PI * i) / points +
                        random(-chaos * 0.5, chaos * 0.5);
                    let rr =
                        radius + random(-chaos * NP * 0.05, chaos * NP * 0.05);
                    let px = cos(angle) * rr;
                    let py = sin(angle) * rr;
                    ellipse(
                        px,
                        py,
                        NP * 0.008 * (1 + chaos),
                        NP * 0.008 * (1 + chaos),
                    );
                }
            }
        }
    }
}

function drawChaoticParticles() {
    // Zone de chaos pur
    randomSeed(84);
    let count = 120;

    for (let i = 0; i < count; i++) {
        let angle = random(TWO_PI);
        let r = random(NP * 0.25, NP * 0.42);
        let x = cos(angle) * r;
        let y = sin(angle) * r;

        let c = color(STROKE_COLOR);
        c.setAlpha(random(60, 180));

        if (random() < 0.6) {
            // Lignes désordonnées
            stroke(c);
            strokeWeight(random(0.5, 2));
            let len = random(NP * 0.02, NP * 0.08);
            let a = random(TWO_PI);
            line(x, y, x + cos(a) * len, y + sin(a) * len);
        } else {
            // Points erratiques
            noStroke();
            fill(c);
            let size = random(NP * 0.003, NP * 0.015);
            ellipse(x, y, size, size);
        }
    }
}

function drawDisruptionWaves() {
    // Ondes de disruption qui brisent l'ordre
    let waves = 8;

    for (let w = 0; w < waves; w++) {
        let angle = (w * TWO_PI) / waves;
        let c = color(STROKE_COLOR);
        c.setAlpha(100 - w * 10);
        stroke(c);
        strokeWeight(2 - w * 0.2);
        noFill();

        beginShape();
        for (let i = 0; i <= 50; i++) {
            let t = i / 50;
            let r = t * NP * 0.4;
            let a = angle + sin(t * PI * 6) * 0.3;
            let px = cos(a) * r;
            let py = sin(a) * r;
            vertex(px, py);
        }
        endShape();
    }
}

function drawOrderRestored() {
    // Îlots d'ordre au milieu du chaos
    randomSeed(126);
    let clusters = 6;

    for (let c = 0; c < clusters; c++) {
        let angle = (c * TWO_PI) / clusters + random(-0.3, 0.3);
        let dist_c = NP * 0.32 + random(-NP * 0.05, NP * 0.05);
        let cx = cos(angle) * dist_c;
        let cy = sin(angle) * dist_c;

        push();
        translate(cx, cy);
        rotate(random(TWO_PI));

        // Mini grille ordonnée
        let col = color(STROKE_COLOR);
        col.setAlpha(140);
        stroke(col);
        strokeWeight(0.8);
        noFill();

        let miniSize = NP * 0.04;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                let x = i * miniSize * 0.5;
                let y = j * miniSize * 0.5;
                rect(
                    x - miniSize * 0.15,
                    y - miniSize * 0.15,
                    miniSize * 0.3,
                    miniSize * 0.3,
                );
            }
        }

        // Cadre qui contient l'ordre
        col.setAlpha(180);
        stroke(col);
        strokeWeight(1.5);
        rect(-miniSize, -miniSize, miniSize * 2, miniSize * 2);

        pop();
    }

    // Symbole central - équilibre
    let c = color(STROKE_COLOR);
    c.setAlpha(200);
    stroke(c);
    strokeWeight(2);
    noFill();
    ellipse(0, 0, NP * 0.12, NP * 0.12);

    // Yin-yang de l'ordre/désordre
    c.setAlpha(180);
    fill(c);
    arc(0, 0, NP * 0.12, NP * 0.12, -HALF_PI, HALF_PI);
    noFill();

    c.setAlpha(220);
    fill(c);
    ellipse(0, -NP * 0.03, NP * 0.025, NP * 0.025);
    noFill();

    stroke(c);
    strokeWeight(1);
    ellipse(0, NP * 0.03, NP * 0.025, NP * 0.025);
}
