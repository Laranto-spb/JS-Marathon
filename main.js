const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

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

function checkKicks(attack, enemy) {
    if (attack.hit !== enemy.defence) {
        player2.change(attack.value);
        console.log(player2.name + ' lost ' + attack.value);
        generateLogs('hit', player1, player2);
    } else {
        console.log('UPS! ' + player2.name + ' defence ' + enemy.defence);
    }

    if (enemy.hit !== attack.defence) {
        player1.change(enemy.value);
        console.log(player1.name + ' lost ' + enemy.value);
        generateLogs('hit', player2, player1);
    } else {
        console.log('UPS! ' + player1.name + ' defence ' + attack.defence);
    }
}

function playerAttack() {
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
    return attack;
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

function getDate() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = `${hours} - ${minutes}`;

    return time;
}

function generateLogs(type, player1, player2) {
    const random = getRandom(logs[type].length - 1);
    const time = getDate();

    switch (type) {
        case 'hit':
            const text = logs[type][random].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
            const el = `<p>${time} ${text} ${player1.hp}/100</p>`;
            $chat.insertAdjacentHTML('afterbegin', el);
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
            console.log('Nothing')
    }


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
