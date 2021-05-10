//This will be the title screen, it will be implemented in the final
class TitleScreen extends Phaser.Scene {
  constructor() {
    super({
      key: `titleScreen`,
    });
  }

  create() {
    this.add.image(600, 350, `titleSplash`);

    this.add.text(80, 100, `Disruptor Defector`, {
      fontFamily: `Arial`,
      fontSize: 50,
      fill: `#fc0303`,
    });

    this.add.text(80, 560, `Press [Space] to Start`, {
      fontFamily: `Arial`,
      fontSize: 50,
      fill: `#ffffff`,
    });
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  update() {
    if (this.cursors.space.isDown) {
      this.scene.start(`play`);
    }
  }
}
