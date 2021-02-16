"use strict";

/**
A4 - Bubble Popper
Joseph Boumerhi

This is a template. You must fill in the title,
author, and this description to match your project!
*/

let video = undefined;

let handpose = undefined;

let predictions = [];

function setup() {
  createCanvas(640,480);

//Access user's webcam
  video = createCapture(VIDEO);
  video.hide();

//Loads handpose model
  handpose = ml5.handpose(video, {flipHorizontal: true}, function() {console.log('Model loaded');};});

}

/**
Description of draw()
*/
function draw() {}
