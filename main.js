const grille = document.querySelector(".grille");
const timerBar = document.querySelector(".timer");

const bag = new Bag();
const paires = 9;

const maxTime = 10;
var currentTime = maxTime;

var selectedCards = [];
var Cards = [];

var image = new Image();
image.src = "./assets/images/cards.png"; 

image.onload = function() {

    bag.fillBag(paires); // Génération du sac dans lequel on va piocher les cartes aléatoirement

    for(var i = 0; i < paires * 2;i++) {
        var card = document.createElement("canvas");
        card.setAttribute("width",100);
        card.setAttribute("height",100);
        
        card.addEventListener("click",flip);

        var cardId = rnd(0,bag.lstCards.length-1); // Numéro de la carte dans le sac

        
        var ctx = card.getContext("2d"); // On défini notre context 2D depuis notre carte 'card'
       
        Cards.push(bag.lstCards[cardId]);
        card.setAttribute("card",i);
        Cards[i].setCtx(ctx);
        Cards[i].drawCard(image);
        bag.removeBag(cardId); // On supprime cette carte du sac pour ne pas la repiocher une nouvlle fois

        grille.appendChild(card); // On ajoute le canvas à notre page
    }

    requestAnimationFrame(tick);
}


function flip() {
    var card = Cards[this.getAttribute("card")];
    if(selectedCards.length !=2) {
        if(card.getState() < 2) {
            selectedCards.push(this.getAttribute("card"));
            card.setState(1);
            card.drawCard(image)
            if(selectedCards.length == 2){
                if(Cards[selectedCards[0]].getFruit() == Cards[selectedCards[1]].getFruit()) {
                    //alert("GG !");
                    Cards[selectedCards[0]].setState(2);
                    Cards[selectedCards[1]].setState(2);
                }else {
                    Cards[selectedCards[0]].setState(0);
                    Cards[selectedCards[1]].setState(0);
                }
                setTimeout(function clear() {
                    Cards[selectedCards[0]].drawCard();
                    Cards[selectedCards[1]].drawCard();
                    selectedCards = [];
                },
                2000);
            }
        }
    }
}

function tick() {
    if(currentTime <= 0) {
        console.warn("GAME OVER !");
    }else {
        requestAnimationFrame(tick);
        currentTime -= 0.016 ;
        console.log(timerBar.clientWidth);
        timerBar.style.width = ((maxTime*currentTime)/100)*600 + "px";
    }
}