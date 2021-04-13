/**
P2 - Anything: Part 2 - Final
Project Name: Disruptor Defector
Joseph Boumerhi

This is the final version of my project, Disruptor Defector.
It will be a shooter platformer, and it will revolve the use of a
"discharge" mechanic

This game has.
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
  scene: [Boot, TitleScreen, Play, GameOver, GameCompleted],
};

//Game Variable(s)

let game = new Phaser.Game(config);
