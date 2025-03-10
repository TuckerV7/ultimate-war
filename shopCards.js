const cards = [
    {
        cost: 50,
        value: null,
        ability: 'Remove a card from your deck'
    },
    {
        cost: 110,
        value: 11,
        ability: null
    },
    {
        cost: 60,
        value: 6,
        ability: null
    },
    {
        cost: 70,
        value: 7,
        ability: null
    },
    {
        cost: 80,
        value: 8,
        ability: null
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
    lastParagraph.textContent = `Ability: ${cards[i].ability}`
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
    } else if (playerOneGold < cards[i].cost){
        console.log('player 1 doesnt have enough money')
    }
    
    } else if (playerTurn === 2){
        if (playerTwoGold >= cards[i].cost){
            playerTwoGold -= cards[i].cost
            p2BankDiv.textContent = 'Total gold in bank: ' + playerTwoGold;
            console.log('player 2 can buy this')
        } else if(playerTwoGold < cards[i].cost)
            console.log('player 2 doesnt have enough money')
        }
    
        })
    }
};


  