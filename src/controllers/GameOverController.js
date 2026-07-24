class GameOverController {
  constructor(ship) {
    this.ship = ship;

    this.screen = document.getElementById("game-over");

    this.button = document.getElementById("restart-button");

    this.button.addEventListener("click", () => {
      this.restart();
    });
  }

  update() {
    if (this.ship.isGameOver) {
      document.getElementById("game-over").style.display = "flex";
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
