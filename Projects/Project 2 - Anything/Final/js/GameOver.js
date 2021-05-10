//When you die, it switches to this scene
class GameOver extends Phaser.Scene {
  constructor() {
    super({
      key: `gameOver`,
    });
  }

  //Basically the title example from the site
  create() {
    this.add.image(600, 350, `gameOverSplash`);

    this.add.text(80, 560, `Game Over`, {
      fontFamily: `Arial`,
      fontSize: `50px`,
      fill: `#ffffff`,
    });
  }
  update() {}
}
