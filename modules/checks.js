import { playerOne, playerTwo } from "./players.js";
import { generateLogs } from "./createLogs.js";

export const checkKicks = (attack, enemy) => {

    const { value: playerValue, hit: playerHit, defence: playerDefence } = attack;
    const { value: enemyValue, hit: enemyHit, defence: enemyDefence } = enemy;


    if (playerHit !== enemyDefence) {
        playerTwo.change(playerValue);
        console.log(playerTwo.name + ' lost ' + playerValue);
        generateLogs('hit', playerOne, playerTwo, attack);
    } else {
        generateLogs('defence', playerTwo, playerOne);
        console.log('UPS! ' + playerTwo.name + ' defence ' + enemyDefence);
    }

    if (enemyHit !== playerDefence) {
        playerOne.change(enemyValue);
        console.log(playerOne.name + ' lost ' + enemyValue);
        generateLogs('hit', playerTwo, playerOne, enemy);
    } else {
        generateLogs('defence', playerOne, playerTwo);
        console.log('UPS! ' + playerOne.name + ' defence ' + playerDefence);
    }
}
