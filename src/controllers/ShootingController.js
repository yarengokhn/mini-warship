import Bullet from "../objects/Bullet.js";

class ShootingController {
  constructor(scene, ship, keyboard) {
    this.scene = scene;

    this.ship = ship;

    this.keyboard = keyboard;

    this.bullets = [];

    this.cooldown = 0;
  }

  update() {
    if (this.ship.isGameOver) return;

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
  }
}

export default ShootingController;
