/*
   ___  ____ _____ ___ ___  _   _ ____  
  / _ \|  _ \_   _|_ _/ _ \| \ | / ___| 
 | | | | |_) || |  | | | | |  \| \___ \ 
 | |_| |  __/ | |  | | |_| | |\  |___) |
  \___/|_|    |_| |___\___/|_| \_|____/ 
*/

const paires = 18; // Nombre de paires à trouver (donc cartes = paires * 2)
const maxTime = 180; // Temps pour résoudre le Memory
var currentTime = maxTime; // Initialisation du compteur de temps
const timeToCheck = 1; // Temps de regard sur les paires, en milliseconde

/*
  __  __    _    ___ _   _ 
 |  \/  |  / \  |_ _| \ | |
 | |\/| | / _ \  | ||  \| |
 | |  | |/ ___ \ | || |\  |
 |_|  |_/_/   \_\___|_| \_|
*/

const grille = document.querySelector('.grille');
const timerBar = document.querySelector('.timer');
const timerText = document.querySelector('.timerValue');
const timerBarWidth = timerBar.clientWidth;

const bag = new Bag();

var pairesTrouvees = 0;

var canPlay = true; // Booléen pour savoir si le joueur peut encore retourner des cartes (victoire ou défaite)

var Cards = []; // Les cartes actuellement sur le plateau, rangées dans leur ordre d'apparition
var selectedCards = []; // Les cartes actuellement sélectionnées


var image = new Image();
image.src = "./assets/images/cards.png"; // L'object image est un ensemble de plus petites images, "découpées" lors de la création des objets cartes

image.onload = function() { // Quand l'image des cartes est chargée, le script se lance

    bag.fillBag(paires); // Génération du sac dans lequel on va piocher les cartes aléatoirement

    for(var i = 0; i < paires * 2;i++) {

        // Création des emplacements ou seront affichées les cartes
        var card = document.createElement('canvas');
        card.setAttribute('width',100);
        card.setAttribute('height',100);

        // On ajoute un attribut perso pour identifier chaque canvas par l'identifiant de la carte
        card.setAttribute('card',i);

        // On défini le contexte pour pouvoir dessiner dans chaque canvas 
        var ctx = card.getContext('2d'); 

        // On génère un numéro aléatoire pour piocher la carte correspondante dans le sac
        var cardId = rnd(0,bag.lstCards.length-1);
       
        // On ajoute au jeu la carte nouvellement tirée du sac
        Cards.push(bag.lstCards[cardId]);
        
        // La carte reçoit son contexte pour qu'elle puisse se dessiner elle-même
        Cards[i].setCtx(ctx);

        // La carte se dessine
        Cards[i].drawCard(image);

        // On supprime cette carte du sac pour ne pas la repiocher une nouvelle fois
        bag.removeBag(cardId);

        // On ajoute le canvas à notre page
        grille.appendChild(card);

        // Création de l'événement "click" sur chaque canvas(carte) pour pouvoir appeller la fonction "flip" et ainsi retourner la carte
        card.addEventListener('click',flip);
    }  
    // Démmarrage du "tick" qui mettra à jour régulièrement le timer
    requestAnimationFrame(tick);
}

