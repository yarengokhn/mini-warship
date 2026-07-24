class GameLoop {


    constructor(
        renderer,
        scene,
        camera,
        objects 
    ){


        this.renderer = renderer;

        this.scene = scene;

        this.camera = camera;

        this.objects = objects;

    }



    start(){


        const animate = ()=>{


            requestAnimationFrame(
                animate
            );

            this.objects.forEach(
                (object) => {
                    if(object.update){
                        object.update();
                    }
                }
            );


            this.renderer.render(
                this.scene,
                this.camera
            );


        };


        animate();


    }


}


export default GameLoop;