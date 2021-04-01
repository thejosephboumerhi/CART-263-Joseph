let playerLaser;

function createPlayerLaser() {
  // Create the group using the group factory
  playerLaser = game.add.group();
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
  playerLaser.callAll(
    "events.onOutOfBounds.add",
    "events.onOutOfBounds",
    resetLaser
  );
  // Same as above, set the anchor of every sprite to 0.5, 1.0
  playerLaser.callAll("anchor.setTo", "anchor", 0.5, 1.0);

  // This will set 'checkWorldBounds' to true on all sprites in the group
  playerLaser.setAll("checkWorldBounds", true);

  // ...
}

function resetLaser(laser) {
  // Destroy the laser
  laser.kill();
}
function fireLaser() {
  // Get the first laser that's inactive, by passing 'false' as a parameter
  var laser = playerLaser.getFirstExists(false);
  if (laser) {
    // If we have a laser, set it to the starting position
    laser.reset(game.avatar.x - 20, game.avatar.y);
    // Give it a velocity of -500 so it starts shooting
    laser.body.velocity.y = -500;
  }
}