function flip() {
    if(canPlay) { // Si le joueur peut retourner la carte
        // On récupère la carte dans la liste selon son attribut 'card' pour faire nos opérations dessus
        var card = Cards[this.getAttribute('card')];
        // Si il y a moins de deux cartes sélectionnées, on peut en sélectonner une
        if(selectedCards.length !=2) {
            // Si la carte peut-être retournée
            if(card.getState() == 0 ) {
                // On l'ajoute a la liste des cartes sélectionnées
                selectedCards.push(this.getAttribute('card'));
                
                // On passe l'état de la carte à "retournée"
                card.setState(1);

                // On redessine la carte retournée
                card.drawCard(image);

                // Si il y a deux cartes retournées, on peut les comparer
                if(selectedCards.length == 2){
                    if(Cards[selectedCards[0]].getFruit() == Cards[selectedCards[1]].getFruit()) { // Les cartes sont identiques
                        // On passe l'état des cartes à "validées"
                        Cards[selectedCards[0]].setState(2);
                        Cards[selectedCards[1]].setState(2);
                        // On incrémente le nombre de paires trouvées pour la condition de victoire
                        pairesTrouvees += 1;
                    }else { // Les cartes sont différentes
                        // On repasse les cartes en "non visible"
                        Cards[selectedCards[0]].setState(0);
                        Cards[selectedCards[1]].setState(0);
                    }
                    // Un chronomètre pour redessiner automatiquement les cartes
                    setTimeout(function clear() {
                        // On demande aux cartes sélectionnées de se redessiner
                        Cards[selectedCards[0]].drawCard();
                        Cards[selectedCards[1]].drawCard();
                        // On vide le tableau des cartes sélectionnées
                        selectedCards = [];
                    },
                    timeToCheck * 1000);

                    // Si le nombre de paires trouvées est égal au nombre total de paires, alors le joueur à gagné
                    if(pairesTrouvees == paires) {
                        canPlay = false;
                        // On appelle la fonction win() pour enregistrer le temps dans la base de données en lui passant le temps final
                        win(currentTime);
                    }
                }
            }
        }
    }
}


/*
  _____ ___ ____ _  __
 |_   _|_ _/ ___| |/ /
   | |  | | |   | ' / 
   | |  | | |___| . \ 
   |_| |___\____|_|\_\
                      
Cette fonction appellée automatiquement à chaque frame calculée par le navigateur (grâce à requestAnimationFrame)
permet de gérer le timer, et la fin du jeu en cas de dépassement du temps défini.
Pour prendre en compte toutes les configurations matérielles, nous devrions ajouter la gestion du DeltaTime (temps entre chaque frame calculée)
pour avoir un lissage des valeurs, peut importe les performances de la machine sur laquelle s'execute l'application
*/

function tick() {
    // Si le joueur peut jouer, on déroule le reste de la fonction
    if(canPlay) {
        if(currentTime <= 0) { // Le temps est dépassé, le jeu se termine par une défaite
            alert('Game Over')
            canPlay = false;
        }else { // Il reste du temps, le jeu continue 
            // On décrémente le currentTime
            currentTime -= 0.016 ; // 0.016 * 60fps est presque égal à 1 seconde, ici pour simplifier on ne prend pas en compte le DeltaTime

            // On modifie la taille de la barre et le texte du chronomètre
            timerBar.style.width = ((currentTime/maxTime)*timerBarWidth) + "px";
            timerText.innerHTML = Math.ceil(currentTime);
            // On rappelle la fonction dans laquelle nous nous trouvons
            requestAnimationFrame(tick);
        }
    }
}

/*
  _____ _   _ ____  _____ ____ ___ ____ _____ ____  _____ __  __ _____ _   _ _____   ____  _   _   _____ _____ __  __ ____  ____  
 | ____| \ | |  _ \| ____/ ___|_ _/ ___|_   _|  _ \| ____|  \/  | ____| \ | |_   _| |  _ \| | | | |_   _| ____|  \/  |  _ \/ ___| 
 |  _| |  \| | |_) |  _|| |  _ | |\___ \ | | | |_) |  _| | |\/| |  _| |  \| | | |   | | | | | | |   | | |  _| | |\/| | |_) \___ \ 
 | |___| |\  |  _ <| |__| |_| || | ___) || | |  _ <| |___| |  | | |___| |\  | | |   | |_| | |_| |   | | | |___| |  | |  __/ ___) |
 |_____|_| \_|_| \_\_____\____|___|____/ |_| |_| \_\_____|_|  |_|_____|_| \_| |_|   |____/ \___/    |_| |_____|_|  |_|_|   |____/ 
                                                                                                                                  
*/

function win(pTime) {
    alert('Bravo !');
    // Pour enregistrer le temps passé à résoudre le jeu, on soustrait le temps écoulé en jeu au temps total
    var setTime = maxTime - pTime;

    // On envoit le temps à enregistrer au script php chargé de l'enregistrement via une méthode POST
    jQuery.ajax({
        type: "POST",
        url: './libs/php/db.php',
        data: {function: 'setNewTime', args: [setTime]}, 
            success:function(data) {
            //alert(data); 
        }
    });
}