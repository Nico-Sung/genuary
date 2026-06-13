// JAN 6 — Lights on/off
// Une variable light = true/false
// Change: ombres, couleurs, visibilité, profondeur

let light = true;
let targetBrightness = 1;
let currentBrightness = 1;
let objects = [];

function setup() {
  createCanvas(900, 900);
  
  // Créer une scène avec plusieurs objets 3D simulés
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      objects.push({
        x: 180 + i * 140,
        y: 180 + j * 140,
        size: random(40, 80),
        depth: random(0, 200),
        rotation: random(TWO_PI),
        rotSpeed: random(-0.02, 0.02),
        type: floor(random(3)), // 0: cube, 1: circle, 2: triangle
        hue: random(360)
      });
    }
  }
}

function draw() {
  // Transition douce de luminosité
  targetBrightness = light ? 1 : 0;
  currentBrightness = lerp(currentBrightness, targetBrightness, 0.05);
  
  background(20);
  
  // Afficher les objets avec effets de lumière
  for (let obj of objects) {
    push();
    translate(obj.x, obj.y);
    rotate(obj.rotation);
    obj.rotation += obj.rotSpeed;
    
    // Ombres
    let shadowOffset = map(currentBrightness, 0, 1, 10, 0);
    fill(0, 0, 0, 100);
    rect(-obj.size / 2 + shadowOffset, -obj.size / 2 + shadowOffset, obj.size, obj.size);
    
    // Objet principal
    colorMode(HSB);
    let brightness = map(currentBrightness, 0, 1, 30, 100);
    fill(obj.hue, 70, brightness);
    
    if (obj.type === 0) {
      rect(-obj.size / 2, -obj.size / 2, obj.size, obj.size);
    } else if (obj.type === 1) {
      circle(0, 0, obj.size);
    } else {
      triangle(-obj.size / 2, obj.size / 2, obj.size / 2, obj.size / 2, 0, -obj.size / 2);
    }
    
    colorMode(RGB);
    pop();
  }
  
  // Affichage des informations
  fill(255);
  textSize(14);
  text("• Luminosité: " + (light ? "allumée" : "éteinte"), 10, 20);
  text("• Couleurs: " + (light ? "vives" : "sombres"), 10, 40);
  text("• Appuyez sur ESPACE pour basculer", 10, 60);
}

function keyPressed() {
  if (key === ' ') {
    light = !light;
  }
}
