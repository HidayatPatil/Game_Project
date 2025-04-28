const goHome = document.querySelector('#goHome');
goHome.onclick = goToHome;

function goToHome() {
    window.location.href = 'index.html';
}

// ------------------------------------------------------------
// Game State
let playerHealth = 100;
let playerEvade = 0;
let playerAttack;
let enemyHealth = 100;
let enemyDamage = 20;
let diceValue;
let isEvade = false;

// DOM Elements
const playerHealthText = document.querySelector('#playerHealth');
const playerEvadeText = document.querySelector('#playerDefense');
const enemyHealthText = document.querySelector('#enemyHealth');
const enemyDamageText = document.querySelector('#enemyDamage');
const diceValueText = document.querySelector('#diceValue');

const atk = document.querySelector('#attack');
const eva = document.querySelector('#evade');
const powerUp = document.querySelector('#powerUp');
const stun = document.querySelector('#stun');
const battleMenu = document.querySelector('#inBattleMenu');
const diceRoll = document.querySelector('#diceRoll');

// Initial State
enemyHealthText.innerText = enemyHealth;
enemyDamageText.innerText = enemyDamage;
atk.disabled = false;
eva.disabled = false;

const diceTypes = [
    { name: 'D6', min: 1, max: 6 },
    { name: 'D8', min: 1, max: 8 },
    { name: 'D12', min: 1, max: 12 },
    { name: 'Evade Dice', min: 2, max: 4 },
];

// Roll the dice to get random number between 1 and 6
function rollTheDice(sides) {
    let min = diceTypes[sides].min;
    let max = diceTypes[sides].max;
    diceValue = Math.floor(Math.random() * (max - min + 1)) + min;
    diceValueText.innerText = diceValue;
}

function attack() {
    if (enemyHealth > 0 && playerHealth > 0) {
        playerAttack = diceValue * 10;
        enemyHealth -= playerAttack;
        if (enemyHealth <= 0) {
            enemyHealthText.innerText = 0;
        } else {
            enemyHealthText.innerText = enemyHealth;
        }
    }

    atk.disabled = true;
    eva.disabled = true;
}

function enemyAttack() {
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
