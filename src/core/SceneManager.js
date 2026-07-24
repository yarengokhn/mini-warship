import * as THREE from "three";


class SceneManager {


    constructor(){


        this.scene = new THREE.Scene();



        this.camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );


        this.camera.position.y = 3;
        this.camera.position.z = 4;


        this.camera.lookAt(
            this.scene.position
        );



        this.renderer = new THREE.WebGLRenderer();


        this.renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );


        this.renderer.shadowMap.enabled = true;



        document.body.appendChild(
            this.renderer.domElement
        );


    }


}


export default SceneManager;