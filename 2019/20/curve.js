/**
 * A p5.js sketch to draw a hypotrochoid curve using a
 * parametric equation https://en.wikipedia.org/wiki/Parametric_equation
 */

let xPos
let yPos
const a = 1
const b = 80
const c = 1
const d = 80
let angle = 0

function setup() {
  const width = windowWidth > 350 ? 400 : windowWidth
  const height = 350
  createCanvas(width, height)
  frameRate(10)
}

function draw() {
  colorMode(HSB, 360, 100, 100)
  xPos = cos(a * angle) - cos(pow(b * angle, 3))
  yPos = sin(c * angle) - sin(pow(d * angle, 3))
  // console.log(xPos)
  // console.log(yPos)
  xPos = map(xPos, -2, 2, 0, width)
  yPos = map(yPos, -2, 2, 0, height)
  // stroke(78, 2, 66);
  // Color varies depending on current yPos
  stroke(360 - yPos, 100, 100)
  strokeWeight(2)
  line(width / 2, height / 2, xPos, yPos)
  angle += 0.5 * PI
}
