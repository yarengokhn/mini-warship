class HealthUIController {
    constructor(ship) {
        this.ship = ship;
        this.healthBar = document.getElementById(
            "health-bar"
        );
    }
    update() {
        if (!this.healthBar) {
            return;
        }

        const healthPercentage = (this.ship.health / 100) * 100;
        this.healthBar.style.width = `${healthPercentage}%`;
    }
}

export default HealthUIController;