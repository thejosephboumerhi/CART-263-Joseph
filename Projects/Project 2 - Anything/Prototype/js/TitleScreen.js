class TitleScreen extends Phaser.Scene {
  constructor() {
    super({
      key: `titleScreen`,
    });
  }

  create() {
    this.add.image(400, 300, "");

    this.add.text(80, 560, "Press Enter To Play" + game.config.gameTitle, {
      font: "16px Courier",
      fill: "#ffffff",
    });
  }
  update() {
    //if (this.cursor.enter.isDown) {
  }
}
