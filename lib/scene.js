class Scene {
  constructor(meeples, options) {
    this.clockSpeed = options.clockSpeed;
    this.meeples = meeples;
  }

  start() {
    this.clock = setInterval(() => {
      this.meeples.forEach(meeple => meeple.act());
    }, this.clockSpeed);
  }
}

module.exports = Scene;
