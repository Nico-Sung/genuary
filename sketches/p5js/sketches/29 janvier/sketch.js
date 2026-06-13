// JAN. 29 (credit: Monokai)
// Genetic evolution & mutation — formes qui mutent et s'améliorent
// ----------------------------------------------------
let DESSIN = 152;

// ----------------------------------------------------
let NP = 640;
let POP = 36;
let GENES = 7;
let MUTATION_RATE = 0.12;
let GENERATIONS = 14;

let population = [];
let target;

// ----------------------------------------------------
function setup() {
    PALETTE("NEW_BLUE");
    INIT();
    noLoop();

    background(BG_COLOR);
    target = createTarget();
    initPopulation();

    for (let g = 0; g < GENERATIONS; g++) {
        evaluatePopulation();
        population = breedNextGeneration();
    }

    drawEvolution();
}

// ----------------------------------------------------
function createTarget() {
    return {
        lobes: 5,
        radius: 0.38,
        wobble: 0.08,
        twist: 0.6,
        offsetX: 0.0,
        offsetY: 0.0,
        spikiness: 0.12,
    };
}

function randomGenome() {
    return {
        lobes: int(random(3, 9)),
        radius: random(0.22, 0.48),
        wobble: random(0.02, 0.16),
        twist: random(0.0, 1.2),
        offsetX: random(-0.08, 0.08),
        offsetY: random(-0.08, 0.08),
        spikiness: random(0.02, 0.2),
        fitness: 0,
    };
}

function initPopulation() {
    population = [];
    for (let i = 0; i < POP; i++) {
        population.push(randomGenome());
    }
}

function evaluatePopulation() {
    for (let i = 0; i < population.length; i++) {
        population[i].fitness = fitness(population[i], target);
    }
    population.sort((a, b) => b.fitness - a.fitness);
}

function fitness(g, t) {
    let score = 0;
    score += 1 - abs(g.lobes - t.lobes) / 6;
    score += 1 - abs(g.radius - t.radius) / 0.26;
    score += 1 - abs(g.wobble - t.wobble) / 0.14;
    score += 1 - abs(g.twist - t.twist) / 1.2;
    score += 1 - abs(g.spikiness - t.spikiness) / 0.18;
    score += 1 - abs(g.offsetX - t.offsetX) / 0.16;
    score += 1 - abs(g.offsetY - t.offsetY) / 0.16;
    return max(score, 0.01);
}

function breedNextGeneration() {
    let next = [];
    let elites = population.slice(0, 6);
    for (let e of elites) next.push({ ...e });

    while (next.length < POP) {
        let parentA = pickWeighted(population);
        let parentB = pickWeighted(population);
        let child = crossover(parentA, parentB);
        mutate(child);
        next.push(child);
    }
    return next;
}

function pickWeighted(list) {
    let total = 0;
    for (let g of list) total += g.fitness;
    let r = random(total);
    let acc = 0;
    for (let g of list) {
        acc += g.fitness;
        if (acc >= r) return g;
    }
    return list[0];
}

function crossover(a, b) {
    return {
        lobes: random() < 0.5 ? a.lobes : b.lobes,
        radius: lerp(a.radius, b.radius, 0.5),
        wobble: random() < 0.5 ? a.wobble : b.wobble,
        twist: lerp(a.twist, b.twist, 0.5),
        offsetX: random() < 0.5 ? a.offsetX : b.offsetX,
        offsetY: random() < 0.5 ? a.offsetY : b.offsetY,
        spikiness: lerp(a.spikiness, b.spikiness, 0.5),
        fitness: 0,
    };
}

function mutate(g) {
    if (random() < MUTATION_RATE)
        g.lobes = int(constrain(g.lobes + random([-1, 1]), 3, 9));
    if (random() < MUTATION_RATE)
        g.radius = constrain(g.radius + random(-0.05, 0.05), 0.2, 0.55);
    if (random() < MUTATION_RATE)
        g.wobble = constrain(g.wobble + random(-0.03, 0.03), 0.01, 0.2);
    if (random() < MUTATION_RATE)
        g.twist = constrain(g.twist + random(-0.2, 0.2), 0, 1.5);
    if (random() < MUTATION_RATE)
        g.spikiness = constrain(g.spikiness + random(-0.03, 0.03), 0.01, 0.25);
    if (random() < MUTATION_RATE)
        g.offsetX = constrain(g.offsetX + random(-0.03, 0.03), -0.12, 0.12);
    if (random() < MUTATION_RATE)
        g.offsetY = constrain(g.offsetY + random(-0.03, 0.03), -0.12, 0.12);
}

function drawEvolution() {
    let cols = 6;
    let rows = 6;
    let margin = NP * 0.08;
    let cell = (NP - margin * 2) / cols;

    let c = color(STROKE_COLOR);
    c.setAlpha(160);
    stroke(c);
    strokeWeight(1.2);
    noFill();

    for (let i = 0; i < population.length; i++) {
        let g = population[i];
        let col = i % cols;
        let row = int(i / cols);
        let cx = margin + col * cell + cell / 2;
        let cy = margin + row * cell + cell / 2;
        drawGenomeShape(g, cx, cy, cell * 0.42);
    }

    // Mettre en évidence le meilleur individu
    let best = population[0];
    let cx = NP * 0.5;
    let cy = NP * 0.5;
    let highlight = color(STROKE_COLOR);
    highlight.setAlpha(220);
    stroke(highlight);
    strokeWeight(2.2);
    drawGenomeShape(best, cx, cy, NP * 0.22);
}

function drawGenomeShape(g, cx, cy, r) {
    beginShape();
    for (let a = 0; a <= 360; a += 6) {
        let ang = radians(a);
        let wobble = sin(ang * g.lobes + g.twist) * r * g.wobble;
        let spike = sin(ang * (g.lobes * 2)) * r * g.spikiness;
        let rr = r + wobble + spike;
        let x = cx + cos(ang) * rr + g.offsetX * NP * 0.2;
        let y = cy + sin(ang) * rr + g.offsetY * NP * 0.2;
        vertex(x, y);
    }
    endShape(CLOSE);
}
