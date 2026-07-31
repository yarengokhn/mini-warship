class GameOverController {
  constructor(ship, sea) {
    this.ship = ship;
    this.sea = sea;

    this.screen = document.getElementById("game-over");
    this.button = document.getElementById("restart-button");
    this.installPrompt = document.getElementById("install-prompt");
    this.installButton = document.getElementById("install-button");

    this.elapsedSeconds = 0;
    this.lastTime = performance.now();
    this.installShown = false;

    this.button.addEventListener("click", () => {
      this.restart();
    });

    this.installButton.addEventListener("click", () => {
      window.open("#", "_blank");
    });
  }

  update() {
    const now = performance.now();
    const delta = (now - this.lastTime) / 1000;
    this.lastTime = now;

    if (!this.ship.isGameOver) {
      this.elapsedSeconds += delta;
    }

    if (!this.installShown && this.elapsedSeconds >= 15) {
      this.installShown = true;
      this.installPrompt.style.display = "flex";
    }

    if (this.ship.isGameOver) {
      this.screen.style.display = "flex";
      if (this.sea && !this.sea.isPaused) {
        this.sea.stop();
      }
      if (!this.installShown) {
        this.installShown = true;
        this.installPrompt.style.display = "flex";
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
    this.installPrompt.style.display = "none";
    this.elapsedSeconds = 0;
    this.installShown = false;
    this.lastTime = performance.now();
  }
}

export default GameOverController;
