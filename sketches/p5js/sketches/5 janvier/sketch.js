// JAN 5 — Write "Genuary" (no font)
// Dessine chaque lettre avec: lignes, cercles, particules, agents

let particles = [];
let agents = [];

function setup() {
    createCanvas(1200, 400);

    // Initialiser particules pour la lettre E
    for (let i = 0; i < 80; i++) {
        particles.push({
            x: random(300, 400),
            y: random(80, 320),
            targetX: 0,
            targetY: 0,
            vx: 0,
            vy: 0,
        });
    }

    // Initialiser agents pour la lettre Y
    for (let i = 0; i < 100; i++) {
        agents.push({
            x: random(1050, 1150),
            y: random(80, 320),
            angle: random(TWO_PI),
            speed: random(0.5, 2),
        });
    }

    frameRate(60);
}

function draw() {
    background(10, 10, 20);

    let spacing = 170;
    let startX = 60;

    // G - Lignes (segments)
    drawG_Lines(startX + spacing * 0, 200);

    // E - Particules
    drawE_Particles(startX + spacing * 1, 200);

    // N - Cercles
    drawN_Circles(startX + spacing * 2, 200);

    // U - Lignes courbes
    drawU_Lines(startX + spacing * 3, 200);

    // A - Cercles concentriques
    drawA_Circles(startX + spacing * 4, 200);

    // R - Particules organiques
    drawR_Particles(startX + spacing * 5, 200);

    // Y - Agents
    drawY_Agents(startX + spacing * 6, 200);

    // Titre
    fill(255);
    noStroke();
    textSize(12);
    textAlign(LEFT);
    text("G E N U A R Y", 20, 30);
    textSize(10);
    text(
        "lignes | particules | cercles | lignes | cercles | particules | agents",
        20,
        50
    );
}

// G - Lignes (segments de construction)
function drawG_Lines(x, y) {
    stroke(100, 200, 255);
    strokeWeight(3);
    noFill();

    let size = 120;
    let segments = 20;

    // Arc extérieur
    for (let i = 0; i < segments; i++) {
        let a1 = map(i, 0, segments, PI * 0.2, PI * 1.8);
        let a2 = map(i + 1, 0, segments, PI * 0.2, PI * 1.8);
        let x1 = x + (cos(a1) * size) / 2;
        let y1 = y + (sin(a1) * size) / 2;
        let x2 = x + (cos(a2) * size) / 2;
        let y2 = y + (sin(a2) * size) / 2;
        line(x1, y1, x2, y2);
    }

    // Barre horizontale
    line(x, y, x + size / 2, y);
    line(x, y - 10, x, y + 10);
}

// E - Particules attirées vers la forme
function drawE_Particles(x, y) {
    let size = 100;

    // Points cibles pour former un E
    let targets = [];
    // Barre verticale
    for (let i = 0; i < 30; i++) {
        targets.push({ x: x - size / 2, y: y - size / 2 + (i * size) / 30 });
    }
    // Barres horizontales
    for (let i = 0; i < 20; i++) {
        targets.push({ x: x - size / 2 + (i * size) / 20, y: y - size / 2 }); // Haut
        targets.push({ x: x - size / 2 + (i * size) / 20, y: y }); // Milieu
        targets.push({ x: x - size / 2 + (i * size) / 20, y: y + size / 2 }); // Bas
    }

    // Assigner targets et déplacer particules
    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        let target = targets[i % targets.length];

        p.targetX = target.x;
        p.targetY = target.y;

        // Force d'attraction
        let dx = p.targetX - p.x;
        let dy = p.targetY - p.y;
        p.vx += dx * 0.01;
        p.vy += dy * 0.01;
        p.vx *= 0.9;
        p.vy *= 0.9;

        p.x += p.vx;
        p.y += p.vy;

        fill(255, 100, 150);
        noStroke();
        circle(p.x, p.y, 3);
    }
}

// N - Cercles alignés
function drawN_Circles(x, y) {
    let size = 100;
    let numCircles = 15;

    noFill();
    stroke(150, 255, 150);
    strokeWeight(2);

    // Barre gauche
    for (let i = 0; i < numCircles; i++) {
        let py = y - size / 2 + (i * size) / (numCircles - 1);
        circle(x - size / 2, py, 8);
    }

    // Diagonale
    for (let i = 0; i < numCircles; i++) {
        let px = x - size / 2 + (i * size) / (numCircles - 1);
        let py = y - size / 2 + (i * size) / (numCircles - 1);
        circle(px, py, 6);
    }

    // Barre droite
    for (let i = 0; i < numCircles; i++) {
        let py = y - size / 2 + (i * size) / (numCircles - 1);
        circle(x + size / 2, py, 8);
    }
}

