//Child of Animal, for the single sausage dog
class SausageDog extends Animal {
  constructor(x, y, image) {
    super(x, y, image);
    this.found = false;
    this.rotationSpeed = 0.25;
  }

  //Displays dog
  update() {
    super.display();

    //Boolean for when dog is clicked on, and then spins (spin becomes redundant
    //with the states)
    if (this.found) {
      this.angle += this.rotationSpeed;
    }
  }

  //"Button" press for the dog, and the state to switch to
  mousePressed() {
    if (
      mouseX > this.x - this.image.width / 2 &&
      mouseX < this.x + this.image.width / 2 &&
      mouseY > this.y - this.image.height / 2 &&
      mouseY < this.y + this.image.height / 2
    ) {
      this.found = true;
      state = `foundDog`;
    }
  }
}
