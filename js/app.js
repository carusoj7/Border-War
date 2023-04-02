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
let playerCardToRemove
let computerCardToRemove
// Cached element references
let playerDeckEl = document.getElementById("playerDeck")
let playerFlipEl = document.getElementById("playerFlip")
let computerDeckEl = document.getElementById("computerDeck")
let computerFlipEl = document.getElementById("computerFlip")

// Event listeners
document.getElementById("btn").addEventListener("click", handleClick)
// Functions
init()

function init() {
  shuffle()
  deal()
  render()
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
    } else if (cards[i] % 2 !== 1) {
      computerDeck.push(card)
    }
  })
}
console.log(playerDeck)
console.log(computerDeck)

function handleClick() {
  if ((playerDeck.length > 0) && (computerDeck.length > 0)){
    const playerCardPicked = playerDeck.splice(0,1)
    playerFlip.push(playerCardPicked[0].value)
    const computerCardPicked = computerDeck.splice(0,1)
    computerFlip.push(computerCardPicked[0].value)
    console.log(playerFlip);
    console.log(computerFlip)
  }
}
function determineHandWinner {

}

// function render() {
//   if (playerFlip.length) {  
//     playerDeckEl.classList.remove("outline")
    
//   }
// }

