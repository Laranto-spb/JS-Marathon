import { enemyAttack, playerAttack } from "./modules/generateAttacks.js";
import { generateStart } from "./modules/createLogs.js";
import { playerOne, playerTwo } from "./modules/players.js";
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

$arenas.appendChild(createPlayer(playerOne));
$arenas.appendChild(createPlayer(playerTwo));
generateStart('start', playerOne, playerTwo);

$formFight.addEventListener('submit', (e) => {
    e.preventDefault();

    const enemy = enemyAttack();
    const attack = playerAttack();

    checkKicks(attack, enemy);

    playerOne.render();
    playerTwo.render();

    showResult();
})
