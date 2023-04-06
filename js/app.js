const cards = [
  {card: "dA", value: 14},
  {card: "dQ", value: 12},
  {card: "dK", value:13},
  {card: "dJ", value: 11},
  {card: "d10", value: 10},
  {card: "d09", value: 9},
  {card: "d08", value: 8},
  {card: "d07", value: 7},
  {card: "d06", value: 6},
  {card: "d05", value: 5},
  {card: "d04", value: 4},
  {card: "d03", value: 3},
  {card: "d02", value: 2},
  {card: "hA", value: 14},
  {card: "hQ", value: 12},
  {card: "hK", value: 13},
  {card: "hJ", value: 11},
  {card: "h10", value: 10},
  {card: "h09", value: 9},
  {card: "h08", value: 8},
  {card: "h07", value: 7},
  {card: "h06", value: 6},
  {card: "h05", value: 5},
  {card: "h04", value: 4},
  {card: "h03", value: 3},
  {card: "h02", value: 2},
  {card: "cA", value: 14},
  {card: "cQ", value: 12},
  {card: "cK", value: 13},
  {card: "cJ", value: 11},
  {card: "c10", value: 10},
  {card: "c09", value: 9},
  {card: "c08", value: 8},
  {card: "c07", value: 7},
  {card: "c06", value: 6},
  {card: "c05", value: 5},
  {card: "c04", value: 4},
  {card: "c03", value: 3},
  {card: "c02", value: 2},
  {card: "sA", value: 14},
  {card: "sQ", value: 12},
  {card: "sK", value: 13},
  {card: "sJ", value: 11},
  {card: "s10", value: 10},
  {card: "s09", value: 9},
  {card: "s08", value: 8},
  {card: "s07", value: 7},
  {card: "s06", value: 6},
  {card: "s05", value: 5},
  {card: "s04", value: 4},
  {card: "s03", value: 3},
  {card: "s02", value: 2},
]
// Declare deck variables
let playerDeck = []
let computerDeck = []
let warWinner = []
let playerCardToRemove  
let computerCardToRemove
// Cached element references
let playerDeckEl = document.getElementById("playerDeck")
let playerCardEl = document.getElementById("playerCard")
let computerDeckEl = document.getElementById("computerDeck")
let computerCardEl = document.getElementById("computerCard")
const messageEl = document.getElementById("message")

// Event listeners
document.getElementById("btn").addEventListener("click", handleClick)
document.getElementById("resetBtn").addEventListener("click", init)
document.getElementById("warBtn").addEventListener("click", handleClickWar)
// Functions
init()

function init() {
  playerCardEl.classList.remove(playerCardEl.card)
  playerCardEl.classList.remove(playerCardToRemove)
  playerCardEl.classList.add("outline")
  computerCardEl.classList.remove(computerCardEl.card)
  computerCardEl.classList.remove(computerCardToRemove)
  computerCardEl.classList.add("outline")
  messageEl.textContent = "Let's play War!"
  shuffle()
}

function shuffle() {
  for (let i = cards.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    let temp = cards[i];
    cards[i] = cards[j];
    cards[j] = temp;
    deal()
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
    render(playerCard, computerCard)
    compare()
    determineWinner()
}

function compare() {
  console.log(playerDeck)
  console.log(computerDeck)
  determineWinner()
  const playerCardPicked = playerDeck[0]
  const computerCardPicked = computerDeck[0]
  console.log(playerCardPicked)
  console.log(computerCardPicked)
  if(playerCardPicked && computerCardPicked){
    render(playerCardPicked, computerCardPicked)
    if (playerCardPicked.value > computerCardPicked.value) {
    playerDeck.push(computerDeck.shift(), playerDeck.shift(), ...warWinner)
    warWinner = []
    messageEl.textContent = "KU Wins Hand!"
    } else if (playerCardPicked.value < computerCardPicked.value) {
    computerDeck.push(playerDeck.shift(), computerDeck.shift(), ...warWinner)
    warWinner = []
    messageEl.textContent = "Mizzou Wins Hand!"
    } else if (playerCardPicked.value === computerCardPicked.value)  {
      btn.disable = true
      messageEl.textContent = "We Have A War! Click War!" 
    }
  } 
}

function handleClickWar() {
  const playerCardPicked = playerDeck[0]
  const computerCardPicked = computerDeck[0]
  if (playerCardPicked.value !== computerCardPicked.value) {
    warBtn.disable = true
  }
  if (playerCardPicked.value === computerCardPicked.value) {
  warWinner.push(...computerDeck.splice(0, 4), ...playerDeck.splice(0, 4))
  console.log("war winner", warWinner);
  compare()
  }
}

function determineWinner() {
  console.log(playerDeck)
  console.log(computerDeck);
  if ((playerDeck.length > 0) && (computerDeck.length === 0)) {
    messageEl.textContent = "Game Over! Rock Chalk! KU Won!"
    playerCardEl.classList.remove(playerCardToRemove)
    computerCardEl.classList.remove(computerCardToRemove)
    playerCardEl.classList.add("outline")
    computerCardEl.classList.add("outline")
    messageEl.textContent = "Game Over! Rock Chalk! KU Won!"
  }
  if ((playerDeck.length === 0) && (computerDeck.length > 0)) {
    messageEl.textContent = "Game Over! Go Tigers! Mizzou Won!"
    playerCardEl.classList.remove(playerCardToRemove)
    computerCardEl.classList.remove(computerCardToRemove)
    playerCardEl.classList.add("outline")
    computerCardEl.classList.add("outline")
  }
}

function render(playerCard, computerCard) {
  if (playerCard) {  
    playerCardEl.classList.remove("outline")
    playerCardEl.classList.remove(playerCardToRemove)
    playerCardEl.classList.add(playerCard.card)
    playerCardToRemove = playerCard.card
  } if (computerCard) {
    computerCardEl.classList.remove("outline")
    computerCardEl.classList.remove(computerCardToRemove)
    computerCardEl.classList.add(computerCard.card)
    computerCardToRemove = computerCard.card
  }
}
