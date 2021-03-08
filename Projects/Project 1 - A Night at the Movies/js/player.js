//Essentially the player that is controlled by using WASD, and mouse to shoot
class Player {
  constructor(x, y) {
    this.x = 0;
    this.y = 0;
    this.size = 70;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.accel = 2;
    this.MaxV = 4;
    this.friction = 0.9;
    this.healthPercent = 100;
    this.invinciTime = 0;
    this.dashTime = 0;
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

    //Allows player to be more evasive by dashing, by boosting accel and MaxV
    //has orange gauge display
    if (keyIsDown(32) && this.dashTime === 60 && this.MaxV === 9) {
      this.accel = 8;
      this.MaxV = 16;
    } else if (this.dashTime > 0 && this.MaxV === 16) {
      //Burns the gauge as you dash
      this.dashTime--;
    }

    //Refills the gauge
    if (this.dashTime === 0) {
      this.accel = 3;
      this.MaxV = 9;
      this.dashTime = 60;
    }

    //Similar to the health, the * lets it look even bigger, so they aren't
    //awkwardly small in comparison the large canvas
    push();
    let w = abs(this.dashTime - 30);
    fill(150, 150, 75);
    rectMode(CENTER);
    rect(width / 2, 50, w * 4, 25);
    pop();

    //Allows for smoother WASD movement.
    this.vx = this.vx * this.friction;
    this.vy = this.vy * this.friction;

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

  //Shows player image, and makes them face in the direction of the mouse
  display() {
    push();
    imageMode(CORNER);
    translate(this.x, this.y);

    //Faces the "Standing" and "Running" playerImgs in direction of mouseX,
    //new playerImg, thanks to Samuel's assistance
    if (this.x > mouseX) {
      scale(-1, 1);
    }

    //Lets running animation play while the player is moving, if otherwise, idle
    if (keyIsDown(65) || keyIsDown(68) || keyIsDown(87) || keyIsDown(83)) {
      image(playerRunImg, 0, 0, this.size, this.size);
    } else {
      image(playerImg, 0, 0, this.size, this.size);
    }

    //Same, it runs after the above image to overlap, and flips when looking
    //around.
    if (this.x > mouseX) {
      image(playerArmImg, 0, 0, this.size, this.size);
    } else {
      image(playerArmImg, 0, 0, this.size, this.size);
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
  //Sam helped confirm how things should be set up for health, had the idea,
  //just wondered what values and statements were needed
  health() {
    if (this.healthPercent <= 0) {
      state = `endGame`;
    }

    //If under 100%, you heal rapidly, but the enemy hits fairly hard and there's a
    //lot of bullets flying
    if (this.healthPercent < 100) {
      this.healthPercent++;
    }

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

    let projectile = new PlayerProjectile(x, y, angle);

    projectile.speed;
    projectileOut.push(projectile);
  }

  //playerSound(){}

  //Usual border block, simulates an arena
  border() {
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }
}
