"use strict";

/**
P1: Night at the Movies
Joseph Boumerhi

A game of the movie ""
*/

let state = `title`;
let player;

let fontTitle;

/**
Description of preload
*/
//function preload() {

//}

/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);
}

/**
Description of draw()
*/
function draw() {
  if (state === `title`) {
    background(0);
  } else if (state === `howToPlay`) {
    background(0);
  } else if (state === `inGame`) {
    background(0);
  } else if (state === `endGame`) {
    background(0);
  }
}
