const cards = [
  { card: "dA", value: 14 },
  { card: "dQ", value: 12 },
  { card: "dK", value: 13 },
  { card: "dJ", value: 11 },
  { card: "d10", value: 10 },
  { card: "d09", value: 9 },
  { card: "d08", value: 8 },
  { card: "d07", value: 7 },
  { card: "d06", value: 6 },
  { card: "d05", value: 5 },
  { card: "d04", value: 4 },
  { card: "d03", value: 3 },
  { card: "d02", value: 2 },
  { card: "hA", value: 14 },
  { card: "hQ", value: 12 },
  { card: "hK", value: 13 },
  { card: "hJ", value: 11 },
  { card: "h10", value: 10 },
  { card: "h09", value: 9 },
  { card: "h08", value: 8 },
  { card: "h07", value: 7 },
  { card: "h06", value: 6 },
  { card: "h05", value: 5 },
  { card: "h04", value: 4 },
  { card: "h03", value: 3 },
  { card: "h02", value: 2 },
  { card: "cA", value: 14 },
  { card: "cQ", value: 12 },
  { card: "cK", value: 13 },
  { card: "cJ", value: 11 },
  { card: "c10", value: 10 },
  { card: "c09", value: 9 },
  { card: "c08", value: 8 },
  { card: "c07", value: 7 },
  { card: "c06", value: 6 },
  { card: "c05", value: 5 },
  { card: "c04", value: 4 },
  { card: "c03", value: 3 },
  { card: "c02", value: 2 },
  { card: "sA", value: 14 },
  { card: "sQ", value: 12 },
  { card: "sK", value: 13 },
  { card: "sJ", value: 11 },
  { card: "s10", value: 10 },
  { card: "s09", value: 9 },
  { card: "s08", value: 8 },
  { card: "s07", value: 7 },
  { card: "s06", value: 6 },
  { card: "s05", value: 5 },
  { card: "s04", value: 4 },
  { card: "s03", value: 3 },
  { card: "s02", value: 2 },
]
// Declare deck variables
let kuDeck = []
let mizzouDeck = []
let warWinner = []
let kuCardToRemove
let mizzouCardToRemove

// Cached element references
let kuDeckEl = document.getElementById("kuDeck")
let kuCardEl = document.getElementById("kuCard")
let mizzouDeckEl = document.getElementById("mizzouDeck")
let mizzouCardEl = document.getElementById("mizzouCard")
const messageEl = document.getElementById("message")
let kuScoreEl = document.getElementById("ku-score")
let mizzouScoreEl = document.getElementById("mizzou-score")

// Event listeners
document.getElementById("btn").addEventListener("click", handleClick)
document.getElementById("resetBtn").addEventListener("click", init)
document.getElementById("warBtn").addEventListener("click", handleClickWar)
document.getElementById("secretBtn").addEventListener("click", endGame)

// Functions
init()

function init() {
  kuCardEl.classList.remove(kuCardEl.card)
  kuCardEl.classList.remove(kuCardToRemove)
  kuCardEl.classList.add("outline")
  mizzouDeckEl.classList.remove("outline")
  mizzouDeckEl.classList.add("back-mizzou-tiger-logo", "shadow")
  kuDeckEl.classList.remove("outline")
  kuDeckEl.classList.add("back-jayhawk", "shadow")
  mizzouCardEl.classList.remove(mizzouCardEl.card)
  mizzouCardEl.classList.remove(mizzouCardToRemove)
  mizzouCardEl.classList.add("outline")
  warBtn.hidden = true
  messageEl.textContent = "Click Flip Card to Begin"
  shuffle()
  renderScore()
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
  kuDeck = []
  mizzouDeck = []
  cards.forEach((card, i) => {
    if (i % 2 === 1) {
      kuDeck.push(card)
    } else {
      mizzouDeck.push(card)
    }
  })
}

function handleClick() {
  render()
  compare()
}

function compare() {
  const kuCardPicked = kuDeck[0]
  const mizzouCardPicked = mizzouDeck[0]
  btn.hidden = false
  warBtn.hidden = true
  if (kuCardPicked && mizzouCardPicked) {
    render(kuCardPicked, mizzouCardPicked)

    if (kuCardPicked.value > mizzouCardPicked.value) {
      kuDeck.push(mizzouDeck.shift(), kuDeck.shift(), ...warWinner)
      warWinner = []
      messageEl.textContent = "KU Wins Hand!"
    } else if (kuCardPicked.value < mizzouCardPicked.value) {
      mizzouDeck.push(kuDeck.shift(), mizzouDeck.shift(), ...warWinner)
      warWinner = []
      messageEl.textContent = "Mizzou Wins Hand!"
    } else if (kuCardPicked.value === mizzouCardPicked.value) {
      btn.hidden = true
      messageEl.textContent = "We Have A War! Click War!"
      warBtn.hidden = false
    }
  }
  renderScore()
  determineWinner()
}

function handleClickWar() {
  const kuCardPicked = kuDeck[0]
  const mizzouCardPicked = mizzouDeck[0]
  if (kuCardPicked.value !== mizzouCardPicked.value) {
    warBtn.disable = true
  }
  if (kuCardPicked.value === mizzouCardPicked.value) {
    warWinner.push(...mizzouDeck.splice(0, 4), ...kuDeck.splice(0, 4))
    compare()
  }
}

function determineWinner() {
  if ((kuDeck.length > 0) && (mizzouDeck.length < 1)) {
    messageEl.textContent = "Game Over! Jayhawks Win!"
    kuScoreEl.textContent = 52
    mizzouScoreEl.textContent = 0
    mizzouDeckEl.classList.add("outline")
    mizzouDeckEl.classList.remove("back-mizzou-tiger-logo", "shadow")
  }
  if ((kuDeck.length < 1) && (mizzouDeck.length > 0)) {
    messageEl.textContent = "Game Over! Tigers Win!"
    kuScoreEl.textContent = 0
    mizzouScoreEl.textContent = 52
    kuDeckEl.classList.add("outline")
    kuDeckEl.classList.remove("back-jayhawk", "shadow")
  }
}

function render(kuCard, mizzouCard) {
  if (kuCard) {
    kuCardEl.classList.remove("outline")
    kuCardEl.classList.remove(kuCardToRemove)
    kuCardEl.classList.add(kuCard.card)
    kuCardToRemove = kuCard.card
  } if (mizzouCard) {
    mizzouCardEl.classList.remove("outline")
    mizzouCardEl.classList.remove(mizzouCardToRemove)
    mizzouCardEl.classList.add(mizzouCard.card)
    mizzouCardToRemove = mizzouCard.card
  }
}

function renderScore() {
  kuScoreEl.textContent = kuDeck.length
  mizzouScoreEl.textContent = mizzouDeck.length
}

function endGame() {
  kuDeck.length = 52
  mizzouDeck.length = 0
  kuScoreEl.textContent = 52
  mizzouScoreEl.textContent = 0
  kuCardEl.classList.remove(kuCardToRemove)
  mizzouCardEl.classList.remove(mizzouCardToRemove)
  kuCardEl.classList.add("outline")
  mizzouCardEl.classList.add("outline")
  mizzouDeckEl.classList.remove("back-mizzou-tiger-logo", "shadow")
  mizzouDeckEl.classList.add("outline")
  messageEl.textContent = "Game Over! Jayhawks Win!"
}