//Preloads assets, a loading screen with some text and animation
class Boot extends Phaser.Scene {
  constructor() {
    super({
      key: `boot`,
    });
  }
  preload() {
    //For assets

    //The Player itself
    this.load.spritesheet(
      `avatar`,
      `assets/images/PlayerSideShooterCharacter_IdleSheet.png`,
      { frameWidth: 50, frameHeight: 115, endFrame: 5 }
    );

    //The enemy sprite(s)
    this.load.spritesheet(
      `QuadDrone`,
      `assets/images/QuadShotDrone-Sheet.png`,
      { frameWidth: 100, frameHeight: 110, endFrame: 1 }
    );

    //Neat little charging battery during loading screen
    this.load.spritesheet(
      `loadingIcon`,
      `assets/images/BatteryLoadingSheet.png`,
      { frameWidth: 200, frameHeight: 200, endFrame: 5 }
    );

    //Image (might be unnecessary)
    this.load.spritesheet(`tile1`, `assets/images/PipelineTileSheet.png`, {
      frameWidth: 200,
      frameHeight: 200,
      endFrame: 3,
    });

    //Sprite for the lava, necessary to actuate lava damage
    this.load.spritesheet(
      `lavaHazard`,
      `assets/images/BasicLavaTileSheet.png`,
      {
        frameWidth: 200,
        frameHeight: 200,
        endFrame: 3,
      }
    );

    //Images for the various platforms
    this.load.image(`idlePlat`, `assets/images/IdlePlatformBase.png`);
    this.load.image(`fragilePlat`, `assets/images/FragilePlatform.png`);
    this.load.image(`shiftingPlat`, `assets/images/ShiftingPlatform.png`);

    //Splash Screens
    this.load.image(`titleSplash`, `assets/images/TitleScreenSplash.png`);
    this.load.image(
      `completionSplash`,
      `assets/images/CompletedGameSplash.png`
    );
    this.load.image(`gameOverSplash`, `assets/images/GameOverScreenSplash.png`);

    //Assets for projectiles
    this.load.image(`avatarBullet`, `assets/images/Player-Bullet.png`);
    this.load.image(`enemyBullet`, `assets/images/Enemy-Bullet.png`);
    this.load.spritesheet(
      `healBattery`,
      `assets/images/HealingBatterySheet.png`,
      { frameWidth: 45, frameHeight: 100, endFrame: 4 }
    );

    //Image necessary for map, and the level(s) themselves
    this.load.image("gameTiles", "assets/tilesheets/DDTileset.png");
    this.load.tilemapTiledJSON("lv1", "assets/tilemaps/level_one.json");
    this.load.tilemapTiledJSON("lv2", "assets/tilemaps/level_two.json");

    //Audio, sounds for player, enemies, and misc.
    this.load.audio(`pHeal`, `assets/sounds/playerHealSound.wav`);
    this.load.audio(`pHurt`, `assets/sounds/playerHurtSound.wav`);
    this.load.audio(`pBurn`, `assets/sounds/playerBurningSound.wav`);
    this.load.audio(`pShot`, `assets/sounds/playerShotSound.wav`);
    this.load.audio(`pJump`, `assets/sounds/playerJumpSound.wav`);
    this.load.audio(`eShot`, `assets/sounds/enemyShotSound.wav`);
    this.load.audio(`gameOverBlip`, `assets/sounds/gameOverSound.wav`);

    //The title screen on boot up
    this.load.on(`complete`, () => {
      this.scene.start(`titleScreen`);
    });
  }

  //Creates the text and animation during loading screen (unsure)
  create() {
    let loadingStyle = {
      fontFamily: `serif`,
      fontSize: `40px`,
      color: `#fffff`,
    };
    let loadingDescription = `Loading >>>`;
    this.add.text(100, 100, loadingDescription, loadingStyle);
  }
  //Runs the animation
  update() {
    this.add.image(200, 200, `loadingIcon`);
  }
}
