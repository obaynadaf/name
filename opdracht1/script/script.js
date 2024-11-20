function setup() {
    createCanvas(600, 400);
    background(200, 200, 255); // Hemelblauw als achtergrond
  }
  
  function draw() {
    // Wereld (grond en lucht)
    drawGround();
    
    // Robot
    drawRobot(300, 200); // Plaats robot in het midden van het canvas
  }
  
  function drawRobot(x, y) {
    // Lichaam van de robot (rechthoek)
    fill(150); // Grijs voor de robot
    rect(x - 25, y - 50, 50, 100);
    
    // Hoofd van de robot (cirkel)
    fill(150); // Grijs voor het hoofd
    ellipse(x, y - 80, 50, 50);
    
    // Ogen van de robot (witte cirkels)
    fill(255); // Witte ogen
    ellipse(x - 15, y - 85, 15, 15);
    ellipse(x + 15, y - 85, 15, 15);
    
    // Pupillen (zwarte cirkels)
    fill(0); // Zwarte pupillen
    ellipse(x - 15, y - 85, 7, 7);
    ellipse(x + 15, y - 85, 7, 7);
    
    // Armen van de robot (lijnen)
    stroke(150);
    strokeWeight(8);
    line(x - 35, y - 50, x - 50, y - 100); // Linker arm
    line(x + 35, y - 50, x + 50, y - 100); // Rechter arm
    
    // Benen van de robot (lijnen)
    stroke(150);
    strokeWeight(8);
    line(x - 15, y + 50, x - 15, y + 100); // Linker been
    line(x + 15, y + 50, x + 15, y + 100); // Rechter been
  }
  
  // Functie om de grond te tekenen
  function drawGround() {
    fill(100, 255, 100); // Groene grond
    noStroke();
    rect(0, height - 50, width, 50); // Grond wordt onderaan het canvas geplaatst
  }
  