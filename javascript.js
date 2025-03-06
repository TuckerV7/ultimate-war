const container = document.querySelector('.container');
const center = document.querySelector('.center');
let playerTurn = 1;
let moveCount = 0;
let maxMoves = 5;
let activeFunction = null;
let p1Area;
let p2Area;
let newNumber;
let popup = document.getElementById("popup");
let popupMessage = document.querySelector('.popup-message')
let acceptPopup = document.getElementById("accept");
let declinePopup = document.getElementById("decline");
let shopPopup = document.getElementById('shop-popup');
let shopMessage = document.querySelector('.shop-message');
let leaveShop = document.getElementById('leave')
let shopContent = document.querySelector('.shop-content')
let flipCard = document.getElementById('next-card')
let warContent = document.querySelector('.war-content')
let warContentTop = document.querySelector('.war-content-top')
let warContentCenter = document.querySelector('.war-content-center')
let warContentBottom = document.querySelector('.war-content-bottom')
let shopTile;
let specialTiles = [];
let p1Bank;
let p2Bank;
let startButton = document.getElementById('startButton');
let startScreen = document.getElementById('startScreen');
let gameElements = document.querySelectorAll('.gameElement'); 

//starting screen
startButton.addEventListener('click', function() {
            startScreen.style.display = 'none'; 
        });

// make special card drops on random tiles
function getRandomTile() {
  let num = Math.floor(Math.random() * 400) + 1;
  if ((num === 161) || (num === 180)){
    console.log('Cannot start on special tile')
  }else {
    return num;
  }
}
function getRandomNumber() {
  return Math.floor(Math.random() * 10) + 1;

}

//makes 6 special tiles
for (let i = 0; i<6; i++){
  // if ( i === 0){
  //   shopTile = getRandomTile();
  //   console.log('shop tile: '+shopTile)

  specialTiles.push(getRandomTile());
} 


//Make the board
for (let i = 1; i < 401; i++) {
  
  let board = document.createElement('div');
  board.classList.add(`cell${i}`);
  board.style.borderStyle = 'solid';
  board.style.borderColor = 'black';
  board.style.borderWidth = '.5px';
  board.style.height = '5%';
  board.style.width = '5%';
  board.style.boxSizing = 'border-box';
  // if (i === shopTile){
  //   board.classList.add('shop')}
  if (specialTiles.includes(i)){
    board.classList.add('special')
  }
 
  //board.textContent = `${i}`;
  container.appendChild(board);
}

//count players area
function countArea(className) {
  let divs = document.querySelectorAll("div"); 
  let count = 0;

  divs.forEach(div => {
    if (div.classList.contains(className)) {
      count++;
    }
  });

  return count;
}
// players money
let p1gold = document.querySelector('.p1gold')
let p2gold = document.querySelector('.p2gold')
let p1GoldIncome = document.createElement('div')
let p2GoldIncome = document.createElement('div')
p1GoldIncome.textContent = 'Gold income per turn: ' + countArea('playerOneArea');
p2GoldIncome.textContent = 'Gold income per turn: ' + countArea('playerOneArea');



//initialize playerOne starting points
let cellNumOne = 161;
let playerOnePosition = document.querySelector(`.cell${cellNumOne}`);
playerOnePosition.classList.toggle('playerOnePosition');



//Move player one position when arrow keys are pressed
let playerOneUI = document.querySelector('.p1-moves');
let moveCounter = document.createElement('div');
moveCounter.textContent = 'Moves spent: 0 out of ' + maxMoves;
let Player1Area = document.createElement('div');
Player1Area.style.margin = '5px';
Player1Area.textContent = 'Total area: 0 tiles';


