class PlayerController {
  constructor(ship, input) {
    this.ship = ship;
    this.input = input;
  }
  update() {
    if (this.ship.isGameOver) {
      return; // Oyun bittiğinde gemi hareket etmesin
    }
    if (this.input.isDown("KeyD")) {
      this.ship.moveRight();
    }
    if (this.input.isDown("KeyA")) {
      this.ship.moveLeft();
    }
    if (this.input.isDown("KeyW")) {
      this.ship.moveForward();
    }
    // if(this.input.isDown("KeyS")){
    //      this.ship.moveBackward();

    // }
  }
}
export default PlayerController;
