/*
     _    _     ____  ___    ____  _   _   ____    _    ____ 
    / \  | |   / ___|/ _ \  |  _ \| | | | / ___|  / \  / ___|
   / _ \ | |  | |  _| | | | | | | | | | | \___ \ / _ \| |    
  / ___ \| |__| |_| | |_| | | |_| | |_| |  ___) / ___ \ |___ 
 /_/   \_\_____\____|\___/  |____/ \___/  |____/_/   \_\____|


 ****************************************************
Pour être sûrs de piocher le bon nombre de cartes, et qu'elles soient bien disponibles sous forme de paires,
nous allons générer un tableau des cartes, appellé sac, avec chaque carte qui sera ajouté deux fois.

Nous pourrons ensuite piocher dans ce sac de façon aléatoire, puis supprimer du sac la carte fraichement piochée afin de ne pas la tirer une deuxième fois.
 ****************************************************
                                                             
*/

class Bag {
    constructor(){
        this.lstCards = []; // La liste des cartes, le sac
    }

    fillBag(pPaires) { // Replissage du sac
        for(var i = 0;i < pPaires * 2;i++) {
            this.lstCards[i] = new Card(i % pPaires); // On remplit le sac avec deux fois chaque image grâce au modulo '%'
        }
        return this.lstCards;
    }

    removeBag(pCard) { // On supprime la carte pCard en parcourant le tableau à l'envers pour ne pas avoir de décallage d'index lors de la supression
        for(var i = this.lstCards.length; i >= 0; i--) {
            if(pCard == i) {
                this.lstCards.splice(i,1); // La suppression effective
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


 ****************************************************
 Quelques fonctions de "Qaulity of Life" pour nous simplifier un peu la vie
 ****************************************************
                                                                                                                  
*/


function rnd(min, max) { // Une simple fonction qui renvoi un nombre entier aléatoire dans une fourchette de valeurs passées en paramètres
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

