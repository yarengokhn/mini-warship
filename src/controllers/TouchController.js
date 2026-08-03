class TouchController {
  constructor() {
    this.activeDirection = null;

    window.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
      },
      { passive: false },
    );
  }

  setDirection(direction) {
    this.activeDirection = direction;
  }

  clearDirection() {
    this.activeDirection = null;
  }

  isLeft() {
    return this.activeDirection === "left";
  }

  isRight() {
    return this.activeDirection === "right";
  }
}

export default TouchController;
