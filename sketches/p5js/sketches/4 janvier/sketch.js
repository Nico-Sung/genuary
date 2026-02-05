// JAN 4 — Lowres
// Canvas minuscule (32×32) → noSmooth() → upscale
// Pixel art génératif

let lowResWidth = 32;
let lowResHeight = 32;
let upscale = 16; // Facteur d'agrandissement
let pg; // Graphics buffer pour le canvas lowres
let time = 0;
let palette = [];

function setup() {
    createCanvas(lowResWidth * upscale, lowResHeight * upscale);

    // Créer le buffer basse résolution
    pg = createGraphics(lowResWidth, lowResHeight);
    pg.noSmooth(); // Désactiver l'antialiasing
    noSmooth(); // Désactiver l'antialiasing sur le canvas principal

    // Palette de couleurs pixel art
    palette = [
        color(26, 28, 44), // Noir bleuté
        color(93, 39, 93), // Violet foncé
        color(177, 62, 83), // Rouge
        color(239, 125, 87), // Orange
        color(255, 205, 117), // Jaune
        color(167, 240, 112), // Vert clair
        color(56, 183, 100), // Vert
        color(37, 113, 121), // Bleu-vert
        color(41, 54, 111), // Bleu foncé
        color(59, 93, 201), // Bleu
    ];

    frameRate(30);
}

function draw() {
    time += 0.02;

    // Dessiner sur le buffer basse résolution
    pg.background(palette[0]);

    // Générer un motif pixel art génératif
    generatePixelArt();

    // Upscaler: dessiner le buffer agrandi sur le canvas principal
    image(pg, 0, 0, width, height);

    // Info overlay (sur le canvas haute résolution)
    drawInfo();
}

function generatePixelArt() {
    pg.noStroke();

    // Méthode 1: Motif de cercles pixelisés animés
    for (let i = 0; i < 8; i++) {
        let angle = time + (i * TWO_PI) / 8;
        let x = lowResWidth / 2 + cos(angle) * (8 + sin(time * 2 + i) * 4);
        let y = lowResHeight / 2 + sin(angle) * (8 + cos(time * 2 + i) * 4);

        pg.fill(palette[(i + 2) % palette.length]);
        pg.rect(floor(x), floor(y), 2, 2);
    }

    // Méthode 2: Bruit Perlin pixelisé
    for (let x = 0; x < lowResWidth; x += 4) {
        for (let y = 0; y < lowResHeight; y += 4) {
            let n = noise(x * 0.1 + time * 0.3, y * 0.1, time * 0.2);
            if (n > 0.5) {
                let colorIndex = floor(map(n, 0.5, 1, 3, 7));
                pg.fill(palette[colorIndex]);
                pg.rect(x, y, 2, 2);
            }
        }
    }

    // Méthode 3: Ligne animée type scanner
    let scanLine = floor(map(sin(time * 2), -1, 1, 0, lowResHeight));
    pg.fill(palette[4]);
    pg.rect(0, scanLine, lowResWidth, 1);

    // Méthode 4: Particules pixelisées
    for (let i = 0; i < 5; i++) {
        let px = lowResWidth / 2 + cos(time * 1.5 + i) * 12;
        let py = lowResHeight / 2 + sin(time * 2 + i * 0.7) * 10;
        pg.fill(palette[(i + 5) % palette.length]);
        pg.rect(floor(px), floor(py), 1, 1);
    }

    // Bordure
    pg.noFill();
    pg.stroke(palette[6]);
    pg.rect(0, 0, lowResWidth - 1, lowResHeight - 1);
}

function drawInfo() {
    // Overlay semi-transparent
    fill(0, 0, 0, 150);
    noStroke();
    rect(0, 0, width, 80);
    rect(0, height - 60, width, 60);

    fill(255);
    textAlign(LEFT);
    textSize(14);
    text("LOWRES PIXEL ART", 10, 20);
    textSize(10);
    text(`Canvas: ${lowResWidth}×${lowResHeight} pixels`, 10, 40);
    text(`Upscale: ×${upscale} → ${width}×${height}px`, 10, 55);
    text(`noSmooth() pour garder les pixels nets`, 10, 70);

    textAlign(RIGHT);
    text(`Frame: ${frameCount}`, width - 10, height - 40);
    text("Cliquez pour changer le facteur d'upscale", width - 10, height - 20);
}

function mousePressed() {
    // Changer le facteur d'upscale
    upscale = (upscale % 20) + 8;
    resizeCanvas(lowResWidth * upscale, lowResHeight * upscale);
    noSmooth();
}
