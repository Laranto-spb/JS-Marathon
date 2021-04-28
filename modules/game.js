import { playerOne, playerTwo } from "./players.js";
import { checkKicks } from "./checks.js";
import { showResult } from "./showResults.js";
import { generateStart } from "./createLogs.js";

class Game {

    start = () => {

        generateStart('start', playerOne, playerTwo);

        const $arenas = document.querySelector('.arenas')
        const $formFight = document.querySelector('.control');

        $arenas.appendChild(playerOne.createPlayer());
        $arenas.appendChild(playerTwo.createPlayer());

        $formFight.addEventListener('submit', (e) => {
            e.preventDefault();

            const enemy = playerTwo.enemyAttack();
            const attack = playerOne.playerAttack();

            checkKicks(attack, enemy);

            playerOne.playerAttack();
            playerTwo.enemyAttack();

            playerOne.render();
            playerTwo.render();

            showResult();
        })


    }
}

export const game = new Game();
