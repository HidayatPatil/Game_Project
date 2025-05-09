// Game State
let playerHealth = 100;
let playerDamage = 10;
let playerAttack;
let isParry = false;
let enemyHealth = 10;
let enemyDamage = 10;
let playerDiceValue;
let oppDiceValue;
let playerDice;

// DOM Elements
const playerHealthText = document.querySelector('#playerHealth');
const playerDamageText = document.querySelector('#playerDefense');
const enemyHealthText = document.querySelector('#enemyHealth');
const enemyDamageText = document.querySelector('#enemyDamage');
const diceValueText = document.querySelector('#diceValue');

const atk = document.querySelector('#attack');
const par = document.querySelector('#parry'); // <--- renamed from 'eva'
const powerUp = document.querySelector('#powerUp');
const stun = document.querySelector('#stun');
const diceUpD8 = document.querySelector('#new-dice-button');
const dmgUp1 = document.querySelector('#dmg-up-button');

// Initial State
playerHealthText.innerText = playerHealth;
playerDamageText.innerText = playerDamage;
enemyHealthText.innerText = enemyHealth;
enemyDamageText.innerText = enemyDamage;

// button states
atk.disabled = false;
par.disabled = false;
powerUp.disabled = true;
stun.disabled = true;
playerDice = 0; // player dice type

// dice types
const diceTypes = [
    { name: 'D6', min: 1, max: 6 },
    { name: 'D8', min: 1, max: 8 },
    { name: 'D12', min: 1, max: 12 },
    { name: 'Parry Dice', min: 88, max: 89 }, // updated name
];

function oppDice() {
    diceValueText.innerText = 0;
    let min = 1;
    let max = 6;

    diceValueText.style.backgroundColor = '#e63946';

    setTimeout(() => {
        oppDiceValue = Math.floor(Math.random() * (max - min + 1)) + min;
        diceValueText.innerText = oppDiceValue;

        setTimeout(() => {
            diceValueText.innerText = 0;
            diceValueText.style.backgroundColor = 'bisque';
        }, 1200);
    }, 600);
}

function rollTheDice(sides) {
    diceValueText.innerText = 0;
    let min = diceTypes[sides].min;
    let max = diceTypes[sides].max;
    diceValueText.style.backgroundColor = '#a8dadc';

    setTimeout(() => {
        playerDiceValue = Math.floor(Math.random() * (max - min + 1)) + min;
        diceValueText.innerText = playerDiceValue;
    }, 600);
}

// Button functions
atk.onclick = attack;
par.onclick = parry;
diceUpD8.onclick = playerChooseDice;

// HealthBar Status
function updateHealthBar(health, maxHealth, barElementId) {
    const bar = document.getElementById(barElementId);
    const healthPercent = Math.max(health / maxHealth, 0) * 100;
    bar.style.width = `${healthPercent}%`;
}

// Player attack function
function attack() {
    rollTheDice(0);
    atk.disabled = true;
    par.disabled = true;
    setTimeout(() => {
        playerAttack = playerDiceValue * playerDamage;
        enemyHealth -= playerAttack;
        updateHealthBar(enemyHealth, 100, 'enemy-health-bar');
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
        let actualDamage = oppDiceValue * enemyDamage;

        if (isParry) {
            // Successful parry: reflect damage
            enemyHealth -= actualDamage;
            updateHealthBar(enemyHealth, 100, 'enemy-health-bar');
            enemyHealthText.innerText = enemyHealth;
            isParry = false;

            if (enemyHealth <= 0) {
                winBattle();
                return;
            }
        } else {
            // Failed parry or normal enemy attack
            playerHealth -= actualDamage;
            updateHealthBar(playerHealth, 100, 'player-health-bar');
            playerHealthText.innerText = playerHealth;

            if (playerHealth <= 0) {
                gameOver();
                return;
            }
        }

        atk.disabled = false;
        par.disabled = false;
    }, 800); // Wait for oppDice animation to finish
}

function parry() {
    rollTheDice(0);
    atk.disabled = true;
    par.disabled = true;

    setTimeout(() => {
        if (playerDiceValue === 2 || playerDiceValue === 4) {
            isParry = true; // Successful parry
        } else {
            isParry = false; // Failed parry
        }
        enemyTurn();
    }, 1000);
}

function gameOver() {
    if (enemyHealth <= 0 || playerHealth <= 0) {
        setTimeout(() => {
            alert('Game Over!');
            window.location.reload();
        }, 1000);
    }
}

function winBattle() {
    if (enemyHealth <= 0) {
        setTimeout(() => {
            alert('You Win!');
            document
                .getElementById('powerup-overlay')
                .classList.remove('hidden'); // SHOW overlay
        }, 1000);
    }
}

function playerChooseDice() {
    playerDice += 1;
    document.getElementById('powerup-overlay').classList.add('hidden');
}
