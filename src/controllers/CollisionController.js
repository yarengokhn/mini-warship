import * as THREE from "three";
class CollisionController {
    constructor(ship, obstacle) {
        this.ship = ship;
        this.obstacle = obstacle;
    }

    //Box3 objenin gerçek kapladığı alanı hesaplar.
    update() {
        const shipBox = new THREE.Box3().setFromObject(this.ship.mesh);

        const obstacleBox = new THREE.Box3().setFromObject(this.obstacle.mesh);

        if (shipBox.intersectsBox(obstacleBox)) {
            const direction = new THREE.Vector3();
            direction.subVectors(
                this.ship.mesh.position,
                this.obstacle.mesh.position
            ).normalize(); //Sadece yönü koru, uzunluğu 1 yap --> normaliza fonksiyonu

            this.ship.pushBack(direction.multiplyScalar(0.2));  

            //ilk temas anında hasar ver
            if(!this.ship.isColliding) {
                this.ship.takeDamage(10);
                this.ship.damageEffect();
                this.ship.isColliding = true;
            }

        }
        else {
            //engel ile temas bitti
            this.ship.isColliding = false;
        }

    }
}

export default CollisionController;
