/*
  This sketch draws a simple 2D grid with differently colored rects.
  Interaction is provided to allow for changing the density of the 
  grid cells and for coloring to grid cells randomly:
  - Key 'w': Increase grid density.
  - Key 's': Decrease grid density.
  - Key 'c': Toggle between fixed and random grid colors.
*/

const gridLength = 12.5
const intensity = 1
const pulseColor = false

const x = 400 / gridLength
const y = 400 / gridLength

// void setup() {
//   size(400, 400);
//   background(209);
// }

d3.select('svg')
  .selectAll('rect')
  .data(d3.range(x * y))
  .enter()
  .append('rect')
  .attr('x', d => (d % x) * gridLength)
  .attr('y', d => Math.floor(d / x) * gridLength)
  .attr('width', gridLength)
  .attr('height', gridLength)
  .attr('stroke', '#fff')
  .attr('fill', d =>
    d3.hsl(intensity * d * gridLength, intensity * (y - d * gridLength), 100)
  )

/*
void draw() {
  frameRate(2);
  // Define color with hue, saturation, brightness.
  colorMode(HSB, width, width / 2, 100);
  // Create the grid.
  for (int i = 0; i < width / gridLength; i++) {
    for (int j = 0; j < height / gridLength; j++) {  
      fill(intensity * i * gridLength, intensity * (height - j * gridLength), 100);
      rect(i * gridLength, j * gridLength, gridLength, gridLength);
      if (pulseColor) {
        intensity = random(0, 1);
      }
    }
  } 
}

void keyPressed() {
  // Increase (here: multiply by 2) the density of grid cells by 
  // pressing the 'w' key, but only if the current grid length 
  // ranges from 12.5 up to but not including 200.
  if (key == 'w') {
    if (gridLength >= 12.5 && gridLength < 200) {
      gridLength = gridLength * 2;
    }
  }
  
  // Decrease (here: divide by 2) the density of grid cells by
  // pressing the 's' key, but only if the current grid length
  // ranges from 200 down to but not including 12.5.
  if (key == 's') {
    if (gridLength <= 200 && gridLength > 12.5) {
      gridLength = gridLength / 2;
    } 
  }
  
  // Toggle color pulsing by pressing the 'c' key.
  if (key == 'c') {
    pulseColor = pulseColor ? false : true;
  }
}
*/
