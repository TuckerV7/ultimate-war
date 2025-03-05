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
let specialTiles = [];

// make special card drops on random tiles
function getRandomTile() {
  return Math.floor(Math.random() * 400) + 1;
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
  if (specialTiles.includes(i) && i != (161 || 180)){
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
  
    }
    if (moveCount <= maxMoves) {
      if (event.key === "ArrowUp") {
        if (cellNumOne > 20) {
          playerOnePosition.classList.add('playerOneArea');
          playerOnePosition.classList.toggle('playerOnePosition');
          cellNumOne -= 20;
          playerOnePosition = document.querySelector(`.cell${cellNumOne}`);
          playerOnePosition.classList.toggle('playerOnePosition');
        } else {
          console.log('top border');
        }
      } else if (event.key === "ArrowDown") {
        if (cellNumOne < 381) {
          playerOnePosition.classList.add('playerOneArea');
          playerOnePosition.classList.toggle('playerOnePosition');
          cellNumOne += 20;
          playerOnePosition = document.querySelector(`.cell${cellNumOne}`);
          playerOnePosition.classList.toggle('playerOnePosition');

        } else {
          console.log('bottom border');
        }
      } else if (event.key === "ArrowLeft") {
        if ((cellNumOne - 1) % 20 === 0) {
          console.log('left border');
        } else {
          playerOnePosition.classList.add('playerOneArea');
          playerOnePosition.classList.toggle('playerOnePosition');
          cellNumOne -= 1;
          playerOnePosition = document.querySelector(`.cell${cellNumOne}`);
          playerOnePosition.classList.toggle('playerOnePosition');
        }
      } else if (event.key === "ArrowRight") {
        if (cellNumOne % 20 === 0) {
          console.log('right border');
        } else {
          playerOnePosition.classList.add('playerOneArea');
          playerOnePosition.classList.toggle('playerOnePosition');
          cellNumOne += 1;
          playerOnePosition = document.querySelector(`.cell${cellNumOne}`);
          playerOnePosition.classList.toggle('playerOnePosition');
        }
      }
    }
    p1Area = countArea("playerOneArea");
    Player1Area.textContent = 'Total area: ' + p1Area + ' tiles';  
    p2Area = countArea("playerTwoArea");
    Player2Area.textContent = 'Total area: ' + p2Area + ' tiles';
    checkPlayerPosition(playerOnePosition);
    
    if (playerOnePosition.classList.contains('playerTwoArea')){
      playerOnePosition.classList.remove('playerTwoArea')
    } else if (playerOnePosition.classList.contains('playerOneArea')){
      playerOnePosition.classList.remove('playerOneArea')
    } else if (playerOnePosition.classList.contains('special')){
      playerOnePosition.classList.remove('special')
    }
    
    if (moveCount >= maxMoves) {
      document.removeEventListener("keydown", handleKeyPress);
      playerTurn = 2;
      switchTurn();
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

    }

    if (moveCount <= maxMoves) {
      if (event.key === "ArrowUp") {
        if (cellNumTwo > 20) {
          playerTwoPosition.classList.add('playerTwoArea');
          playerTwoPosition.classList.toggle('playerTwoPosition');
          cellNumTwo -= 20;
          playerTwoPosition = document.querySelector(`.cell${cellNumTwo}`);
          playerTwoPosition.classList.toggle('playerTwoPosition');
        } else {
          console.log('top border');
        }
      } else if (event.key === "ArrowDown") {
        if (cellNumTwo < 381) {
          playerTwoPosition.classList.add('playerTwoArea');
          playerTwoPosition.classList.toggle('playerTwoPosition');
          cellNumTwo += 20;
          playerTwoPosition = document.querySelector(`.cell${cellNumTwo}`);
          playerTwoPosition.classList.toggle('playerTwoPosition');
        } else {
          console.log('bottom border');
        }
      } else if (event.key === "ArrowLeft") {
        if ((cellNumTwo - 1) % 20 === 0) {
          console.log('left border');
        } else {
          playerTwoPosition.classList.add('playerTwoArea');
          playerTwoPosition.classList.toggle('playerTwoPosition');
          cellNumTwo -= 1;
          playerTwoPosition = document.querySelector(`.cell${cellNumTwo}`);
          playerTwoPosition.classList.toggle('playerTwoPosition');
        }
      } else if (event.key === "ArrowRight") {
        if (cellNumTwo % 20 === 0) {
          console.log('right border');
        } else {
          playerTwoPosition.classList.add('playerTwoArea');
          playerTwoPosition.classList.toggle('playerTwoPosition');
          cellNumTwo += 1;
          playerTwoPosition = document.querySelector(`.cell${cellNumTwo}`);
          playerTwoPosition.classList.toggle('playerTwoPosition');
        }
      }
    }
    p2Area = countArea("playerTwoArea");
    Player2Area.textContent = 'Total area: ' + p2Area + ' tiles';
    p1Area = countArea("playerOneArea");
    Player1Area.textContent = 'Total area: ' + p1Area + ' tiles';
    checkPlayerPosition(playerTwoPosition);

    if (playerTwoPosition.classList.contains('playerOneArea')){
      playerTwoPosition.classList.remove('playerOneArea')
    } else if (playerTwoPosition.classList.contains('playerTwoArea')){
      playerTwoPosition.classList.remove('playerTwoArea')
    }else if (playerTwoPosition.classList.contains('special')){
      playerTwoPosition.classList.remove('special')
    }
    // Stop listening after maxMove key presses
    if (moveCount >= maxMoves) {
      document.removeEventListener("keydown", handleKeyPressTwo);
      playerTurn = 1;
      switchTurn();
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

function handleTurnEvent(event) {
  // Check if the event is a click or a spacebar press
  if (event.type === "click" || (event.type === "keydown" && event.key === " ")) {
    if (playerTurn === 2) {
      turnbtn.classList.toggle('hidden');
      turnUI.textContent = 'Player ' + playerTurn + "'s turn";
      moveCounterTwo.textContent = 'Moves spent: 0 out of ' + maxMoves;
      turnbtn.removeEventListener('click', handleTurnEvent);
      document.removeEventListener('keydown', handleTurnEvent);
      playerTwoTurn();
    } else if (playerTurn === 1) {
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

function checkPlayerPosition(playerTile) {
  for (let i = 0; i <= specialTiles.length; i++){
    if (playerTile.classList.contains(`cell${specialTiles[i]}`)) { 
      showPopup();
    }
  }

}


