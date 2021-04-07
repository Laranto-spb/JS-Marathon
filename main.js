const player1 = {
    name: 'Scorpion',
    hp: 30,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['kunai', 'axe'],
    attack: function () {
        console.log(this.name + ' ' + 'Fight...');
    }
}

const player2 = {
    name: 'Subzero',
    hp: 50,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Ice Scepter', 'Kori Blade'],
    attack: function () {
        console.log(this.name + ' ' + 'Fight...');
    }
}
function createPlayer(player, playerProps) {
    const $root = document.querySelector('.root');

    const $player = document.createElement('div');
    $player.classList.add(player);

    const $progressBar = document.createElement('div');
    $progressBar.classList.add('progressbar');

    const $life = document.createElement('div');
    $life.classList.add('life');
    $life.style.width = playerProps.hp + '%';

    const $name = document.createElement('div');
    $name.classList.add('name');
    $name.innerText = playerProps.name;

    $progressBar.appendChild($life);
    $progressBar.appendChild($name);

    const $character = document.createElement('div');
    $character.classList.add('character');

    const $img = document.createElement('img');
    $img.src = playerProps.img;

    $character.appendChild($img);

    $player.appendChild($progressBar);
    $player.appendChild($character);

    $root.appendChild($player);
}

createPlayer('player1', player1);
createPlayer('player2', player2);
