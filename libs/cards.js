class Card {
    constructor(pFruit) {
        this.x = 0;
        this.y = 0;  
        this.ctx;
        this.fruit = pFruit;
        this.state = 0;
    }

    drawCard(pImage) {
        switch(this.state) {
            case 0:
                // Paire non trouvée
                this.ctx.fillStyle = "blue";
                this.ctx.fillRect(10,10,90,90);
                break;
            case 1:
                // Carte retournée
                this.ctx.drawImage(pImage, 0, this.fruit * 100, 100, 100, 0, 0, 100, 100);
                break;
            case 2:
                // Paire trouvée
                this.ctx.fillStyle = "orange";
                this.ctx.fillRect(0,0,100,100);
                break;
            default:
                break;
        }     
    }

    getFruit() {
        return this.fruit;
    }
    
    setCtx(pCtx) {
        this.ctx = pCtx;
    }

    setState(pState) {
        this.state = pState;
    }

    getState() {
        return this.state;
    }
}