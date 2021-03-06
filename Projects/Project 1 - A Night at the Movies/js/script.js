"use strict";

/**
P1: Night at the Movies
Joseph Boumerhi

A game of the movie ""
*/

//Starting state
let state = `title`;
let player;

//Variables for the fonts
//let fontTitle;
//let helpFont;
//let inGameFont;
//let endGoodFont;
//let endBadFont;

let instructions = `[WASD] to move around`;

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
  player = new Player();
}

/**
Description of draw()
*/

//Usual state machine
function draw() {
  if (state === `title`) {
    background(0);
    title();
  } else if (state === `howToPlay`) {
    background(0);
    howToPlay();
  } else if (state === `inGame`) {
    background(0);
  } else if (state === `winGame`) {
    background(0);
    gameWin();
  } else if (state === `endGame`) {
    background(0);
    gameOver();
  }

  //Game stuff

  function gameplay() {}

  //Usual text for the various states

  function title() {
    push();
    //imageMode(LEFT, CENTER);
    //image(, 0, 0);
    textSize(40);
    textFont(fontTitle);
    fill(200, 0, 0);
    stroke(0);
    strokeWeight(5);
    textAlign(CENTER, CENTER);
    text(`A`, width / 2, height / 2);
    pop();
  }

  //Display the instructions on how to play
  function howToPlay() {
    push();
    textSize(30);
    textFont(helpFont);
    fill(200);
    stroke(0);
    strokeWeight(5);
    textAlign(CENTER, CENTER);
    text(instructions, width / 2, height / 2);
    pop();
  }

  //Displays the GameOver text
  function gameWin() {
    push();
    textSize(40);
    textFont(endGoodFont);
    fill(225, 25, 25);
    stroke(0);
    strokeWeight(5);
    textAlign(CENTER, CENTER);
    text(`You Died`, width / 2, height / 2);
    pop();
  }

  //Displays the GameOver text
  function gameOver() {
    push();
    textSize(40);
    textFont(endBadFont);
    fill(225, 25, 25);
    stroke(0);
    strokeWeight(5);
    textAlign(CENTER, CENTER);
    text(`You Died`, width / 2, height / 2);
    pop();
  }
}
