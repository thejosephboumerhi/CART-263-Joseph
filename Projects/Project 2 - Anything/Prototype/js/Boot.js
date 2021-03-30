class Boot extends Phaser.Scene {
  constructor() {
    super({
      key: `boot`,
    });
  }
  preload() {
    //For assets
    this.load.image(
      `avatar`,
      `assets/images/PlayerSideShooterCharacter_Idle.gif`
    );

    this.load.image(``, `assets/images/`);

    this.load.image(``, `assets/images/`);

    this.load.on(`complete`, () => {
      this.scene.start(`play`);
    });
  }

  create() {
    let loadingStyle = {};
    let loadingDescription = `Loading >>>`;
  }

  update() {}
}
