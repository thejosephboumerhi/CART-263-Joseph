let playerFacingLeft = false;
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

    //const level2 = this.make.tilemap({ key: "lv2" });
    //const tileset = level2.addTilesetImage("DDTileset", "gameTiles");
    //const tileLayoutLv2 = level2.createLayer(
    //"PlatformLayoutLv2",
    //tileset,
    //0,
    //600
    //);

    //const level3 = this.make.tilemap({ key: "lv3" });
    //const tileset = level3.addTilesetImage("DDTileset", "gameTiles");
    //const tileLayoutLv3 = level3.createLayer(
    //"PlatformLayoutLv3",
    //tileset,
    //0,
    //600
    //);

    //Maps made using Tiled, these are variables to set up the level, and
    //allow collisions based off of groups
    const level1 = this.make.tilemap({ key: "lv1" });
    const tileset = level1.addTilesetImage("DDTileset", "gameTiles");
    const tileLayoutLv1 = level1.createLayer(
      "PlatformLayoutLv1",
      tileset,
      0,
      600
    );

    //Will have some text for inform
    let instruc = `Left, Right to move, Down to fast-fall, Space to Jump`;
    this.add.text(500, 600, instruc, gameStyle2);
    //Create player avatar
    this.avatar = this.physics.add.sprite(200, 900, `avatar`);
    this.avatar.setGravityY(500);

    level1.setBaseTileSize(160, 160);
    level1.setLayerTileSize(160, 160);
    tileLayoutLv1.setCollisionByExclusion(-1, true);
    //tileLayoutLv1.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.avatar, tileLayoutLv1);

    this.createAnimations();

    this.avatar.play(`avatar-idle`);
    this.avatar.play(`avatar-moving`);

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

    //this.healthDisplay.startFollow(this.avatar, false, 0.2, 0.2);
    //this.dischargeDisplay.startFollow(this.avatar, false, 0.2, 0.2);

    this.bullets = this.physics.add.group({
      defaultKey: "avatarBullet",
    });

    this.input.on("pointerdown", this.shoot, this);

    //Hovering Enemy that shoots scatter shots
    this.quadDroneEnemy = this.physics.add.group({
      defaultKey: "QuadDrone",
    });

    //Immovable Enemy that sprays bullets, have to kill to progress through
    //choke point
    this.turretEnemy = this.physics.add.group({
      defaultKey: "TurretEnemy",
      immovable: true,
    });

    //Melee enemy that has a hefty amount of health, could protect its fellow
    //enemies
    this.tankerEnemy = this.physics.add.group({
      defaultKey: "TankerEnemy",
    });

    this.lavaHazards = this.physics.add.group({
      defaultKey: `lavaHazard`,
      immovable: true,
      quantity: 10,
    });

    //this.lavaHazards;
    //

    //this.shiftingPlat = this.physics.add.group({
    //defaultKey: "QuadDrone",
    //});

    //this.fragilePlat = this.physics.add.group({
    //defaultKey: "QuadDrone",
    //});

    //this.fragilePlat = this.physics.add.group({
    //defaultKey: "QuadDrone",
    //});
  }

  //enemyGrouper() {}

  shoot(pointer) {
    var playerBullet = this.bullets.get(pointer.x, pointer.y);
    if (playerBullet) {
      //console.log(playerBullet)
      this.physics.add.collider(playerBullet, `PlatformLayout`, function () {
        playerBullet.destroy();
      });

      playerBullet.x = this.avatar.x;
      playerBullet.y = this.avatar.y;

      playerBullet.setActive(true);
      playerBullet.setVisible(true);
      //  playerBullet
      //console.log(playerBullet)
      //console.log(this.avatar)
      //playerBullet.size = 50 +  this.discharge;
      playerBullet.body.velocity.y = -600;

      if (this.playerFacingLeft) {
        playerBullet.body.velocity.x = -1200;
      } else {
        playerBullet.body.velocity.x = 1200;
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
        start: 3,
        end: 6,
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: `avatar-idle`,
      frames: this.anims.generateFrameNumbers(`avatar`, {
        start: 3,
        end: 3,
      }),
      frameRate: 15,
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
      this.avatar.flipX = false;
      this.avatar.setVelocityX(-275 - this.discharge * 1.5);
      this.avatar.anims.play(`avatar-moving`, true);
      this.discharge += 1;
      this.dischargeDisplay.setText(`Discharge:${this.discharge}`);
    } else if (this.cursors.right.isDown) {
      this.avatar.flipX = true;
      playerFacingLeft: false;
      this.avatar.setVelocityX(275 + this.discharge * 1.5);
      this.avatar.anims.play(`avatar-moving`, true);
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
    if (this.cursors.down.isDown && !this.avatar.body.blocked.down) {
      this.avatar.setGravityY(800);
    } else {
      this.avatar.setGravityY(500);
    }

    //If moving, play walk animations, if not, don't
    if (
      this.avatar.body.velocity.x !== 0 ||
      this.avatar.body.velocity.y !== 0
    ) {
      this.avatar.play(`avatar-moving`, true);
    }
    //Shoots player bullet
    //if (this.cursors.shift.isDown) {
    //blaster.fire();
    //}

    //Keeps health and discharge between their respective values, unless otherwise,
    //like healing past a hundred (could be changed later)
    this.health = Phaser.Math.Clamp(this.health, 0, 100);
    this.discharge = Phaser.Math.Clamp(this.discharge, 0, 250);

    //for()

    //for()

    //for()

    //When you die, it will cue the Game Over scene
    if (this.health <= 0) {
      this.scene.start(`gameOver`);
    }
  }
}
