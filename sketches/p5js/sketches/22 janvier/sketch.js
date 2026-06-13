// JAN. 22 (credit: Sophia (fractal kitty))
// Pen plotter ready — tracé monoligne, sans remplissage
// ----------------------------------------------------
let DESSIN = 221;
let NP = 640;

// ----------------------------------------------------
function setup() {
    PALETTE("NEW_BLUE");
    INIT();

    background(BG_COLOR);
    noFill();
    stroke(STROKE_COLOR);
    strokeWeight(1);

    let margin = NP * 0.08;
    let size = NP - margin * 2;

    drawPlotterFrame(margin, margin, size, size);
    drawPlotterRibbons(margin, margin, size, size);
    drawPlotterRosettes(margin, margin, size, size);
    drawPlotterGrid(margin, margin, size, size);
}

// ----------------------------------------------------
function drawPlotterFrame(x, y, w, h) {
    rect(x, y, w, h);
    rect(x + w * 0.05, y + h * 0.05, w * 0.9, h * 0.9);
}

function drawPlotterGrid(x, y, w, h) {
    let lines = 12;
    for (let i = 1; i < lines; i++) {
        let t = i / lines;
        let xx = x + w * t;
        let yy = y + h * t;
        line(xx, y + h * 0.08, xx, y + h * 0.92);
        line(x + w * 0.08, yy, x + w * 0.92, yy);
    }
}

function drawPlotterRibbons(x, y, w, h) {
    let ribbonCount = 6;
    for (let r = 0; r < ribbonCount; r++) {
        beginShape();
        for (let i = 0; i <= 240; i++) {
            let t = i / 240;
            let xx = x + w * 0.1 + t * w * 0.8;
            let wave = sin(t * TWO_PI * (2 + r)) * (h * 0.04 + r * h * 0.005);
            let yy = y + h * (0.2 + r * 0.1) + wave;
            vertex(xx, yy);
        }
        endShape();
    }
}

function drawPlotterRosettes(x, y, w, h) {
    let centers = [
        [x + w * 0.25, y + h * 0.25],
        [x + w * 0.75, y + h * 0.25],
        [x + w * 0.25, y + h * 0.75],
        [x + w * 0.75, y + h * 0.75],
    ];

    for (let c = 0; c < centers.length; c++) {
        let cx = centers[c][0];
        let cy = centers[c][1];
        let petals = 6 + c * 2;
        let radius = w * 0.09;
        beginShape();
        for (let a = 0; a <= 360; a += 2) {
            let ang = radians(a);
            let r = radius * cos(petals * ang);
            vertex(cx + r * cos(ang), cy + r * sin(ang));
        }
        endShape();
    }
}