function PlayerOneTurn() {
  let moveCount = 0; // Track key presses
  

  function handleKeyPress(event) {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
      moveCount++;
      moveCounter.textContent = 'Moves spent: ' + moveCount + ' out of ' + maxMoves;
      playerOnePosition.classList.add('playerOneArea');
      playerOnePosition.classList.remove('playerTwoArea');

    }
    if (moveCount <= maxMoves) {
      if (event.key === "ArrowUp") {
        if (cellNumOne > 20) {
          playerOnePosition.classList.toggle('playerOnePosition');
          cellNumOne -= 20;
          playerOnePosition = document.querySelector(`.cell${cellNumOne}`);
          playerOnePosition.classList.toggle('playerOnePosition');
          playerOnePosition.classList.add('playerOneArea');
          playerOnePosition.classList.remove('playerTwoArea');
        } else {
          console.log('top border');
        }
      } else if (event.key === "ArrowDown") {
        if (cellNumOne < 381) {
          playerOnePosition.classList.toggle('playerOnePosition');
          cellNumOne += 20;
          playerOnePosition = document.querySelector(`.cell${cellNumOne}`);
          playerOnePosition.classList.toggle('playerOnePosition');
          playerOnePosition.classList.add('playerOneArea');
          playerOnePosition.classList.remove('playerTwoArea');
        } else {
          console.log('bottom border');
        }
      } else if (event.key === "ArrowLeft") {
        if ((cellNumOne - 1) % 20 === 0) {
          console.log('left border');
        } else {
          playerOnePosition.classList.toggle('playerOnePosition');
          cellNumOne -= 1;
          playerOnePosition = document.querySelector(`.cell${cellNumOne}`);
          playerOnePosition.classList.toggle('playerOnePosition');
          playerOnePosition.classList.add('playerOneArea');
          playerOnePosition.classList.remove('playerTwoArea');
        }
      } else if (event.key === "ArrowRight") {
        if (cellNumOne % 20 === 0) {
          console.log('right border');
        } else {
          playerOnePosition.classList.toggle('playerOnePosition');
          cellNumOne += 1;
          playerOnePosition = document.querySelector(`.cell${cellNumOne}`);
          playerOnePosition.classList.toggle('playerOnePosition');
          playerOnePosition.classList.add('playerOneArea');
          playerOnePosition.classList.remove('playerTwoArea');
        }
      }
    }
    p1Area = countArea("playerOneArea");
    Player1Area.textContent = 'Total area: ' + p1Area + ' tiles';  
    p2Area = countArea("playerTwoArea");
    Player2Area.textContent = 'Total area: ' + p2Area + ' tiles';

    p1GoldIncome.textContent = 'Gold income per turn: ' + countArea('playerOneArea');
    p2GoldIncome.textContent = 'Gold income per turn: ' + countArea('playerTwoArea');
    
    checkPlayerPosition(playerOnePosition)
    
    if (moveCount >= maxMoves) {
      document.removeEventListener("keydown", handleKeyPress);
      turnbtn.classList.toggle('hidden');
      turnbtn.addEventListener('click', handleTurnEvent);
      document.addEventListener('keydown', handleTurnEvent);
    }
  }

  document.addEventListener("keydown", handleKeyPress);
}

let playerTwoUI = document.querySelector('.p2-moves');
let moveCounterTwo = document.createElement('div');
moveCounterTwo.textContent = 'Moves spent: 0 out of ' + maxMoves;
let Player2Area = document.createElement('div');
Player2Area.style.margin = '5px';
Player2Area.textContent = 'Total area: 0 tiles';
//initialize playerTwo starting points
let cellNumTwo = 180;
let playerTwoPosition = document.querySelector(`.cell${cellNumTwo}`);
playerTwoPosition.classList.toggle('playerTwoPosition');
moveCounterTwo.textContent = 'Moves spent: 0 out of ' + maxMoves;



function playerTwoTurn() {
  let moveCount = 0; // Track key presses
  function handleKeyPressTwo(event) {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
      moveCount++;
      moveCounterTwo.textContent = 'Moves spent: ' + moveCount + ' out of ' + maxMoves;
      playerTwoPosition.classList.add('playerTwoArea');
      playerTwoPosition.classList.remove('playerOneArea')

    }

    if (moveCount <= maxMoves) {
      if (event.key === "ArrowUp") {
        if (cellNumTwo > 20) {
          playerTwoPosition.classList.toggle('playerTwoPosition');
          cellNumTwo -= 20;
          playerTwoPosition = document.querySelector(`.cell${cellNumTwo}`);
          playerTwoPosition.classList.toggle('playerTwoPosition');
          playerTwoPosition.classList.add('playerTwoArea');
          playerTwoPosition.classList.remove('playerOneArea')
        } else {
          console.log('top border');
        }
      } else if (event.key === "ArrowDown") {
        if (cellNumTwo < 381) {
          playerTwoPosition.classList.toggle('playerTwoPosition');
          cellNumTwo += 20;
          playerTwoPosition = document.querySelector(`.cell${cellNumTwo}`);
          playerTwoPosition.classList.toggle('playerTwoPosition');
          playerTwoPosition.classList.add('playerTwoArea');
          playerTwoPosition.classList.remove('playerOneArea')
        } else {
          console.log('bottom border');
        }
      } else if (event.key === "ArrowLeft") {
        if ((cellNumTwo - 1) % 20 === 0) {
          console.log('left border');
        } else {
          playerTwoPosition.classList.toggle('playerTwoPosition');
          cellNumTwo -= 1;
          playerTwoPosition = document.querySelector(`.cell${cellNumTwo}`);
          playerTwoPosition.classList.toggle('playerTwoPosition');
          playerTwoPosition.classList.add('playerTwoArea');
          playerTwoPosition.classList.remove('playerOneArea')
        }
      } else if (event.key === "ArrowRight") {
        if (cellNumTwo % 20 === 0) {
          console.log('right border');
        } else {
          playerTwoPosition.classList.toggle('playerTwoPosition');
          cellNumTwo += 1;
          playerTwoPosition = document.querySelector(`.cell${cellNumTwo}`);
          playerTwoPosition.classList.toggle('playerTwoPosition');
          playerTwoPosition.classList.add('playerTwoArea');
          playerTwoPosition.classList.remove('playerOneArea')
        }
      }
    }
    checkPlayerPosition(playerTwoPosition);

    p2Area = countArea("playerTwoArea");
    Player2Area.textContent = 'Total area: ' + p2Area + ' tiles';
    p1Area = countArea("playerOneArea");
    Player1Area.textContent = 'Total area: ' + p1Area + ' tiles';
    
    p1GoldIncome.textContent = 'Gold income per turn: ' + p1Area;
    p2GoldIncome.textContent = 'Gold income per turn: ' + p2Area;

   
    // Stop listening after maxMove key presses
    if (moveCount >= maxMoves) {
      document.removeEventListener("keydown", handleKeyPressTwo);
      turnbtn.classList.toggle('hidden');
      turnbtn.addEventListener('click', handleTurnEvent);
      document.addEventListener('keydown', handleTurnEvent);
    }
  }

  document.addEventListener("keydown", handleKeyPressTwo);
}

