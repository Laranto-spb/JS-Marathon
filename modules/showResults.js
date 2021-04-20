import { player1, player2 } from "./players.js";
import { generateLogs } from "./createLogs.js";
import { createReloadButton } from "./createElements.js";
import { createElement } from "./createElements.js";

const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control')
const $inputs = $formFight.querySelectorAll('input');

export const showWinner = (name) => {
    const $winner = createElement('div', 'loseTitle');
    $winner.innerText = name + ' Wins!';
    if (!name) {
        $winner.innerText = 'DRAW!';
    }

    createReloadButton().addEventListener('click', () => {
        window.location.reload();
    });

    return ($winner);
}

export const showResult = () => {

    const {name: player1Name, hp: player1Hp} = player1;
    const {name: player2Name, hp: player2Hp} = player2;

    if (player1Hp === 0 || player2Hp === 0) {
        $inputs.disabled = true;
        $formFight.style.cursor = 'not-allowed';
    }

    if (player1Hp === 0 && player1Hp < player2Hp) {
        $arenas.appendChild(showWinner(player2Name));
        generateLogs('end', player2, player1);
    } else if (player2Hp === 0 && player2Hp < player1Hp) {
        $arenas.appendChild(showWinner(player1Name));
        generateLogs('end', player1, player2);
    } else if (player1Hp === 0 && player2Hp === 0) {
        $arenas.appendChild(showWinner());
        generateLogs('draw');
    }
}
