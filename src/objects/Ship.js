import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const shipModelUrl = new URL("../assets/models/ship-large.glb", import.meta.url)
  .href;

class Ship {
  constructor() {
    this.maxSpeed = 0.05;
    this.health = 100;
    this.boundary = 5; // x ekseninde sınır içinde hareket etme
    this.startingZ = 0; // gemi bu z konumunda sabit kalacak
    this.gameOverBoundaryZ = this.startingZ + 1.2; // düşman bu sınırı geçtiğinde oyun biter
    this.velocity = new THREE.Vector3();
    this.acceleration = 0.002;
    this.friction = 0.95; // geminin hareketini yavaşlatmak için sürtünme katsayısı
    this.radius = 1;
    this.isColliding = false;
    this.isGameOver = false;
    this.isStarted = false;

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

          child.material.color.set("#ae7314");
          child.material.needsUpdate = true;
        }
      });

      this.mesh.add(model);
    });

    // const geometry = new THREE.BoxGeometry(1, 0.3, 2);

    // this.material = new THREE.MeshStandardMaterial({
    //   color: 0xffffff,
    // });

    // this.mesh = new THREE.Mesh(geometry, this.material);

    // this.mesh.castShadow = true;

    // this.mesh.rotation.y = Math.PI;
    this.mesh.position.y = 0.3;
    this.mesh.position.z = this.startingZ;
  }

  update() {
    this.velocity.clampLength(0, this.maxSpeed);
    // geminin hızını maksimum hıza sınırlıyoruz
    this.mesh.position.add(this.velocity);
    this.mesh.position.z = this.startingZ;
    //gemi verilen hız kadar hareket edecek
    this.velocity.multiplyScalar(this.friction);
    //gemi hareket ettikten sonra sürtünme katsayısı ile hızını azaltıyoruz
  }

  moveRight() {
    if (this.mesh.position.x < this.boundary) {
      this.velocity.x += this.acceleration;
    } //Geminin şu anki hareket hızı sağa doğru olsun diyoruz.
  }

  moveLeft() {
    if (this.mesh.position.x > -this.boundary) {
      this.velocity.x -= this.acceleration;
    }
  }

  moveForward() {
    this.mesh.position.z = this.startingZ;
  }

  moveBackward() {
    return; //Gemi geri gitmesin
  }

  stop() {
    this.velocity.set(0, 0, 0);
  }

  takeDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.health = 0;
      this.isGameOver = true;
    }
  }
  pushBack(direction) {
    this.velocity.add(direction);
  }

  damageEffect() {
    this.mesh.traverse((child) => {
      if (child.isMesh) {
        child.material.color.set(0xff0000);
      }
    });

    setTimeout(() => {
      this.mesh.traverse((child) => {
        if (child.isMesh) {
          child.material.color.set(0xffffff);
        }
      });
    }, 100);
  }
}

export default Ship;
