class Keyboard {
    constructor() {
        this.keys = {}; // Klavyeden basılan tuşları tutmak için bir nesne oluşturuyoruz

        window.addEventListener(
            "keydown",//tuşa basmak
            (event) => {
                this.keys[event.code] = true; //event.code hangi tuşa basıldığını söyler
            }
        );

        window.addEventListener(
            "keyup",//tuşu bırakmak
            (event) => {
                this.keys[event.code] = false;
            }
        );
    }

    isDown(key) { //bu tuşa basılıyor mu fonksiyonu 
        return this.keys[key] ;
    }

}

export default Keyboard;