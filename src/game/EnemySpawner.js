import EnemyShip from "../objects/EnemyShip.js";

class EnemySpawner {
  constructor(scene, playerShip) {
    this.scene = scene;
    this.playerShip = playerShip;
    this.enemies = [];
    this.explosions = [];

    this.timer = 0;
    this.spawnRate = 180;
    this.maxEnemies = 4;

    this.spawn();
  }

  update() {
    // if game over or not started, stop spawning/updating enemies
    if (
      this.playerShip &&
      (this.playerShip.isGameOver || !this.playerShip.isStarted)
    )
      return;

    this.timer++;

    if (this.timer >= this.spawnRate && this.enemies.length < this.maxEnemies) {
      this.spawn();
      this.timer = 0;
    }

    const reachThreshold = this.playerShip
      ? this.playerShip.mesh.position.z - 0.5
      : 0;

    this.enemies = this.enemies.filter((enemy) => {
      if (enemy.isDestroyed) {
        this.scene.remove(enemy.mesh);

        return false;
      }
      // if enemy reaches player line -> game over
      if (this.playerShip && enemy.mesh.position.z >= reachThreshold) {
        this.playerShip.isGameOver = true;

        if (enemy.mesh && enemy.mesh.parent) {
          enemy.mesh.parent.remove(enemy.mesh);
        }

        return false;
      }

      enemy.update();

      return true;
    });

    const delta = 1 / 60;
    this.explosions.forEach((explosion) => explosion.update(delta));
    this.explosions = this.explosions.filter(
      (explosion) => !explosion.isFinished,
    );
  }

  spawn() {
    const enemy = new EnemyShip(this.scene, this.playerShip);

    const lanes = [-3, -1.5, 0, 1.5, 3];
    const lane = lanes[Math.floor(Math.random() * lanes.length)];
    // spawn enemies farther away so they always approach from distance
    enemy.mesh.position.set(lane, 0.3, -25);

    this.scene.add(enemy.mesh);

    this.enemies.push(enemy);
  }
}

export default EnemySpawner;
