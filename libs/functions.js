/*
     _    _     ____  ___    ____  _   _   ____    _    ____ 
    / \  | |   / ___|/ _ \  |  _ \| | | | / ___|  / \  / ___|
   / _ \ | |  | |  _| | | | | | | | | | | \___ \ / _ \| |    
  / ___ \| |__| |_| | |_| | | |_| | |_| |  ___) / ___ \ |___ 
 /_/   \_\_____\____|\___/  |____/ \___/  |____/_/   \_\____|
                                                             
*/

class Bag {
    constructor(){
        this.lstCards = [];
    }

    fillBag(pPaires) { //Algo du Sac pour être sûr d'avoir le bon nombre de paires
        for(var i = 0;i < pPaires * 2;i++) {
            this.lstCards[i] = new Card(i % pPaires); // On remplit le sac avec deux fois chaque image grâce au modulo '%'
        }
        return this.lstCards;
    }

    removeBag(pCard) {
        for(var i = this.lstCards.length; i >= 0; i--) {
            if(pCard == i) {
                this.lstCards.splice(i,1);
            }
        }
    }
}


/*
  _____ ___  _   _  ____ _____ ___ ___  _   _ ____    _   _ _____ ___ _     ___ _____  _    ___ ____  _____ ____  
 |  ___/ _ \| \ | |/ ___|_   _|_ _/ _ \| \ | / ___|  | | | |_   _|_ _| |   |_ _|_   _|/ \  |_ _|  _ \| ____/ ___| 
 | |_ | | | |  \| | |     | |  | | | | |  \| \___ \  | | | | | |  | || |    | |  | | / _ \  | || |_) |  _| \___ \ 
 |  _|| |_| | |\  | |___  | |  | | |_| | |\  |___) | | |_| | | |  | || |___ | |  | |/ ___ \ | ||  _ <| |___ ___) |
 |_|   \___/|_| \_|\____| |_| |___\___/|_| \_|____/   \___/  |_| |___|_____|___| |_/_/   \_\___|_| \_\_____|____/ 
                                                                                                                  
*/


function rnd(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

