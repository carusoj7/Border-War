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
    confetti.start(1000)
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
  btn.disable = false
  confetti.start(1000)
}

var confetti = {
	maxCount: 500,		//set max confetti count
	speed: 5,			//set the particle animation speed
	frameInterval: 15,	//the confetti animation frame interval in milliseconds
	alpha: 1.0,			//the alpha opacity of the confetti (between 0 and 1, where 1 is opaque and 0 is invisible)
	gradient: false,	//whether to use gradients for the confetti particles
	start: null,		//call to start confetti animation (with optional timeout in milliseconds, and optional min and max random confetti count)
	stop: null,			//call to stop adding confetti
	toggle: null,		//call to start or stop the confetti animation depending on whether it's already running
	pause: null,		//call to freeze confetti animation
	resume: null,		//call to unfreeze confetti animation
	togglePause: null,	//call to toggle whether the confetti animation is paused
	remove: null,		//call to stop the confetti animation and remove all confetti immediately
	isPaused: null,		//call and returns true or false depending on whether the confetti animation is paused
	isRunning: null		//call and returns true or false depending on whether the animation is running
};

(function() {
	confetti.start = startConfetti;
	confetti.stop = stopConfetti;
	confetti.toggle = toggleConfetti;
	confetti.pause = pauseConfetti;
	confetti.resume = resumeConfetti;
	confetti.togglePause = toggleConfettiPause;
	confetti.isPaused = isConfettiPaused;
	confetti.remove = removeConfetti;
	confetti.isRunning = isConfettiRunning;
	var supportsAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
	var colors = ["rgba(30,144,255,", "rgba(107,142,35,", "rgba(255,215,0,", "rgba(255,192,203,", "rgba(106,90,205,", "rgba(173,216,230,", "rgba(238,130,238,", "rgba(152,251,152,", "rgba(70,130,180,", "rgba(244,164,96,", "rgba(210,105,30,", "rgba(220,20,60,"];
	var streamingConfetti = false;
	var animationTimer = null;
	var pause = false;
	var lastFrameTime = Date.now();
	var particles = [];
	var waveAngle = 0;
	var context = null;

	function resetParticle(particle, width, height) {
		particle.color = colors[(Math.random() * colors.length) | 0] + (confetti.alpha + ")");
		particle.color2 = colors[(Math.random() * colors.length) | 0] + (confetti.alpha + ")");
		particle.x = Math.random() * width;
		particle.y = Math.random() * height - height;
		particle.diameter = Math.random() * 10 + 5;
		particle.tilt = Math.random() * 10 - 10;
		particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
		particle.tiltAngle = 0;
		return particle;
	}

	function toggleConfettiPause() {
		if (pause)
			resumeConfetti();
		else
			pauseConfetti();
	}

	function isConfettiPaused() {
		return pause;
	}

	function pauseConfetti() {
		pause = true;
	}

	function resumeConfetti() {
		pause = false;
		runAnimation();
	}

	function runAnimation() {
		if (pause)
			return;
		else if (particles.length === 0) {
			context.clearRect(0, 0, window.innerWidth, window.innerHeight);
			animationTimer = null;
		} else {
			var now = Date.now();
			var delta = now - lastFrameTime;
			if (!supportsAnimationFrame || delta > confetti.frameInterval) {
				context.clearRect(0, 0, window.innerWidth, window.innerHeight);
				updateParticles();
				drawParticles(context);
				lastFrameTime = now - (delta % confetti.frameInterval);
			}
			animationTimer = requestAnimationFrame(runAnimation);
		}
	}

	function startConfetti(timeout, min, max) {
		var width = window.innerWidth;
		var height = window.innerHeight;
		window.requestAnimationFrame = (function() {
			return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function (callback) {
					return window.setTimeout(callback, confetti.frameInterval);
				};
		})();
		var canvas = document.getElementById("confetti-canvas");
		if (canvas === null) {
			canvas = document.createElement("canvas");
			canvas.setAttribute("id", "confetti-canvas");
			canvas.setAttribute("style", "display:block;z-index:999999;pointer-events:none;position:absolute;top:0");
			document.body.appendChild(canvas);
			canvas.width = width;
			canvas.height = height;
			window.addEventListener("resize", function() {
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
			}, true);
			context = canvas.getContext("2d");
		}
		var count = confetti.maxCount;
		if (min) {
			if (max) {
				if (min == max)
					count = particles.length + max;
				else {
					if (min > max) {
						var temp = min;
						min = max;
						max = temp;
					}
					count = particles.length + ((Math.random() * (max - min) + min) | 0);
				}
			} else
				count = particles.length + min;
		} else if (max)
			count = particles.length + max;
		while (particles.length < count)
			particles.push(resetParticle({}, width, height));
		streamingConfetti = true;
		pause = false;
		runAnimation();
		if (timeout) {
			window.setTimeout(stopConfetti, timeout);
		}
	}

	function stopConfetti() {
		streamingConfetti = false;
	}

	function removeConfetti() {
		stop();
		pause = false;
		particles = [];
	}

	function toggleConfetti() {
		if (streamingConfetti)
			stopConfetti();
		else
			startConfetti();
	}
	
	function isConfettiRunning() {
		return streamingConfetti;
	}

	function drawParticles(context) {
		var particle;
		var x, y, x2, y2;
		for (var i = 0; i < particles.length; i++) {
			particle = particles[i];
			context.beginPath();
			context.lineWidth = particle.diameter;
			x2 = particle.x + particle.tilt;
			x = x2 + particle.diameter / 2;
			y2 = particle.y + particle.tilt + particle.diameter / 2;
			if (confetti.gradient) {
				var gradient = context.createLinearGradient(x, particle.y, x2, y2);
				gradient.addColorStop("0", particle.color);
				gradient.addColorStop("1.0", particle.color2);
				context.strokeStyle = gradient;
			} else
				context.strokeStyle = particle.color;
			context.moveTo(x, particle.y);
			context.lineTo(x2, y2);
			context.stroke();
		}
	}

	function updateParticles() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		var particle;
		waveAngle += 0.01;
		for (var i = 0; i < particles.length; i++) {
			particle = particles[i];
			if (!streamingConfetti && particle.y < -15)
				particle.y = height + 100;
			else {
				particle.tiltAngle += particle.tiltAngleIncrement;
				particle.x += Math.sin(waveAngle);
				particle.y += (Math.cos(waveAngle) + particle.diameter + confetti.speed) * 0.5;
				particle.tilt = Math.sin(particle.tiltAngle) * 15;
			}
			if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
				if (streamingConfetti && particles.length <= confetti.maxCount)
					resetParticle(particle, width, height);
				else {
					particles.splice(i, 1);
					i--;
				}
			}
		}
	}
})();
