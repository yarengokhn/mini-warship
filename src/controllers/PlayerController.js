class PlayerController {
  constructor(ship, input) {
    this.ship = ship;
    this.input = input;
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
  }
}
export default PlayerController;
