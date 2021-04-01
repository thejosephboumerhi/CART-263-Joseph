/**
P2 - Anything: Part 1
Joseph Boumerhi

This is the prototype stage of my project.
*/

"use strict";

//Configs the game engine, sets up the canvas, and physics and debug if needed
let config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 800,
  physics: {
    default: `arcade`,
    arcade: {
      gravity: { y: 300 },
      debug: true,
    },
  },

  //Scenes behaves like states
  scene: [Boot, Play],
};

//Game Variable(s)

let game = new Phaser.Game(config);
