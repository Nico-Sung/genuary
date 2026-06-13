// JAN. 11 (credit: Manuel Larino)
// Quine — un programme qui s'auto-représente
// ----------------------------------------------------
let DESSIN = 219;
let NP = 640;

let sourceCode = [
    "function draw() {",
    "  for(let i=0;i<n;i++)",
    "    circle(x,y,r);",
    "}",
    "let x=0,y=0,r=10;",
    "while(true){",
    "  x+=dx; y+=dy;",
    "  if(x>w)break;",
    "}",
    "return self();",
];

// ----------------------------------------------------
function setup() {
    PALETTE("NEW_BLUE");
    INIT();
    noLoop();

    background(BG_COLOR);
    translate(NP / 2, NP / 2);

    drawCodeSpiral();
    drawRecursiveFrames();
    drawSelfReferencingGrid();
}

// ----------------------------------------------------
function drawCodeSpiral() {
    let spirals = 3;
    for (let s = 0; s < spirals; s++) {
        let offset = (s * TWO_PI) / spirals;
        let c = color(STROKE_COLOR);
        c.setAlpha(120 - s * 25);
        fill(c);
        noStroke();

        let charIndex = 0;
        for (let a = 0; a < TWO_PI * 4; a += 0.15) {
            let r = NP * 0.08 + a * NP * 0.025;
            let angle = a + offset;
            let x = r * cos(angle);
            let y = r * sin(angle);

            let lineIdx = charIndex % sourceCode.length;
            let line = sourceCode[lineIdx];
            let charIdx =
                floor((charIndex / sourceCode.length) * line.length) %
                line.length;
            let char = line.charAt(charIdx);

            push();
            translate(x, y);
            rotate(angle + HALF_PI);
            textSize(NP * 0.013);
            textAlign(CENTER, CENTER);
            text(char, 0, 0);
            pop();

            charIndex++;
        }
    }
}

function drawRecursiveFrames() {
    let layers = 8;
    for (let i = 0; i < layers; i++) {
        let size = NP * 0.8 - i * NP * 0.095;
        let c = color(STROKE_COLOR);
        c.setAlpha(160 - i * 15);
        stroke(c);
        strokeWeight(1 + i * 0.3);
        noFill();

        push();
        rotate(i * 0.15);
        rect(-size / 2, -size / 2, size, size);

        let corners = [
            [-size / 2, -size / 2],
            [size / 2, -size / 2],
            [size / 2, size / 2],
            [-size / 2, size / 2],
        ];

        for (let corner of corners) {
            let brace = size * 0.08;
            line(
                corner[0],
                corner[1],
                corner[0] + (corner[0] > 0 ? -brace : brace),
                corner[1],
            );
            line(
                corner[0],
                corner[1],
                corner[0],
                corner[1] + (corner[1] > 0 ? -brace : brace),
            );
        }
        pop();
    }
}

function drawSelfReferencingGrid() {
    let grid = 12;
    let cell = (NP * 0.75) / grid;

    for (let y = 0; y < grid; y++) {
        for (let x = 0; x < grid; x++) {
            let cx = -NP * 0.375 + x * cell + cell / 2;
            let cy = -NP * 0.375 + y * cell + cell / 2;

            let d = dist(cx, cy, 0, 0) / (NP * 0.5);
            if (d > 0.8 || d < 0.2) continue;

            let hash = (x * 7 + y * 13) % sourceCode.length;
            let line = sourceCode[hash];
            let charIdx = ((x + y) * 3) % line.length;
            let char = line.charAt(charIdx);

            let c = color(STROKE_COLOR);
            c.setAlpha(60 + d * 80);
            fill(c);
            noStroke();

            push();
            translate(cx, cy);
            rotate((x + y) * 0.2);
            textSize(cell * 0.6);
            textAlign(CENTER, CENTER);
            text(char, 0, 0);
            pop();

            if (random() < 0.15) {
                let arrow = color(STROKE_COLOR);
                arrow.setAlpha(100);
                stroke(arrow);
                strokeWeight(0.5);
                let ax = cx + random(-cell * 0.3, cell * 0.3);
                let ay = cy + random(-cell * 0.3, cell * 0.3);
                line(cx, cy, ax, ay);
                let arrowSize = cell * 0.1;
                let angle = atan2(ay - cy, ax - cx);
                push();
                translate(ax, ay);
                rotate(angle);
                line(0, 0, -arrowSize, -arrowSize * 0.5);
                line(0, 0, -arrowSize, arrowSize * 0.5);
                pop();
            }
        }
    }
}
