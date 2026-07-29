import * as THREE from "three";

class Bullet {
  constructor(owner) {
    this.owner = owner;

    this.speed = 0.3;

    const geometry = new THREE.SphereGeometry(0.08);

    const material = new THREE.MeshStandardMaterial({
      color: owner === "player" ? 0xffff00 : 0xff0000,
    });

    this.mesh = new THREE.Mesh(geometry, material);

    this.mesh.castShadow = true;
  }

  update() {
    if (this.owner === "player") {
      this.mesh.position.z -= this.speed;
    }

    if (this.owner === "enemy") {
      this.mesh.position.z += this.speed;
    }
  }
}

export default Bullet;
