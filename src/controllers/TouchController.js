// input/TouchController.js
class TouchController {
  constructor() {
    this.startX = 0;
    this.startY = 0;
    this.deltaX = 0;
    this.deltaY = 0;
    this.isTouching = false;

    window.addEventListener("touchstart", (e) => this.onTouchStart(e), {
      passive: false,
    });
    window.addEventListener("touchmove", (e) => this.onTouchMove(e), {
      passive: false,
    });
    window.addEventListener("touchend", () => this.onTouchEnd());
  }

  onTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    this.startX = touch.clientX;
    this.startY = touch.clientY;
    this.isTouching = true;
  }

  onTouchMove(e) {
    e.preventDefault();
    if (!this.isTouching) return;
    const touch = e.touches[0];
    this.deltaX = touch.clientX - this.startX;
    this.deltaY = touch.clientY - this.startY;
  }

  onTouchEnd() {
    this.isTouching = false;
    this.deltaX = 0;
    this.deltaY = 0;
  }

  // basit eşik değeri ile yön belirleme
  isLeft() {
    return this.deltaX < -20;
  }
  isRight() {
    return this.deltaX > 20;
  }
  isUp() {
    return this.deltaY < -20;
  }
  isDown() {
    return this.deltaY > 20;
  }
}

export default TouchController;
