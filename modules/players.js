import { ATTACK, HIT } from "../data/damage.js";
import { getRandom } from "./utils.js";
import { createElement } from "./createElements.js";

class Player {
    constructor(props) {
        this.player = props.player,
            this.name = props.name,
            this.hp = props.hp,
            this.img = props.img
    }

    createPlayer = () => {
        const $player = createElement('div', 'player' + this.player)
        const $progressBar = createElement('div', 'progressbar')
        const $life = createElement('div', 'life')
        const $name = createElement('div', 'name')
        const $character = createElement('div', 'character')
        const $img = createElement('img');

        $life.style.width = this.hp + '%';
        $name.innerText = this.name;
        $img.src = this.img;

        $progressBar.appendChild($life);
        $progressBar.appendChild($name);
        $character.appendChild($img);

        $player.appendChild($progressBar);
        $player.appendChild($character);

        return $player;

    }

    change = (hp) => {
        this.hp -= hp;
        if (this.hp <= 0) {
            this.hp = 0;
        }
    }

    el = () => {
        return document.querySelector('.player' + this.player + ' .life');
    }

    render = () => {
        this.el().style.width = this.hp + '%';
    }

    enemyAttack = () => {
        const hit = ATTACK[getRandom(3) - 1];
        const defence = ATTACK[getRandom(3) - 1];

        return {
            value: getRandom(HIT[hit]),
            hit,
            defence
        }
    }

    playerAttack = () => {

        const $formFight = document.querySelector('.control');

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

}

export default Player;




