// Game State
let playerHealth = 100;
let playerDamage = 10;
let playerAttack;
let isEvade = false;
let enemyHealth = 100;
let enemyDamage = 10;
let playerDiceValue;
let oppDiceValue;
let playerDice;

// DOM Elements
const playerHealthText = document.querySelector("#playerHealth");
const playerDamageText = document.querySelector("#playerDefense");
const enemyHealthText = document.querySelector("#enemyHealth");
const enemyDamageText = document.querySelector("#enemyDamage");
const diceValueText = document.querySelector("#diceValue");

const atk = document.querySelector("#attack");
const eva = document.querySelector("#evade");
const powerUp = document.querySelector("#powerUp");
const stun = document.querySelector("#stun");
// const battleMenu = document.querySelector('#inBattleMenu');
// const diceRoll = document.querySelector('#diceRoll');

// Initial State
playerHealthText.innerText = playerHealth;
playerDamageText.innerText = playerDamage;
enemyHealthText.innerText = enemyHealth;
enemyDamageText.innerText = enemyDamage;
//button states
atk.disabled = false;
eva.disabled = false;
powerUp.disabled = true;
stun.disabled = true;
playerDice = 0; // player dice type
// store

stun.onclick = () => {
	// use in store to assign upgrade to player
	playerDice = 3;
};

//dicetypes
const diceTypes = [
	{ name: "D6", min: 1, max: 6 },
	{ name: "D8", min: 1, max: 8 },
	{ name: "D12", min: 1, max: 12 },
	{ name: "Evade Dice", min: 88, max: 89 },
];

function oppDice() {
	diceValueText.innerText = 0;
	let min = 1;
	let max = 6;
	diceValueText.style.backgroundColor = "red";

	// After a short delay, show the dice value
	setTimeout(() => {
		oppDiceValue = Math.floor(Math.random() * (max - min + 1)) + min;
		diceValueText.innerText = oppDiceValue;

		setTimeout(() => {
			diceValueText.innerText = 0;
			diceValueText.style.backgroundColor = ""; // Reset color
		}, 2000);
	}, 1000); // Delay dice roll for 300ms (adjust as needed)
}

function rollTheDice(sides) {
	diceValueText.innerText = 0;
	let min = diceTypes[sides].min;
	let max = diceTypes[sides].max;

	diceValueText.style.backgroundColor = "bisque";

	setTimeout(() => {
		playerDiceValue = Math.floor(Math.random() * (max - min + 1)) + min;
		diceValueText.innerText = playerDiceValue;
	}, 800); // Delay dice roll
}

//Button functions
atk.onclick = attack;
eva.onclick = evade;

// HealthBar Status
function updateHealthBar(health, maxHealth, barElementId) {
	const bar = document.getElementById(barElementId);
	const healthPercent = Math.max(health / maxHealth, 0) * 100;
	bar.style.width = `${healthPercent}%`;
}

//player attack function
function attack() {
	rollTheDice(0);
	atk.disabled = true;
	eva.disabled = true;
	setTimeout(() => {
		playerAttack = playerDiceValue * 10;
		enemyHealth -= playerAttack;
		updateHealthBar(enemyHealth, 100, "enemy-health-bar");
		if (enemyHealth <= 0) {
			enemyHealthText.innerText = 0;
			winBattle();
		} else {
			enemyHealthText.innerText = enemyHealth;
			setTimeout(enemyTurn, 2000);
		}
	}, 1000);
}

function enemyTurn() {
	oppDice();
	setTimeout(() => {
		let actualDamage;

		if (isEvade === true) {
			actualDamage = 0;
			isEvade = false;
		} else {
			actualDamage = oppDiceValue * enemyDamage;
		}

		playerHealth -= actualDamage;
		updateHealthBar(playerHealth, 100, "player-health-bar");
		playerHealthText.innerText = playerHealth;

		if (playerHealth <= 0) {
			playerHealthText.innerText = 0;
			gameOver();
		}

		atk.disabled = false;
		eva.disabled = false;
	}, 1000);
}

function evade() {
	rollTheDice(0);
	if (playerDiceValue === 2 || playerDiceValue === 3 || playerDiceValue === 4) {
		isEvade = true;
	} else {
		isEvade = false;
	}
	setTimeout(enemyTurn, 1000);
	atk.disabled = true;
	eva.disabled = true;
}

function gameOver() {
	if (enemyHealth <= 0 || playerHealth <= 0) {
		setTimeout(() => {
			alert("Game Over!");
			window.location.reload();
		}, 1000); // optional: delay 1 second before reload
	}
}

function winBattle() {
	if (enemyHealth <= 0) {
		setTimeout(() => {
			alert("You Win!");
			window.location.reload();
		}, 1000); // optional: delay 1 second before reload
	}
}
