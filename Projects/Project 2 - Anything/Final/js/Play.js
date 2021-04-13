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

    const level1 = this.make.tilemap({ key: "lv1" });
    const tileset = level1.addTilesetImage("DDTileset.png", "gameTiles");
    const tileLayoutLv1 = level1.createLayer("Layout", tileset, 0, 200);

    this.physics.world.gravity.y = 1500;

    //Will have some text for inform
    let protoRoomDescription = `Disruptor Defector`;
    let instruc = `Left, Right to move, Down to fast-fall, Space to Jump`;
    this.add.text(500, 25, protoRoomDescription, gameStyle1);
    this.add.text(500, 60, instruc, gameStyle2);
    //Create player avatar
    this.avatar = this.physics.add.sprite(125, 125, `avatar`);
    this.avatar.setGravityY(500);

    this.createAnimations();

    this.avatar.play(`avatar-idle`);

    //Enables keyboard to be used
    this.cursors = this.input.keyboard.createCursorKeys();

    //Tiled, also have collision to be stood on

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

    //OoB world collision
    this.avatar.setCollideWorldBounds(true);

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
    //this.createPlayerLaser();
  }

  //Code pasted from https://www.codecaptain.io/blog/game-development/shooting-
  //bullets-using-phaser-groups/518, Samuel was trying help me set player bullets.
  //Still need help setting it up
  createPlayerLaser() {
    // Create the group using the group factory
    playerLaser = this.add.group();
    // To move the sprites later on, we have to enable the body
    playerLaser.enableBody = true;
    // We're going to set the body type to the ARCADE physics, since we don't need any advanced physics
    playerLaser.physicsBodyType = Phaser.Physics.ARCADE;
    /*

  		This will create 20 sprites and add it to the stage. They're inactive and invisible, but they're there for later use.
  		We only have 20 laser bullets available, and will 'clean' and reset they're off the screen.
  		This way we save on precious resources by not constantly adding & removing new sprites to the stage

  	*/
    playerLaser.createMultiple(20, "mainBullet");

    /*

  		Behind the scenes, this will call the following function on all playerLaser:
  			- events.onOutOfBounds.add(resetLaser)
  		Every sprite has an 'events' property, where you can add callbacks to specific events.
  		Instead of looping over every sprite in the group manually, this function will do it for us.

  	*/

    // ...
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
      this.avatar.setVelocityX(-275 - this.discharge * 1.5);
      this.discharge += 1;
      this.dischargeDisplay.setText(`Discharge:${this.discharge}`);
    } else if (this.cursors.right.isDown) {
      this.avatar.setVelocityX(275 + this.discharge * 1.5);
      this.discharge += 1;
      this.dischargeDisplay.setText(`Discharge:${this.discharge}`);
    } else {
      this.avatar.setVelocityX(0);
      this.discharge -= 1;
      this.dischargeDisplay.setText(`Discharge:${this.discharge}`);
    }

    //For vertical movement
    if (this.cursors.space.isDown && this.avatar.body.touching.down) {
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
    //fireLaser();
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
