// JAN 2 — Twelve principles of animation
// Principe choisi: SQUASH & STRETCH
// Une balle qui rebondit, s'écrase au sol et s'étire en l'air

let ball = {
    x: 400,
    y: 100,
    velocityY: 0,
    gravity: 0.6,
    bounce: -0.85,
    scaleX: 1,
    scaleY: 1,
    baseRadius: 50,
    ground: 600,
};

function setup() {
    createCanvas(800, 700);
    frameRate(60);
}

function draw() {
    background(20, 20, 30);

    // Physique
    ball.velocityY += ball.gravity;
    ball.y += ball.velocityY;

    // Détection du sol
    if (ball.y + ball.baseRadius * ball.scaleY >= ball.ground) {
        ball.y = ball.ground - ball.baseRadius * ball.scaleY;
        ball.velocityY *= ball.bounce;

        // SQUASH au moment de l'impact
        ball.scaleY = 0.5; // Écrasement vertical
        ball.scaleX = 1.5; // Élargissement horizontal
    } else {
        // STRETCH en l'air (proportionnel à la vitesse)
        let stretchFactor = map(abs(ball.velocityY), 0, 20, 0, 0.4);

        if (ball.velocityY > 0) {
            // En descendant: étirement vertical
            ball.scaleY = 1 + stretchFactor;
            ball.scaleX = 1 - stretchFactor * 0.3;
        } else {
            // En montant: étirement vertical
            ball.scaleY = 1 + stretchFactor;
            ball.scaleX = 1 - stretchFactor * 0.3;
        }
    }

    // Retour progressif à la forme normale (easing)
    ball.scaleX = lerp(ball.scaleX, 1, 0.2);
    ball.scaleY = lerp(ball.scaleY, 1, 0.2);

    // Dessin du sol
    stroke(100, 100, 120);
    strokeWeight(2);
    line(0, ball.ground, width, ball.ground);

    // Dessin de la balle avec squash & stretch
    push();
    translate(ball.x, ball.y);
    scale(ball.scaleX, ball.scaleY);

    // Couleur: rouge pour bien voir l'effet
    fill(255, 60, 60);
    noStroke();
    circle(0, 0, ball.baseRadius * 2);

    // Highlight pour donner du volume
    fill(255, 150, 150, 150);
    circle(
        -ball.baseRadius * 0.3,
        -ball.baseRadius * 0.3,
        ball.baseRadius * 0.6
    );

    pop();

    // Texte explicatif
    fill(255);
    noStroke();
    textSize(16);
    textAlign(LEFT);
    text("SQUASH & STRETCH", 20, 30);
    textSize(12);
    text("La balle s'écrase au sol et s'étire en l'air", 20, 50);
    text("pour donner une impression de poids et de flexibilité", 20, 65);

    // Indicateurs de déformation
    text(`Scale X: ${ball.scaleX.toFixed(2)}`, 20, height - 40);
    text(`Scale Y: ${ball.scaleY.toFixed(2)}`, 20, height - 20);
}
