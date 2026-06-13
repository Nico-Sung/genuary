// JAN. 7 (credit: PaoloCurtoni)
// Boolean algebra — composition inspirée des opérateurs AND / OR / XOR
// ----------------------------------------------------
let DESSIN = 155;
let NP = 640;

// ----------------------------------------------------
function setup() {
    PALETTE("NEW_BLUE");
    INIT();

    let margin = NP * 0.08;
    let gap = NP * 0.04;
    let panelW = (NP - 2 * margin - 2 * gap) / 3;
    let panelH = NP - 2 * margin;

    background(BG_COLOR);
    noFill();
    stroke(STROKE_COLOR);
    strokeWeight(1);

    let panels = [
        { label: "AND", op: (a, b) => a && b, shape: "rect" },
        { label: "OR", op: (a, b) => a || b, shape: "circle" },
        { label: "XOR", op: (a, b) => a !== b, shape: "x" },
    ];

    for (let i = 0; i < panels.length; i++) {
        let x0 = margin + i * (panelW + gap);
        let y0 = margin;
        drawPanel(x0, y0, panelW, panelH, panels[i]);
    }
}

// ----------------------------------------------------
function bitA(x, y) {
    return ((x & 1) ^ ((y >> 1) & 1)) === 1;
}

function bitB(x, y) {
    return (((x >> 2) & 1) | (y & 1)) === 1;
}

function alphaColor(hex, alpha) {
    let c = color(hex);
    c.setAlpha(alpha);
    return c;
}

function drawPanel(x0, y0, w, h, panel) {
    push();
    translate(x0, y0);

    stroke(STROKE_COLOR);
    strokeWeight(1);
    noFill();
    rect(0, 0, w, h);

    let grid = 16;
    let header = h * 0.08;
    let cell = min(w / grid, (h - header) / grid);
    let gridW = cell * grid;
    let gridH = cell * grid;
    let offsetX = (w - gridW) / 2;
    let offsetY = header + (h - header - gridH) / 2;

    noStroke();
    fill(STROKE_COLOR);
    textAlign(CENTER, CENTER);
    textSize(cell * 0.65);
    text(panel.label, w / 2, header * 0.5);

    let cFaint = alphaColor(STROKE_COLOR, 45);
    let cBase = alphaColor(STROKE_COLOR, 90);
    let cStrong = alphaColor(STROKE_COLOR, 220);

    for (let y = 0; y < grid; y++) {
        for (let x = 0; x < grid; x++) {
            let a = bitA(x, y);
            let b = bitB(x, y);
            let res = panel.op(a, b);
            let cx = offsetX + x * cell + cell * 0.5;
            let cy = offsetY + y * cell + cell * 0.5;
            let pad = cell * 0.18;

            stroke(cFaint);
            strokeWeight(1);
            if (a) point(cx - cell * 0.2, cy - cell * 0.2);
            if (b) point(cx + cell * 0.2, cy + cell * 0.2);

            if (res) {
                stroke(cStrong);
                strokeWeight(1.5);
                if (panel.shape === "rect") {
                    rect(
                        cx - cell * 0.5 + pad,
                        cy - cell * 0.5 + pad,
                        cell - 2 * pad,
                        cell - 2 * pad,
                    );
                } else if (panel.shape === "circle") {
                    ellipse(cx, cy, cell - 2 * pad, cell - 2 * pad);
                } else {
                    line(
                        cx - cell * 0.5 + pad,
                        cy - cell * 0.5 + pad,
                        cx + cell * 0.5 - pad,
                        cy + cell * 0.5 - pad,
                    );
                    line(
                        cx - cell * 0.5 + pad,
                        cy + cell * 0.5 - pad,
                        cx + cell * 0.5 - pad,
                        cy - cell * 0.5 + pad,
                    );
                }
            } else {
                stroke(cBase);
                strokeWeight(1);
                point(cx, cy);
            }
        }
    }

    pop();
}
