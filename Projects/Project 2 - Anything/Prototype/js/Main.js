/**
P2 - Anything: Part 1
Joseph Boumerhi

This is the prototype stage of my project.
*/

"use strict";

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: `arcade`,
  },
  scene: [Boot, Play],
};

//Game Variables
let player;
let staticPlatform;
let movingPlatform;
let timerPlatform;
let destructivePlatform;

let game = new Phaser.Game(config);
