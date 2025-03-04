const container = document.querySelector('.container');
const center = document.querySelector('.center');
let playerTurn = 1;
let moveCount = 0;
let maxMoves = 3;
let activeFunction = null;




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
  //board.textContent = `${i}`;
  container.appendChild(board);
}



//initialize playerOne starting points
let cellNumOne = 161;
let playerOnePosition = document.querySelector(`.cell${cellNumOne}`);
playerOnePosition.classList.toggle('playerOnePosition');



//Move player one position when arrow keys are pressed
let playerOneUI = document.querySelector('.p1-moves');
let moveCounter = document.createElement('div');
moveCounter.textContent = 'Moves spent: 0 out of ' + maxMoves;


function PlayerOneTurn() {
  let moveCount = 0; // Track key presses

  function handleKeyPress(event) {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
      moveCount++;
      moveCounter.textContent = 'Moves spent: ' + moveCount + ' out of ' + maxMoves;
      console.log(moveCount);
    }

    if (moveCount <= maxMoves) {
      if (event.key === "ArrowUp") {
        if (cellNumOne > 20) {
          playerOnePosition.classList.toggle('playerOnePosition');
          cellNumOne -= 20;
          playerOnePosition = document.querySelector(`.cell${cellNumOne}`);
          playerOnePosition.classList.toggle('playerOnePosition');
        } else {
          console.log('top border');
        }
      } else if (event.key === "ArrowDown") {
        if (cellNumOne < 381) {
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
          playerOnePosition.classList.toggle('playerOnePosition');
          cellNumOne -= 1;
          playerOnePosition = document.querySelector(`.cell${cellNumOne}`);
          playerOnePosition.classList.toggle('playerOnePosition');
        }
      } else if (event.key === "ArrowRight") {
        if (cellNumOne % 20 === 0) {
          console.log('right border');
        } else {
          playerOnePosition.classList.toggle('playerOnePosition');
          cellNumOne += 1;
          playerOnePosition = document.querySelector(`.cell${cellNumOne}`);
          playerOnePosition.classList.toggle('playerOnePosition');
        }
      }
    }

    // Stop listening after three key presses
    if (moveCount >= 3) {
      document.removeEventListener("keydown", handleKeyPress);
      console.log('No longer listening');
      playerTurn = 2;
      switchTurn();
    }
  }

  document.addEventListener("keydown", handleKeyPress);
}

let playerTwoUI = document.querySelector('.p2-moves');
let moveCounterTwo = document.createElement('div');
moveCounterTwo.textContent = 'Moves spent: 0 out of ' + maxMoves;

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
          playerTwoPosition.classList.toggle('playerTwoPosition');
          cellNumTwo -= 20;
          playerTwoPosition = document.querySelector(`.cell${cellNumTwo}`);
          playerTwoPosition.classList.toggle('playerTwoPosition');
        } else {
          console.log('top border');
        }
      } else if (event.key === "ArrowDown") {
        if (cellNumTwo < 381) {
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
          playerTwoPosition.classList.toggle('playerTwoPosition');
          cellNumTwo -= 1;
          playerTwoPosition = document.querySelector(`.cell${cellNumTwo}`);
          playerTwoPosition.classList.toggle('playerTwoPosition');
        }
      } else if (event.key === "ArrowRight") {
        if (cellNumTwo % 20 === 0) {
          console.log('right border');
        } else {
          playerTwoPosition.classList.toggle('playerTwoPosition');
          cellNumTwo += 1;
          playerTwoPosition = document.querySelector(`.cell${cellNumTwo}`);
          playerTwoPosition.classList.toggle('playerTwoPosition');
        }
      }
    }

    // Stop listening after three key presses
    if (moveCount >= 3) {
      document.removeEventListener("keydown", handleKeyPressTwo);
      console.log('No longer listening for Player Two');
      playerTurn = 1;
      switchTurn();
    }
  }

  document.addEventListener("keydown", handleKeyPressTwo);
}

//switch turns
let turnbtn = document.createElement('button');
turnbtn.classList.add('hidden');
turnbtn.style.height = '75px';
turnbtn.style.width = '150px';
turnbtn.style.backgroundColor = 'lightgreen';
turnbtn.textContent = "Click to begin next player's turn";

turnbtn.addEventListener('click', () => {
  if (playerTurn === 2) {
    turnbtn.classList.toggle('hidden');
    turnUI.textContent = 'Player ' + playerTurn + "'s turn";
    moveCounterTwo.textContent = 'Moves spent: 0 out of ' + maxMoves;
    playerTwoTurn();
  } else if (playerTurn === 1) {
    turnbtn.classList.toggle('hidden');
    turnUI.textContent = 'Player ' + playerTurn + "'s turn";
    moveCounter.textContent = 'Moves spent: 0 out of ' + maxMoves;
    PlayerOneTurn();
  }
});

function switchTurn() {

  turnbtn.classList.toggle('hidden');
}

PlayerOneTurn();


let turnUI = document.createElement('div');
turnUI.textContent = 'Player ' + playerTurn + "'s turn";
turnUI.style.fontSize = 'larger';

center.appendChild(turnUI);


playerOneUI.appendChild(moveCounter);
playerTwoUI.appendChild(moveCounterTwo);
center.appendChild(turnbtn);

//Player's decks

// Function to create and append deck divs
function createDeck(deckArray, deckElement) {
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

// Player One
let DeckOneArr = [1, 2, 3, 4];
let deckOne = document.querySelector('.p1-deck');
createDeck(DeckOneArr, deckOne);

// Player Two
let DeckTwoArr = [1, 2, 3, 4];
let deckTwo = document.querySelector('.p2-deck');
createDeck(DeckTwoArr, deckTwo);


