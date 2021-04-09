const $arenas = document.querySelector('.arenas');
const $randomBtn = document.querySelector('button');

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['kunai', 'axe'],
    attack: function () {
        console.log(this.name + ' ' + 'Fight...');
    }
}

const player2 = {
    player: 2,
    name: 'Subzero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Ice Scepter', 'Kori Blade'],
    attack: function () {
        console.log(this.name + ' ' + 'Fight...');
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

function showWinner(player) {
    const $winner = createElement('div', 'loseTitle');
    $winner.innerText = player + ' Wins!';
    return($winner);
}

let isLose = false;

function changeHp(player) {
    const $playerLife = document.querySelector('.player' + player.player + ' .life');
    player.hp -= Math.ceil(Math.random() * 20);
    $playerLife.style.width = player.hp + '%';

    if (player.hp <= 0) {
        isLose = true;
        $randomBtn.disabled = true;
        $randomBtn.style.cursor = 'not-allowed';
    }

    if (player.hp > 0 && isLose) {
        $arenas.appendChild(showWinner(player.name));
    }
}

$randomBtn.addEventListener('click', () => {
    changeHp(player1);
    changeHp(player2);
})


$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));


