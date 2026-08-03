class TouchController {
  constructor() {
    this.startX = 0;
    this.startY = 0;
    this.deltaX = 0;
    this.deltaY = 0;
    this.isTouching = false;

    window.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        this.startX = touch.clientX;
        this.startY = touch.clientY;
        this.deltaX = 0;
        this.deltaY = 0;
        this.isTouching = true;
      },
      { passive: false },
    );

    window.addEventListener(
      "touchmove",
      (e) => {
        e.preventDefault();
        if (!this.isTouching) return;
        const touch = e.touches[0];
        this.deltaX = touch.clientX - this.startX;
        this.deltaY = touch.clientY - this.startY;
      },
      { passive: false },
    );

    window.addEventListener(
      "touchend",
      () => {
        this.isTouching = false;
        this.deltaX = 0;
        this.deltaY = 0;
      },
      { passive: true },
    );
  }

  isLeft() {
    return this.isTouching && this.deltaX < -24;
  }

  isRight() {
    return this.isTouching && this.deltaX > 24;
  }
}

export default TouchController;
