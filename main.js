import { enemyAttack, playerAttack } from "./modules/generateAttacks.js";
import { logs } from "./modules/logs.js";
import { getDate, getRandom } from './modules/utils.js';


const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['kunai', 'axe'],
    attack: function () {
        console.log(this.name + ' ' + 'Fight...');
    },
    change: changeHp,
    element: elHp,
    render: renderHp
}

const player2 = {
    player: 2,
    name: 'Subzero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Ice Scepter', 'Kori Blade'],
    attack: function () {
        console.log(this.name + ' ' + 'Fight...');
    },
    change: changeHp,
    element: elHp,
    render: renderHp
}

const checkKicks = (attack, enemy) => {

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

const generateLogs = (type, player1, player2, damageValue) => {
    const random = getRandom(logs[type].length - 1);
    const time = getDate();

    switch (type) {
        case 'hit':
            const hitText = logs[type][random].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
            const el = `<p>${time} ${hitText}. ${player2.name} потерял ${damageValue.value} жизней. ${player2.hp}/100</p>`;
            $chat.insertAdjacentHTML('afterbegin', el);
            break;

        case 'defence':
            const defenceText = logs[type][random].replace('[playerKick]', player2.name).replace('[playerDefence]', player1.name);
            const defEl = `<p>${time} ${defenceText}. ${player1.name} не потерял жизни. ${player1.hp}/100</p>`;
            $chat.insertAdjacentHTML('afterbegin', defEl);
            break;

        case 'start':
            const start = logs[type].replace('[time]', time).replace('[player1]', player1.name).replace('[player2]', player2.name);
            const startEl = `<p>${start}</p>`;
            $chat.insertAdjacentHTML('afterbegin', startEl);
            break;
        case 'end':
            console.log(random);
            const end = logs[type][random].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name)
            const endEl = `<p>${end}</p>`;
            $chat.insertAdjacentHTML('afterbegin', endEl);
            break;
        case 'draw':
            const draw = logs[type];
            const drawEl = `<p>${draw}</p>`;
            $chat.insertAdjacentHTML('afterbegin', drawEl);
            break;
        default:
            break;
    }
}

function showWinner(name) {
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

function changeHp(hp) {
    this.hp -= hp;
    if (this.hp <= 0) {
        this.hp = 0;
    }
}

function elHp() {
    return document.querySelector('.player' + this.player + ' .life');
}

function renderHp() {
    this.element().style.width = this.hp + '%';
}

function createReloadButton() {
    const $reloadWrap = document.createElement('div');
    const $reloadBtn = document.createElement('button');

    $reloadWrap.classList.add('reloadWrap');
    $reloadBtn.classList.add('button');

    $reloadBtn.innerText = 'Restart';

    $reloadWrap.appendChild($reloadBtn);
    $arenas.appendChild($reloadWrap);

    return $reloadBtn;
}

function showResult() {

    if (player1.hp === 0 || player2.hp === 0) {
        $formFight.disabled = true;
        $formFight.style.cursor = 'not-allowed';
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(showWinner(player2.name));
        generateLogs('end', player2, player1);
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(showWinner(player1.name));
        generateLogs('end', player1, player2);
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(showWinner());
        generateLogs('draw');
    }
}

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}

function createPlayer(playerProps) {

    const $player = createElement('div', 'player' + playerProps.player)
    const $progressBar = createElement('div', 'progressbar')
    const $life = createElement('div', 'life')
    const $name = createElement('div', 'name')
    const $character = createElement('div', 'character')
    const $img = createElement('img');

    $life.style.width = playerProps.hp + '%';
    $name.innerText = playerProps.name;
    $img.src = playerProps.img;

    $progressBar.appendChild($life);
    $progressBar.appendChild($name);
    $character.appendChild($img);

    $player.appendChild($progressBar);
    $player.appendChild($character);

    return $player;
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
generateLogs('start', player1, player2);

$formFight.addEventListener('submit', (e) => {
    e.preventDefault();

    const enemy = enemyAttack();
    const attack = playerAttack();

    checkKicks(attack, enemy);

    player1.render();
    player2.render();

    showResult();

})
