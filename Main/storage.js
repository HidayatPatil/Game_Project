function evade() {
    rollTheDice(0);
    if (
        playerDiceValue === 2 ||
        playerDiceValue === 3 ||
        playerDiceValue === 4
    ) {
        isEvade = true;
    } else {
        isEvade = false;
    }
    setTimeout(enemyTurn, 1000);
    atk.disabled = true;
    eva.disabled = true;
}

function enemyTurn() {
    oppDice();
    setTimeout(() => {
        let actualDamage;

        if (isEvade === true) {
            actualDamage = 0;
            enemyHealth -= enemyDamage;
            isEvade = false;
        } else {
            actualDamage = oppDiceValue * enemyDamage;
        }

        playerHealth -= actualDamage;
        updateHealthBar(playerHealth, 100, 'player-health-bar');
        playerHealthText.innerText = playerHealth;

        if (playerHealth <= 0) {
            playerHealthText.innerText = 0;
            gameOver();
        }

        atk.disabled = false;
        eva.disabled = false;
    }, 1000);
}
