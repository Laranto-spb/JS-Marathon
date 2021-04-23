export class Player {
    constructor(props) {
        this.player = props.player,
            this.name = props.name,
            this.hp = props.hp,
            this.img = props.img
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

}

export const playerOne = new Player({
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif'
});

export const playerTwo = new Player({
    player: 2,
    name: 'Subzero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif'
});




