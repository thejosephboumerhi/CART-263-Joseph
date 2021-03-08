/**************************************************
Project 1: A Night at the Movies
Joseph Boumerhi

I based this game off "Rambo: Last Blood", reused
"Neo-Tenebris" from last semester, gave it a new coat of paint,
with the addition of new things, and some removals to fit a different feel
The scene in which this game is trying to emulate is from 1:08:17 to 1:18:06, which is a
final confrontation on Rambo's farm, and underground maze.
**************************************************/
`use strict`;
//Starting state, the main menu
let state = `title`;

//Player Variable
let player;

//Font Variables
let titleFont;
let buttonFont;
let howToPlayFont;
let deathFont;

//Instructions for htp() function
let instructions = `Press [WASD] to move around

Use Mouse to look around, and left click to shoot`;

//let note =;

//Enemy array, two spawn
let enemyGroup = [];
let enemyNum = 2;
//For spawning (overhauled)
//numDead = 0;

//Player projectile array, semi-auto firing, and fast moving shots
let projectileOut = [];
let projectileShot = 1;

//Enemy projectile array, fast firing and slow moving shots
let enemyProjectileOut = [];
let enemyProjectileShot = 1;

//Healing item array, spawns in healing item for limited time
let healItemOut = [];
let healItemAvailable = 1;

//Rock obstacle array, spawns walls/cover
let rockObstacleOut = [];
let rockObstacleSetup = 5;

//Images for the game, made by me using Piskel, an online pixel editor
let posterThumbnail;

//Images/Pixel for characters
let playerImg;
let playerRunImg;
let cursorImg;
let playerArmImg;
let playerShotImg;
let backgroundImg;
let titleImg;
let rangedEnemyImg;
let enemyShotImg;
let rockImg;
let healingPrescriptionImg;

//Preloads assets
function preload() {
  //All fonts from daFont
  //Switched to different fonts to fit movie visuals/theme
  //www.dafont.com/no-safety-zone.font
  titleFont = loadFont("assets/fonts/NoSafetyZone.ttf");
  //https://www.dafont.com/dirtybag.font
  buttonFont = loadFont("assets/fonts/DIRTYBAG.ttf");
  //https://www.dafont.com/lt-emphasis.font
  howToPlayFont = loadFont("assets/fonts/LTEmphasis.ttf");
  //https://www.dafont.com/blood-lust.font
  deathFont = loadFont("assets/fonts/BloodLust.ttf");

  //Image used for the movie, and for the title screen
  posterThumbnail = loadImage("assets/images/RamboLastBloodMovieThumbnail.jpg");

  //Pixel Sprites
  //For the player
  playerImg = loadImage("assets/images/StalloneStanding.png");
  playerRunImg = loadImage("assets/images/StalloneRunning.gif");
  playerShotImg = loadImage("assets/images/PlayerBullet.png");
  cursorImg = loadImage("assets/images/RamboCursor.png");
  //For objects
  rockImg = loadImage("assets/images/CavePiece.png");
  healingPrescriptionImg = loadImage("assets/images/PrescriptionHeal.gif");
  //For aesthetic
  backgroundImg = loadImage("assets/images/CaveColourTheme.png");
  //For the enemy
  rangedEnemyImg = loadImage("assets/images/EnemySoldierRunning.gif");
  enemyShotImg = loadImage("assets/images/EnemyBullet.png");
}

//One-Time Setup
function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Player();
  //
  let i = 0;
  for (i = 0; i < enemyNum; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let enemy = new EnemySoldier(x, y);
    enemyGroup.push(enemy);
  }
  //
  for (i = 0; i < rockObstacleSetup; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let cave = new CaveStructures(x, y);
    rockObstacleOut.push(cave);
  }
  //
  for (i = 0; i < healItemAvailable; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let heals = new HealingItem(x, y);
    placeItem(heals, rockObstacleOut);
    healItemOut.push(heals);
  }

  //Setups the buttons once, to save resources
  button = new Buttons();
  play = new PlayButton();
  howToPlay = new HowToPlayButton();
  backToMenu = new BackToTitleButton();
}

//Starts with title, then gameplay, finally GameOver
function draw() {
  background(175, 150, 150);

  //Different states, and backgrounds running first to be in back layer,
  //otherwise it would overlap and you wouldn't see anything
  if (state === `title`) {
    background(0);
    cursor();
    title();
    play.displayButton();
    howToPlay.displayButton();
  } else if (state === `howToPlay`) {
    background(0);
    htp();
    backToMenu.displayButton();
  } else if (state === `inGame`) {
    background(backgroundImg);
    gameplay();
  } else if (state === `endGame`) {
    background(0);
    gameOver();
  }
}

