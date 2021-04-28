import { playerOne, playerTwo } from "./players.js";
import { generateLogs } from "./createLogs.js";
import { createReloadButton } from "./createElements.js";
import { createElement } from "./createElements.js";

const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control')

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

    const {name: player1Name, hp: player1Hp} = playerOne;
    const {name: player2Name, hp: player2Hp} = playerTwo;

    if (player1Hp === 0 || player2Hp === 0) {
        $formFight.style.visibility = 'hidden';
    }

    if (player1Hp === 0 && player1Hp < player2Hp) {
        $arenas.appendChild(showWinner(player2Name));
        generateLogs('end', playerTwo, playerOne);
    } else if (player2Hp === 0 && player2Hp < player1Hp) {
        $arenas.appendChild(showWinner(player1Name));
        generateLogs('end', playerOne, playerTwo);
    } else if (player1Hp === 0 && player2Hp === 0) {
        $arenas.appendChild(showWinner());
        generateLogs('draw');
    }
}
