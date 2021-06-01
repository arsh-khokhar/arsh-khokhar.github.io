let gravityFields;
let width;
let height;
let time = 0;
let fade;

var canvas;

function preload () {}

class GravityField {
  constructor (center_x, center_y, diameter, grav_force) {
    this.center_x = center_x;
    this.center_y = center_y;
    this.diameter = diameter;
    this.grav_force = grav_force;
  }
}

class SinFlowField {
  constructor (start_x, end_x, width) {
    this.start_x = start_x;
    this.end_x = end_x;
    this.width = width;
  }
}

let particle_x;
let particle_y;

function setup () {
  width = windowWidth;
  height = windowHeight;

  gravityFields = [];

  gravityFields.push (new GravityField (width / 2, height / 2, 100, 9.8));
  canvas = createCanvas (width, height, WEBGL);
  canvas.position (0, 0);
  canvas.style ('z-index', -1);
  ping = createGraphics (width, height);
  pong = createGraphics (width, height);

  particle_x = 0;
  particle_y = height / 2;
}

function draw () {
  background (150);
  fill (255);
  ping.stroke (0);
  ping.strokeWeight (1);
  for (var i = 0; i < gravityFields.length; i++) {
    field = gravityFields[i];
    ping.circle (field.center_x, field.center_y, field.diameter);
  }

  ping.strokeWeight (5);
  ping.stroke (255, 0, 0);
  if (time * 200 < width / 2) {
    ping.point (time * 200, cos (time) * 50 + particle_y);
  }
  image (ping, -width / 2, -height / 2, width, height);
  time += 0.05;
}

function windowResized () {
  resizeCanvas (windowWidth, windowHeight);
}
