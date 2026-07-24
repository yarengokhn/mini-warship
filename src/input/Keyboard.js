class Keyboard {
    constructor() {
        this.keys = {};

        window.addEventListener(
            "keydown",
            (event) => {
                this.keys[event.code] = true;
            }
        );

        window.addEventListener(
            "keyup",
            (event) => {
                this.keys[event.code] = false;
            }
        );
    }

    isDown(key) {
        return this.keys[key] ;
    }

}

export default Keyboard;