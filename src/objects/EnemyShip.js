import * as THREE from "three";
import Bullet from "./Bullet.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const shipModelUrl = new URL("../assets/models/ship-large.glb", import.meta.url)
  .href;
const explosionSoundUrl = new URL(
  "../assets/sounds/explosion.mp3",
  import.meta.url,
).href;

class EnemyShip {
  constructor(scene, playerShip = null) {
    this.scene = scene;
    this.playerShip = playerShip;
    this.speed = 0.05;
    this.health = 40;
    this.isDestroyed = false;
    this.baseColor = new THREE.Color("#372507");

    this.bullets = [];
    this.shootTimer = 0;
    this.shootRate = 120;

    const loader = new GLTFLoader();

    this.mesh = new THREE.Group();
    loader.load(shipModelUrl, (gltf) => {
      const model = gltf.scene;

      //X,Y,Z ekseninde  küçült
      model.scale.set(0.2, 0.2, 0.2);

      model.rotation.y = Math.PI;

      //traverse() -->modelin içindeki bütün parçaları gez
      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;

          child.material.color.set(this.baseColor);
          child.material.needsUpdate = true;
        }
      });

      this.mesh.add(model);
    });
    this.mesh.position.z = -10;
    this.mesh.position.x = (Math.random() - 0.5) * 6;
    this.mesh.position.y = 0.3;

    this.mesh.rotation.y = Math.PI;

    this.explosionAudio = new Audio(explosionSoundUrl);
    this.explosionAudio.preload = "auto";
    this.explosionAudio.volume = 0.5;
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

    // spawn enemy bullet at player's height if available so it can hit the ship
    if (this.playerShip && this.playerShip.mesh) {
      bullet.mesh.position.y = this.playerShip.mesh.position.y;
    } else {
      bullet.mesh.position.y = this.mesh.position.y;
    }

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

    if (this.explosionAudio) {
      try {
        this.explosionAudio.currentTime = 0;
        this.explosionAudio.play();
      } catch {
        // some browsers block autoplay until user interaction; ignore safely
      }
    }

    // remove any bullets this enemy spawned from the scene
    this.bullets.forEach((bullet) => {
      try {
        if (bullet && bullet.mesh) {
          if (bullet.mesh.parent) {
            bullet.mesh.parent.remove(bullet.mesh);
          }
          if (typeof bullet.destroy === "function") {
            bullet.destroy();
          } else {
            bullet.mesh.visible = false;
          }
        }
      } catch {
        // ignore
      }
    });
    this.bullets = [];
    this.shootTimer = 0;
  }
  damageEffect() {
    this.mesh.traverse((child) => {
      if (child.isMesh) {
        child.material.color.set(0xffff00);
      }
    });

    setTimeout(() => {
      this.mesh.traverse((child) => {
        if (child.isMesh) {
          child.material.color.set(this.baseColor);
        }
      });
    }, 150);
  }
}

export default EnemyShip;
