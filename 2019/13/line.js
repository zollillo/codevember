/*
  This p5.js sketch demonstrates a Moiré pattern created by uniformly spaced
  concentric circles. As a result, phantom lines and curves emerge 
  in the scene (cf. http://mathworld.wolfram.com/MoirePattern.html.
   
  A second set of smaller concentric circles can be dragged around with the
  mouse to reinforce the effect.
  
  The idea of this p5.js sketch is borrowed from an example written in D3.js:
  http://bl.ocks.org/mbostock/714554
  
  The mouse functions behavior is taken and adapted from:
  https://processing.org/examples/mousefunctions.html
*/

let radiusA = 5;
let radiusB = 3;
let numA = 100;
let numB = 40;
let xPos = 0;
let yPos = 0;
let overCircles = false;
let draggable = false;
let xOffset = 0; 
let yOffset = 0; 

function setup() {
  const width = windowWidth > 400 ? 400 : windowWidth
  const height = width
  createCanvas(width, height);
  noFill();
  ellipseMode(RADIUS);
}

function draw() {
  background(255);
  translate(width / 2, height / 2);

  // Draw the big circles.
  for (let i = 0; i < numA; i++) {
    ellipse(0, 0, i*radiusA, i*radiusA);
  }
  
  // Check if the current mouse position is within the area of the small circles.
  if (mouseX > xPos - radiusB && mouseX < xPos + radiusB && 
    mouseY > yPos - radiusB && mouseY < yPos + radiusB) {
      overCircles = true;
  }
  
  // Draw the small circles.
  for (let i = 0; i < numB; i++) {
    ellipse(xPos, yPos, i*radiusB, i*radiusB);
  }
}

function mousePressed() {
  if (overCircles) {
    draggable = true;
    // Calculate the offset between mouse coordinates and circle coordinates.
    // This is crucial to prevent position jumps on dragging.
    xOffset = mouseX - xPos; 
    yOffset = mouseY - yPos;
  } 
}

function mouseDragged() {
  if (draggable) {
    
    // Prevent the circles from being dragged outside of the window.
    if (mouseX < 0 || mouseX > width) {
      mouseX = pmouseX;
    }
    if (mouseY < 0 || mouseY > height) {
      mouseY = pmouseY;
    }
    
    // Change the radius according to the x coordinate of the mouse.
    // The more left the circles are dragged, the smaller gets each of the radii.
    radiusB = (sqrt(mouseX) + 10) / 10;

    // Use the previously calculated offset to ensure correct drag movement.
    xPos = mouseX - xOffset;
    yPos = mouseY - yOffset;
  }
}

function mouseReleased() {
  draggable = false;
}