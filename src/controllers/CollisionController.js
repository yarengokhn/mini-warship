class CollisionController {
  constructor(ship, obstacle) {
    this.ship = ship;
    this.obstacle = obstacle;
  }
  update() {
    const distance = this.ship.mesh.position.distanceTo(
      this.obstacle.mesh.position,
    );

    if (distance < this.ship.radius + this.obstacle.radius) {
      if (!this.ship.isColliding) {
        this.ship.takeDamage(10);

        this.ship.isColliding = true;
        //gemiyi geri ittiriyoruz
        this.ship.stop();
        this.ship.velocity.z +=0.2;
      }
    } else {
      this.ship.isColliding = false;
    }
  }
}

export default CollisionController;
