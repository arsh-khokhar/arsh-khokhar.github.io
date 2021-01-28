let hills;
let sky;
let width;
let height;

let centerX;
let centerY;
let theta;
let radii;
let hillNoises;
let strokes;
let numStars;

var canvas;

function preload () {
  sky = loadImage ('assets/img/sky.png');
}

function setup () {
  width = windowWidth;
  height = windowHeight;

  centerX = 0;
  centerY = 0;
  theta = 0.5;
  radii = [];
  hillNoises = [];
  strokes = [];
  numStars = 1500;
  for (var i = 0; i < numStars; i++) {
    radii.push (random (width));
  }
  for (var i = 0; i < numStars; i++) {
    strokes.push (random (20, 255));
  }

  canvas = createCanvas (width, height, WEBGL);
  canvas.position (0, 0);
  canvas.style ('z-index', -1);
  image (sky, 0, 0, width, height);
  ping = createGraphics (width, height);
  pong = createGraphics (width, height);

  hillsBuffer = createGraphics (width, height, WEBGL);
  hillsBuffer.background (0, 0, 0, 0);
  for (let x = -width / 2; x <= width / 2; x++) {
    let noiseVal = noise (x * width / 1000000, width / 1000000);
    hillsBuffer.stroke (0);
    hillsBuffer.strokeWeight (1);
    hillsBuffer.line (x, noiseVal * height / 2, x, height);
    hillsBuffer.stroke (150 - noiseVal * 255);
    hillsBuffer.strokeWeight (10);
    hillsBuffer.point (x, noiseVal * height / 2);
  }
}

var numLayers = 0;
var fade = 220;
var minFade = 10;
function draw () {
  background (0);
  if (fade < minFade) {
    if (numLayers > 5) {
      pong.clear ();
      numLayers = 0;
    }
    pong.image (ping, 0, 0, width, height);
    ping.clear ();
    radii = [];
    for (var i = 0; i < numStars; i++) {
      radii.push (random (25, windowWidth));
    }
    fade = 255;
    numLayers++;
  }
  image (sky, -width / 2, -height / 2, width, height);
  tint (127);
  ping.push ();
  ping.translate (120, -150);
  for (var i = 0; i < numStars; i++) {
    ping.stroke (strokes[i]);
    ping.strokeWeight (2 - strokes[i] / 127);
    ping.point (
      centerX + ping.width / 2 + sin (theta * radii[i]) * radii[i],
      centerY + ping.height / 2 + cos (theta * radii[i]) * radii[i]
    );
  }
  ping.pop ();
  tint (255, minFade);
  image (pong, -width / 2, -height / 2, width, height);

  tint (255, fade);
  image (ping, -width / 2, -height / 2, width, height);

  tint (255, 255);
  image (hillsBuffer, -width / 2, 0, width, height / 2);
  theta += 0.0000005;
  fade -= 0.25;
}

function windowResized () {
  resizeCanvas (windowWidth, windowHeight);
}
