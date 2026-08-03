import * as THREE from "three";

const shipHitSoundUrl = new URL("../assets/ship_hit.mp3", import.meta.url).href;

class CollisionController {
  constructor(ship, shootingController, enemySpawner, listener) {
    this.ship = ship;
    // this.obstacle = obstacle;
    this.shootingController = shootingController;
    this.enemySpawner = enemySpawner;
    this.listener = listener;
    this.canPlayHitSound = true;
    this.hitAudioBuffer = null;

    const loader = new THREE.AudioLoader();
    loader.load(shipHitSoundUrl, (buffer) => {
      this.hitAudioBuffer = buffer;
    });
  }

  //Box3 objenin gerçek kapladığı alanı hesaplar.
  update() {
    // this.checkObstacle();

    // this.checkEnemyObstacle();

    this.checkEnemyBullets();

    this.checkPlayerBullets();

    this.checkEnemyCollision();
  }

  // checkObstacle() {
  //   const shipBox = new THREE.Box3().setFromObject(this.ship.mesh);

  //   const obstacleBox = new THREE.Box3().setFromObject(this.obstacle.mesh);

  //   if (shipBox.intersectsBox(obstacleBox)) {
  //     const direction = new THREE.Vector3();
  //     direction
  //       .subVectors(this.ship.mesh.position, this.obstacle.mesh.position)
  //       .normalize(); //Sadece yönü koru, uzunluğu 1 yap --> normaliza fonksiyonu

  //     direction.y = 0; // sadece yatay düzlemde geri itme

  //     this.ship.pushBack(direction.multiplyScalar(0.2));

  //     //ilk temas anında hasar ver
  //     if (!this.ship.isColliding) {
  //       this.ship.takeDamage(10);
  //       this.ship.damageEffect();
  //       this.ship.isColliding = true;
  //     }
  //     // obstacle ile temas edildiğinde doğrudan oyun sonu yap
  //     if (!this.ship.isGameOver) {
  //       this.ship.isGameOver = true;
  //     }
  //   } else {
  //     //engel ile temas bitti
  //     this.ship.isColliding = false;
  //   }
  // }

  // checkEnemyObstacle() {
  //   const obstacleBox = new THREE.Box3().setFromObject(this.obstacle.mesh);

  //   this.enemySpawner.enemies.forEach((enemy) => {
  //     if (enemy.isDestroyed) return;

  //     const enemyBox = new THREE.Box3().setFromObject(enemy.mesh);

  //     if (enemyBox.intersectsBox(obstacleBox)) {
  //       enemy.destroy();
  //     }
  //   });
  // }

  checkEnemyBullets() {
    const playerBox = new THREE.Box3().setFromObject(this.ship.mesh);

    this.enemySpawner.enemies.forEach((enemy) => {
      const toRemove = [];

      enemy.bullets.forEach((bullet) => {
        if (!bullet || !bullet.mesh) return;

        const bulletBox = new THREE.Box3().setFromObject(bullet.mesh);

        if (playerBox.intersectsBox(bulletBox)) {
          this.ship.takeDamage(10);

          // remove bullet from scene and mark for removal so it can't hit multiple times
          if (bullet.mesh.parent) {
            bullet.mesh.parent.remove(bullet.mesh);
          }

          toRemove.push(bullet);
        }
      });

      if (toRemove.length > 0) {
        enemy.bullets = enemy.bullets.filter((b) => !toRemove.includes(b));
      }
    });
  }

  checkPlayerBullets() {
    const enemies = this.enemySpawner.enemies;
    const bulletsToRemove = [];

    this.shootingController.bullets.forEach((bullet) => {
      if (!bullet || !bullet.mesh) return;

      const bulletBox = new THREE.Box3().setFromObject(bullet.mesh);

      for (const enemy of enemies) {
        if (enemy.isDestroyed) continue;

        const enemyBox = new THREE.Box3().setFromObject(enemy.mesh);

        if (bulletBox.intersectsBox(enemyBox)) {
          enemy.takeDamage(20);

          if (bullet.mesh.parent) {
            bullet.mesh.parent.remove(bullet.mesh);
          }

          bulletsToRemove.push(bullet);
          break;
        }
      }
    });

    if (this.shootingController && this.shootingController.bullets) {
      this.shootingController.bullets = this.shootingController.bullets.filter(
        (b) => !bulletsToRemove.includes(b),
      );
    }
  }

  checkEnemyCollision() {
    const playerBox = new THREE.Box3().setFromObject(this.ship.mesh);

    this.enemySpawner.enemies.forEach((enemy) => {
      if (enemy.isDestroyed) return;

      const enemyBox = new THREE.Box3().setFromObject(enemy.mesh);

      if (playerBox.intersectsBox(enemyBox)) {
        this.ship.takeDamage(20);

        if (this.hitAudioBuffer) {
          const hitAudio = new THREE.Audio(this.listener);
          hitAudio.setBuffer(this.hitAudioBuffer);
          hitAudio.setVolume(0.5);
          hitAudio.play();
        }

        // geri itme
        const direction = new THREE.Vector3()
          .subVectors(this.ship.mesh.position, enemy.mesh.position)
          .normalize();

        direction.y = 0;

        this.ship.pushBack(direction.multiplyScalar(0.3));

        enemy.destroy();
      }
    });
  }
}

export default CollisionController;
