// JAN 3 — Fibonacci forever
// Utilise la suite de Fibonacci pour: tailles, espacements, spirale, timing

let fib = [];
let circles = [];
let currentIndex = 0;
let goldenAngle = 137.5; // Angle d'or en degrés

function setup() {
  createCanvas(900, 900);
  
  // Générer la suite de Fibonacci
  generateFibonacci(20);
  
  // Créer les cercles avec timing Fibonacci
  for (let i = 0; i < fib.length; i++) {
    circles.push({
      // Spirale de Fibonacci (coordonnées polaires)
      angle: i * goldenAngle,
      distance: fib[i] * 3,
      // Taille basée sur Fibonacci
      size: fib[i] * 0.8,
      // Timing d'apparition basé sur Fibonacci
      appearTime: i < 10 ? fib[i] * 30 : fib[10] * 30 + (i - 10) * 100,
      visible: false,
      alpha: 0,
      index: i
    });
  }
  
  frameRate(60);
}

function draw() {
  background(15, 15, 25);
  
  translate(width / 2, height / 2);
  
  let t = millis();
  
  // Dessiner la spirale de Fibonacci
  drawFibonacciSpiral();
  
  // Afficher les cercles avec timing Fibonacci
  for (let c of circles) {
    if (t >= c.appearTime) {
      c.visible = true;
      c.alpha = lerp(c.alpha, 255, 0.05);
    }
    
    if (c.visible) {
      let x = cos(radians(c.angle)) * c.distance;
      let y = sin(radians(c.angle)) * c.distance;
      
      // Gradient de couleur basé sur l'indice
      let hue = map(c.index, 0, circles.length, 180, 280);
      colorMode(HSB);
      
      // Cercle avec opacité
      fill(hue, 70, 90, c.alpha / 255);
      noStroke();
      circle(x, y, c.size);
      
      // Numéro Fibonacci au centre
      if (c.alpha > 200 && c.index < 15) {
        fill(hue, 30, 100, c.alpha / 255);
        textAlign(CENTER, CENTER);
        textSize(c.size * 0.3);
        text(fib[c.index], x, y);
      }
    }
  }
  
  // Légende
  colorMode(RGB);
  resetMatrix();
  fill(255);
  textAlign(LEFT);
  textSize(16);
  text("FIBONACCI FOREVER", 20, 30);
  textSize(11);
  text("Spirale: angle d'or (137.5°)", 20, 50);
  text("Tailles: proportions Fibonacci", 20, 65);
  text("Espacements: distances Fibonacci", 20, 80);
  text("Timing: apparition séquentielle", 20, 95);
  
  // Suite affichée
  textSize(10);
  let fibText = "Suite: " + fib.slice(0, 12).join(", ") + "...";
  text(fibText, 20, height - 20);
}

function generateFibonacci(n) {
  fib = [1, 1];
  for (let i = 2; i < n; i++) {
    fib.push(fib[i - 1] + fib[i - 2]);
  }
}

function drawFibonacciSpiral() {
  // Dessiner la spirale dorée en fond
  noFill();
  stroke(255, 255, 255, 30);
  strokeWeight(1);
  
  beginShape();
  for (let i = 0; i < 360 * 3; i += 2) {
    let angle = radians(i);
    let r = pow(1.618, angle / PI * 0.3) * 5; // Spirale logarithmique
    let x = cos(angle) * r;
    let y = sin(angle) * r;
    vertex(x, y);
  }
  endShape();
}

function mousePressed() {
  // Reset l'animation
  for (let c of circles) {
    c.visible = false;
    c.alpha = 0;
  }
}
