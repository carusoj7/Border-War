const cards = [
  {card: "dA", value: 14},
  {card: "dQ", value: 12},
  {card: "dK", value:13},
  {card: "dJ", value: 11},
  {card: "d10", value: 10},
  {card: "d9", value: 9},
  {card: "d8", value: 8},
  {card: "d7", value: 7},
  {card: "d6", value: 6},
  {card: "d5", value: 5},
  {card: "d4", value: 4},
  {card: "d3", value: 3},
  {card: "d2", value: 2},
  {card: "hA", value: 14},
  {card: "hQ", value: 12},
  {card: "hK", value: 13},
  {card: "hJ", value: 11},
  {card: "h10", value: 10},
  {card: "h9", value: 9},
  {card: "h8", value: 8},
  {card: "h7", value: 7},
  {card: "h6", value: 6},
  {card: "h5", value: 5},
  {card: "h4", value: 4},
  {card: "h3", value: 3},
  {card: "h2", value: 2},
  {card: "cA", value: 14},
  {card: "cQ", value: 12},
  {card: "cK", value: 13},
  {card: "cJ", value: 11},
  {card: "c10", value: 10},
  {card: "c9", value: 9},
  {card: "c8", value: 8},
  {card: "c7", value: 7},
  {card: "c6", value: 6},
  {card: "c5", value: 5},
  {card: "c4", value: 4},
  {card: "c3", value: 3},
  {card: "c2", value: 2},
  {card: "sA", value: 14},
  {card: "sQ", value: 12},
  {card: "sK", value: 13},
  {card: "sJ", value: 11},
  {card: "s10", value: 10},
  {card: "s9", value: 9},
  {card: "s8", value: 8},
  {card: "s7", value: 7},
  {card: "s6", value: 6},
  {card: "s5", value: 5},
  {card: "s4", value: 4},
  {card: "s3", value: 3},
  {card: "s2", value: 2},
]
// Declare deck variables

let playerDeck = []
let computerDeck = []
let playerFlip = []
let computerFlip = []
let playerWarFlip = []
let computerWarFlip = []
let playerDoubleWarFlip = []
let computerDoubleWarFlip = []
let playerCardToRemove
let computerCardToRemove
// Cached element references
let playerDeckEl = document.getElementById("playerDeck")
let playerFlipEl = document.getElementById("playerFlip")
let computerDeckEl = document.getElementById("computerDeck")
let computerFlipEl = document.getElementById("computerFlip")
const messageEl = document.getElementById("message")

// Event listeners
document.getElementById("btn").addEventListener("click", handleClick)
// Functions
init()

function init() {
  shuffle()
  deal()
  // render()
}

function shuffle() {
  for (let i = cards.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    let temp = cards[i];
    cards[i] = cards[j];
    cards[j] = temp;
  } 
}

function deal() { 
  playerDeck = []
  computerDeck = []
  cards.forEach((card, i) => {
    if (i % 2 === 1) {
      playerDeck.push(card)
    } else {
      computerDeck.push(card)
    }
  })
}


function handleClick() {
  if ((playerDeck.length > 0) && (computerDeck.length > 0)){
    const playerCardPicked = playerDeck[0]
    playerFlip.push(playerCardPicked.value)
    const computerCardPicked = computerDeck[0]
    computerFlip.push(computerCardPicked.value)
    console.log(playerFlip);
    console.log(computerFlip)
    compare()
  } else if ((playerDeck.length > 0) && (computerDeck.length = 0)) {
    messageEl.textContent = "Rock Chalk! KU Won!"
  } else if ((playerDeck.length = 0) && (computerDeck.length > 0)) {
    messageEl.textContent = "Go Tigers! Mizzou Won!"
  } else {
    messageEl.textContent = "It's a tie!"
  }
}

