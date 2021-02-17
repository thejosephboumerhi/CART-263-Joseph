"use strict";

/**
E4 - Bubble Popper++
Joseph Boumerhi

This is a template. You must fill in the title,
author, and this description to match your project!
*/
let state = `title`;
let instructions = `Use your index finger to pop the bubbles, click to start
Blues give points
Green gives lifes
Purple hurts`;

let video = undefined;

let handpose = undefined;
let predictions = [];

let bubble = undefined;
let poisonBubble = undefined;

let lives = 3;
let bubblePoints = 6;

function setup() {
  createCanvas(800, 600);

  //Access user's webcam
  video = createCapture(VIDEO);
  video.hide();

  //Loads handpose model
  handpose = ml5.handpose(video, { flipHorizontal: true }, function () {
    console.log("Model loaded");
  });

  handpose.on("predict", function (results) {
    console.log(results);
    predictions = results;
  });

  bubble = {
    x: random(width),
    y: height,
    size: 100,
    vx: 0,
    vy: -2,
  };

  poisonBubble = {
    x: random(width),
    y: height,
    size: 75,
    vx: 0,
    vy: -1,
  };
}

/**
Description of draw()
*/
function draw() {
  if (state === `title`) {
    background(0, 2, 97);
    title();
  } else if (state === `bubblePoppin`) {
    background(3, 1, 105);
    mLfingerPopper();
    bubbleDisplay();
    bubbleMovement();
    playerCounter();
  } else if (state === `poppinChampion`) {
    background(255);
    winScreen();
  } else if (state === `bubblePoppinBaby`) {
    background(0);
    endScreen();
  }
}

function mLfingerPopper() {
  if (predictions.length > 0) {
    let hand = predictions[0];
    let index = hand.annotations.indexFinger;
    let tip = index[3];
    let base = index[0];
    let tipX = tip[0];
    let tipY = tip[1];
    let baseX = base[0];
    let baseY = base[1];

    push();
    noFill();
    stroke(255, 255, 255);
    strokeWeight(2);
    line(baseX, baseY, tipX, tipY);
    pop();

    push();
    noStroke();
    fill(255, 0, 0);
    ellipse(baseX, baseY, 20);
    pop();

    //Bubble hit registration
    //Detection for blue bubble
    let d = dist(tipX, tipY, bubble.x, bubble.y);
    if (d < bubble.size / 2) {
      bubble.x = random(width);
      bubble.y = height;
    }

    //Detection for purple bubble
    let toxic = dist(tipX, tipY, poisonBubble.x, poisonBubble.y);
    if (toxic < poisonBubble.size / 2) {
      poisonBubble.x = random(width);
      poisonBubble.y = height;
    }
  }
}

function bubbleDisplay() {
  push();
  fill(0, 100, 200);
  noStroke();
  ellipse(bubble.x, bubble.y, bubble.size);
  pop();

  push();
  fill(197, 26, 219);
  noStroke();
  ellipse(poisonBubble.x, poisonBubble.y, poisonBubble.size);
  pop();
}

function bubbleMovement() {
  bubble.x += bubble.vx;
  bubble.y += bubble.vy;

  if (bubble.y < 0) {
    bubble.x = random(width);
    bubble.y = height;
  }

  poisonBubble.x += poisonBubble.vx;
  poisonBubble.y += poisonBubble.vy;

  if (poisonBubble.y < 0) {
    poisonBubble.x = random(width);
    poisonBubble.y = height;
  }
}

//Title screen text
function title() {
  push();
  textSize(30);
  fill(0, 198, 201);
  stroke(0);
  strokeWeight(5);
  textAlign(CENTER, CENTER);
  text(`Bubble Popper++`, width / 2, height / 2);
  textSize(15);
  fill(182, 207, 0);
  text(instructions, width / 2, height / 1.5);
  pop();
}

function playerCounter() {
  push();
  textSize(30);
  fill(255);
  stroke(0);
  strokeWeight(5);
  textAlign(LEFT, BOTTOM);
  text(`Lives: ${lives}`, width / 20, 550);
  text(`Bubbles Popped: ${bubblePoints}`, width / 20, 575);
  pop();
}

//Text if you pop enough of the wrong bubbles
function endScreen() {
  push();
  textSize(30);
  fill(197, 26, 219);
  stroke(0);
  strokeWeight(5);
  textAlign(CENTER, CENTER);
  text(`You intoxicated yourself!`, width / 2, height / 2);
  pop();
}

//Text for when you pop enough blue bubbles
function winScreen() {
  push();
  textSize(30);
  fill(235, 216, 52);
  stroke(0);
  strokeWeight(5);
  textAlign(CENTER, CENTER);
  text(`You popped bubbles for long enough`, width / 2, height / 2);
  pop();
}

//Usual mouse press
function mousePressed() {
  if (state === `title`) {
    state = `bubblePoppin`;
  } else if (state === `poppinChampion`) {
    state = `title`;
  } else if (state === `bubblePoppinBaby`) {
    state = `title`;
  }
}
