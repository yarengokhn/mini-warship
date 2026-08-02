class TouchController {
  constructor() {
    this.x = 0;
    this.active = false;
    this.startX = null;
    this.currentX = null;
    this.threshold = 0.15;

    window.addEventListener("pointerdown", (e) => {
      this.active = true;
      this.startX = e.clientX;
      this.currentX = e.clientX;
      this.x = 0;
    });

    window.addEventListener("pointermove", (e) => {
      if (!this.active || this.startX === null) return;

      this.currentX = e.clientX;
      const delta = this.currentX - this.startX;
      this.x = delta / window.innerWidth;
    });

    window.addEventListener("pointerup", () => {
      this.active = false;
      this.x = 0;
      this.startX = null;
      this.currentX = null;
    });
  }

  getInput() {
    return this.x;
  }

  isLeft() {
    return this.active && this.x < -this.threshold;
  }

  isRight() {
    return this.active && this.x > this.threshold;
  }

  isForward() {
    return this.active;
  }
}

export default TouchController;
