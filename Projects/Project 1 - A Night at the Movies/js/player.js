//Essentially the player that is controlled by using WASD, and mouse to shoot
class Player {
  constructor(x, y) {
    this.x = 0;
    this.y = 0;
    this.size = 100;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.accel = 2;
    this.MaxV = 4;
    this.friction = 0.9;
    this.healthPercent = 100;
    this.invinciTime = 0;
    this.triggerSpeed = 0;
  }

  //Lets player move efficiently
  movementInput() {
    //Reusing good old movement inputs, since I find it's been fairly effective
    if (keyIsDown(65)) {
      this.ax = -this.accel;
    } else if (keyIsDown(68)) {
      this.ax = this.accel;
    } else {
      this.ax = 0;
    }
    if (keyIsDown(87)) {
      this.ay = -this.accel;
    } else if (keyIsDown(83)) {
      this.ay = this.accel;
    } else {
      this.ay = 0;
    }

    //Removed dashing, you move much slower now

    //Allows for smoother WASD movement.
    this.vx = this.vx * this.friction;
    this.vy = this.vy * this.friction;

    //New, Added p5.collision with the help of Samuel
    //Link:https://github.com/bmoren/p5.collide2D
    //Check for collisions between rock and player on the x-axis
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
      this.y = this.y + this.vy;
    }

    this.vx = this.ax + this.vx;
    this.vx = constrain(this.vx, -this.MaxV, this.MaxV);
    this.vy = this.ay + this.vy;
    this.vy = constrain(this.vy, -this.MaxV, this.MaxV);
  }

  //Shows player image, and makes them face in the direction of the mouse
  display() {
    push();
    imageMode(CORNER);
    translate(this.x, this.y);

    //Faces the "Standing" and "Running" playerImgs in direction of mouseX
    if (this.x > mouseX) {
      scale(-1, 1);
    }

    //Lets running animation play while the player is moving, if otherwise, idle
    if (keyIsDown(65) || keyIsDown(68) || keyIsDown(87) || keyIsDown(83)) {
      image(playerRunImg, 0, 0, this.size, this.size);
    } else {
      image(playerImg, 0, 0, this.size, this.size);
    }
    pop();
  }

  //Shows custom cursor, hides the usual cursor when "inGame"
  cursor() {
    push();
    noCursor();
    imageMode(CENTER);
    image(cursorImg, mouseX, mouseY);
    pop();
  }

  //Health system, game overs when it reaches 0%, has green gauge display
  //the *4 doesn't affect the percent, but enlarges the gauge
  health() {
    if (this.healthPercent <= 0) {
      state = `endGame`;
    }

    //Removed fast heal regen, encourages slower play and calculated movement

    push();
    fill(100, 200, 100);
    rectMode(CENTER);
    rect(width / 2, 25, this.healthPercent * 4, 25);
    pop();
  }

  //Pushes and lets you shoot bullets, it now works, thanks to Pippin's help
  weaponAim() {
    //Shoots from player position
    let x = this.x;
    let y = this.y;

    //Takes mouseX and mouseY values, and lets it be used for angle/degrees, so
    //you can shoot where the mouse is pointed at (towards cursor).
    let dx = x - mouseX;
    let dy = y - mouseY;
    let angle = atan(dy / dx);

    if (dx > 0) {
      angle += PI;
    }

    let playerProjectile = new PlayerProjectile(x, y, angle);

    playerProjectile.speed;
    playerProjectileOut.push(playerProjectile);
  }

  //playerSound(){}

  //Usual border block, simulates an arena
  border() {
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }
}
