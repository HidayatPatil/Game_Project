// const goHome = document.querySelector('#goHome');
// goHome.onclick = goToHome;

// function goToHome() {
//     window.location.href = 'index.html';
// }

// ------------------------------------------------------------
// Game State
let playerHealth = 100;
let playerDamage = 10;
let playerAttack;
let isEvade = false;
let enemyHealth = 100;
let enemyDamage = 10;
let diceValue;

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
playerDamageText.innerText = enemyDamage;
enemyHealthText.innerText = enemyHealth;
enemyDamageText.innerText = enemyDamage;
//button states
atk.disabled = false;
eva.disabled = false;
powerUp.disabled = true;
stun.disabled = true;

//dicetypes
const diceTypes = [
	{ name: "D6", min: 1, max: 6 },
	{ name: "D8", min: 1, max: 8 },
	{ name: "D12", min: 1, max: 12 },
	{ name: "Evade Dice", min: 2, max: 4 },
];

// Roll the dice to get random number basis dice type
function rollTheDice(sides) {
	let min = diceTypes[sides].min;
	let max = diceTypes[sides].max;
	diceValue = Math.floor(Math.random() * (max - min + 1)) + min;
	diceValueText.innerText = diceValue;
}

atk.onclick = attack;

//Turn function which triggers every other function in each turn
function turnPlay() {}

//player attack function
function attack() {
	if (enemyHealth > 0 && playerHealth > 0) {
		rollTheDice(0);
		atk.disabled = true;
		eva.disabled = true;
		setTimeout(() => {
			playerAttack = diceValue * 10;
			enemyHealth -= playerAttack;

			if (enemyHealth <= 0) {
				enemyHealthText.innerText = 0;
			} else {
				enemyHealthText.innerText = enemyHealth;
			}
		}, 1000);
		setTimeout(enemyTurn, 1000);
	} else {
        gameOver();
    }
}

function enemyTurn() {
	rollTheDice(0);
	setTimeout(() => {
		if (enemyHealth > 0 && playerHealth > 0) {
			if (isEvade === true) {
				enemyDamage = 0;
				isEvade = false;
			} else {
				enemyDamage = diceValue * 10;
				playerHealth -= enemyDamage;
				playerHealthText.innerText = playerHealth;
			}
		}
		atk.disabled = false;
		eva.disabled = false;
	}, 1000);
}

function evade() {
	if (diceValue == 2 || 3 || 4) {
		isEvade = true;
	} else {
		isEvade = false;
	}

	atk.disabled = true;
	eva.disabled = true;
}


function gameOver() {
    if (enemyHealth <= 0 || playerHealth <= 0) {
        setTimeout(() => {
            window.location.reload();
        }, 1000); // optional: delay 1 second before reload
    }
}
