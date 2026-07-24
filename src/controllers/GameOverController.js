class GameOverController {


    constructor(ship){

        this.ship = ship;

    }


    update(){


        if(this.ship.isGameOver){


            document
            .getElementById("game-over")
            .style.display = "flex";


        }


    }


}


export default GameOverController;