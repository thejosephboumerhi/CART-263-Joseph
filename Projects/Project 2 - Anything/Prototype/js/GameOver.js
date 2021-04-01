class GameOver extends Phaser.Scene {
  constructor() {
    super({
      key: `gameOver`,
    });
  }

  create() {
    this.add.image(400, 300, "");

    this.add.text(80, 560, "Game Over" + game.config.gameTitle, {
      font: "16px Courier",
      fill: "#ffffff",
    });
  }
  update() {}
}
