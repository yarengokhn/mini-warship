class PlayerController {
  constructor(ship, input) {
    this.ship = ship;
    this.input = input;
  }

  update() {
    if (this.ship.isGameOver || !this.ship.isStarted) {
      return;
    }

    const keyboard = this.input?.keyboard || this.input;
    const touch = this.input?.touch;

    const moveLeft =
      (keyboard?.isDown && keyboard.isDown("KeyA")) ||
      (touch?.isLeft && touch.isLeft());

    const moveRight =
      (keyboard?.isDown && keyboard.isDown("KeyD")) ||
      (touch?.isRight && touch.isRight());

    if (moveLeft) {
      this.ship.moveLeft();
    }

    if (moveRight) {
      this.ship.moveRight();
    }
  }
}

export default PlayerController;
