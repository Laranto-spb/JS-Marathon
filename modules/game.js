import Player from "./players.js";
import { generateLogs, generateStart } from "./createLogs.js";
import { getRandom } from "./utils.js";
import { createElement, createReloadButton } from "./createElements.js";


let playerOne, playerTwo;

const $arenas = document.querySelector('.arenas')
const $formFight = document.querySelector('.control');

class Game {

    getPlayers = async () => {
        return await fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());
    }

    getPlayerTwo = async () => {
        return await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json());
    }


    start = async () => {

        const players = await this.getPlayers();
        const player2 = await this.getPlayerTwo();

        const p1 = players[getRandom(players.length - 1)];


        this.playerOne = new Player({
            ...p1,
            player: 1
        });

        this.playerTwo = new Player({
            ...player2,
            player: 2
        });

        generateStart('start', this.playerOne, this.playerTwo);


        $arenas.appendChild(this.playerOne.createPlayer());
        $arenas.appendChild(this.playerTwo.createPlayer());

        $formFight.addEventListener('submit', async (e) => {
            e.preventDefault();

            const fightsInfo = await this.getFightInfo();

            const enemy = fightsInfo.player2;
            const attack = fightsInfo.player1;

            this.checkKicks(attack, enemy);

            this.playerOne.render();
            this.playerTwo.render();

            this.showResult();
        })

    }

    checkKicks = (attack, enemy) => {

        const { value: playerValue, hit: playerHit, defence: playerDefence } = attack;
        const { value: enemyValue, hit: enemyHit, defence: enemyDefence } = enemy;


        if (playerHit !== enemyDefence) {
            this.playerTwo.change(playerValue);
            console.log(this.playerTwo.name + ' lost ' + playerValue);
            generateLogs('hit', this.playerOne, this.playerTwo, attack);
        } else {
            generateLogs('defence', this.playerTwo, this.playerOne);
            console.log('UPS! ' + this.playerTwo.name + ' defence ' + enemyDefence);
        }

        if (enemyHit !== playerDefence) {
            this.playerOne.change(enemyValue);
            console.log(this.playerOne.name + ' lost ' + enemyValue);
            generateLogs('hit', this.playerTwo, this.playerOne, enemy);
        } else {
            generateLogs('defence', playerOne, playerTwo);
            console.log('UPS! ' + this.playerOne.name + ' defence ' + playerDefence);
        }
    }


    getFightInfo = async () => {

        let hit, defence;

        for (let item of $formFight) {

            if (item.checked && item.name === 'hit') {
                hit = item.value;
            }

            if (item.checked && item.name === 'defence') {
                defence = item.value;
            }

            item.checked = false;
        }

        const fightInfo = await fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
            method: 'POST',
            body: JSON.stringify({
                hit,
                defence,
            })
        }).then(res => res.json());

        return {
            player1: fightInfo['player1'],
            player2: fightInfo['player2']
        };
    }

    showWinner = (name) => {
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

    showResult = () => {

        if (this.playerOne.hp === 0 || this.playerTwo.hp === 0) {
            $formFight.style.visibility = 'hidden';
        }

        if (this.playerOne.hp === 0 && this.playerOne.hp < this.playerTwo.hp) {
            $arenas.appendChild(this.showWinner(this.playerTwo.name));
            generateLogs('end', this.playerTwo, this.playerOne);
        } else if (this.playerOne.hp === 0 && this.playerTwo.hp < this.playerOne.hp) {
            $arenas.appendChild(this.showWinner(this.playerOne.name));
            generateLogs('end', this.playerOne, this.playerTwo);
        } else if (this.playerOne.hp === 0 && this.playerTwo.hp === 0) {
            $arenas.appendChild(this.showWinner());
            generateLogs('draw');
        }
    }
}

export const game = new Game();
