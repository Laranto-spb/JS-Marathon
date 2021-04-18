const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 20,
    foot: 10
}

const ATTACK = ['head', 'body', 'foot'];

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

function getRandom(max) {
    return Math.ceil(Math.random() * max);
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

function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence
    }
}

function checkKicks (attack, enemy) {
    if (attack.hit !== enemy.defence) {
        player2.change(attack.value);
        alert(player2.name + ' lost ' + attack.value);
    } else {
        alert('UPS! ' + player2.name + ' defence ' + enemy.defence);
    }

    if (enemy.hit !== attack.defence) {
        player1.change(enemy.value);
        alert(player1.name + ' lost ' + enemy.value);
    } else {
        alert('UPS! ' + player1.name + ' defence ' + attack.defence);
    }
}


$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

$formFight.addEventListener('submit', (e) => {
    e.preventDefault();
    const enemy = enemyAttack();
    const attack = {};

    for (let item of $formFight) {

        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }

        item.checked = false;
    }

    checkKicks(attack, enemy);

    player1.render();
    player2.render();


    if (player1.hp === 0 || player2.hp === 0) {
        $formFight.disabled = true;
        $formFight.style.cursor = 'not-allowed';
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(showWinner(player2.name));
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(showWinner(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(showWinner());
    }

})
