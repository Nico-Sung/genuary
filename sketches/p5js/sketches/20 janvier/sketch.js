// JAN. 20 (credit: Jos Vromans)
// One line — une œuvre composée d'une seule ligne continue
// ----------------------------------------------------
let DESSIN = 236;
let NP = 640;

// ----------------------------------------------------
function setup() {
    PALETTE("NEW_BLUE");
    INIT();
    noLoop();

    background(BG_COLOR);
    translate(NP / 2, NP / 2);

    drawContinuousLineArt();
}

// ----------------------------------------------------
function drawContinuousLineArt() {
    // Une seule ligne continue qui crée un portrait abstrait
    let c = color(STROKE_COLOR);
    c.setAlpha(180);
    stroke(c);
    strokeWeight(1.5);
    noFill();

    let points = 3000;
    let x = 0;
    let y = 0;
    let angle = 0;
    let radius = NP * 0.001;

    beginShape();

    for (let i = 0; i < points; i++) {
        let t = i / points;

        // Variation du rayon basée sur plusieurs fonctions
        let r1 = sin(t * TWO_PI * 5) * NP * 0.15;
        let r2 = cos(t * TWO_PI * 7) * NP * 0.1;
        let r3 = sin(t * TWO_PI * 11) * NP * 0.08;

        // Spirale complexe
        radius = NP * 0.01 + t * NP * 0.35;

        // Angle avec modulation
        angle = t * TWO_PI * 12 + sin(t * TWO_PI * 3) * 2;

        // Position de base
        let baseX = cos(angle) * radius;
        let baseY = sin(angle) * radius;

        // Ajout de perturbations harmoniques
        x = baseX + r1 * cos(t * TWO_PI * 3);
        y = baseY + r2 * sin(t * TWO_PI * 4) + r3;

        // Créer des "boucles" occasionnelles
        if (i % 150 === 0 && i > 0) {
            let loopSize = NP * 0.05;
            let loopAngle = t * TWO_PI * 20;
            x += cos(loopAngle) * loopSize;
            y += sin(loopAngle) * loopSize;
        }

        vertex(x, y);

        // Variation de l'opacité le long de la ligne
        if (i % 100 === 0) {
            c.setAlpha(140 + sin(t * TWO_PI * 2) * 60);
            stroke(c);
        }
    }

    endShape();

    // Ajouter un marqueur au début
    c.setAlpha(220);
    fill(c);
    noStroke();
    ellipse(0, 0, NP * 0.015, NP * 0.015);

    // Texte subtil indiquant qu'il s'agit d'une seule ligne
    c.setAlpha(100);
    fill(c);
    textAlign(CENTER, CENTER);
    textSize(NP * 0.02);
    text("one continuous line", 0, NP * 0.45);
}

// Version alternative: Hilbert curve (une seule ligne qui remplit l'espace)
function drawHilbertCurve() {
    let order = 5;
    let totalSteps = pow(4, order) - 1;
    let size = NP * 0.8;
    let step = size / (pow(2, order) - 1);

    let c = color(STROKE_COLOR);
    c.setAlpha(160);
    stroke(c);
    strokeWeight(1.2);
    noFill();

    beginShape();

    for (let i = 0; i <= totalSteps; i++) {
        let [x, y] = hilbertIndex(i, order);
        let px = -size / 2 + x * step;
        let py = -size / 2 + y * step;
        vertex(px, py);
    }

    endShape();
}

function hilbertIndex(index, order) {
    let points = [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0],
    ];

    let x = 0,
        y = 0;

    for (let i = 0; i < order; i++) {
        let len = pow(2, i);
        let segment = floor(index / pow(4, i)) % 4;

        let [dx, dy] = points[segment];
        x += dx * len;
        y += dy * len;

        // Rotations
        if (segment === 0) {
            [x, y] = [y, x];
        } else if (segment === 3) {
            [x, y] = [len * 2 - 1 - y, len * 2 - 1 - x];
        }
    }

    return [x, y];
}

// Version alternative: Ligne serpentine qui crée un visage
function drawSerpentineFace() {
    let c = color(STROKE_COLOR);
    c.setAlpha(170);
    stroke(c);
    strokeWeight(1.5);
    noFill();

    let points = 2000;

    beginShape();

    for (let i = 0; i < points; i++) {
        let t = i / points;

        // Diviser en zones: contour du visage, yeux, nez, bouche
        let x, y;

        if (t < 0.3) {
            // Contour du visage (30%)
            let faceT = t / 0.3;
            let angle = faceT * TWO_PI;
            let r = NP * 0.25 * (1 - 0.1 * sin(angle * 2));
            x = cos(angle) * r;
            y = sin(angle) * r - NP * 0.05;
        } else if (t < 0.5) {
            // Œil gauche (20%)
            let eyeT = (t - 0.3) / 0.2;
            let angle = eyeT * TWO_PI * 3;
            let r = NP * 0.05 + sin(eyeT * TWO_PI * 5) * NP * 0.02;
            x = cos(angle) * r - NP * 0.1;
            y = sin(angle) * r - NP * 0.08;
        } else if (t < 0.7) {
            // Œil droit (20%)
            let eyeT = (t - 0.5) / 0.2;
            let angle = eyeT * TWO_PI * 3;
            let r = NP * 0.05 + sin(eyeT * TWO_PI * 5) * NP * 0.02;
            x = cos(angle) * r + NP * 0.1;
            y = sin(angle) * r - NP * 0.08;
        } else if (t < 0.8) {
            // Nez (10%)
            let noseT = (t - 0.7) / 0.1;
            x = sin(noseT * PI) * NP * 0.03;
            y = -NP * 0.02 + noseT * NP * 0.15;
        } else {
            // Bouche (20%)
            let mouthT = (t - 0.8) / 0.2;
            let angle = mouthT * PI;
            x = (cos(angle) - 0.5) * NP * 0.15;
            y = NP * 0.15 + sin(angle) * NP * 0.05;
        }

        vertex(x, y);
    }

    endShape();
}
