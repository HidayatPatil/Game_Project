// dice types
const diceTypes = [
    { name: 'D6', min: 1, max: 6 },
    { name: 'D8', min: 1, max: 8 },
    { name: 'D12', min: 1, max: 12 },
    { name: 'Parry Dice', min: 88, max: 89 }, // updated name
];

const enemyType = [
    {
        name: 'boss1',
        health: 100,
        damage: 10,
        img: 'assets/boss1.png',
    },
    {
        name: 'boss2',
        health: 120,
        damage: 10,
        img: 'assets/boss2.png',
    },
    {
        name: 'boss3',
        health: 150,
        damage: 12,
        img: 'assets/boss3.png',
    },
];

// Game State
let playerHealth = 100;
let playerDamage = 10;
let playerAttack;
let isParry = false;
let currentEnemyIndex = 0;
let enemy = enemyType[currentEnemyIndex];
let enemyHealth = enemy.health;
let enemyDamage = enemy.damage;
let enemyMaxHealth = enemy.health;
let playerDiceValue;
let oppDiceValue;
let playerDice;

// DOM Elements
const playerHealthText = document.querySelector('#playerHealth');
const playerDamageText = document.querySelector('#playerDamage');
const enemyHealthText = document.querySelector('#enemyHealth');
const enemyDamageText = document.querySelector('#enemyDamage');
const diceValueText = document.querySelector('#diceValue');
const enemyImage = document.querySelector('.enemy-Image');
const playerImage = document.querySelector('.player-Image');

const atk = document.querySelector('#attack');
const par = document.querySelector('#parry'); // <--- renamed from 'eva'
const powerUp = document.querySelector('#powerUp');
const stun = document.querySelector('#stun');
const diceUp = document.querySelector('#new-dice-button');
const dmgUp = document.querySelector('#dmg-up-button');
const startScreen = document.getElementById('start_screen');
const startButton = document.getElementById('start-button');

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

// Start game function
startButton.addEventListener("click", () => {
	startScreen.classList.add("hidden");
});


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
            diceValueText.style.backgroundColor = 'black';
        }, 1200);
    }, 600);
}

function rollTheDice(sides) {
    diceValueText.innerText = 0;
    let min = diceTypes[sides].min;
    let max = diceTypes[sides].max;
    diceValueText.style.backgroundColor = '#black';

    setTimeout(() => {
        playerDiceValue = Math.floor(Math.random() * (max - min + 1)) + min;
        diceValueText.innerText = playerDiceValue;
    }, 600);
}

// Button functions
atk.onclick = attack;
par.onclick = parry;
diceUp.onclick = playerChooseDice;
dmgUp.onclick = playerChooseDmg;

// HealthBar Status
function updateHealthBar(health, maxHealth, barElementId) {
    const bar = document.getElementById(barElementId);
    const healthPercent = Math.max(health / maxHealth, 0) * 100;
    bar.style.width = `${healthPercent}%`;
}

function enemyHitAnimation() {
    enemyImage.classList.add('shake');

    // Remove the class after the animation ends so it can be reused
    setTimeout(() => {
        enemyImage.classList.remove('shake');
    }, 300); // should match animation duration
}

function enemyDeathAnimation() {
    enemyImage.classList.add('downed');
}

function playerHitAnimation() {
    playerImage.classList.add('shake');

    // Remove the class after the animation ends so it can be reused
    setTimeout(() => {
        playerImage.classList.remove('shake');
    }, 300); // should match animation duration
}

// Player attack function
function attack() {
    rollTheDice(playerDice);
    atk.disabled = true;
    par.disabled = true;
    setTimeout(() => {
        playerAttack = playerDiceValue * playerDamage;
        enemyHealth -= playerAttack;
        enemyHitAnimation(); // Play hit animation
        updateHealthBar(enemyHealth, enemyMaxHealth, 'enemy-health-bar');
        if (enemyHealth <= 0) {
            enemyDeathAnimation();
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
            playerHitAnimation(); // Play hit animation
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
            loadNextEnemy();
        }, 1000);
    }
}

function playerChooseDice() {
    playerDice += 1;
    document.getElementById('powerup-overlay').classList.add('hidden');
}

function playerChooseDmg() {
    playerDamage += 2;
    playerDamageText.innerText = playerDamage;
    document.getElementById('powerup-overlay').classList.add('hidden');
}

function loadNextEnemy() {
    if (playerHealth <= 80) {
        playerHealth += 20;
        playerHealthText.innerText = playerHealth;
        updateHealthBar(playerHealth, 100, 'player-health-bar');
    }

    currentEnemyIndex++;

    if (currentEnemyIndex >= enemyType.length) {
        alert('You defeated all enemies! 🎉');
        window.location.reload();
        return;
    }

    // Load new enemy data
    enemy = enemyType[currentEnemyIndex];
    enemyHealth = enemy.health;
    enemyDamage = enemy.damage;

    // Update UI
    diceValueText.innerText = 0;
    enemyHealthText.innerText = enemyHealth;
    enemyDamageText.innerText = enemyDamage;
    enemyImage.src = enemy.img;

    // Reset health bar
    enemyMaxHealth = enemy.health;
    updateHealthBar(enemyHealth, enemy.health, 'enemy-health-bar');

    // Re-enable buttons
    atk.disabled = false;
    par.disabled = false;

    // Optional: remove the downed animation class if still present
    enemyImage.classList.remove('downed');
}
