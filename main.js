const grille = document.querySelector('.grille');
const timerBar = document.querySelector('.timer');
const timerText = document.querySelector('.timerValue');
const timerBarWidth = timerBar.clientWidth;

const bag = new Bag();
const paires = 18;
var pairesTrouvees = 0

const maxTime = 180;
var currentTime = maxTime;
var canPlay = true;

const timeToCheck = 1; // Temps de regard sur les paires

var selectedCards = [];
var Cards = [];

var image = new Image();
image.src = "./assets/images/cards.png";

var blankCard = new Image();
blankCard.src = "./assets/images/blank.png";

image.onload = function() {

    bag.fillBag(paires); // Génération du sac dans lequel on va piocher les cartes aléatoirement

    for(var i = 0; i < paires * 2;i++) {
        var card = document.createElement('canvas');
        card.setAttribute('width',100);
        card.setAttribute('height',100);
        
        card.addEventListener('click',flip);

        var cardId = rnd(0,bag.lstCards.length-1); // Numéro de la carte dans le sac

        
        var ctx = card.getContext('2d'); // On défini notre context 2D depuis notre carte 'card'
       
        Cards.push(bag.lstCards[cardId]);
        card.setAttribute('card',i);
        Cards[i].setCtx(ctx);
        Cards[i].drawCard(image);
        bag.removeBag(cardId); // On supprime cette carte du sac pour ne pas la repiocher une nouvlle fois

        grille.appendChild(card); // On ajoute le canvas à notre page
    }  
    requestAnimationFrame(tick);
}

function flip() {
    if(canPlay) {
        var card = Cards[this.getAttribute('card')];
        if(selectedCards.length !=2) {
            if(card.getState() < 2) {
                selectedCards.push(this.getAttribute('card'));
                card.setState(1);
                card.drawCard(image)
                if(selectedCards.length == 2){
                    if(Cards[selectedCards[0]].getFruit() == Cards[selectedCards[1]].getFruit()) { // Les cartes sont identiques
                        Cards[selectedCards[0]].setState(2);
                        Cards[selectedCards[1]].setState(2);
                        pairesTrouvees += 1;
                    }else { // Les cartes sont différentes
                        Cards[selectedCards[0]].setState(0);
                        Cards[selectedCards[1]].setState(0);
                    }
                    setTimeout(function clear() {
                        Cards[selectedCards[0]].drawCard();
                        Cards[selectedCards[1]].drawCard();
                        selectedCards = [];
                    },
                    timeToCheck * 1000);
                    if(pairesTrouvees == paires) {
                        win(currentTime);
                    }
                }
            }
        }
    }
}

function tick() {
    if(canPlay) {
        if(currentTime <= 0) {
            console.warn('GAME OVER !');
            canPlay = false;
        }else {
            requestAnimationFrame(tick);
            currentTime -= 0.016 ;
            timerBar.style.width = ((currentTime/maxTime)*timerBarWidth) + "px";
            timerText.innerHTML = Math.ceil(currentTime);
    
            //$(".timer").progress((currentTime/maxTime)*timerBarWidth);
        }
    }
}

/*(function ( $ ) {
    $.fn.progress = function(pPourcent) {
      var percent = pPourcent;
      this.css("width", percent+"");
      console.log(percent);
    };
}( jQuery ));*/

function win(pTime) {
    console.warn('BRAVO !');
    canPlay = false;
    var setTime = maxTime - pTime;
    jQuery.ajax({
        type: "POST",
        url: './libs/php/db.php',
        data: {function: 'setNewTime', args: [setTime]}, 
            success:function(data) {
            //alert(data); 
        }
    });
}