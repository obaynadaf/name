let robotX = 1000; // Robot's initial position
let robotY = 250;  // Robot's Y-position (initially on the ground)
let robotSpeed = 2; // Slower robot speed
let robotJumpSpeed = -10; // Slower jump to make the robot jump more gradually
let gravity = 0.5; // Gravity force pulling the robot down, slower fall rate
let robotVelocity = 0; // The current vertical velocity (for jumping)
let onGround = true; // Check if the robot is on the ground

let sunY = 100; // Initial position of the sun
let sunDirection = 1; // Direction of sun's movement (downwards for setting)
let sunRadius = 60; // Radius of the sun
let sunExplosion = false; // Flag to indicate when the sun is "blowing up"
let explosionTimer = 0; // Timer to control explosion duration

let moveDirection = 1; // Direction for robot movement (1 = right, -1 = left)
let jumpCounter = 0; // Counter to control when the robot jumps

let gameTimer = 0; // Timer for tracking how long the game has been running

function setup() {
  createCanvas(windowWidth, windowHeight); // Set the canvas to be full screen
  background(100, 200, 255);
}

function draw() {
  background(100, 200, 255); // Draw background each frame

  drawMountains();
  drawGround();
  drawRobot(robotX, robotY);
  drawSun(windowWidth / 2, sunY, sunRadius);

  // If the sun is exploding, animate the explosion
  if (sunExplosion) {
    animateExplosion();
  } else {
    // Update the sun's position for the day-night cycle, faster
    if (sunY < height - 50) {
      sunY += sunDirection * 1.0; // Faster sun movement
    } else {
      sunDirection = -1; // Once it reaches the horizon, start setting up (night)
      sunExplosion = true; // Trigger explosion once sun touches the ground
    }
  }

  // Move the robot left or right more slowly
  robotX += robotSpeed * moveDirection;

  // If robot reaches the edge of the screen, change direction
  if (robotX >= width - 50 || robotX <= 0) {
    moveDirection *= -1; // Reverse the direction
  }

  // Handle jumping based on a simple counter (simulate random jumps), slower
  jumpCounter++;
  if (jumpCounter % 180 === 0 && onGround) { // Jump every 180 frames to make it less frequent
    robotVelocity = robotJumpSpeed; // Make the robot jump upwards
    onGround = false; // Set robot to not on the ground
  }

  // Apply gravity to make the robot fall more slowly
  robotY += robotVelocity; // Apply vertical velocity to the Y-position
  if (robotY >= height - 100) { // If the robot hits the ground (with new ground height)
    robotY = height - 100; // Set it to the ground level (now 100px high)
    onGround = true; // Allow jumping again
    robotVelocity = 0; // Reset vertical velocity
  } else {
    robotVelocity += gravity; // Apply gravity to the velocity (falling down)
  }

  // Game timer (count seconds)
  gameTimer++;
  if (gameTimer > 1800) { // Reset the game after 30 seconds (60 FPS * 30 seconds = 1800 frames)
    resetGame();
  }
}

// Function to draw the robot
function drawRobot(x, y) {
  fill(150); 
  rect(x - 25, y - 50, 50, 100); 
  
  fill(150);
  ellipse(x, y - 80, 50, 50); // Head
  
  // Robot's eyes will follow the robot's X position
  fill(255); 
  let eyeOffset = (x - 1000) / 50; // Adjust the eyes' position based on robot's X-position
  ellipse(x - 15 + eyeOffset, y - 85, 15, 15); // Left eye
  ellipse(x + 15 + eyeOffset, y - 85, 15, 15); // Right eye
  
  fill(0); // Pupils inside the eyes
  ellipse(x - 15 + eyeOffset, y - 85, 7, 7); // Left pupil
  ellipse(x + 15 + eyeOffset, y - 85, 7, 7); // Right pupil
  
  stroke(150);
  strokeWeight(8);
  line(x - 35, y - 50, x - 50, y - 100); 
  line(x + 35, y - 50, x + 50, y - 100); 
  
  stroke(150);
  strokeWeight(8);
  line(x - 15, y + 50, x - 15, y + 100); 
  line(x + 15, y + 50, x + 15, y + 100); 
}

// Function to draw the ground (make it wider)
function drawGround() {
  fill(100, 255, 100); 
  noStroke();
  rect(0, height - 100, width, 100); // The ground now is 100px high (wider)
}

// Function to draw mountains in the background
function drawMountains() {
  fill(150, 150, 150); // Gray color for the mountains
  
  // Draw multiple mountains
  beginShape();
  vertex(0, height - 100); // Start point at the bottom left of the canvas
  vertex(width / 4, height - 200); // First peak
  vertex(width / 2, height - 100); // Bottom point in the middle
  vertex(3 * width / 4, height - 250); // Second peak
  vertex(width, height - 100); // Bottom point at the right
  endShape(CLOSE);
  
  // You can add more layers of mountains to create depth
  fill(100, 100, 100); // Darker gray for the second layer of mountains
  beginShape();
  vertex(0, height - 100); 
  vertex(width / 3, height - 150); // Peak of second layer
  vertex(2 * width / 3, height - 100); 
  vertex(width, height - 150); // Peak of second layer
  endShape(CLOSE);
}

// Function to draw the sun
function drawSun(x, y, radius) {
  if (sunExplosion) {
    // When sun is exploding, draw it bigger and change colors
    fill(255, 0, 0); // Intense red explosion color
    noStroke();
    ellipse(x, y, radius * 6, radius * 6); // Larger sun for explosion (increased size)
  } else {
    // Normal sun behavior
    fill(255, 204, 0); 
    noStroke();
    ellipse(x, y, radius * 2, radius * 2); // Sun's main body
    
    stroke(255, 204, 0);
    strokeWeight(4);
    for (let i = 0; i < 360; i += 15) { // Sun rays
      let angle = radians(i);
      let rayLength = radius + 40; 
      let x1 = x + cos(angle) * radius; 
      let y1 = y + sin(angle) * radius;
      let x2 = x + cos(angle) * rayLength; 
      let y2 = y + sin(angle) * rayLength; 
      line(x1, y1, x2, y2);
    }
  }
}

// Function to animate the sun explosion (larger explosion)
function animateExplosion() {
  explosionTimer++;

  // Sun explosion effect, will grow bigger and change color more dramatically
  if (explosionTimer < 30) {
    sunRadius += 3; // Make the sun grow faster
  } else if (explosionTimer < 60) {
    sunRadius += 2; // Slower growth
  } else {
    resetGame(); // Reset game after explosion ends
  }
}

// Reset function to reset game state
function resetGame() {
  robotX = 1000; // Reset robot's position
  robotY = 250; // Reset robot's Y-position
  robotSpeed = 2; // Reset robot speed (slower speed)
  robotVelocity = 0; // Reset robot's vertical velocity
  sunY = 100; // Reset sun's position
  sunDirection = 1; // Reset sun's movement direction
  sunExplosion = false; // Reset explosion state
  sunRadius = 60; // Reset sun's radius
  explosionTimer = 0; // Reset explosion timer
  moveDirection = 1; // Reset robot movement direction
  jumpCounter = 0; // Reset jump counter
  gameTimer
}