class Card {
    constructor(pFruit) {
        this.x = 0;
        this.y = 0;  
        this.fruit = pFruit; 
    }

    drawCard(pCtx,pImage) {
            pCtx.drawImage(pImage, 0, this.fruit * 100, 100, 100, 0, 0, 100, 100);
    }
}