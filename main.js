import { enemyAttack, playerAttack } from "./modules/generateAttacks.js";
import { generateStart } from "./modules/createLogs.js";
import { player1, player2 } from "./modules/players.js";
import { showResult } from "./modules/showResults.js";
import { createElement } from "./modules/createElements.js";
import { checkKicks } from "./modules/checks.js";


const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');


function createPlayer(playerProps) {

    const { player, name, hp, img } = playerProps;

    const $player = createElement('div', 'player' + player)
    const $progressBar = createElement('div', 'progressbar')
    const $life = createElement('div', 'life')
    const $name = createElement('div', 'name')
    const $character = createElement('div', 'character')
    const $img = createElement('img');

    $life.style.width = hp + '%';
    $name.innerText = name;
    $img.src = img;

    $progressBar.appendChild($life);
    $progressBar.appendChild($name);
    $character.appendChild($img);

    $player.appendChild($progressBar);
    $player.appendChild($character);

    return $player;
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
generateStart('start', player1, player2);

$formFight.addEventListener('submit', (e) => {
    e.preventDefault();

    const enemy = enemyAttack();
    const attack = playerAttack();

    checkKicks(attack, enemy);

    player1.render();
    player2.render();

    showResult();

})
