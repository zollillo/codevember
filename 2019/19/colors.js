/*
  This p5.js sketch draws a simple 2D grid with differently colored rects.
  Interaction is provided to allow for changing the density of the 
  grid cells and for coloring to grid cells randomly:
  - Key 'UP_ARROW': Increase grid density.
  - Key 'DOWN_ARROW': Decrease grid density.
  - Key 'c': Toggle between fixed and random grid colors.
*/

let gridLength = 12.5
let intensity = 1
let pulseColor = false


function setup() {
  const width = windowWidth > 400 ? 400 : windowWidth
  const height = width
  createCanvas(width, height)
  frameRate(2)
}

function draw() {
  background(220)
  colorMode(HSB, width, width / 2, 100)
  // Create the grid.
  for (let i = 0; i < width / gridLength; i++) {
    for (let j = 0; j < height / gridLength; j++) {
      fill(
        intensity * i * gridLength,
        intensity * (height - j * gridLength),
        100
      )
      rect(i * gridLength, j * gridLength, gridLength, gridLength)
      // Set a white stroke.
      // In HSB this is brightness 0% and saturation 100%; hue can be anything
      stroke(220, 0, 100)
      if (pulseColor) {
        intensity = random(0, 1)
      }
    }
  }
}

function keyPressed() {
  console.log(keyCode)
  // Decrease the density of grid cells (i.e. multiply by 2 and increase 
  // grid length) by pressing the 'DOWN_ARROW' key, but only if the current
  // grid length ranges from 12.5 up to but not including 400.
  if (keyCode === DOWN_ARROW) {
    if (gridLength >= 12.5 && gridLength < 400) {
      gridLength = gridLength * 2;
    }
  }
  // Increase the density of grid cells (i.e. divide by 2 and decrease grid
  // length) by pressing the 'UP_ARROW' key, but only if the current grid length
  // ranges from 400 down to but not including 12.5.
  if (keyCode === UP_ARROW) {
    if (gridLength <= 400 && gridLength > 12.5) {
      gridLength = gridLength / 2;
    } 
  }
  
  // Toggle color pulsing by pressing the 'c' key.
  if (keyCode === 67) {
    pulseColor = pulseColor ? false : true;
  }

}


