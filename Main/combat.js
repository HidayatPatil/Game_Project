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

	diceValueText.style.backgroundColor = "#8b0000";

	setTimeout(() => {
		oppDiceValue = Math.floor(Math.random() * (max - min + 1)) + min;
		diceValueText.innerText = oppDiceValue;

		setTimeout(() => {
			diceValueText.innerText = 0;
			diceValueText.style.backgroundColor = "black";
		}, 1200);
	}, 600);
}


function rollTheDice(sides) {
	diceValueText.innerText = 0;
	let min = diceTypes[sides].min;
	let max = diceTypes[sides].max;

	let diceColor;
	switch (sides) {
		case 0: diceColor = "#2222aa"; break;
		case 1: diceColor = "#22aa22"; break;
		case 2: diceColor = "#aa2222"; break;
		case 3: diceColor = "#aaaa22"; break;
		default: diceColor = "#555555"; break;
	}
	diceValueText.style.backgroundColor = diceColor;

	setTimeout(() => {
		playerDiceValue = Math.floor(Math.random() * (max - min + 1)) + min;
		diceValueText.innerText = playerDiceValue;
	}, 600);
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
			setTimeout(enemyTurn, 1000);
		}
	}, 800);
}

function enemyTurn() {
	oppDice();
	setTimeout(() => {
		let actualDamage = isEvade ? 0 : oppDiceValue * enemyDamage;
		isEvade = false;

		playerHealth -= actualDamage;
		updateHealthBar(playerHealth, 100, "player-health-bar");
		playerHealthText.innerText = playerHealth;

		if (playerHealth <= 0) {
			playerHealthText.innerText = 0;
			gameOver();
		}

		atk.disabled = false;
		eva.disabled = false;
	}, 800);
}


function evade() {
	atk.disabled = true;
	eva.disabled = true;
	rollTheDice(0);  // Roll dice first

	setTimeout(() => {
		// Evaluate evade condition after same delay as attack
		isEvade = (playerDiceValue === 2 || playerDiceValue === 3 || playerDiceValue === 4);
		setTimeout(enemyTurn, 1000);  // Matching pacing with attack transition to enemy
	}, 1000);  // Delay same as attack to allow dice value to appear
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
