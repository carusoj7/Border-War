// Declare deck variables
const starterDeck = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
let playerDeck, computerDeck
let cardToRemove
// Cached element references
let playerDeckEl = document.getElementById("playerDeck")
let computerDeckEl = document.getElementById("computerDeck")

// Functions
init()

function init() {
  shuffle()
  deal()
}

function shuffle() {
  for (let i = starterDeck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    let temp = starterDeck[i];
    starterDeck[i] = starterDeck[j];
    starterDeck[j] = temp;
  } 
}

function deal() { 
  playerDeck = []
  computerDeck = []
  starterDeck.forEach((card, i) => {
    if (i % 2 === 1) {
      playerDeck.push(card)
    } else if (starterDeck[i] % 2 !== 1) {
      computerDeck.push(card)
    }
  }
  )}
console.log(playerDeck);
console.log(computerDeck);