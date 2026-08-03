import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const islandModelUrl = new URL("../assets/models/island.glb", import.meta.url)
  .href;

class Obstacle {
  constructor() {
    this.radius = 0.8;

    const loader = new GLTFLoader();

    this.mesh = new THREE.Group();
    loader.load(islandModelUrl, (gltf) => {
      const model = gltf.scene;

      //X,Y,Z ekseninde  küçült
      model.scale.set(0.2, 0.2, 0.2);

      model.rotation.y = Math.PI;

      //traverse() -->modelin içindeki bütün parçaları gez
      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;

          child.material.color.set("#4d4231");
          child.material.needsUpdate = true;
        }
      });

      this.mesh.add(model);
    });

    this.mesh.position.x = 3;
    this.mesh.position.z = -5;

    this.mesh.castShadow = true;
  }
}

export default Obstacle;
