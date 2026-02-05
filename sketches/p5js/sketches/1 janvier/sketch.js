// JAN 1 — One color, one shape
// Une seule couleur, une seule primitive
// Variations: position, taille, rotation, temps

let circles = [];
let numCircles = 40;

function setup() {
    createCanvas(800, 800);

    // Créer des cercles avec différentes propriétés
    for (let i = 0; i < numCircles; i++) {
        circles.push({
            x: random(width),
            y: random(height),
            size: random(20, 100),
            speedX: random(-1, 1),
            speedY: random(-1, 1),
            rotation: random(TWO_PI),
            rotationSpeed: random(-0.02, 0.02),
            phase: random(TWO_PI),
            frequency: random(0.5, 2),
        });
    }
}

function draw() {
    background(10, 10, 20);

    // Une seule couleur: bleu électrique
    stroke(0, 180, 255);
    noFill();
    strokeWeight(2);

    let t = millis() * 0.001; // Temps en secondes

    for (let c of circles) {
        push();

        // Position animée avec oscillation
        let x = c.x + sin(t * c.frequency + c.phase) * 50;
        let y = c.y + cos(t * c.frequency + c.phase) * 50;

        // Garder dans les limites du canvas
        x = (x + width) % width;
        y = (y + height) % height;

        // Taille pulsante
        let sizeVar = c.size + sin(t * 2 + c.phase) * 10;

        // Rotation
        translate(x, y);
        rotate(c.rotation + t * c.rotationSpeed);

        // Dessiner une seule forme: cercle
        circle(0, 0, sizeVar);

        pop();

        // Mouvement lent continu
        c.x += c.speedX;
        c.y += c.speedY;

        // Rebond sur les bords
        if (c.x < 0 || c.x > width) c.speedX *= -1;
        if (c.y < 0 || c.y > height) c.speedY *= -1;
    }
}
