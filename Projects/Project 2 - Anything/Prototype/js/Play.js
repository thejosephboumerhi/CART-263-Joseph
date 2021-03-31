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
    let gameStyle1 = {
      fontFamily: `serif`,
      fontSize: `40px`,
      color: `#fcba03`,
    };
    //Will have some text for inform
    let protoRoomDescription = `Disruptor Defector`;
    this.add.text(400, 200, protoRoomDescription, gameStyle1);
    //Create player avatar
    this.avatar = this.physics.add.sprite(400, 300, `avatar`);

    this.createAnimations();

    this.avatar.play(`avatar-idle`);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.wall = this.physics.add.image(100, 600, `tile1`);
    this.wall = this.physics.add.image(300, 600, `tile1`);
    this.wall = this.physics.add.image(500, 600, `tile1`);
    this.wall = this.physics.add.image(700, 600, `tile1`);
    this.wall = this.physics.add.image(900, 600, `tile1`);
    this.wall.setImmovable(true);

    //Will probably be scrapped to be switched with a tilemap using "Tiled"
    this.walls = this.physics.add.group({
      key: `walls`,
      immovable: true,
      quantity: 24,
    });

    this.walls.children.each(function (wall) {
      let x = this.sys.canvas.width;
      let y = this.sys.canvas.height;
      wall.setPosition(x, y);
      wall.setTint(0xdd3333);
    }, this);

    this.collectible = this.physics.add.image(100, 400, `tile1`);
    this.collectible.setTint(0x33dd33);

    this.physics.add.collider(this.avatar, this.wall);
    this.physics.add.overlap(
      this.avatar,
      this.collectible,
      this.collectItem,
      null,
      this
    );

    this.avatar.setCollideWorldBounds(true);
  }

  collectItem(avatar, collectible) {
    collectible.destroy();
  }

  createAnimations() {
    this.anims.create({
      key: `avatar-moving`,
      frames: this.anims.generateFrameNumbers(`avatar`, {
        start: 0,
        end: 3,
      }),
      frameRate: 30,
      repeat: -1,
    });

    this.anims.create({
      key: `avatar-idle`,
      frames: this.anims.generateFrameNumbers(`avatar`, {
        start: 0,
        end: 0,
      }),
      frameRate: 30,
      repeat: 0,
    });

    this.anims.create({
      key: `tile1-powered`,
      frames: this.anims.generateFrameNumbers(`tile1`, {
        start: 0,
        end: 2,
      }),
      frameRate: 30,
      repeat: -1,
    });
  }

  update() {
    this.avatar.setVelocity(0);
    if (this.cursors.left.isDown) {
      this.avatar.setVelocityX(-175);
    } else if (this.cursors.right.isDown) {
      this.avatar.setVelocityX(175);
    } else {
      this.avatar.setVelocityX(0);
    }

    if (this.cursors.space.isDown) {
      this.avatar.setVelocityY(175);
    } else {
      this.avatar.setVelocityY(0);
    }

    if (
      this.avatar.body.velocity.x !== 0 ||
      this.avatar.body.velocity.y !== 0
    ) {
      this.avatar.play(`avatar-moving`, true);
    } else {
      this.avatar.play(`avatar-idle`, true);
    }
  }
}