//switch turns
let turnbtn = document.createElement('button');
turnbtn.classList.add('hidden');
turnbtn.style.height = '100px';
turnbtn.style.width = '200px';
turnbtn.style.backgroundColor = 'lightgreen';
turnbtn.textContent = "Click or press spacebar to begin next player's turn";

let p1BankContainer = document.querySelector('.p1-bank')
let p2BankContainer = document.querySelector('.p2-bank')
let p1BankDiv = document.createElement('div');
let p2BankDiv = document.createElement('div');
p1BankDiv.textContent = 'Total gold in bank: 0'
p2BankDiv.textContent = 'Total gold in bank: 0'



function handleTurnEvent(event) {
  // Check if the event is a click or a spacebar press
  if (event.type === "click" || (event.type === "keydown" && event.key === " ")) {
    if (playerTurn === 1) {
      playerTurn = 2;
      p2BankDiv.textContent = 'Total gold in bank: ' + totalGold(2);
      turnbtn.classList.toggle('hidden');
      turnUI.textContent = 'Player ' + playerTurn + "'s turn";
      moveCounterTwo.textContent = 'Moves spent: 0 out of ' + maxMoves;
      turnbtn.removeEventListener('click', handleTurnEvent);
      document.removeEventListener('keydown', handleTurnEvent);
      playerTwoTurn();
    } else if (playerTurn === 2) {
      playerTurn = 1;
      p1BankDiv.textContent = 'Total gold in bank: ' + totalGold(1);
      turnbtn.classList.toggle('hidden');
      turnUI.textContent = 'Player ' + playerTurn + "'s turn";
      moveCounter.textContent = 'Moves spent: 0 out of ' + maxMoves;
      turnbtn.removeEventListener('click', handleTurnEvent);
      document.removeEventListener('keydown', handleTurnEvent);
      PlayerOneTurn();
    }
  }
}

// Add event listeners for both click and spacebar

function switchTurn() {
if (playerTurn === 1){
  playerTurn = 2;
} else if (playerTurn === 2){
  playerTurn = 1
}
  turnbtn.classList.toggle('hidden');
  turnbtn.addEventListener('click', handleTurnEvent);
  document.addEventListener('keydown', handleTurnEvent);

}

PlayerOneTurn();


let turnUI = document.createElement('div');
turnUI.textContent = 'Player ' + playerTurn + "'s turn";
turnUI.style.fontSize = 'larger';

center.appendChild(turnUI);


playerOneUI.appendChild(moveCounter);
playerOneUI.appendChild(Player1Area);
playerTwoUI.appendChild(moveCounterTwo);
playerTwoUI.appendChild(Player2Area);
center.appendChild(turnbtn);

 //player's gold
let playerOneGold = 0;
let playerTwoGold = 0;


function totalGold(player){
if (player === 1){
 playerOneGold += countArea('playerOneArea');
 return playerOneGold;
} else if (player === 2){
  playerTwoGold += countArea('playerTwoArea')
  return playerTwoGold;
}
}

//Player's decks

