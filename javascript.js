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
let flipCard = document.getElementById('next-card')
let warContent = document.querySelector('.war-content')
let warContentTop = document.querySelector('.war-content-top')
let warContentCenter = document.querySelector('.war-content-center')
let warContentBottom = document.querySelector('.war-content-bottom')
let shop = document.querySelector('.shop');
let specialTiles = [];
let p1Bank;
let p2Bank;
let startButton = document.getElementById('startButton');
let startScreen = document.getElementById('startScreen');
let gameElements = document.querySelectorAll('.gameElement'); 
let p1Lives = 3;
let p2Lives = 3;
let p1LivesDiv = document.querySelector('.p1-lives')
let p2LivesDiv = document.querySelector('.p2-lives')
let endScreen = document.querySelector('.end-screen')
let playAgainBtn = document.querySelector('#play-again')
let winningPlayer = document.querySelector('.winning-player')


// Player One deck
let DeckOneArr = [1, 2, 3, 4, 5, 6];
let deckOne = document.querySelector('.p1-deck');
createDeck(DeckOneArr, deckOne);

// Player Two deck
let DeckTwoArr = [1, 2, 3, 4, 5, 6];
let deckTwo = document.querySelector('.p2-deck');
createDeck(DeckTwoArr, deckTwo);

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





let life1UI;
let life2UI;
function checkLives(player){
if (player === 1){
    if (p1Lives === 2){
    life1UI = '♡♡';
    return life1UI
  } else if (p1Lives === 1){
    life1UI = '♡'
    return life1UI;
  } else if (p1Lives === 0){
    life1UI = 'You lost!'
    return life1UI;
  }
}
if (player === 2){
  if (p2Lives === 2){
    life2UI = '♡♡';
    return life2UI
  } else if (p2Lives === 1){
    life2UI = '♡'
    return life2UI;
  } else if (p2Lives === 0){
    life2UI = 'You lost!'
    return life2UI;
  }
}
}

function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];  // Swap elements
  }
  return deck;
}

DeckOneArr = shuffle(DeckOneArr);
DeckTwoArr = shuffle(DeckTwoArr);

// Draw functions for each player
function p1Draw() {
  if (DeckOneArr.length > 0) {
    return DeckOneArr.pop(); 
  }
  return null;
}

function p2Draw() {
  if (DeckTwoArr.length > 0) {
    return DeckTwoArr.pop(); 
  }
  return null; 
}

// Click event to draw cards and display them
flipCard.addEventListener('click', () => {
  let existingNumbers = document.getElementsByClassName('warCards');

  
  while (existingNumbers.length > 0) {
    existingNumbers[0].remove();
  }

  let cardDrawn1 = p1Draw();
  let cardDrawn2 = p2Draw();

  if (cardDrawn1 !== null && cardDrawn2 !== null) {
    let cardDiv1 = document.createElement('div');
    cardDiv1.classList.add('warCards');
    cardDiv1.id = 'p1-card';
    cardDiv1.textContent = cardDrawn1;
    
    let cardDiv2 = document.createElement('div');
    cardDiv2.classList.add('warCards');
    cardDiv2.id = 'p2-card';
    cardDiv2.textContent = cardDrawn2;
    warContentCenter.appendChild(cardDiv1);
    warContentCenter.appendChild(cardDiv2);
  
    let xOverlay = document.createElement('div');
    xOverlay.id = 'xOverlay';
    xOverlay.textContent = 'X';
    
 
    
    // Function to show the "X" and then hide it after a short delay
    function showX() {
      xOverlay.style.display = 'flex'; 
      
      setTimeout(() => {
        xOverlay.style.display = 'none'; 
      }, 1500); 
    }

    // Compare the drawn cards
    if (cardDrawn1 < cardDrawn2) {
      p1Lives -= 1;
      cardDiv1.appendChild(xOverlay);
      showX();
      p1LivesDiv.textContent = 'Player one lives: ' + checkLives(1);
      console.log('Player 1 loses, lives left ' + p1Lives);
    } else if (cardDrawn2 < cardDrawn1) {
      p2Lives -= 1;
      cardDiv2.appendChild(xOverlay);
      showX();
      p2LivesDiv.textContent = 'Player two lives: ' + checkLives(2)
      console.log('Player 2 loses, lives left: ' + p2Lives);
    } else {
      console.log('It\'s a tie, no cards removed');
    }
  } else {
    console.log('No more cards left!');
  }
  if (p1Lives === 0){
    showEndScreen(2);
console.log('player 2 wins')
  } else if (p2Lives === 0){
    showEndScreen(1);
console.log('player 1 wins')
  }

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

}
// Function to show end screen once a player has won
function showEndScreen(player) {
  let allDivs = document.querySelectorAll('div');

  allDivs.forEach(div => {
    div.style.display = 'none';
  });

  endScreen.style.display = 'flex';  
  winningPlayer.style.display = 'flex';
  if (player === 1){
    winningPlayer.textContent = '🎉Player one wins!🎉';
    winningPlayer.style.backgroundColor = 'pink'
  }else if (player === 2){
    winningPlayer.textContent = '🎉Player two wins!🎉';
    winningPlayer.style.backgroundColor = 'lightblue'
  }
}

playAgainBtn.addEventListener('click', () =>{
  location.reload();
});


showShop();
p1gold.appendChild(p1GoldIncome);
p2gold.appendChild(p2GoldIncome);
p1BankContainer.appendChild(p1BankDiv);
p2BankContainer.appendChild(p2BankDiv);
