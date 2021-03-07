//Child button that display and has its text, colors, and alignment
class BackToTitleButton extends Buttons {
  constructor(x, y) {
    super(x, y);
    this.x = width / 2.3;
    this.y = height / 1.2;
    this.font = buttonFont;
    this.w = 175;
    this.h = 100;
  }

  //Green "back" button
  displayButton() {
    super.displayButton();
    push();
    fill(50, 200, 50);
    rect(this.x, this.y, this.w, this.h);
    textAlign(CENTER, CENTER);
    textSize(40);
    textFont(this.font);
    fill(0);
    stroke(0);
    text(`Back To Menu`, this.x, this.y, this.w, this.h);
    pop();
  }
}
