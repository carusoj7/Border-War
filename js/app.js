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
  render()
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
    console.log(playerDeck)
    console.log(computerDeck)
    const playerCardPicked = playerDeck[0]
    const computerCardPicked = computerDeck[0]
    render(playerCardPicked, computerCardPicked)
    compare()
    determineWinner()
}

function compare() {
  const playerCardPicked = playerDeck[0]
  const computerCardPicked = computerDeck[0]
  const playerWarCardPicked = playerDeck[4]
  const computerWarCardPicked = computerDeck[4]
  const playerDoubleWarCard = playerDeck[8]
  const computerDoubleWarCard = computerDeck[8]
  if (playerCardPicked.value > computerCardPicked.value) {
    playerDeck.push(computerDeck.shift(), playerDeck.shift())
    console.log(playerCardPicked);
    console.log(computerCardPicked);
    console.log(playerDeck);
    console.log(computerDeck);
    
  } else if (playerCardPicked.value < computerCardPicked.value) {
    computerDeck.push(playerDeck.shift(), computerDeck.shift())
    console.log(playerCardPicked);
    console.log(computerCardPicked);
    
  } else if (playerCardPicked.value === computerCardPicked.value)  {
    // //here's where the if condition would be
    // if ((playerDeck.length > 0) && (computerDeck.length < 4)) {
    //   console.log("player should win")
    //   playerDeck.push(computerDeck.splice(0, computerDeck.length))
    //   return
    // }
      
    // } else if ((playerDeck.length < 4) && (computerDeck.length > 0)) {
    //   console.log("computer should win")
    //   computerDeck.push(playerDeck.splice(0, playerDeck.length))
    //   //write computer win
    //   return
    // }
  if (playerWarCardPicked.value > computerWarCardPicked.value) {
    playerDeck.push(computerDeck.splice(0, 5), playerDeck.splice(0, 5))
    render(playerWarCardPicked, computerWarCardPicked)
    console.log('war');
    console.log(playerWarCardPicked);
    console.log(computerWarCardPicked);
  
  } else if (playerWarCardPicked.value < computerWarCardPicked.value) {
  console.log("computer won war")
  computerDeck.push(playerDeck.splice(0, 5), computerDeck.splice(0, 5))
  render(playerWarCardPicked, computerWarCardPicked) 
      console.log(playerDeck);
      console.log(computerDeck);
        
  }
}else if (playerWarCardPicked.value === computerWarCardPicked.value) {
    console.log("Double war");
      // if ((playerDeck.length > 0) && (computerDeck.length < 8)) {
      //   console.log("player should win")
      //   playerDeck.push(computerDeck.splice(0, computerDeck.length))
        
      // }
      //   else if ((playerDeck.length < 8) && (computerDeck.length > 0)) {
      //   console.log("computer should win")
      //   computerDeck.push(playerDeck.splice(0, playerDeck.length))
      //   //write computer win
        
      // }
    if (playerDoubleWarCard.value > computerDoubleWarCard.value) {
        console.log("player won double war")
        playerDeck.push(computerDeck.splice(0, 8), playerDeck.splice(0, 8))
        render(playerDoubleWarCard, computerDoubleWarCard)
        console.log(playerDeck);
        console.log(computerDeck);
    } else if (playerDoubleWarCard.value < computerDoubleWarCard.value) {
      console.log("computer won double war")
        computerDeck.push(playerDeck.splice(0, 8), computerDeck.splice(0, 8))
        render(playerDoubleWarCard, computerDoubleWarCard)
        console.log(playerDeck);
        console.log(computerDeck);
    }
  }
}

      
          


function determineWinner() {
  console.log('determine winner')
  if ((playerDeck.length > 0) && (computerDeck.length === 0)) {
    messageEl.textContent = "Rock Chalk! KU Won!"
  }
  if ((playerDeck.length === 0) && (computerDeck.length > 0)) {
    messageEl.textContent = "Go Tigers! Mizzou Won!"
  }
}

function render(playerCardPicked, computerCardPicked) {
  console.log("in render");
  if (playerFlip.length) {  
    playerFlipEl.classList.remove("outline")
    playerFlipEl.classList.add(playerCardPicked.card)
  } if (computerFlip.length) {
    computerFlipEl.classList.remove("outline")
    computerFlipEl.classList.add(computerCardPicked.card)
  }
}
