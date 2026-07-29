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
    this.cooldown--;

    if (this.keyboard.isDown("Space") && this.cooldown <= 0) {
      this.shoot();

      this.cooldown = 15;
    }

    this.bullets.forEach((bullet) => {
      bullet.update();
    });
  }

  shoot() {
    const bullet = new Bullet("player");

    bullet.mesh.position.copy(this.ship.mesh.position);

    this.scene.add(bullet.mesh);

    this.bullets.push(bullet);
  }
}

export default ShootingController;
