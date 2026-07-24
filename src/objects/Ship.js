import * as THREE from "three";

class Ship {
  constructor() {
    this.maxSpeed = 0.05;
    this.health = 100;
    this.boundary = 5; // x ve z ekseninde sınır içinde hareket edebilmesi için sınır değeri
    this.velocity = new THREE.Vector3();
    this.acceleration = 0.002;
    this.friction = 0.95; // geminin hareketini yavaşlatmak için sürtünme katsayısı
    this.radius = 1;
    this.isColliding = false; 
    this.isGameOver = false; 

    const geometry = new THREE.BoxGeometry(1, 0.3, 2);


    this.material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
    });

    this.mesh = new THREE.Mesh(geometry, this.material);

    this.mesh.castShadow = true;

    this.mesh.rotation.y = Math.PI;
  }

  update() {


    this.velocity.clampLength(0, this.maxSpeed);
    // geminin hızını maksimum hıza sınırlıyoruz
    this.mesh.position.add(this.velocity);
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
    if (this.mesh.position.z > -this.boundary) {
      this.velocity.z -= this.acceleration;
    }
  }

  moveBackward() {
    if (this.mesh.position.z < this.boundary) {
      this.velocity.z += this.acceleration;
    }
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

  damageEffect(){

    this.material.color.set(
        0xff0000
    );


    setTimeout(()=>{

        this.material.color.set(
            0xffffff
        );

    },100);

}

}

export default Ship;
