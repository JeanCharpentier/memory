/*
   ____    _    ____ _____ _____ 
  / ___|  / \  |  _ \_   _| ____|
 | |     / _ \ | |_) || | |  _|  
 | |___ / ___ \|  _ < | | | |___ 
  \____/_/   \_\_| \_\|_| |_____|
                                 
****************************************************
On crée les cartes sous forme d'objet pour gérer leur affichage, leur état et la "couleur" de chacune.
Afin de limiter les chargements d'images, le choix à été fait d'utiliser une seule spritesheet découpée dans la méthode drawImage
et d'afficher les cartes sous forme de canvas et non en tant qu'image.
****************************************************
*/

class Card {
    constructor(pFruit) {
        this.ctx;
        this.fruit = pFruit; // Le "fruit" est défini sous forme d'entier lors de la création de la carte par le "sac"
        this.state = 0;
    }

    drawCard(pImage) {
        switch(this.state) { // Selon l'état de la carte, on la dessine différement
            case 0: // Paire non trouvée
                this.ctx.fillStyle = "#8F5350"; // Définision de la couleur qui va être dessinée
                this.ctx.fillRect(0,0,100,100); // Remplissage du canvas avec la couleur choisie
                break;
            case 1:// La carte retournée                
                // On dessine l'image en la découpant virtuellement selon le numéro de fruit de la carte
                this.ctx.drawImage(pImage, 0, this.fruit * 100, 100, 100, 0, 0, 100, 100);
                break;
            case 2:// Paire trouvée
                this.ctx.fillStyle = "#DBCFE6"; // Définision de la couleur qui va être dessinée
                this.ctx.fillRect(0,0,100,100); // Remplissage du canvas avec la couleur choisie
                break;
            default:
                break;
        }     
    }

    // On peut lire le fruit de chaque carte depuis le main.js
    getFruit() {
        return this.fruit;
    }
    
    // On renseigne le contexte de chaque carte une fois que celle-ci est créée dans la page HTML
    setCtx(pCtx) { 
        this.ctx = pCtx;
    }

    // On modifie l'état de la carte lorsqu'on la retourne
    setState(pState) {
        this.state = pState;
    }

    // On regarde l'état de la carte pour savoir si elle peut être retournée ou non
    getState() {
        return this.state;
    }
}