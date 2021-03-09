//Gang marksmen from movie
class EnemySoldier {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 100;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.accel = 1;
    this.MaxV = 2;
    this.friction = 0.9;
    this.active = true;
    this.gattlingSpeed = 0;
  }

  //Shows enemy soldier
  display() {
    push();
    imageMode(CORNER);
    image(soldierEnemyImg, this.x, this.y, this.size, this.size);
    //Same like the player facing the other way, but uses cx
    if (this.x > player.x) {
      scale(-1, 1);
    } else if (this.x < player.x) {
      scale(1, 1);
    }
    pop();
  }

  //Lets the enemy chase the player, decided to just give it
  //accel and friction too
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

    //Same collision like player and rock, but with enemy instead
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
      this.x = this.x + this.vx;
    }

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
      this.y = this.y + this.vy;
    }

    this.vx = this.ax + this.vx;
    this.vx = constrain(this.vx, -this.MaxV, this.MaxV);
    this.vy = this.ay + this.vy;
    this.vy = constrain(this.vy, -this.MaxV, this.MaxV);
  }

  enemyTargeting() {
    //The same as the player, but it targets them instead
    //Shoots from enemy position
    let x = this.x;
    let y = this.y;

    //Takes player.x and player.y values, and lets it be used for angle/degrees,
    //exactly like weaponAim(), except it targets the player
    let tx = x - player.x;
    let ty = y - player.y;
    let angle = atan(ty / tx);

    if (tx > 0) {
      angle += PI;
    }

    //Since there will be likely more enemies, number of bullets shot will
    //decrease, to also compensate for better performance (don't want the
    //enemies to drop the frames too much)

    if (this.gattlingSpeed % 60 === 0) {
      let enemyProjectile = new EnemyProjectile(x, y, angle);
      enemyProjectile.speed;
      enemyProjectileOut.push(enemyProjectile);
    }
    this.gattlingSpeed++;
  }

  //Hurts the player when overlaping, does high instant damage
  attackOverlap() {
    let a = dist(player.x, player.y, this.x, this.y);
    if (
      a < this.size / 2 + player.size / 2 &&
      player.invinciTime < frameCount
    ) {
      player.healthPercent -= 10;
      player.invinciTime = frameCount + 30;
    }
  }
}
