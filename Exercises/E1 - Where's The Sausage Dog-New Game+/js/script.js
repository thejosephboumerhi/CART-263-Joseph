/**************************************************
E1 - Where's The Sausage Dog-New Game+
Joseph Boumerhi

Enhanced saugage dog tracking experience
**************************************************/
`use strict`;
let state = `title`;

const NUM_ANIMAL_IMAGES = 10;
const NUM_ANIMAL = 100;

let animalImages = [];
let animals = [];

let sausageDogImage = undefined;
let sausageDog = undefined;

//Preloads images, all with the same name could randomly be taken and used on
//a given animal (animal(0-9).png)
function preload() {
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++) {
    let animalImage = loadImage(`assets/images/animal${i}.png`);
    animalImages.push(animalImage);
  }

  sausageDogImage = loadImage(`assets/images/sausage-dog.png`);
}

//Same old setup from Activity, randomly places all animals, and the one dog
function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < NUM_ANIMAL; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let animalImage = random(animalImages);
    let animal = new Animal(x, y, animalImage);
    animals.push(animal);
  }

  let x = random(0, width);
  let y = random(0, height);
  sausageDog = new SausageDog(x, y, sausageDogImage);
}

//Various click states, and the gameplay being dogPlaytime()
function draw() {
  if (state === `title`) {
    background(230, 100, 100);
    title();
    frameCount = 0;
  } else if (state === `playTime`) {
    background(0, 163, 84);
    countdown();
    dogPlaytime();
  } else if (state === `foundDog`) {
    background(211, 214, 30);
    winScreen();
  } else if (state === `lostDog`) {
    background(66, 44, 0);
    endScreen();
  }
}

function countdown() {
  //Timer using frameCount, 1800 is for 30 seconds, lose when reached
  let timer = int(frameCount / 60);
  let loseTime = 1800;
  if (frameCount > loseTime) {
    state = `lostDog`;
  }

  //Text in top-center showing the time
  push();
  textSize(30);
  fill(200);
  stroke(0);
  strokeWeight(5);
  textAlign(CENTER, CENTER);
  text(timer, width / 2, height / 10);
  pop();
}

//Could be used for reset?
function restartAnimalArray() {
  for (let i = 0; i < NUM_ANIMAL; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let animalImage = random(animalImages);
    let animal = new Animal(x, y, animalImage);
    animals.push(animal);
  }
}

//Displays the animals
function dogPlaytime() {
  for (let i = 0; i < animals.length; i++) {
    animals[i].update();
  }

  sausageDog.update();
}

//Title screen text
function title() {
  push();
  textSize(30);
  fill(0, 208, 212);
  stroke(0);
  strokeWeight(5);
  textAlign(CENTER, CENTER);
  text(`Where's The Sausage Dog: New Game+`, width / 2, height / 2);
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
  text(`You couldn't find the dog`, width / 2, height / 2);
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
  text(`You found the dog`, width / 2, height / 2);
  pop();
}

//Lets user click through states, and click on the dog
function mousePressed() {
  if (state === `title`) {
    state = `playTime`;
  } else if (state === `playTime`) {
    sausageDog.mousePressed();
  } else if (state === `foundDog`) {
    state = `title`;
    sausageDog.found = false;
    animalImages = [];
    animals = [];
  } else if (state === `lostDog`) {
    state = `title`;
    sausageDog.found = false;
    animalImages = [];
    animals = [];
  }
}
