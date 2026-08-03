import Bullet from "../objects/Bullet.js";

const shootSoundUrl = new URL("../assets/sounds/shoot.mp3", import.meta.url)
  .href;

class ShootingController {
  constructor(scene, ship, keyboard) {
    this.scene = scene;

    this.ship = ship;

    this.keyboard = keyboard;

    this.bullets = [];

    this.cooldown = 0;

    this.shootAudio = new Audio(shootSoundUrl);
    this.shootAudio.volume = 0.5;
    this.shootAudio.preload = "auto";

    this.fireButton = document.getElementById("fire-button");
    if (this.fireButton) {
      this.fireButton.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        this.fireButton.classList.add("pressed");
        if (!this.ship.isStarted || this.ship.isGameOver) return;
        if (this.cooldown <= 0) {
          this.shoot();
          this.cooldown = 15;
        }
      });

      const resetButton = () => {
        this.fireButton.classList.remove("pressed");
      };

      this.fireButton.addEventListener("pointerup", resetButton);
      this.fireButton.addEventListener("pointerleave", resetButton);
      this.fireButton.addEventListener("pointercancel", resetButton);
    }
  }

  update() {
    if (this.ship.isGameOver || !this.ship.isStarted) return;

    this.cooldown--;

    if (this.keyboard.isDown("Space") && this.cooldown <= 0) {
      this.shoot();

      this.cooldown = 15;
    }

    this.bullets.forEach((bullet) => {
      bullet.update();
    });

    // remove bullets that are invisible or out of bounds
    this.bullets = this.bullets.filter(
      (b) => b && b.mesh && b.mesh.visible && Math.abs(b.mesh.position.z) < 200,
    );
  }

  shoot() {
    const bullet = new Bullet("player");

    bullet.mesh.position.copy(this.ship.mesh.position);
    // ensure bullet spawns at ship's firing height so it can hit enemies
    bullet.mesh.position.y += 0.15;

    this.scene.add(bullet.mesh);

    this.bullets.push(bullet);

    if (this.shootAudio) {
      this.shootAudio.currentTime = 0;
      this.shootAudio.play().catch(() => {
        // mobile/autoplay olabilir, normal oyun etkileşimiyle çalar
      });
    }
  }
}

export default ShootingController;
