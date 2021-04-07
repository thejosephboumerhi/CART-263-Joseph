//This will be the title screen, it will be implemented in the final
class TitleScreen extends Phaser.Scene {
  constructor() {
    super({
      key: `titleScreen`,
    });
  }

  create() {
    this.add.image(400, 300, ``);

    this.add.image(400, 300, `mainBullet`);

    this.add.text(80, 560, `Press [Space] to Start`, {
      fontFamily: `Arial`,
      fontSize: 50,
      fill: `#ffffff`,
    });
  }
  update() {
    //if (this.cursor.enter.isDown) {
  }
}
