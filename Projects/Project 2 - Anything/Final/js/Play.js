let playerFacingLeft;
//This will be the basic little room to showcase a prototype, will
//likely turn into a tutorial level in the final
class Play extends Phaser.Scene {
  constructor() {
    super({
      key: `play`,
    });
  }

  //Creates/Sets things once
  create() {
    //Different styles for font and stuff
    let gameStyle1 = {
      fontFamily: `serif`,
      fontSize: `40px`,
      color: `#fcba03`,
    };

    let gameStyle2 = {
      fontFamily: `sans-serif`,
      fontSize: `30px`,
      color: `#ffa099`,
    };

    //This allow there to be a wider area/game world to move around in,
    //with the addition of a camera to focus and follow you

    //Maps made using Tiled, these are variables to set up the level, and
    //allow collisions based off of groups
    const level1 = this.make.tilemap({ key: "lv1" });
    const tileset = level1.addTilesetImage("DDTileset", "gameTiles");
    const tileLayoutLv1 = level1.createLayer("PlatformLayout", tileset, 0, 600);

    //Will have some text for inform
    let protoRoomDescription = `Disruptor Defector`;
    let instruc = `Left, Right to move, Down to fast-fall, Space to Jump`;
    this.add.text(500, 25, protoRoomDescription, gameStyle1);
    this.add.text(500, 60, instruc, gameStyle2);
    //Create player avatar
    this.avatar = this.physics.add.sprite(200, 900, `avatar`);
    this.avatar.setGravityY(500);

    level1.setBaseTileSize(128, 128);
    level1.setLayerTileSize(128, 128);
    tileLayoutLv1.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.avatar, tileLayoutLv1);
    this.createAnimations();

    this.avatar.play(`avatar-idle`);

    //Enables keyboard to be used
    this.cameras.main.startFollow(this.avatar, false, 0.2, 0.2);
    this.cursors = this.input.keyboard.createCursorKeys();

    //Health rapidly lowers while inside it
    this.physics.add.overlap(
      this.avatar,
      this.hazard,
      this.hazardDamage,
      null,
      this
    );

    //Health Pick-up
    this.collectible = this.physics.add.image(100, 400, `healBattery`);
    this.collectible.body.allowGravity = false;

    //Overlap for pick-up
    this.physics.add.collider(this.avatar, this.wall);
    this.physics.add.overlap(
      this.avatar,
      this.collectible,
      this.collectItem,
      null,
      this
    );

    this.health = 100;
    this.healthDisplay = this.add.text(25, 50, `Health: ${this.health}`, {
      fontFamily: `Arial`,
      fontSize: 30,
      color: `#00ff00`,
    });

    //This will be the mechanic that the game will revolve around,
    //essentially, the more you move, the more you get rewarded, it will
    //buff you in different ways, ex: more move speed, and bigger bullets
    this.discharge = 0;
    this.dischargeDisplay = this.add.text(
      25,
      80,
      `Discharge: ${this.discharge}`,
      {
        fontFamily: `Arial`,
        fontSize: 30,
        color: `#fc0303`,
      }
    );

    this.bullets = this.physics.add.group({
      defaultKey: "mainBullet",
    });

    this.input.on("pointerdown", this.shoot, this);
  }

  shoot(pointer) {
    var bullet = this.bullets.get(pointer.x, pointer.y);
    if (bullet) {
      //console.log(bullet)
      this.physics.add.collider(bullet, this.wall, function () {
        bullet.destroy();
      });

      bullet.x = this.avatar.x;
      bullet.y = this.avatar.y;

      bullet.setActive(true);
      bullet.setVisible(true);
      //  bullet
      //console.log(bullet)
      //console.log(this.avatar)

      bullet.body.velocity.y = -600;

      if (playerFacingLeft) {
        bullet.body.velocity.x = -1200;
      } else {
        bullet.body.velocity.x = 1200;
      }
    }
  }

  collectItem(avatar, collectible) {
    this.health += 25;
    this.healthDisplay.setText(`Health:${this.health}`);
    collectible.destroy();
  }

  hazardDamage(avatar, hazard) {
    this.health -= 1;
    this.healthDisplay.setText(`Health:${this.health}`);
  }

  //Will hold and create the animations, some of the spritesheet might need to
  //be edited, I think
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

    this.anims.create({
      key: `damage-hazard1`,
      frames: this.anims.generateFrameNumbers(`lavaHazard`, {
        start: 0,
        end: 2,
      }),
      frameRate: 30,
      repeat: -1,
    });

    this.anims.create({
      key: `healing-flow`,
      frames: this.anims.generateFrameNumbers(`healBattery`, {
        start: 0,
        end: 3,
      }),
      frameRate: 30,
      repeat: -1,
    });
  }

  //Continues running things
  update() {
    //Player Movement(will try to remap things for final)
    //For horizontal movement
    if (this.cursors.left.isDown) {
      playerFacingLeft: true;
      this.avatar.setVelocityX(-275 - this.discharge * 1.5);
      this.discharge += 1;
      this.dischargeDisplay.setText(`Discharge:${this.discharge}`);
    } else if (this.cursors.right.isDown) {
      playerFacingLeft: false;
      this.avatar.setVelocityX(275 + this.discharge * 1.5);
      this.discharge += 1;
      this.dischargeDisplay.setText(`Discharge:${this.discharge}`);
    } else {
      this.avatar.setVelocityX(0);
      this.discharge -= 1;
      this.dischargeDisplay.setText(`Discharge:${this.discharge}`);
    }

    //For vertical movement
    if (this.cursors.up.isDown && this.avatar.body.blocked.down) {
      this.avatar.setVelocityY(-700 - this.discharge * 1.5);
    }
    //I could do something interesting with down and space,
    //like doing a jump and forcing yourself down faster
    else if (this.cursors.down.isDown) {
      this.avatar.setGravityY(1500);
    } else {
      this.avatar.setGravityY(500);
    }

    //If moving, play walk animations, if not, don't
    if (
      this.avatar.body.velocity.x !== 0 ||
      this.avatar.body.velocity.y !== 0
    ) {
      this.avatar.play(`avatar-moving`, true);
    } else {
      this.avatar.play(`avatar-idle`, true);
    }
    //Shoots player bullet
    //if (this.cursors.shift.isDown) {
    //blaster.fire();
    //}

    //Keeps health and discharge between their respective values, unless otherwise,
    //like healing past a hundred (could be changed later)
    this.health = Phaser.Math.Clamp(this.health, 0, 100);
    this.discharge = Phaser.Math.Clamp(this.discharge, 0, 300);

    //When you die, it will cue the Game Over scene
    if (this.health <= 0) {
      this.scene.start(`gameOver`);
    }
  }
}
