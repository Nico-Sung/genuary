// JAN. 8 (credit: PaoloCurtoni)
// A City — métropole générative
// ----------------------------------------------------
let DESSIN = 164;
let NP = 640;

// ----------------------------------------------------
function setup() {
    PALETTE("NEW_BLUE");
    INIT();
    noLoop();

    background(BG_COLOR);
    drawSky();
    drawGridStreets();
    drawSkyline();
    drawForeground();
}

// ----------------------------------------------------
function drawSky() {
    noStroke();
    let topC = color(BG_COLOR);
    let bottomC = color(STROKE_COLOR);
    bottomC.setAlpha(40);
    for (let y = 0; y < height; y++) {
        let t = y / height;
        let c = lerpColor(topC, bottomC, t * 0.7);
        stroke(c);
        line(0, y, width, y);
    }

    noStroke();
    let haze = color(STROKE_COLOR);
    haze.setAlpha(20);
    for (let i = 0; i < 6; i++) {
        let w = random(width * 0.6, width * 1.1);
        let h = random(height * 0.05, height * 0.12);
        let x = random(-width * 0.1, width * 0.1);
        let y = random(height * 0.1, height * 0.45);
        fill(haze);
        rect(x, y, w, h, h * 0.6);
    }
}

function drawGridStreets() {
    strokeWeight(1);
    let c = color(STROKE_COLOR);
    c.setAlpha(45);
    stroke(c);
    let rows = 12;
    let cols = 14;
    for (let r = 1; r < rows; r++) {
        let y = height * 0.55 + (r / rows) * height * 0.4;
        line(0, y, width, y);
    }
    for (let cI = 1; cI < cols; cI++) {
        let x = (cI / cols) * width;
        line(x, height * 0.55, x, height);
    }
}

function drawSkyline() {
    let groundY = height * 0.75;
    let x = 0;
    while (x < width) {
        let w = random(width * 0.03, width * 0.09);
        let h = random(height * 0.15, height * 0.5);
        let y = groundY - h;
        let shade = color(STROKE_COLOR);
        shade.setAlpha(random(90, 180));
        noStroke();
        fill(shade);
        rect(x, y, w, h);

        drawRoofDetails(x, y, w, h);
        drawWindows(x, y, w, h);

        x += w + random(width * 0.005, width * 0.02);
    }
}

function drawRoofDetails(x, y, w, h) {
    let detail = color(STROKE_COLOR);
    detail.setAlpha(200);
    stroke(detail);
    strokeWeight(1);
    let towerW = w * random(0.15, 0.4);
    let towerH = h * random(0.1, 0.25);
    let tx = x + w * random(0.1, 0.7);
    let ty = y - towerH;
    noFill();
    rect(tx, ty, towerW, towerH);
    line(tx + towerW * 0.5, ty, tx + towerW * 0.5, ty - towerH * 0.35);
}

function drawWindows(x, y, w, h) {
    let cols = max(2, int(w / (NP * 0.02)));
    let rows = max(3, int(h / (NP * 0.035)));
    let padX = w * 0.12;
    let padY = h * 0.08;
    let cellW = (w - 2 * padX) / cols;
    let cellH = (h - 2 * padY) / rows;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (random() < 0.55) {
                let wx = x + padX + c * cellW + cellW * 0.15;
                let wy = y + padY + r * cellH + cellH * 0.15;
                let ww = cellW * 0.6;
                let wh = cellH * 0.6;
                let glow = color(STROKE_COLOR);
                glow.setAlpha(random(160, 230));
                noStroke();
                fill(glow);
                rect(wx, wy, ww, wh, min(ww, wh) * 0.2);
            }
        }
    }
}

function drawForeground() {
    let horizon = height * 0.78;
    let fog = color(BG_COLOR);
    fog.setAlpha(120);
    noStroke();
    rect(0, horizon, width, height - horizon);

    strokeWeight(1);
    let road = color(STROKE_COLOR);
    road.setAlpha(80);
    stroke(road);
    for (let i = 0; i < 8; i++) {
        let y = height * 0.83 + i * height * 0.02;
        line(0, y, width, y);
    }

    drawBridgeLights();
}

function drawBridgeLights() {
    let y = height * 0.86;
    let spacing = width / 22;
    for (let i = 1; i < 22; i++) {
        let x = i * spacing;
        let glow = color(STROKE_COLOR);
        glow.setAlpha(200);
        noStroke();
        fill(glow);
        ellipse(x, y, NP * 0.012, NP * 0.012);
    }
}
