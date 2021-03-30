//This will be the basic little room to showcase a prototype, will
//likely turn into a tutorial level into
class Play extends Phaser.Scene {
  constructor() {
    super({
      key: `play`,
    });
  }

  create() {
    //Current font style, subject to change and be multiples later
    let gameStyle1 = {};
    //Will have some text for inform
    let protoRoomDescription = {};
    //Create player avatar
    this.avatar = this.physics.add.sprite(400, 300, `avatar`);
    this.avatar.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    {
      if (cursors.left.isDown) {
        playerRobot.setVelocityX(-160);
      } else if (cursors.right.isDown) {
        playerRobot.setVelocityX(160);
      } else {
        playerRobot.setVelocityX(0);
      }

      if (cursors.up.isDown && playerRobot.body.touching.down) {
        player.setVelocityY(-330);
      }
    }
  }
}
