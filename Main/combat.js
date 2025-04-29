// Game State
let playerHealth = 100;
let playerDamage = 10;
let playerAttack;
let isEvade = false;
let enemyHealth = 100;
let enemyDamage = 10;
let diceValue;
let playerDice;

// DOM Elements
const playerHealthText = document.querySelector('#playerHealth');
const playerDamageText = document.querySelector('#playerDefense');
const enemyHealthText = document.querySelector('#enemyHealth');
const enemyDamageText = document.querySelector('#enemyDamage');
const diceValueText = document.querySelector('#diceValue');

const atk = document.querySelector('#attack');
const eva = document.querySelector('#evade');
const powerUp = document.querySelector('#powerUp');
const stun = document.querySelector('#stun');
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
stun.disabled = false;
playerDice = 0; // player dice type
// store

stun.onclick = () => {
    playerDice = 3;
};

//dicetypes
const diceTypes = [
    { name: 'D6', min: 1, max: 6 },
    { name: 'D8', min: 1, max: 8 },
    { name: 'D12', min: 1, max: 12 },
    { name: 'Evade Dice', min: 88, max: 89 },
];

function oppDice() {
    let min = 1;
    let max = 6;
    diceValue = Math.floor(Math.random() * (max - min + 1)) + min;
    diceValueText.innerText = diceValue;
}

// Roll the dice to get random number basis dice type
function rollTheDice() {
    let min = diceTypes[playerDice].min;
    let max = diceTypes[playerDice].max;
    diceValue = Math.floor(Math.random() * (max - min + 1)) + min;
    diceValueText.innerText = diceValue;
}

atk.onclick = attack;
eva.onclick = evade;

//Turn function which triggers every other function in each turn
function turnPlay() {}

//player attack function
function attack() {
    if (enemyHealth > 0 && playerHealth > 0) {
        rollTheDice();
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
    oppDice();
    setTimeout(() => {
        if (enemyHealth > 0 && playerHealth > 0) {
            if (isEvade === true) {
                enemyDamage = 0;
                isEvade = false;
            } else {
                enemyDamage = diceValue * enemyDamage;
                playerHealth -= enemyDamage;
                playerHealthText.innerText = playerHealth;
            }
            if (playerHealth <= 0) {
                gameOver();
            }
        }
        atk.disabled = false;
        eva.disabled = false;
    }, 1000);
}

function evade() {
    rollTheDice(0);
    if (diceValue === 2 || diceValue === 3 || diceValue === 4) {
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
            alert('Game Over!');
            window.location.reload();
        }, 1000); // optional: delay 1 second before reload
    }
}

function winBattle() {
    if (enemyHealth <= 0) {
        setTimeout(() => {
            window.location.reload();
        }, 1000); // optional: delay 1 second before reload
    }
}
