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

//Variable for the webcam
let video = undefined;

//Variables for the machine learning finger
let handpose = undefined;
let predictions = [];

//Variables for the bubbles
let bubble = undefined;
let poisonBubble = undefined;
let healingBubble = undefined;

//Variables for the counters for player, lives and points
let lives = 2;
let bubblePoints = 0;

//Setups canvas, starts up the camera and ML model and predictions
function setup() {
  createCanvas(640, 480);

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

  //All the bubbles, have different sizes and speeds, could've been in classes,
  //for the sake of this exercise, I'll leave it like this
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

  healingBubble = {
    x: random(width),
    y: height,
    size: 40,
    vx: 0,
    vy: -10,
  };
}

//The different states, the title, loading, the game, and the ends,
//with all their associated functions
function draw() {
  if (state === `title`) {
    background(0, 2, 97);
    title();
    frameCount = 0;
  } else if (state === `loading`) {
    background(0, 146, 214);
    unsureIfthisIsAnActualLoadingScreen();
  } else if (state === `bubblePoppin`) {
    background(3, 1, 105);
    mLfingerPopper();
    bubbleDisplay();
    bubbleMovement();
    playerCounter();
    conclusionConditions();
  } else if (state === `poppinChampion`) {
    background(189, 189, 189);
    winScreen();
  } else if (state === `bubblePoppinBaby`) {
    background(36, 36, 36);
    endScreen();
  }
}

//The machine learning finger, its display, and its bubble hit registration
function mLfingerPopper() {
  //Determines where and how you are pointing your index finger
  if (predictions.length > 0) {
    let hand = predictions[0];
    let index = hand.annotations.indexFinger;
    let tip = index[3];
    let base = index[0];
    let tipX = tip[0];
    let tipY = tip[1];
    let baseX = base[0];
    let baseY = base[1];

    //Base of the index finger
    push();
    noFill();
    stroke(255, 255, 255);
    strokeWeight(2);
    line(baseX, baseY, tipX, tipY);
    pop();

    //Pointing finger
    push();
    noStroke();
    fill(255, 0, 0);
    ellipse(baseX, baseY, 20);
    pop();

    //Bubble hit registration
    //Detection for blue bubble, points
    let d = dist(tipX, tipY, bubble.x, bubble.y);
    if (d < bubble.size / 2) {
      bubble.x = random(width);
      bubble.y = height;
      bubblePoints += 1;
    }

    //Detection for purple bubble, damages
    let toxic = dist(tipX, tipY, poisonBubble.x, poisonBubble.y);
    if (toxic < poisonBubble.size / 2) {
      poisonBubble.x = random(width);
      poisonBubble.y = height;
      lives -= 1;
    }

    //Detection for lime-green bubble, heals
    let heal = dist(tipX, tipY, healingBubble.x, healingBubble.y);
    if (heal < healingBubble.size / 2) {
      healingBubble.x = random(width);
      healingBubble.y = height;
      lives += 1;
    }
  }
}

//Displays the bubbles, with their own unique colors
function bubbleDisplay() {
  //Blue, bubbly bubble
  push();
  fill(0, 100, 200);
  noStroke();
  ellipse(bubble.x, bubble.y, bubble.size);
  pop();

  //Purple, poisonous bubble
  push();
  fill(197, 26, 219);
  noStroke();
  ellipse(poisonBubble.x, poisonBubble.y, poisonBubble.size);
  pop();

  //Lime-green, revitalizing bubble
  push();
  fill(0, 230, 11);
  noStroke();
  ellipse(healingBubble.x, healingBubble.y, healingBubble.size);
  pop();
}

//All their same movement
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

  healingBubble.x += healingBubble.vx;
  healingBubble.y += healingBubble.vy;

  if (healingBubble.y < 0) {
    healingBubble.x = random(width);
    healingBubble.y = height;
  }
}

//Determines whether you win or lose based on the values
function conclusionConditions() {
  //If you score 6 points, you win
  if (bubblePoints >= 6) {
    state = `poppinChampion`;
  }
  //If your lives reaches 0, game over
  if (lives <= 0) {
    state = `bubblePoppinBaby`;
  }
}

//Title screen text, with the instructions
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

//Displays "Loading..." text, unsure if it's a actual loading screen, hence
//the jokingly long function name
function unsureIfthisIsAnActualLoadingScreen() {
  //FrameCount on the loading state to "waste" your time
  let wasteOfTime = 120;
  if (frameCount > wasteOfTime) {
    state = `bubblePoppin`;
  }

  //The text
  push();
  textSize(30);
  fill(255, 132, 0);
  stroke(0);
  strokeWeight(5);
  textAlign(CENTER, CENTER);
  text(`Loading...`, width / 2, height / 2);
  pop();
}

//Text that displays counters for lifes and points
function playerCounter() {
  push();
  textSize(30);
  fill(255);
  stroke(0);
  strokeWeight(5);
  textAlign(LEFT, BOTTOM);
  text(`Lives: ${lives}`, width / 20, 440);
  text(`Bubbles Popped: ${bubblePoints}`, width / 20, 460);
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
  text(`You popped enough bubbles`, width / 2, height / 2);
  pop();
}

//Usual mouse press for loading and restarting after finishing
function mousePressed() {
  if (state === `title`) {
    state = `loading`;
  } else if (state === `poppinChampion` || `bubblePoppinBaby`) {
    state = `title`;
    lives = 3;
    bubblePoints = 0;
    //} else if (state === `bubblePoppinBaby`) {
    //state = `title`;
    //}
  }
}