//The usual text for the states
//Displays the title name, and a icon of the OC (the player character) for this
//game, the titleImg was also done for a graphic design, and that teacher really
//like the look of it
function title() {
  push();
  imageMode(CENTER, CENTER);
  image(posterThumbnail, width / 2, height / 2);
  textSize(70);
  textFont(titleFont);
  fill(200, 0, 0);
  stroke(0);
  strokeWeight(5);
  textAlign(LEFT, CENTER);
  text(`RAMBO: LAST BLOOD`, width / 8, height / 1.7);
  pop();
}

//Display the instructions on how to play
function htp() {
  push();
  textSize(45);
  textFont(howToPlayFont);
  fill(200);
  stroke(0);
  strokeWeight(5);
  textAlign(CENTER, CENTER);
  text(instructions, width / 2, height / 2);
  pop();
}

//Displays the GameOver text
function gameOver() {
  push();
  textSize(90);
  textFont(deathFont);
  fill(225, 25, 25);
  stroke(0);
  strokeWeight(5);
  textAlign(CENTER, CENTER);
  text(`You Died`, width / 2, height / 2);
  pop();
}

//Game starts in "inGame" state, player could now play, enemy spawns over
//and attack.
function gameplay() {
  player.movementInput();
  player.health();
  player.display();
  player.cursor();
  player.border();
  waveSpawn();
  itemSpawn();

  //Lets the spawned enemy have their properties, and at least an ability of
  //continuing to spawn
  for (let i = 0; i < enemyGroup.length; i++) {
    let enemy = enemyGroup[i];
    if (enemy.active) {
      let x = random(0, width);
      let y = random(0, height);
      enemy.display();
      enemy.chase();
      enemy.attackOverlap();
      enemy.enemyTargeting();
      //Lets the projectile have its properties when it's being fired
      for (let j = projectileOut.length - 1; j >= 0; j--) {
        let projectile = projectileOut[j];
        projectile.projectile(enemy);
        projectile.collision(enemy);
        if (projectile.active === false) {
          projectileOut.splice(j, 1);
        }
      }
    }
  }

  for (let i = 0; i < healItemOut.length; i++) {
    let heals = healItemOut[i];
    if (heals.active) {
      let x = random(0, width);
      let y = random(0, height);
      heals.displayHealItem();
      heals.healOverlap();
    }
  }

  for (let i = 0; i < rockObstacleOut.length; i++) {
    let cave = rockObstacleOut[i];
    if (cave.active) {
      let x = random(0, width);
      let y = random(0, height);
      cave.displayStructure();
      cave.bulletStuffing();
    }
  }

  //Lets the enemy projectile have its properties when it's being fired
  for (let e = enemyProjectileOut.length - 1; e >= 0; e--) {
    let enemyProjectile = enemyProjectileOut[e];
    enemyProjectile.projectile(player);
    enemyProjectile.collision(player);
    if (enemyProjectile.active === false) {
      enemyProjectileOut.splice(e, 1);
    }
  }
}

//Spawn system(s)
//For the enemy
function waveSpawn() {
  for (let i = enemyGroup.length - 1; i > 0; i--) {
    let enemy = enemyGroup[i];
    if (enemy.active === false) {
      enemyGroup.splice(i, 1);
      let x = random(0, width);
      let y = random(0, height);
      let enemy = new EnemySoldier(x, y);
      enemyGroup.push(enemy);
    }
  }
}

//For item(s)
function itemSpawn() {
  for (let i = healItemOut.length - 1; i > 0; i--) {
    let heals = healItemOut[i];
    if (heals.active === false) {
      healItemOut.splice(i, 1);
      let x = random(0, width);
      let y = random(0, height);
      let heals = new HealingItem(x, y);
      healItemOut.push(heals);
    }
  }
}

function placeItem(heals, objectList) {
  let positionFound = false;

  // the following code will loop until positionFound becomes true
  while (positionFound == false) {
    // we start by picking a new position for the player
    heals.x = random() * width;
    heals.y = random() * height;

    let itemOverlapsAnObject = false; // we will use this variable to keep track of any overlaps
    // look through each object in the list
    for (let i = 0; i < objectList.length; i++) {
      // calculate the distance from the player to that object
      let d = dist(heals.x, heals.y, objectList[i].x, objectList[i].y);
      // then we check if that distance is shorter than the acceptable distance
      if (d < 30) {
        itemOverlapsAnObject = true;
      }
    }

    // now that we've checked each object,
    // the boolean playerOverlapsAnObject will be true is there was contact with an object.
    // we can now update positionFound to be the opposite of that value (the position is 'found' if there is no overlap with any object)
    // once positionFound becomes true, the while() loop stops and the player has a new random position
    positionFound = !itemOverlapsAnObject;
  }
}

//Mouse presses for menu buttons, and to fire in game state, dependant on states
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
    mouseX > backToMenu.x &&
    mouseX < backToMenu.x + backToMenu.w &&
    mouseY > backToMenu.y &&
    mouseY < backToMenu.y + backToMenu.h &&
    state === `howToPlay`
  ) {
    state = `title`;
  } else if (state === `inGame`) {
    //Allows the player to shoot when it is the "inGame" state
    player.weaponAim();
  }
}
