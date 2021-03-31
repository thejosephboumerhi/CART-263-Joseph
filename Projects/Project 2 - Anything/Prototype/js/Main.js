/**
P2 - Anything: Part 1
Joseph Boumerhi

This is the prototype stage of my project.
*/

"use strict";

let config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 800,
  physics: {
    default: `arcade`,
  },

  //Scenes behaves like states
  scene: [Boot, Play],
};

//Game Variable(s)
let staticPlatform;
let movingPlatform;
let timerPlatform;
let destructivePlatform;

let game = new Phaser.Game(config);
