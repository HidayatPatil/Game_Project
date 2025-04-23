// Navigation
const goHome = document.querySelector("#goHome");
goHome.onclick = goToHome;

function goToHome() {
	window.location.href = "index.html";
}

// ------------------------------------------------------------
// Game State
let playerHealth = 100;
let playerDefense = 0;
let playerAttack;
let enemyHealth = 100;
let enemyDamage = 20;
let diceValue;

// DOM Elements
const playerHealthText = document.querySelector("#playerHealth");
const playerDefenseText = document.querySelector("#playerDefense");
const enemyHealthText = document.querySelector("#enemyHealth");
const enemyDamageText = document.querySelector("#enemyDamage");
const diceValueText = document.querySelector("#diceValue");

const atk = document.querySelector("#attack");
const def = document.querySelector("#defend");
const powerUp = document.querySelector("#powerUp");
const stun = document.querySelector("#stun");
const battleMenu = document.querySelector("inBattleMenu");
const diceRoll = document.querySelector("#diceRoll");

// Press "SpaceBar" to roll dice
document.addEventListener("keydown", function (event) {
	if (event.code === "Space") {
		diceRoll.click();
	}
});

// Initial State
enemyHealthText.innerText = enemyHealth;
enemyDamageText.innerText = enemyDamage;
diceRoll.onclick = checkRoll;

atk.disabled = true;
def.disabled = true;
powerUp.disabled = true;
stun.disabled = true;

// ------------------------------------------------------------
// Functions

// Roll the dice to get random number between 1 and 6
function rollTheDice() {
	let min = 1;
	let max = 6;
	diceValue = Math.floor(Math.random() * (max - min + 1)) + min;
	diceValueText.innerText = diceValue;
}

// Main function which triggers every other function in each turn
function checkRoll() {
	rollTheDice();
	diceRoll.disabled = true;
	atk.disabled = false;
	def.disabled = false;
	powerUp.disabled = false;
	stun.disabled = false;
	atk.onclick = attack;
	def.onclick = defend;
}

// Player attack function, reduces enemy health (Damage Formula)
function attack() {
	if (enemyHealth > 0 && playerHealth > 0) {
		playerAttack = diceValue;
		enemyHealth -= playerAttack * 10;
		if (enemyHealth <= 0) {
			enemyHealthText.innerText = 0;
		} else {
			enemyHealthText.innerText = enemyHealth;
		}

		atk.disabled = true;
		def.disabled = true;
		powerUp.disabled = true;
		stun.disabled = true;

		gameOver();
		setTimeout(enemyTurn, 1000);
	}
}

// Player Defense Build-up function, reduces damage taken!
function defend() {
	if (enemyHealth > 0 && playerHealth > 0) {
		playerDefense += diceValue * 10;
		playerHealth += playerDefense;
		playerHealthText.innerText = playerHealth;
		playerDefenseText.innerText = "+" + playerDefense;

		playerDef = false;
		atk.disabled = true;
		def.disabled = true;
		powerUp.disabled = true;
		stun.disabled = true;

		gameOver();
		setTimeout(enemyTurn, 1000);
	}
}

// Enemy rolls dice and attacks if condition satisfied
function enemyTurn() {
	rollTheDice();

	if (diceValue === 1 || diceValue === 3 || diceValue === 5) {
		playerHealth -= enemyDamage;
		playerDefense -= enemyDamage;
		if (playerDefense <= 0) {
			playerDefense = 0;
			playerDefenseText.innerText = 0;
		} else {
			playerDefenseText.innerText = playerDefense;
		}
		playerHealthText.innerText = playerHealth;
	}
	diceRoll.disabled = false;
	gameOver();
}

function gameOver() {
	if (enemyHealth <= 0 || playerHealth <= 0) {
		setTimeout(() => {
			window.location.href = "index.html"
		}, 2000);
	}
}
