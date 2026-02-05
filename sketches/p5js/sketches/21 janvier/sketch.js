// JAN. 21 (credit: Piero)
// Bauhaus Poster — affiche inspirée de l'école du Bauhaus
// ----------------------------------------------------
let DESSIN = 213;
let NP = 640;

// ----------------------------------------------------
function setup() {
    PALETTE("NEW_BLUE");
    INIT();
    noLoop();

    background(BG_COLOR);

    drawBauhausPoster();
}

// ----------------------------------------------------
function drawBauhausPoster() {
    // Couleurs Bauhaus
    let red = color(220, 60, 50);
    let yellow = color(250, 220, 60);
    let blue = color(60, 120, 200);
    let black = color(STROKE_COLOR);
    black.setAlpha(220);

    // Fond avec grille subtile
    drawGrid();

    // Forme géométrique principale - grand cercle
    push();
    translate(NP * 0.35, NP * 0.3);

    // Cercle rouge avec bordure
    fill(red);
    stroke(black);
    strokeWeight(3);
    ellipse(0, 0, NP * 0.35, NP * 0.35);

    // Cercle intérieur jaune
    fill(yellow);
    noStroke();
    ellipse(NP * 0.05, -NP * 0.03, NP * 0.15, NP * 0.15);

    pop();

    // Triangle bleu
    push();
    translate(NP * 0.7, NP * 0.45);
    fill(blue);
    stroke(black);
    strokeWeight(3);
    rotate(PI / 6);
    triangle(0, -NP * 0.12, -NP * 0.1, NP * 0.08, NP * 0.1, NP * 0.08);
    pop();

    // Carrés et rectangles
    push();
    translate(NP * 0.15, NP * 0.65);

    // Carré noir
    fill(black);
    noStroke();
    rect(0, 0, NP * 0.12, NP * 0.12);

    // Rectangle jaune
    fill(yellow);
    stroke(black);
    strokeWeight(2);
    rect(NP * 0.15, -NP * 0.05, NP * 0.2, NP * 0.08);

    pop();

    // Lignes diagonales caractéristiques
    stroke(black);
    strokeWeight(4);
    line(NP * 0.55, NP * 0.6, NP * 0.85, NP * 0.75);

    strokeWeight(2);
    line(NP * 0.05, NP * 0.45, NP * 0.25, NP * 0.5);

    // Cercles décoratifs
    noFill();
    stroke(black);
    strokeWeight(2);
    ellipse(NP * 0.6, NP * 0.75, NP * 0.08, NP * 0.08);

    fill(red);
    noStroke();
    ellipse(NP * 0.85, NP * 0.35, NP * 0.04, NP * 0.04);

    // Typographie Bauhaus
    drawBauhausTypography();

    // Bordure du poster
    noFill();
    stroke(black);
    strokeWeight(6);
    rect(NP * 0.05, NP * 0.05, NP * 0.9, NP * 0.9);
}

function drawGrid() {
    // Grille subtile style Bauhaus
    let c = color(STROKE_COLOR);
    c.setAlpha(25);
    stroke(c);
    strokeWeight(0.5);

    let spacing = NP / 16;
    for (let i = 0; i <= 16; i++) {
        line(i * spacing, 0, i * spacing, NP);
        line(0, i * spacing, NP, i * spacing);
    }

    // Lignes principales plus marquées
    c.setAlpha(45);
    stroke(c);
    strokeWeight(1);
    for (let i = 0; i <= 4; i++) {
        let pos = (i * NP) / 4;
        line(pos, 0, pos, NP);
        line(0, pos, NP, pos);
    }
}

function drawBauhausTypography() {
    let black = color(STROKE_COLOR);
    black.setAlpha(220);

    // Titre principal - lettres géométriques construites
    push();
    translate(NP * 0.5, NP * 0.12);

    fill(black);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(NP * 0.08);
    textStyle(BOLD);
    text("BAUHAUS", 0, 0);

    pop();

    // Sous-titre
    push();
    translate(NP * 0.5, NP * 0.2);

    fill(black);
    textAlign(CENTER, CENTER);
    textSize(NP * 0.025);
    textStyle(NORMAL);
    text("FORM FOLLOWS FUNCTION", 0, 0);

    pop();

    // Année en bas
    push();
    translate(NP * 0.5, NP * 0.88);

    fill(black);
    textAlign(CENTER, CENTER);
    textSize(NP * 0.04);
    text("1919-1933", 0, 0);

    pop();

    // Texte vertical
    push();
    translate(NP * 0.92, NP * 0.5);
    rotate(HALF_PI);

    fill(black);
    textAlign(CENTER, CENTER);
    textSize(NP * 0.02);
    text("WEIMAR • DESSAU • BERLIN", 0, 0);

    pop();

    // Lettre géométrique décorative "B"
    drawGeometricB(NP * 0.08, NP * 0.88, NP * 0.06);
}

function drawGeometricB(x, y, size) {
    let black = color(STROKE_COLOR);
    black.setAlpha(220);

    push();
    translate(x, y);

    fill(black);
    noStroke();

    // Barre verticale
    rect(-size * 0.15, -size * 0.5, size * 0.2, size);

    // Demi-cercle supérieur
    arc(0, -size * 0.25, size * 0.5, size * 0.5, -HALF_PI, HALF_PI);

    // Demi-cercle inférieur
    arc(0, size * 0.25, size * 0.5, size * 0.5, -HALF_PI, HALF_PI);

    pop();
}

// Version alternative avec composition plus abstraite
function drawAbstractBauhaus() {
    let red = color(220, 60, 50);
    let yellow = color(250, 220, 60);
    let blue = color(60, 120, 200);
    let black = color(STROKE_COLOR);
    black.setAlpha(220);

    // Composition de Kandinsky/Klee style
    for (let i = 0; i < 8; i++) {
        let x = random(NP * 0.1, NP * 0.9);
        let y = random(NP * 0.2, NP * 0.8);
        let size = random(NP * 0.05, NP * 0.2);

        let colors = [red, yellow, blue, black];
        let c = random(colors);

        let shape = floor(random(3));

        fill(c);
        stroke(black);
        strokeWeight(2);

        if (shape === 0) {
            ellipse(x, y, size, size);
        } else if (shape === 1) {
            rect(x - size / 2, y - size / 2, size, size);
        } else {
            triangle(
                x,
                y - size / 2,
                x - size / 2,
                y + size / 2,
                x + size / 2,
                y + size / 2,
            );
        }
    }
}
