import * as THREE from "three";

class CollisionController {
  constructor(ship, obstacle, shootingController, enemySpawner) {
    this.ship = ship;
    this.obstacle = obstacle;
    this.shootingController = shootingController;
    this.enemySpawner = enemySpawner;
  }

  //Box3 objenin gerçek kapladığı alanı hesaplar.
  update() {
    this.checkObstacle();

    this.checkEnemyBullets();

    this.checkPlayerBullets();

    this.checkEnemyCollision();
  }

  checkObstacle() {
    const shipBox = new THREE.Box3().setFromObject(this.ship.mesh);

    const obstacleBox = new THREE.Box3().setFromObject(this.obstacle.mesh);

    if (shipBox.intersectsBox(obstacleBox)) {
      const direction = new THREE.Vector3();
      direction
        .subVectors(this.ship.mesh.position, this.obstacle.mesh.position)
        .normalize(); //Sadece yönü koru, uzunluğu 1 yap --> normaliza fonksiyonu

      this.ship.pushBack(direction.multiplyScalar(0.2));

      //ilk temas anında hasar ver
      if (!this.ship.isColliding) {
        this.ship.takeDamage(10);
        this.ship.damageEffect();
        this.ship.isColliding = true;
      }
    } else {
      //engel ile temas bitti
      this.ship.isColliding = false;
    }
  }

  checkEnemyBullets() {
    const playerBox = new THREE.Box3().setFromObject(this.ship.mesh);

    this.enemySpawner.enemies.forEach((enemy) => {
      enemy.bullets.forEach((bullet) => {
        const bulletBox = new THREE.Box3().setFromObject(bullet.mesh);

        if (playerBox.intersectsBox(bulletBox)) {
          this.ship.takeDamage(10);

          bullet.mesh.visible = false;
        }
      });
    });
  }

  checkPlayerBullets() {
    const enemies = this.enemySpawner.enemies;

    this.shootingController.bullets.forEach((bullet) => {
      const bulletBox = new THREE.Box3().setFromObject(bullet.mesh);

      enemies.forEach((enemy) => {
        if (enemy.isDestroyed) return;

        const enemyBox = new THREE.Box3().setFromObject(enemy.mesh);

        if (bulletBox.intersectsBox(enemyBox)) {
          enemy.takeDamage(20);

          bullet.mesh.visible = false;
        }
      });
    });
  }

  checkEnemyCollision() {
    const playerBox = new THREE.Box3().setFromObject(this.ship.mesh);

    this.enemySpawner.enemies.forEach((enemy) => {
      if (enemy.isDestroyed) return;

      const enemyBox = new THREE.Box3().setFromObject(enemy.mesh);

      if (playerBox.intersectsBox(enemyBox)) {
        this.ship.takeDamage(20);

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
