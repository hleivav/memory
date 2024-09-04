let score = 0; 
let comparingCards = [20,20];
let cardArray = [];
let pictureArray = ["ball", "beachvolleyball", "bikini", "coconut", "delfin", "glasses", "palm", "soccer", "towell", "umbrella"]
let cardStatusArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let clickedCardCounter = 0;

window.onload = function(){
    startTheGame();
}

function startTheGame(){
    for (i = 0; i<20; i++){
        let figure = document.createElement("div") ;//19 div skapas med objektet figure
        figure.id = i.toString(); // varje objekt får en id från 0 till 19
        figure.addEventListener("click", function(){//om man klickar på kortet anropas metoden 'ClickACard'
            CheckCard(figure.id);                  //Observera att klickEventet följer kortet under hela spelet och inte bara under 
        }) 
        document.getElementById("board").appendChild(figure);//när div har skapats, placeras dynamiskt på tavlan.
    }
    PlaceCards();//anropar metoden som fyller listan cardArray med siffror från 0 till 9 som upprepas max två gånger
}

function CheckCard(clickedCard){
    clickedCardCounter = clickedCardCounter + 1; 
    if (comparingCards[0] !=20){    //de här raderna kollar om det finns två kort som ska vändas.
        HideACard(comparingCards[0]);//först vänds dem.
        HideACard(comparingCards[1]);
        comparingCards[0] = 20; // sedan återställs deras värde i listan 
        comparingCards[1] = 20; 
    }
    let cardStatus = cardStatusArray[clickedCard];   // tar reda på statuset på kortet man har klickat på
    if (cardStatus == 0){                           // om status är 0 är kortet gömd och ska alltid vändas om
        ShowTheCard(clickedCard);                    // funktionen för att vända kortet anropas
        let openCard = cardStatusArray.indexOf(1);      // variabeln tar reda på om det finns ett annat kort som är öppet.
        if (openCard != -1){                        // om ett annat kort är öppet...
            CheckIfMatch(clickedCard, openCard);    // anropa en metod för att se om båda öppna kort matchar.
        } else {                                    // anars
            cardStatusArray[clickedCard] = 1;       // Ge kortet i listan status 1 för att visa att det kortet är öppet.
        }
    }
    console.log(cardStatusArray);
}

function CheckIfMatch(clickedCard, openCard){
    if (cardArray[clickedCard] == cardArray[openCard]){ //om korten matchar
        cardStatusArray[clickedCard] = 2;               //ändra status i listan till 2 på båda kort, vilket innebär löst 
        cardStatusArray[openCard] = 2;                  
    } else {                                            //annars
        
        cardStatusArray[clickedCard] = 0;               //ändra status i listan till 2 på båda kort, vilket innebär löst 
        cardStatusArray[openCard] = 0;       
        comparingCards[0] = clickedCard;
        comparingCards[1] = openCard;               // ändra status på båda till 0.
    }
}



function ShowTheCard(clickedCard){
    let selectedCard = document.getElementById(clickedCard);//Elementet som har klickats tilldelas en variabel
    document.getElementById("clicks").innerHTML =  "clicks: " + clickedCardCounter;// visar kortnummer på skärmen
    let currentPicture = './images/' + pictureArray[cardArray[clickedCard]] + ".jpeg";
    selectedCard.style.backgroundImage = "url(" + currentPicture + ")";//man kommeråt kortet med egenskapen style+bkgrimg.
}

function HideACard(cardToHide){
    console.log (cardToHide);
    let cardToReverse = document.getElementById(cardToHide);
    
    cardToReverse.style.backgroundImage = "url('./images/baksidan.jpeg')";
}

function PlaceCards(){
    while (cardArray.length < 20){
        randomNo = Math.floor(Math.random() * 20); 
        if (! cardArray.includes(randomNo)){
            cardArray.push(randomNo);
        }
    }
    for (i = 0; i < 20; i++){
        if (cardArray[i] > 9){
            cardArray[i] = cardArray[i] - 10;
        }
    }
}


