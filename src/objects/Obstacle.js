import * as THREE from "three";


class Obstacle {


    constructor(){

        const geometry =
            new THREE.BoxGeometry(
                1,
                1,
                1
            );


        const material =
            new THREE.MeshStandardMaterial({
                color: 0xff0000
            });


        this.mesh =
            new THREE.Mesh(
                geometry,
                material
            );


        this.mesh.position.x = 3;
        this.mesh.position.z = -5;


        this.mesh.castShadow = true;

    }


}


export default Obstacle;