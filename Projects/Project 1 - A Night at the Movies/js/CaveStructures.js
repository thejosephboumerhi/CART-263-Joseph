//This allows to have interesting area layouts that players can utilize for each
//reloaded playthrough
class CaveStructures {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 125;
    this.appear = true;
  }

  //Display rock cube/part of tunnel
  displayStructure() {
    push();
    imageMode(CORNER);
    image(rockImg, this.x, this.y, this.size, this.size);
    pop();
  }

  //This breaks any bullets hitting the rock(s)
  bulletStuffing() {
    for (let j = playerProjectileOut.length - 1; j >= 0; j--) {
      let playerProjectile = playerProjectileOut[j];
      playerProjectile.collision(this);
    }
    for (let e = enemyProjectileOut.length - 1; e >= 0; e--) {
      let enemyProjectile = enemyProjectileOut[e];
      enemyProjectile.collision(this);
    }
  }
}
