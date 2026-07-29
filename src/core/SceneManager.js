import * as THREE from "three";

class SceneManager {
  constructor() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    this.camera.position.y = 2.5;
    this.camera.position.z = 6;

    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.renderer = new THREE.WebGLRenderer();

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.renderer.shadowMap.enabled = true;

    document.body.appendChild(this.renderer.domElement);
  }
}

export default SceneManager;
