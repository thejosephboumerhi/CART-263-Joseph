/**
P1: Night at the Movies
Joseph Boumerhi

I made a game based on the movie "Rambo: Last Blood"
*/

"use strict";

//Starting state
let state = `title`;

let player;

//Variables for the fonts
let fontTitle;
let boxFont;
let instrucFont;
let endGoodFont;
let endBadFont;

let instructions = `[WASD] to move around`;

/**
Description of preload
*/
function preload() {
  //All fonts from daFont
  //https://www.dafont.com/no-safety-zone.font
  fontTitle = loadFont("assets/fonts/NoSafetyZone.ttf");
  //https://www.dafont.com/dirtybag.font
  boxFont = loadFont("assets/fonts/DIRTYBAG.ttf");
  //https://www.dafont.com/lt-emphasis.font
  instrucFont = loadFont("assets/fonts/LTEmphasis.ttf");
  //https://www.dafont.com/no-safety-zone.font
  endGoodFont = loadFont("assets/fonts/NoSafetyZone.ttf");
  //https://www.dafont.com/blood-lust.font
  endBadFont = loadFont("assets/fonts/BloodLust.ttf");

  //For the sprites
}

/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);
  //player = new Player();

  //Setups the buttons once (the nice buttons I had made for last semester)
  button = new Buttons();
  play = new PlayButton();
  howToPlay = new HowToPlayButton();
  backToMenu = new BackToTitleButton();
}

/**
Description of draw()
*/

//Usual state machine
function draw() {
  if (state === `title`) {
    background(0);
    cursor();
    title();
    play.displayButton();
    howToPlay.displayButton();
  } else if (state === `howToPlay`) {
    background(0);
    howToPlay();
    backToMenu.displayButton();
  } else if (state === `inGame`) {
    background(0);
    //gameplay();
  } else if (state === `winGame`) {
    background(0);
    gameWin();
    backToMenu.displayButton();
  } else if (state === `endGame`) {
    background(0);
    gameOver();
    backToMenu.displayButton();
  }
}

//Game stuff

//function gameplay() {}

//Usual text for the various states

function title() {
  push();
  //imageMode(LEFT, CENTER);
  //image(, 0, 0);
  textSize(40);
  textFont(fontTitle);
  fill(255, 0, 0);
  stroke(0);
  strokeWeight(5);
  textAlign(CENTER, CENTER);
  text(`RAMBO: LAST BLOOD`, width / 2, height / 2);
  pop();
}

//Display the instructions on how to play
function howToPlay() {
  push();
  textSize(30);
  textFont(instrucFont);
  fill(200);
  stroke(0);
  strokeWeight(5);
  textAlign(CENTER, CENTER);
  text(instructions, width / 2, height / 2);
  pop();
}

//Displays the victory text
function gameWin() {
  push();
  textSize(40);
  textFont(endGoodFont);
  fill(225, 25, 25);
  stroke(0);
  strokeWeight(5);
  textAlign(CENTER, CENTER);
  text(`You Win`, width / 2, height / 2);
  pop();
}

//Displays the losing text
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

function mousePressed() {
  //Allows for the buttons to be used, alongside the state they change to when
  //pressed on.

  //The play button to start the game
  if (
    mouseX > play.x &&
    mouseX < play.x + play.w &&
    mouseY > play.y &&
    mouseY < play.y + play.h &&
    state === `title`
  ) {
    state = `inGame`;
  }

  //The button to look at the instructions
  if (
    mouseX > howToPlay.x &&
    mouseX < howToPlay.x + howToPlay.w &&
    mouseY > howToPlay.y &&
    mouseY < howToPlay.y + howToPlay.h &&
    state === `title`
  ) {
    state = `howToPlay`;
  }

  //A "back" button, so you can move back to the menu and play
  if (
    (mouseX > backToMenu.x &&
      mouseX < backToMenu.x + backToMenu.w &&
      mouseY > backToMenu.y &&
      mouseY < backToMenu.y + backToMenu.h &&
      state === `howToPlay`) ||
    `winGame` ||
    `endGame`
  ) {
    state = `title`;
  }
}
