import * as THREE from "three";
import Bullet from "./Bullet.js";

class EnemyShip {
  constructor(scene) {
    this.scene = scene;
    this.speed = 0.05;
    this.health = 40;
    this.isDestroyed = false;

    this.bullets = [];
    this.shootTimer = 0;
    this.shootRate = 120;

    const geometry = new THREE.BoxGeometry(1, 0.3, 2);

    const material = new THREE.MeshStandardMaterial({
      color: "#4e3687",
    });

    this.mesh = new THREE.Mesh(geometry, material);

    this.mesh.castShadow = true;

    this.mesh.position.z = -10;
    this.mesh.position.x = (Math.random() - 0.5) * 6;
    this.mesh.position.y = 0.3;

    this.mesh.rotation.y = Math.PI;
  }

  update() {
    this.mesh.position.z += this.speed;

    this.shootTimer++;

    if (this.shootTimer >= this.shootRate) {
      this.shoot();
      this.shootTimer = 0;
    }

    this.bullets.forEach((bullet) => {
      bullet.update();
    });
  }

  shoot() {
    const bullet = new Bullet("enemy");

    bullet.mesh.position.copy(this.mesh.position);

    this.scene.add(bullet.mesh);

    this.bullets.push(bullet);
  }

  takeDamage(amount) {
    this.health -= amount;

    this.damageEffect();

    if (this.health <= 0) {
      this.destroy();
    }
  }

  destroy() {
    this.isDestroyed = true;
    this.mesh.visible = false;
  }
  damageEffect() {
    this.mesh.material.color.set(0xffff00);

    setTimeout(() => {
      this.mesh.material.color.set(0xff0000);
    }, 100);
  }
}

export default EnemyShip;