function compare() {
  if (playerFlip[playerFlip.length - 1] > computerFlip[computerFlip.length - 1]) {
    const computerCardLost = computerDeck.splice(0,1)
    const playerCard = playerDeck.splice(0,1)
    playerDeck.push(computerCardLost[0], playerCard[0])
    playerFlip = []
    computerFlip = []
    console.log(playerDeck)
    console.log(computerDeck);;
  } else if (playerFlip[playerFlip.length - 1] < computerFlip[computerFlip.length - 1]) {
    const playerCardLost = playerDeck.splice(0,1)
    const computerCard = computerDeck.splice(0,1)
    computerDeck.push(playerCardLost[0], computerCard[0])
    playerFlip = []
    computerFlip = []
    console.log(playerDeck)
    console.log(computerDeck);;
    } else if (playerFlip[playerFlip.length - 1] === computerFlip[computerFlip.length - 1]) {
      const playerWarCardPicked = playerDeck[4]
      playerWarFlip.push(playerWarCardPicked.value)
      const computerWarCardPicked = computerDeck[4]
      computerWarFlip.push(computerWarCardPicked.value)
      console.log('war');
      console.log(playerWarFlip);
      console.log(computerWarFlip);
      if (playerWarFlip[playerWarFlip.length - 1] > computerWarFlip[computerWarFlip.length - 1]) {
        console.log("player won war")
        const computerWarLost = computerDeck.splice(0,5)
        const playerWarWon = playerDeck.splice(0,5)
        computerWarLost.forEach((card) => {
          playerDeck.push(card)
        })
        playerWarWon.forEach((card) =>{
          playerDeck.push(card)
        })
        console.log(playerDeck);
        console.log(computerDeck);
        playerFlip = []
        computerFlip = []
        playerWarFlip = []
        computerWarFlip = []
        
      } else if (playerWarFlip[playerWarFlip.length - 1] < computerWarFlip[computerWarFlip.length - 1]) {
        console.log("computer won war")
        const computerWarWon = computerDeck.splice(0,5)
        const playerWarLost = playerDeck.splice(0,5)
        computerWarWon.forEach((card) => {
          computerDeck.push(card)
        })
        playerWarLost.forEach((card) =>{
          computerDeck.push(card)
        })
        console.log(playerDeck);
        console.log(computerDeck);
        playerFlip = []
        computerFlip = []
        playerWarFlip = []
        computerWarFlip = []
        
      } else if (playerDoubleWarFlip[playerDoubleWarFlip.length - 1] === computerWarFlip[computerWarFlip.length - 1]) {
        const playerDoubleWarCard = playerDeck[8]
        playerDoubleWarFlip.push(playerDoubleWarCard.value)
        const computerDoubleWarCard = computerDeck[8]
        computerDoubleWarFlip.push(computerWarCardPicked.value)
        console.log(playerWarFlip);
        console.log(computerWarFlip); 
        if (playerDoubleWarFlip > computerDoubleWarFlip) {
          console.log("player won war")
          const computerDoubleWarLost = computerDeck.splice(0,10)
          const playerDoubleWarWon = playerDeck.splice(0,10)
          computerDoubleWarLost.forEach((card) => {
            playerDeck.push(card)
          })
          playerDoubleWarWon.forEach((card) =>{
            playerDeck.push(card)
          })
          console.log(playerDeck);
          console.log(computerDeck);
          playerFlip = []
          computerFlip = []
          playerWarFlip = []
          computerWarFlip = []
          playerDoubleWarFlip = []
          computerDoubleWarFlip = []
          
        } else if (playerDoubleWarFlip[playerDoubleWarFlip - 1] < computerDoubleWarFlip[computerDoubleWarFlip - 1]) {
          const computerDoubleWarWon = computerDeck.splice(0,10)
          const playerDoubleWarLost = playerDeck.splice(0,10)
          computerDoubleWarWon.forEach((card) => {
            computerDeck.push(card)
          })
          playerDoubleWarLost.forEach((card) =>{
            computerDeck.push(card)
          })
          console.log(playerDeck);
          console.log(computerDeck);
          playerFlip = []
          computerFlip = []
          playerWarFlip = []
          computerWarFlip = []
          playerDoubleWarFlip = []
          computerDoubleWarFlip = []
        }
      }
  }
}
    console.log(playerDeck);
    console.log(computerDeck);


// compare()
// function render() {
//   if (playerFlip.length) {  
//     playerDeckEl.classList.remove("outline")
    
//   }
// }
