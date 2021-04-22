import { getDate, getRandom } from "./utils.js";
import { logs } from "./logs.js";

const $chat = document.querySelector('.chat');
const time = getDate();

export const generateStart = (type, player1, player2) => {
    const start = logs[type].replace('[time]', time).replace('[player1]', player1.name).replace('[player2]', player2.name);
    const startEl = `<p>${start}</p>`;
    $chat.insertAdjacentHTML('afterbegin', startEl);
}

export const generateLogs = (type, player1, player2, damageValue) => {
    const random = getRandom(logs[type].length - 1);

    const { name: player1Name, hp: player1Hp } = player1;
    const { name: player2Name, hp: player2Hp } = player2;

    switch (type) {
        case 'hit':
            const hitText = logs[type][random].replace('[playerKick]', player1Name).replace('[playerDefence]', player2Name);
            const el = `<p>${time} ${hitText}. ${player2Name} потерял ${damageValue.value} жизней. ${player2Hp}/100</p>`;
            $chat.insertAdjacentHTML('afterbegin', el);
            break;

        case 'defence':
            const defenceText = logs[type][random].replace('[playerKick]', player2Name).replace('[playerDefence]', player1Name);
            const defEl = `<p>${time} ${defenceText}. ${player1Name} не потерял жизни. ${player1Hp}/100</p>`;
            $chat.insertAdjacentHTML('afterbegin', defEl);
            break;
        case 'end':
            const end = logs[type][random].replace('[playerWins]', player1Name).replace('[playerLose]', player2Name);
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
