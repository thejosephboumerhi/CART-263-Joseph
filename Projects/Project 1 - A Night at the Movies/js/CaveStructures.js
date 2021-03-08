class CaveStructures {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 150;
    this.active = true;
  }

  //Display rock cube/part of tunnel
  displayStructure() {
    push();
    imageMode(CORNER);
    image(rockImg, this.x, this.y, this.size, this.size);
    pop();
  }

  bulletStuffing() {
    for (let j = projectileOut.length - 1; j >= 0; j--) {
      let projectile = projectileOut[j];
      projectile.collision(this);
    }
  }
}
