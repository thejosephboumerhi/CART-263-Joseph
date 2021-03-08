//Child button that display and has its text, colors, and alignment
class HowToPlayButton extends Buttons {
  constructor(x, y) {
    super(x, y);
    this.x = width / 1.5;
    this.y = height / 1.5;
    this.font = buttonFont;
    this.w = 175;
    this.h = 100;
  }

  //Yellow "how-to" button
  displayButton() {
    super.displayButton();
    push();
    fill(222, 237, 9);
    rect(this.x, this.y, this.w, this.h);
    textAlign(CENTER, CENTER);
    textSize(40);
    textFont(this.font);
    fill(0);
    stroke(0);
    text(`How To Play`, this.x, this.y, this.w, this.h);
    pop();
  }
}
