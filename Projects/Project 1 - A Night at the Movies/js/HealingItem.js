//This is a healing item that player should go after to keep themselves alive
class HealingItem {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 100;
    this.healthGiven = 25;
    this.active = true;
  }

  //Displays a luminencent prescription
  displayHealItem() {
    push();
    imageMode(CENTER);
    image(healingPrescriptionImg, this.x, this.y, this.size, this.size);
    pop();
  }

  //Heals player 25% of their health, while briefly protecting them
  healOverlap(player) {
    let a = dist(player.x, player.y, this.x, this.y);
    if (a < this.size / 2 + player.size / 2) {
      player.healthPercent = player.healthPercent + this.healthGiven;
      player.invinciTime = frameCount + 30;
      this.active = false;
    }
  }
}
