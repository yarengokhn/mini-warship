import EnemyShip from "../objects/EnemyShip.js";

class EnemySpawner {
  constructor(scene, playerShip) {
    this.scene = scene;
    this.playerShip = playerShip;
    this.enemies = [];

    this.timer = 0;
    this.spawnRate = 180;
    this.maxEnemies = 4;

    this.spawn();
  }

  update() {
    this.timer++;

    if (this.timer >= this.spawnRate && this.enemies.length < this.maxEnemies) {
      this.spawn();
      this.timer = 0;
    }

    this.enemies = this.enemies.filter((enemy) => {
      if (enemy.isDestroyed) {
        this.scene.remove(enemy.mesh);

        return false;
      }

      enemy.update();

      return true;
    });
  }

  spawn() {
    if (this.enemies.length >= this.maxEnemies) {
      return;
    }

    const enemy = new EnemyShip(this.scene);

    enemy.mesh.position.set((Math.random() - 0.5) * 6, 0.3, -15);

    this.scene.add(enemy.mesh);

    this.enemies.push(enemy);
  }
}

export default EnemySpawner;
