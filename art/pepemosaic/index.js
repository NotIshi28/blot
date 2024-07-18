/*
@title: Pepe Mosaic
@author: Ishit Rastogi
@snapshot: pepemosaic.png
*/

const width = 125;
const height = 125;
const side = 5;
const backgroundColor = "#e0f7fa";
const colors = ["#4db6ac", "#80deea", "#26a69a", "#64ffda", "#00796b"];

setDocDimensions(width, height);

let { sqrt } = Math;

function getRandomColor() {
  return colors[bt.randIntInRange(0, colors.length - 1)];
}

// Pepe the Frog parts
const headOutline = [
  [40, 80], [45, 60], [50, 50], [60, 40], [70, 35], [80, 35], [90, 40],
  [95, 50], [100, 60], [105, 80], [100, 90], [80, 95], [60, 95], [50, 90],
  [40, 80]
];

const leftEye = [
  [55, 60], [60, 55], [65, 55], [70, 60], [65, 65], [60, 65], [55, 60]
];

const rightEye = [
  [80, 60], [85, 55], [90, 55], [95, 60], [90, 65], [85, 65], [80, 60]
];

const mouth = [
  [55, 80], [65, 85], [75, 85], [85, 80]
];

// Store final lines
const finalLines = [headOutline, leftEye, rightEye, mouth];

// Function to generate a hat
function hat(x, y, r = 1) {
  const t = new bt.Turtle();
  t
    .jump([x, y + side * 2 * r])
    .setAngle(0 * r)
    .forward(side)
    .setAngle(60 * r)
    .forward(side)
    .setAngle(-30 * r)
    .forward(side * 2)
    .setAngle(-90 * r)
    .forward(side * 2)
    .setAngle(0 * r)
    .forward(side)
    .setAngle(-60 * r)
    .forward(side)
    .setAngle(-150 * r)
    .forward(side * 2)
    .setAngle(150 * r)
    .forward(side * 2)
    .setAngle(-120 * r)
    .forward(side)
    .setAngle(180 * r)
    .forward(side * 2)
    .setAngle(120 * r)
    .forward(side)
    .setAngle(30 * r)
    .forward(side * 2)
    .setAngle(90 * r)
    .forward(side * 2)
  return t.lines()
}

// Hats positions and rotations
const hats = [
  [5.5, 3.5, 60],
  [-10.8, 9.6, 60],
  [54.4, -2.6, 60],
  [12, 14, 180],
  [21.8, 1.8, -60, -1],
  [13.2, 32.6, 0, -1],
  [-1.4, 24.2, 120],
  [29.6, 27.2, 0],
  [30.2, 13, 120],
  [38, 3.5, 60],
  [60.8, 7.8, 180],
  [47.6, 17.8, 120],
  [15.2, 40.2, 120],
  [40.3, 35.8, 60],
  [70.8, -4.2, -60, -1],
  [79.1, 7, 120],
  [87.1, -2.5, 60],
  [32.4, 45.2, 120],
  [-3.0, 41.2, 180],
  [14.4, 54.4, 0],
  [-1.8, 60, 0, -1],
  [103.4, -4.2, -60, -1],
  [62.2, 26.4, 0, -1],
  [78.4, 21.1, 0],
  [-3.2, 71.2, 0, -1],
  [-18.6, 19.2, 120],
  [-14, 32.8, -120],
  [-16.1, 51.3, 120],
  [-21.3, 70.2, 60, -1],
  [25.4, -10.2, -60],
  [43.6, -11.0, 0]
];

// Background
drawLines([
  [
    [width, height],
    [0, height],
    [width, 0],
    [width, height]
  ]
], {
  fill: backgroundColor
});

// Hats
for (let h of hats) {
  drawLines(bt.rotate(hat(side + h[0], (side + h[1]) * sqrt(3), h[3] || 1), h[2]), {
    fill: getRandomColor(),
    stroke: "#fff",
    width: 1
  });
}

// Function to mirror lines vertically
function mirrorVertically(lines, height) {
  return lines.map(line => line.map(([x, y]) => [x, height - y]));
}

// Mirror the final lines vertically
const mirroredLines = mirrorVertically(finalLines, height);

// Cool effects: rotate, scale, and resample
bt.rotate(mirroredLines, 30, [width / 2, height / 2]);
bt.scale(mirroredLines, [0.8, 0.8], [width / 2, height / 2]);
bt.resample(mirroredLines, 5);

// Center polylines
function centerPolylines(polylines, documentWidth, documentHeight, offsetX = 0, offsetY = 0) {
  const cc = bt.bounds(polylines).cc;
  bt.translate(polylines, [documentWidth + offsetX, documentHeight + offsetY], cc);
}

// Move Pepe to the top right corner
centerPolylines(mirroredLines, width, height, -width / 2, -height / 2);

// Draw Pepe with effects
drawLines(mirroredLines);
