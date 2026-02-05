// JAN. 31 (credit: Piero)
// GLSL day — artwork uniquement en shader
// ----------------------------------------------------
let theShader;

function setup() {
    createCanvas(640, 640, WEBGL);
    noStroke();

    const vert = document.getElementById("vert").textContent;
    const frag = document.getElementById("frag").textContent;
    theShader = createShader(vert, frag);
}

function draw() {
    shader(theShader);
    theShader.setUniform("u_resolution", [width, height]);
    theShader.setUniform("u_time", millis() / 1000.0);
    rect(-width / 2, -height / 2, width, height);
}
