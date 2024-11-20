function setup() {
    createCanvas(6000, 400);
    background(100, 200, 255);
}
  
function draw() {
    drawGround();
    drawRobot(1000, 250);
    drawSun(500, 100, 60);
}
  
function drawRobot(x, y) {
    fill(150); 
    rect(x - 25, y - 50, 50, 100); 
    
    fill(150);
    ellipse(x, y - 80, 50, 50); 
    
    fill(255); 
    ellipse(x - 15, y - 85, 15, 15);
    ellipse(x + 15, y - 85, 15, 15);
    
    fill(0);
    ellipse(x - 15, y - 85, 7, 7);
    ellipse(x + 15, y - 85, 7, 7);
    
    stroke(150);
    strokeWeight(8);
    line(x - 35, y - 50, x - 50, y - 100); 
    line(x + 35, y - 50, x + 50, y - 100); 
    
    stroke(150);
    strokeWeight(8);
    line(x - 15, y + 50, x - 15, y + 100); 
    line(x + 15, y + 50, x + 15, y + 100); 
}
  
function drawGround() {
    fill(100, 255, 100); 
    noStroke();
    rect(0, height - 50, width, 50); // Drawing the ground
}
  

function drawSun(x, y, radius) {
    
    fill(255, 204, 0); 
    noStroke();
    ellipse(x, y, radius * 2, radius * 2); 
  
   
    stroke(255, 204, 0);
    strokeWeight(4);
    for (let i = 0; i < 360; i += 15) { 
        let angle = radians(i);
        let rayLength = radius + 40; 
        let x1 = x + cos(angle) * radius; 
        let y1 = y + sin(angle) * radius;
        let x2 = x + cos(angle) * rayLength; 
        let y2 = y + sin(angle) * rayLength; 
        line(x1, y1, x2, y2);
    }
}
