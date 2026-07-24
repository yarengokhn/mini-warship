import * as THREE from "three";


class Sea {


    constructor(){


        const geometry =
            new THREE.PlaneGeometry(
                100,
                100
            );



        const material =
            new THREE.MeshStandardMaterial({
                color:0x006994
            });



        this.mesh =
            new THREE.Mesh(
                geometry,
                material
            );



        this.mesh.rotation.x =
            -Math.PI / 2;



        this.mesh.position.y =
            -0.2;



        this.mesh.receiveShadow = true;


    }


}


export default Sea;