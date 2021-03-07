//Overhauled this, thought that them spawning on top of a melee enemy would
//make the game begin to slow down (a lot of clutter, frame drops)
class RangedEnemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 75;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.accel = 1;
    this.MaxV = 4;
    this.friction = 0.95;
    this.active = true;
  }

  //Shows orb-like enemies
  display() {
    push();
    image(rangedEnemyImg, this.x, this.y, this.size, this.size);
    pop();
  }

  //Lets enemy chase player, decided to give accel and friction too
  chase() {
    let cx = this.x - player.x;
    let cy = this.y - player.y;

    if (cx < 0) {
      this.ax = this.accel;
    } else if (cx > 0) {
      this.ax = -this.accel;
    }

    if (cy < 0) {
      this.ay = this.accel;
    } else if (cy > 0) {
      this.ay = -this.accel;
    }

    this.vx = this.vx * this.friction;
    this.vy = this.vy * this.friction;

    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    this.vx = this.ax + this.vx;
    this.vx = constrain(this.vx, -this.MaxV, this.MaxV);
    this.vy = this.ay + this.vy;
    this.vy = constrain(this.vy, -this.MaxV, this.MaxV);
  }

  //Basically player's weaponAim() copy-pasted, BUT instead it uses the player's
  //position to shoot at them
  enemyTargeting() {
    //Shoots from enemy position
    let x = this.x;
    let y = this.y;

    //Takes player.x and player.y values, and lets it be used for angle/degrees,
    //so it can shoot the player
    let tx = x - player.x;
    let ty = y - player.y;
    let angle = atan(ty / tx);

    if (tx > 0) {
      angle += PI;
    }

    let enemyProjectile = new EnemyProjectile(x, y, angle);

    enemyProjectile.speed = 3;
    enemyProjectileOut.push(enemyProjectile);
  }

  //Get hit, game over (will likely be modified when I work on health later)
  attackOverlap() {
    let a = dist(player.x, player.y, this.x, this.y);
    if (
      a < this.size / 2 + player.size / 2 &&
      player.invinciTime < frameCount
    ) {
      player.healthPercent -= 20;
      player.invinciTime = frameCount + 10;
    }
  }
}
