"use strict";

/**
E4 - Bubble Popper++
Joseph Boumerhi

This is a template. You must fill in the title,
author, and this description to match your project!
*/
let state = `title`;

let video = undefined;

let handpose = undefined;

let predictions = [];

let bubble = undefined;

let poisonBubble = undefined;

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

  bubble = {
    x: random(width),
    y: height,
    size: 100,
    vx: 0,
    vy: -1,
  };

  poisonBubble = {
    x: random(width),
    y: height,
    size: 100,
    vx: 0,
    vy: -1,
  };
}

/**
Description of draw()
*/
function draw() {
  if (state === `title`) {
    background(100, 200, 100);
    title();
  } else if (state === `bubblePoppin`) {
    background(0, 163, 84);
    mLfingerPopper();
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

    let d = dist(tipX, tipY, bubble.x, bubble.y);
    if (d < bubble.size / 2) {
      bubble.x = random(width);
      bubble.y = height;
    }
  }

  bubble.x += bubble.vx;
  bubble.y += bubble.vy;

  if (bubble.y < 0) {
    bubble.x = random(width);
    bubble.y = height;
  }

  push();
  fill(0, 100, 200);
  noStroke();
  ellipse(bubble.x, bubble.y, bubble.size);
  pop();
}

function bubbleRegistration() {
  let d = dist(tipX, tipY, bubble.x, bubble.y);
  if (d < bubble.size / 2) {
    bubble.x = random(width);
    bubble.y = height;
  }

  //Title screen text
  function title() {
    push();
    textSize(30);
    fill(0, 208, 212);
    stroke(0);
    strokeWeight(5);
    textAlign(CENTER, CENTER);
    text(`Bubble Popper++`, width / 2, height / 2);
    pop();
  }

  //Text if you cannot find the dog in time
  function endScreen() {
    push();
    textSize(30);
    fill(255, 0, 0);
    stroke(0);
    strokeWeight(5);
    textAlign(CENTER, CENTER);
    text(`You intoxicated yourself!`, width / 2, height / 2);
    pop();
  }

  //Text for when you click the dog in time
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

  function mousePressed() {
    if (state === `title`) {
      state = `questionnaire`;
    } else if (state === `questionnaire`) {
      currentAnimal = random(animals);
      let reverseAnimal = reverseString(currentAnimal);
      responsiveVoice.speak(reverseAnimal);
    } else if (state === `wonQuiz`) {
      state = `title`;
    } else if (state === `lostQuiz`) {
      state = `title`;
    }
  }
}
