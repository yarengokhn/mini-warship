class GameOverController {
  constructor(ship, sea) {
    this.ship = ship;
    this.sea = sea;

    this.installPrompt = document.getElementById("install-prompt");
    this.installButton = document.getElementById("install-button");

    this.elapsedSeconds = 0;
    this.lastTime = performance.now();
    this.installShown = false;

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
      this.showCTA();
    }

    if (this.ship.isGameOver) {
      if (this.sea && !this.sea.isPaused) {
        this.sea.stop();
      }

      this.showCTA();
    }
  }

  showCTA() {
    this.installShown = true;

    this.installPrompt.style.display = "flex";
  }
}

export default GameOverController;
