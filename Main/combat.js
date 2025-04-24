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

// function rollD6() {
//     let min = 1;
//     let max = 6;
//     diceValue = Math.floor(Math.random() * (max - min + 1)) + min;
//     diceValueText.innerText = diceValue;
// }

// function rollD8() {
//     let min = 1;
//     let max = 8;
//     diceValue = Math.floor(Math.random() * (max - min + 1)) + min;
//     diceValueText.innerText = diceValue;
// }

// function rollD12() {
//     let min = 1;
//     let max = 12;
//     diceValue = Math.floor(Math.random() * (max - min + 1)) + min;
//     diceValueText.innerText = diceValue;
// }

// function rollEvadeDie () {
//     let min = 2;
//     let max = 4;
//     diceValue = Math.floor(Math.random() * (max - min + 1)) + min;
//     diceValueText.innerText = diceValue;
// }

// Define the dice configurations
const diceTypes = [
    { name: 'd6', sides: 6, min: 1 },
    { name: 'd8', sides: 8, min: 1 },
    { name: 'd12', sides: 12, min: 1 },
    { name: 'evade', sides: 4, min: 2 },
];

// Dice class that uses the config
class Dice {
    constructor(diceValue, diceTypes) {
        this.diceValue = diceValue;
        this.diceTypes = diceTypes;
    }

    roll(typeName) {
        const config = this.diceTypes.find((die) => die.name === typeName);
        if (!config) {
            console.error(`Dice type "${typeName}" not found.`);
            return;
        }

        const { sides, min } = config;
        const value = Math.floor(Math.random() * (sides - min + 1)) + min;
        this.diceValue.innerText = value;
        return value;
    }
}

console.log(Dice.roll('d6'), Dice.roll('d8'));
