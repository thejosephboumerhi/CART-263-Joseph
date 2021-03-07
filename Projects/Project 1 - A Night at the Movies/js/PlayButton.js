//Child button that display and has its text, colors, and alignment
class PlayButton extends Buttons {
  constructor(x, y) {
    super(x, y);
    this.x = width / 1.5;
    this.y = height / 3;
    this.font = boxFont;
    this.w = 175;
    this.h = 100;
  }

  //Yellow "Play" button
  displayButton() {
    super.displayButton();
    push();
    fill(200, 200, 0);
    rect(this.x, this.y, this.w, this.h);
    textAlign(CENTER, CENTER);
    textSize(30);
    textFont(this.font);
    fill(0);
    stroke(0);
    text(`Play`, this.x, this.y, this.w, this.h);
    pop();
  }
}
