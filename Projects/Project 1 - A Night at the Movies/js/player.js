class Player {
  constructor(x, y) {
    this.x = 0;
    this.y = 0;
    this.size = 70;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.accel = 3;
    this.MaxV = 9;
    this.friction = 0.9;
    this.healthPercent = 100;
    this.invinciTime = 0;
    this.dashTime = 0;
    this.triggerSpeed = 0;
  }
}
