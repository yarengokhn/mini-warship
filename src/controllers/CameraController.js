class CameraController {

    constructor(camera, ship){

        this.camera = camera;
        this.ship = ship;

        this.offset = {
            x: 0,
            y: 5,
            z: 5
        };

    }


    update(){

        this.camera.position.x =
            this.ship.mesh.position.x + this.offset.x;


        this.camera.position.y =
            this.ship.mesh.position.y + this.offset.y;


        this.camera.position.z =
            this.ship.mesh.position.z + this.offset.z;


        this.camera.lookAt(
            this.ship.mesh.position
        );

    }


}


export default CameraController;