// Function to create and append deck divs
function createDeck(deckArray, deckElement) {
  while (deckElement.firstChild) {
    deckElement.removeChild(deckElement.firstChild);
  }
  for (let i = 0; i < deckArray.length; i++) {
    let deckContents = document.createElement('div');
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


// Player One deck
let DeckOneArr = [1, 2, 3, 4];
let deckOne = document.querySelector('.p1-deck');
createDeck(DeckOneArr, deckOne);

// Player Two deck
let DeckTwoArr = [1, 2, 3, 4];
let deckTwo = document.querySelector('.p2-deck');
createDeck(DeckTwoArr, deckTwo);

//card shop
// let items = [
//   { name: "Sword", description: "A sharp blade for battle." },
//   { name: "Shield", description: "Protects you from attacks." },
//   { name: "Potion", description: "Heals your wounds." },
//   { name: "Magic Scroll", description: "Contains ancient spells." },
//   { name: "Gold", description: "Shiny and valuable!" },
//   { name: "Bow", description: "A ranged weapon for skilled archers." },
//   { name: "Key", description: "Opens locked doors." },
//   { name: "Ring", description: "Mysterious and powerful." }
// ];

// function getRandomItems(arr, num) {
//   let shuffled = arr.sort(() => 0.5 - Math.random()); // Shuffle the array
//   return shuffled.slice(0, num); // Take the first `num` items
// }

// function shopContents(){
//   for (let i =0; i< 4; i++){
//   let shopCards = document.createElement('button');
//   shopCards.classList.add('shopCards')
//   let selectedItems = getRandomItems(items, 1); // Pick random items
    
//   shopCards.textContent = selectedItems.map(item => 
//     `${item.name} ' '${item.description}`
//   ).join(""); // Format as HTML
//   shopContent.appendChild(shopCards);
//   }
// }

// function showShop(){
//   if (playerOnePosition.classList.contains('shop') || playerTwoPosition.classList.contains('shop')){
//   playerOnePosition.classList.remove('shop')
//   playerTwoPosition.classList.remove('shop')
//   shopMessage.textContent = 'You found the shop!';
//   shopContents()
//   shopPopup.style.display = 'flex';
//   } else {
//     shopMessage.textContent = 'The shop!';
//     shopPopup.style.display = 'flex';
//     shopContents()
//   }
// }

// function hideShop() {
//   shopPopup.style.display = "none";
// }

function showPopup() {
  newNumber = getRandomNumber()
  popupMessage.textContent = `You found a ` + newNumber + '!';
  popup.style.display = "flex"; 
 
}

function hidePopup() {
  popup.style.display = "none";
}



acceptPopup.addEventListener("click", () => {
  
  if (playerTurn === 1){
    DeckOneArr.push(newNumber);
    createDeck(DeckOneArr, deckOne);
    hidePopup()
  } else if (playerTurn === 2){
    DeckTwoArr.push(newNumber)
    createDeck(DeckTwoArr, deckTwo);
    hidePopup()

  }
  
});

declinePopup.addEventListener("click", hidePopup);
//leaveShop.addEventListener("click", hideShop);
function p1Draw(){
  let drawCard1 = DeckOneArr[Math.floor(Math.random() * DeckOneArr.length)];
  return drawCard1;
}
function p2Draw(){
  let drawCard2 = DeckTwoArr[Math.floor(Math.random() * DeckTwoArr.length)];
  return drawCard2;
}


flipCard.addEventListener('click', () => {
  // Select all elements with the class "warCards"
  let existingNumbers = document.getElementsByClassName('warCards');
  
  // Convert HTMLCollection to an array and remove each element
  while (existingNumbers.length > 0) {
    existingNumbers[0].remove();
  }

  // Create new divs for player cards
  let cardDrawn1 = document.createElement('div');
  cardDrawn1.classList.add('warCards');
  cardDrawn1.id = 'p1-card'
  cardDrawn1.textContent = p1Draw();
  let cardDrawn2 = document.createElement('div');
  cardDrawn2.classList.add('warCards');
  cardDrawn2.id = 'p2-card'
  cardDrawn2.textContent = p2Draw();

  warContentCenter.appendChild(cardDrawn1);
  warContentCenter.appendChild(cardDrawn2);
});

function warPopup() {
  document.getElementById("final-war").style.display = "flex";
  
}

function closePopup() {
  document.getElementById("final-war").style.display = "none";
}

function checkPlayerPosition(playerTile) {
  for (let i = 0; i <= specialTiles.length; i++){
    if (playerTile.classList.contains('special')) { 
      playerTile.classList.remove('special')
      showPopup();
    } 
  }
  if (playerTurn === 1 && playerTile.classList.contains('playerTwoPosition')){
    warPopup()
  } else if (playerTurn === 2 && playerTile.classList.contains('playerOnePosition')){
    warPopup()

  }
  // if (playerTile.classList.contains('shop')){
  //   playerTile.classList.add('shopFound')
  //   showShop();
  // } else if (playerTile.classList.contains('shopFound')){
  //   showShop()
  // }
}


p1gold.appendChild(p1GoldIncome);
p2gold.appendChild(p2GoldIncome);
p1BankContainer.appendChild(p1BankDiv);
p2BankContainer.appendChild(p2BankDiv);
