import { player1, player2 } from "./players.js";
import { generateLogs } from "./createLogs.js";

export const checkKicks = (attack, enemy) => {

    const { value: playerValue, hit: playerHit, defence: playerDefence } = attack;
    const { value: enemyValue, hit: enemyHit, defence: enemyDefence } = enemy;


    if (playerHit !== enemyDefence) {
        player2.change(playerValue);
        console.log(player2.name + ' lost ' + playerValue);
        generateLogs('hit', player1, player2, attack);
    } else {
        generateLogs('defence', player2, player1);
        console.log('UPS! ' + player2.name + ' defence ' + enemyDefence);
    }

    if (enemyHit !== playerDefence) {
        player1.change(enemyValue);
        console.log(player1.name + ' lost ' + enemyValue);
        generateLogs('hit', player2, player1, enemy);
    } else {
        generateLogs('defence', player1, player2);
        console.log('UPS! ' + player1.name + ' defence ' + playerDefence);
    }
}
