class TouchController {
  constructor() {
    this.x = 0;
    this.active = false;
    this.startX = null;
    this.currentX = null;
    this.threshold = 0.15;

    const handleStart = (clientX) => {
      this.active = true;
      this.startX = clientX;
      this.currentX = clientX;
      this.x = 0;
    };

    const handleMove = (clientX) => {
      if (!this.active || this.startX === null) return;

      this.currentX = clientX;
      const delta = this.currentX - this.startX;
      this.x = delta / Math.max(window.innerWidth, 1);
    };

    const handleEnd = () => {
      this.active = false;
      this.x = 0;
      this.startX = null;
      this.currentX = null;
    };

    window.addEventListener("pointerdown", (e) => {
      handleStart(e.clientX);
    });

    window.addEventListener("pointermove", (e) => {
      handleMove(e.clientX);
    });

    window.addEventListener("pointerup", handleEnd);
    window.addEventListener("pointercancel", handleEnd);

    window.addEventListener(
      "touchstart",
      (e) => {
        if (e.touches.length > 0) {
          handleStart(e.touches[0].clientX);
        }
      },
      { passive: true },
    );

    window.addEventListener(
      "touchmove",
      (e) => {
        if (e.touches.length > 0) {
          handleMove(e.touches[0].clientX);
        }
      },
      { passive: true },
    );

    window.addEventListener("touchend", handleEnd, { passive: true });
    window.addEventListener("touchcancel", handleEnd, { passive: true });
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
