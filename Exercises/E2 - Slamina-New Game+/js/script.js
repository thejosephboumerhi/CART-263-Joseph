/**************************************************
A2 - Slamina
Joseph Boumerhi

Here is a description of this template p5 project.
**************************************************/
"use strict";

let state = `title`;

let timeLimit = 0;
let timeFailure = false;

let score = 0;

const animals = [
  "aardvark",
  "alligator",
  "alpaca",
  "antelope",
  "ape",
  "armadillo",
  "baboon",
  "badger",
  "bat",
  "bear",
  "beaver",
  "bison",
  "boar",
  "buffalo",
  "bull",
  "camel",
  "canary",
  "capybara",
  "cat",
  "chameleon",
  "cheetah",
  "chimpanzee",
  "chinchilla",
  "chipmunk",
  "cougar",
  "cow",
  "coyote",
  "crocodile",
  "crow",
  "deer",
  "dingo",
  "dog",
  "donkey",
  "dromedary",
  "elephant",
  "elk",
  "ewe",
  "ferret",
  "finch",
  "fish",
  "fox",
  "frog",
  "gazelle",
  "gila monster",
  "giraffe",
  "gnu",
  "goat",
  "gopher",
  "gorilla",
  "grizzly bear",
  "ground hog",
  "guinea pig",
  "hamster",
  "hedgehog",
  "hippopotamus",
  "hog",
  "horse",
  "hyena",
  "ibex",
  "iguana",
  "impala",
  "jackal",
  "jaguar",
  "kangaroo",
  "koala",
  "lamb",
  "lemur",
  "leopard",
  "lion",
  "lizard",
  "llama",
  "lynx",
  "mandrill",
  "marmoset",
  "mink",
  "mole",
  "mongoose",
  "monkey",
  "moose",
  "mountain goat",
  "mouse",
  "mule",
  "muskrat",
  "mustang",
  "mynah bird",
  "newt",
  "ocelot",
  "opossum",
  "orangutan",
  "oryx",
  "otter",
  "ox",
  "panda",
  "panther",
  "parakeet",
  "parrot",
  "pig",
  "platypus",
  "polar bear",
  "porcupine",
  "porpoise",
  "prairie dog",
  "puma",
  "rabbit",
  "raccoon",
  "ram",
  "rat",
  "reindeer",
  "reptile",
  "rhinoceros",
  "salamander",
  "seal",
  "sheep",
  "shrew",
  "silver fox",
  "skunk",
  "sloth",
  "snake",
  "squirrel",
  "tapir",
  "tiger",
  "toad",
  "turtle",
  "walrus",
  "warthog",
  "weasel",
  "whale",
  "wildcat",
  "wolf",
  "wolverine",
  "wombat",
  "woodchuck",
  "yak",
  "zebra",
];

let currentAnimal = ``;
let currentAnswer = ``;

function setup() {
  createCanvas(windowWidth, windowHeight);

  if (annyang) {
    let commands = {
      "I think it is *animal": guessAnimal,
    };

    annyang.addCommands(commands);
    annyang.start();

    textSize(32);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
  }
}

function draw() {
  background(0);

  if (state === `title`) {
    background(100, 200, 100);
    title();
    frameCount = 0;
  } else if (state === `questionnaire`) {
    background(0, 163, 84);
    countdown();
    quizTime();
    guessAnimal(animal);
  } else if (state === `wonQuiz`) {
    background(255);
    winScreen();
  } else if (state === `lostQuiz`) {
    background(0);
    endScreen();
  }
}

//Title screen text
function title() {
  push();
  textSize(30);
  fill(0, 208, 212);
  stroke(0);
  strokeWeight(5);
  textAlign(CENTER, CENTER);
  text(`Slamina: New Game+`, width / 2, height / 2);
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
  text(`You were incorrect too much`, width / 2, height / 2);
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
  text(`You were correct`, width / 2, height / 2);
  pop();
}

function quizTime() {
  if (currentAnswer === currentAnimal) {
    fill(0, 255, 0);
  } else {
    fill(255, 0, 0);
  }
  text(currentAnswer, width / 2, height / 2);
}

function countdown() {
  //Timer using frameCount, 1800 is for 30 seconds, lose when reached
  let timer = int(frameCount / 60);
  let loseTime = 1800;
  if (frameCount > loseTime) {
    state = `lostQuiz`;
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

  function guessAnimal(animal) {
    currentAnswer = animal.toLowerCase();
    console.log(currentAnswer);
  }

  /**
Reverses the provided string
*/
  function reverseString(string) {
    // Split the string into an array of characters
    let characters = string.split("");
    // Reverse the array of characters
    let reverseCharacters = characters.reverse();
    // Join the array of characters back into a string
    let result = reverseCharacters.join("");
    // Return the result
    return result;
  }
}
