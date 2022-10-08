/*
   ____    _    ____ _____ _____ 
  / ___|  / \  |  _ \_   _| ____|
 | |     / _ \ | |_) || | |  _|  
 | |___ / ___ \|  _ < | | | |___ 
  \____/_/   \_\_| \_\|_| |_____|
                                 
****************************************************
On crée les cartes sous forme d'objet pour gérer leur affichage, leur état et la "couleur" de chacune.
Afin de limiter les chargements d'images, le choix à été fait d'utiliser une seule spritesheet découpée dans la méthode drawImage et d'afficher les cartes sous forme de canvas et non en tant qu'image.
****************************************************
*/

class Card {
    constructor(pFruit) {
        this.x = 0;
        this.y = 0;  
        this.ctx;
        this.fruit = pFruit; // Le "fruit" est défini lors de la création de la carte par le "sac"
        this.state = 0;
    }

    drawCard(pImage) {
        switch(this.state) {
            case 0:
                // Paire non trouvée
                this.ctx.fillStyle = "blue";
                this.ctx.fillRect(2,2,98,98);
                break;
            case 1:
                // La carte retournée
                this.ctx.drawImage(pImage, 0, this.fruit * 100, 100, 100, 0, 0, 100, 100);
                break;
            case 2:
                // Paire trouvée
                this.ctx.fillStyle = "orange";
                this.ctx.fillRect(2,2,98,98);
                break;
            default:
                break;
        }     
    }

    getFruit() { // On peut lire le fruit de chaque carte depuis le main.js
        return this.fruit;
    }
    
    setCtx(pCtx) { // On renseigne le contexte de chaque carte une fois que celle-ci est créée dans la page HTML
        this.ctx = pCtx;
    }

    setState(pState) { // On modifie l'état de la carte lorsqu'on la retourne
        this.state = pState;
    }

    getState() { // On regarde l'état de la carte pour savoir si elle peut être retournée ou non
        return this.state;
    }
}