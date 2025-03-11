const cards = [
    {
        cost: 100,
        value: null,
        ability: 'Remove the lowest value card from your deck'
    },
    {
        cost: 150,
        value: null,
        ability: 'Gain 1 movement per turn'
    },
    {
        cost: 100,
        value: null,
        ability: 'Upgrade one card in your deck'
    },
    {
        cost: 200,
        value: null,
        ability: 'Add an 11 to your deck'
    },
    {
        cost: 250,
        value: null,
        ability: 'Gain an extra life in The Last War'
    }
  ];
  
function showShop(){
for (let i = 0; i < cards.length; i++){
let shopCard = document.createElement('button');
let newParagraph = document.createElement('p');
let lastParagraph = document.createElement('p')
shopCard.classList.add('shop-card');
if (cards[i].value !== null){
    newParagraph.textContent = `Value: ${cards[i].value}`
} 
if (cards[i].ability !== null){
    lastParagraph.textContent = cards[i].ability
}
shopCard.textContent = `Cost: ${cards[i].cost}`;


shopCard.appendChild(newParagraph)
shopCard.appendChild(lastParagraph)
shop.appendChild(shopCard)
shopCard.addEventListener('click', () =>{
    if (playerTurn === 1){
        if (playerOneGold >= cards[i].cost){
            playerOneGold -= cards[i].cost 
            p1BankDiv.textContent = 'Total gold in bank: ' + playerOneGold;
            console.log('player 1 can buy this')
   
     
        if (i === 0){
        DeckOneArr.shift()
        createDeck(DeckOneArr,deckOne)
    } 
            if (i === 1){
                maxMoves += 1;        
    } 
                if (i === 2){
                   upgradeCard(DeckOneArr, deckOne)  
                }
                    if (i === 3){
                        DeckOneArr.push(11)
                        createDeck(DeckOneArr,deckOne)
                    }
                        if (i === 4){
                            p1Lives += 1;
                            warLives1.textContent = 'Lives for The Last War: ' + checkLives(1);
                        }
                    } else if (playerOneGold < cards[i].cost){
            console.log('player 1 doesnt have enough money')
     }
    } else if (playerTurn === 2){
        if (playerTwoGold >= cards[i].cost){
            playerTwoGold -= cards[i].cost
            p2BankDiv.textContent = 'Total gold in bank: ' + playerTwoGold;
            console.log('player 2 can buy this')
        
            if (i === 0){
                DeckTwoArr.shift();
                createDeck(DeckTwoArr,deckTwo);
            }
            if (i === 1){
                maxMoves2 += 1;
            }
                if (i === 2){
                    upgradeCard(DeckTwoArr, deckTwo)
                }
                    if (i === 3){
                        DeckTwoArr.push(11)
                        createDeck(DeckTwoArr,deckTwo)
                    }
                        if (i === 4){
                            p2Lives += 1;
                            warLives2.textContent = 'Lives for The Last War: ' + checkLives(2)
                        }
                    } else if(playerTwoGold < cards[i].cost)
                        console.log('player 2 doesnt have enough money')
            }
        })
    }
};


function upgradeCard(deckArray, deckElement) {
    while (deckElement.firstChild) {
      deckElement.removeChild(deckElement.firstChild);
    }
    for (let i = 0; i < deckArray.length; i++) {
      let deckContents = document.createElement('div');
      deckContents.addEventListener('click', ()=>{
        deckArray[i] += 1
        createDeck(deckArray,deckElement)
      })
      deckContents.style.cssText = "height: 50px; width: 50px;";
      deckContents.style.borderStyle = 'solid';
      deckContents.style.borderColor = 'black';
      deckContents.style.borderWidth = '1px';
      deckContents.style.margin = '2px';
      deckContents.style.display = 'flex';
      deckContents.style.justifyContent = 'center';
      deckContents.style.alignItems = 'center';
      deckContents.textContent = `${deckArray[i]}`;
      deckElement.appendChild(deckContents);
    }
  }