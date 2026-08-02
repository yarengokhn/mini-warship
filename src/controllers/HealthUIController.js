class HealthUIController {
  constructor(ship) {
    this.ship = ship;

    this.healthBar = document.getElementById("health-bar");
  }

  update() {
    const healthPercent = this.ship.health;

    this.healthBar.style.width = healthPercent + "%";

    // Can azalınca renk değiştir
    if (healthPercent < 30) {
      this.healthBar.style.background =
        "linear-gradient(90deg,#ff3333,#990000)";
    } else if (healthPercent < 60) {
      this.healthBar.style.background =
        "linear-gradient(90deg,#ffaa00,#ff6600)";
    } else {
      this.healthBar.style.background =
        "linear-gradient(90deg,#00ff88,#00cc55)";
    }
  }
}

export default HealthUIController;
