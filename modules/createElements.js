const $arenas = document.querySelector('.arenas');

export const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}

export const createReloadButton = () => {
    const $reloadWrap = document.createElement('div');
    const $reloadBtn = document.createElement('button');

    $reloadWrap.classList.add('reloadWrap');
    $reloadBtn.classList.add('button');

    $reloadBtn.innerText = 'Restart';

    $reloadWrap.appendChild($reloadBtn);
    $arenas.appendChild($reloadWrap);

    return $reloadBtn;
}
