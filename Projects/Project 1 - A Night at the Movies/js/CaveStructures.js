class CaveStructures {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 250;
    this.active = true;
  }

  //Display rock cube/part of tunnel
  displayStructure() {
    push();
    imageMode(CENTER);
    image(rockImg, this.x, this.y, this.size, this.size);
    pop();
  }

  //
}
