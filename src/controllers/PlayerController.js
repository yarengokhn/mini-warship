class PlayerController {
  constructor(ship, input, touch) {
    this.ship = ship;
    this.input = input;
    this.touch = touch;
  }
  update() {
    if (this.ship.isGameOver || !this.ship.isStarted) {
      return; // Oyun başlamadan hareket etmesin
    }

    const keyboard = this.input.keyboard || this.input;
    const touch = this.input.touch || this.input;

    const moveLeft =
      (keyboard.isDown && keyboard.isDown("KeyA")) ||
      (touch.isLeft && touch.isLeft());
    const moveRight =
      (keyboard.isDown && keyboard.isDown("KeyD")) ||
      (touch.isRight && touch.isRight());

    // const moveForward = keyboard.isDown && keyboard.isDown("KeyW");

    if (moveLeft) {
      this.ship.moveLeft();
    }
    if (moveRight) {
      this.ship.moveRight();
    }
    // if (moveForward) {
    //   this.ship.moveForward();
    // }

    if (this.touch) {
      if (this.touch.isLeft()) this.ship.moveLeft();
      if (this.touch.isRight()) this.ship.moveRight();
    }
  }
}
export default PlayerController;
