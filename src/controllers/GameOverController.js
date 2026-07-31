class GameOverController {
  constructor(ship, sea) {
    this.ship = ship;
    this.sea = sea;

    this.screen = document.getElementById("game-over");

    this.button = document.getElementById("restart-button");

    this.button.addEventListener("click", () => {
      this.restart();
    });
  }

  update() {
    if (this.ship.isGameOver) {
      this.screen.style.display = "flex";
      if (this.sea && !this.sea.isPaused) {
        this.sea.stop();
      }
    }
  }

  restart() {
    this.ship.health = 100;

    this.ship.isGameOver = false;

    this.ship.isColliding = false;

    this.ship.mesh.position.set(0, 0, 0);

    this.ship.velocity.set(0, 0, 0);

    this.screen.style.display = "none";
  }
}

export default GameOverController;
