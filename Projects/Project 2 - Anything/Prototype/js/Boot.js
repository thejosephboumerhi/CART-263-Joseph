class Boot extends Phaser.Scene {
  constructor() {
    super({
      key: `boot`,
    });
  }
  preload() {
    //For assets
    this.load.spritesheet(
      `avatar`,
      `assets/images/PlayerSideShooterCharacter_IdleSheet.png`,
      { frameWidth: 200, frameHeight: 200, endFrame: 4 }
    );

    this.load.spritesheet(
      `loadingIcon`,
      `assets/images/BatteryLoadingSheet.png`,
      { frameWidth: 200, frameHeight: 200, endFrame: 5 }
    );

    this.load.spritesheet(`tile1`, `assets/images/PipelineTileSheet.png`, {
      frameWidth: 200,
      frameHeight: 200,
      endFrame: 3,
    });
    this.load.spritesheet(
      `lavaHazard`,
      `assets/images/BasicLavaTileSheet.png`,
      {
        frameWidth: 200,
        frameHeight: 200,
        endFrame: 3,
      }
    );
    //this.load.spritesheet(``,`assets/images/`{frameWidth:,frameHeight:,endFrame:,});
    //this.load.spritesheet(``,`assets/images/`{frameWidth:,frameHeight:,endFrame:,});
    //this.load.spritesheet(``,`assets/images/`{frameWidth:,frameHeight:,endFrame:,});

    this.load.on(`complete`, () => {
      this.scene.start(`play`);
    });
  }

  create() {
    let loadingStyle = {
      fontFamily: `serif`,
      fontSize: `40px`,
      color: `#fffff`,
    };
    let loadingDescription = `Loading >>>`;
    this.add.text(100, 100, loadingDescription, loadingStyle);
  }

  update() {
    this.add.image(200, 200, `loadingIcon`);
  }
}
