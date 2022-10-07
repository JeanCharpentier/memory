const grille = document.querySelector(".grille");

var image = new Image();
image.src = "./assets/images/cards.png"; 


const bag = new Bag();
const paires = 18;

function init(){
    bag.fillBag(paires);
    for(var i = 0; i < 36;i++) {
        var card = document.createElement("canvas");
        //card.setAttribute("id", i);
        card.setAttribute("width",100);
        card.setAttribute("height",100);

        var ctx = card.getContext("2d");

        var cardId = rnd(0,bag.lstCards.length-1);

        bag.lstCards[cardId].drawCard(ctx,image);


        console.log(cardId);
        bag.removeBag(cardId);

        grille.appendChild(card);
    }

}
image.onload = function() {
    bag.fillBag(paires);
    for(var i = 0; i < 36;i++) {
        var card = document.createElement("canvas");
        //card.setAttribute("id", i);
        card.setAttribute("width",100);
        card.setAttribute("height",100);

        var ctx = card.getContext("2d");

        var cardId = rnd(0,bag.lstCards.length-1);

        bag.lstCards[cardId].drawCard(ctx,image);


        console.log(cardId);
        bag.removeBag(cardId);

        grille.appendChild(card);
    }
}
//init();