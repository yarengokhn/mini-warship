import * as THREE from "three";


class Lights {


    constructor(scene){


        const directional =
            new THREE.DirectionalLight(
                0xffffff,
                2
            );


        directional.position.set(
            5,
            10,
            5
        );


        directional.castShadow = true;


        scene.add(
            directional
        );




        const ambient =
            new THREE.AmbientLight(
                0xffffff,
                0.5
            );


        scene.add(
            ambient
        );


    }


}


export default Lights;