// U - Lignes courbes
function drawU_Lines(x, y) {
    stroke(255, 200, 100);
    strokeWeight(2);
    noFill();

    let size = 100;
    let lines = 12;

    for (let i = 0; i < lines; i++) {
        let offset = map(i, 0, lines - 1, -size / 2, size / 2);
        beginShape();
        for (let t = 0; t <= 1; t += 0.05) {
            let px = x + offset;
            let py = y - size / 2 + t * size;
            let curve = sin(t * PI) * (size / 3);
            vertex(px + curve, py);
        }
        endShape();
    }
}

// A - Cercles concentriques formant un A
function drawA_Circles(x, y) {
    noFill();
    stroke(255, 150, 200);

    let size = 100;
    let rings = 20;

    // Trait gauche avec cercles
    for (let i = 0; i < rings; i++) {
        let t = i / rings;
        let px = x - size / 2 + (t * size) / 2;
        let py = y + size / 2 - t * size;
        let r = map(i, 0, rings, 3, 12);
        strokeWeight(1);
        circle(px, py, r);
    }

    // Trait droit avec cercles
    for (let i = 0; i < rings; i++) {
        let t = i / rings;
        let px = x + (t * size) / 2;
        let py = y - size / 2 + t * size;
        let r = map(i, 0, rings, 12, 3);
        strokeWeight(1);
        circle(px, py, r);
    }

    // Barre horizontale
    for (let i = 0; i < 10; i++) {
        let px = x - size / 4 + (i * size) / 20;
        circle(px, y + 10, 5);
    }
}

// R - Particules organiques
function drawR_Particles(x, y) {
    let size = 100;
    let t = frameCount * 0.02;

    // Barre verticale
    for (let i = 0; i < 20; i++) {
        let py = y - size / 2 + (i * size) / 20;
        let wobble = sin(t + i * 0.3) * 3;
        fill(100, 255, 255);
        noStroke();
        circle(x - size / 2 + wobble, py, 4);
    }

    // Demi-cercle supérieur
    for (let a = PI; a < TWO_PI; a += 0.2) {
        let px = x - size / 4 + (cos(a) * size) / 4;
        let py = y - size / 4 + (sin(a) * size) / 4;
        let wobble = sin(t + a * 2) * 2;
        circle(px + wobble, py, 5);
    }

    // Jambe diagonale
    for (let i = 0; i < 12; i++) {
        let t2 = i / 12;
        let px = x + (t2 * size) / 3;
        let py = y + (t2 * size) / 2;
        circle(px, py, 4);
    }
}

// Y - Agents qui tracent la forme
function drawY_Agents(x, y) {
    let size = 100;

    // Définir les chemins du Y
    let paths = [
        { x1: x - size / 2, y1: y - size / 2, x2: x, y2: y },
        { x1: x + size / 2, y1: y - size / 2, x2: x, y2: y },
        { x1: x, y1: y, x2: x, y2: y + size / 2 },
    ];

    for (let agent of agents) {
        // Trouver le chemin le plus proche
        let minDist = Infinity;
        let targetPath = paths[0];

        for (let path of paths) {
            let d1 = dist(agent.x, agent.y, path.x1, path.y1);
            let d2 = dist(agent.x, agent.y, path.x2, path.y2);
            let d = min(d1, d2);
            if (d < minDist) {
                minDist = d;
                targetPath = path;
            }
        }

        // Se déplacer vers le chemin
        let closestX, closestY;
        let t = constrain(
            ((agent.x - targetPath.x1) * (targetPath.x2 - targetPath.x1) +
                (agent.y - targetPath.y1) * (targetPath.y2 - targetPath.y1)) /
                (sq(targetPath.x2 - targetPath.x1) +
                    sq(targetPath.y2 - targetPath.y1)),
            0,
            1
        );

        closestX = lerp(targetPath.x1, targetPath.x2, t);
        closestY = lerp(targetPath.y1, targetPath.y2, t);

        agent.x = lerp(agent.x, closestX, 0.05);
        agent.y = lerp(agent.y, closestY, 0.05);

        fill(255, 255, 100);
        noStroke();
        circle(agent.x, agent.y, 3);
    }
}
