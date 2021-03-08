//Reused PlayerProjectile, adjusted values, and change some variable, so it
//would work for the enemy (Could've maybe been a child class?)
class EnemyProjectile {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.vx = 2;
    this.vy = 2;
    this.speed = 5;
    this.size = 30;
    this.angle = angle;
    this.fired = true;
    this.active = true;
  }

  //Checks for bullet collision onto the player, if so, damage the player,
  //bullets do fair amount of damage
  collision(player) {
    let damage = dist(this.x, this.y, player.x, player.y);
    if (this.fired && damage < this.size / 2 + player.size / 2) {
      //Hurt the player
      player.healthPercent -= 15;
      player.invinciTime = frameCount + 30;
      this.active = false;
      this.fired = false;
    }
  }

  //Lets the projectile fly slowly at the player, destroy itself on impact
  projectile(player) {
    this.vx = this.speed * cos(this.angle);
    this.vy = this.speed * sin(this.angle);

    this.x += this.vx;
    this.y += this.vy;

    //If the projectile leaves the canvas, destroy itself
    if (this.x > width) {
      this.active = false;
    } else if (this.y > height) {
      this.active = false;
    }

    //Displays grey bullet(s)
    if (this.fired) {
      image(enemyShotImg, this.x, this.y, this.size, this.size);
    }
  }
}
