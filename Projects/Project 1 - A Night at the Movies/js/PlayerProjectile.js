//Used a chunk of "bullet" example from the class Discord
class PlayerProjectile {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.vx = 2;
    this.vy = 2;
    this.speed = 10;
    this.size = 30;
    this.angle = angle;
    this.fired = true;
    this.active = true;
  }

  //Checks for bullet collision onto the enemy, if so, kill enemy
  collision(enemy) {
    let subdue = dist(this.x, this.y, enemy.x, enemy.y);
    if (this.fired && enemy.active && subdue < this.size / 2 + enemy.size / 2) {
      // Kill the enemy that said bullet hit
      enemy.active = false;
      this.active = false;
      this.fired = false;
    }
    let tempx = this.x + this.vx;
    let collidedX = false;
    for (let i = 0; i < rockObstacleOut.length; i++) {
      let rock = rockObstacleOut[i];
      if (
        collideRectRect(
          tempx,
          this.y,
          this.size,
          this.size,
          rock.x,
          rock.y,
          rock.size,
          rock.size
        )
      ) {
        collidedX = true;
      }
    }
    if (!collidedX) {
      this.active = false;
    }

    //Then this time, it checks the y-axis between them
    let tempy = this.y + this.vy;
    let collidedY = false;
    for (let i = 0; i < rockObstacleOut.length; i++) {
      let rock = rockObstacleOut[i];
      if (
        collideRectRect(
          this.x,
          tempy,
          this.size,
          this.size,
          rock.x,
          rock.y,
          rock.size,
          rock.size
        )
      ) {
        collidedY = true;
      }
    }
    if (!collidedY) {
      this.active = false;
    }
  }

  //Lets the projectile take shape, and fly, now functions with weaponAim();
  projectile(enemy) {
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

    //Displays yellow bullets
    if (this.active) {
      image(playerShotImg, this.x, this.y, this.size, this.size);
    }
  }

  breakBullet(cave) {
    let tempx = this.x + this.vx;
    let collidedX = false;
    for (let i = 0; i < rockObstacleOut.length; i++) {
      let rock = rockObstacleOut[i];
      if (
        collideRectRect(
          tempx,
          this.y,
          this.size,
          this.size,
          rock.x,
          rock.y,
          rock.size,
          rock.size
        )
      ) {
        collidedX = true;
      }
    }
    if (!collidedX) {
      this.active = false;
    }

    //Then this time, it checks the y-axis between them
    let tempy = this.y + this.vy;
    let collidedY = false;
    for (let i = 0; i < rockObstacleOut.length; i++) {
      let rock = rockObstacleOut[i];
      if (
        collideRectRect(
          this.x,
          tempy,
          this.size,
          this.size,
          rock.x,
          rock.y,
          rock.size,
          rock.size
        )
      ) {
        collidedY = true;
      }
    }
    if (!collidedY) {
      this.active = false;
    }
  }
}
