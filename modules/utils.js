export const getDate = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours} - ${minutes}`;
}

export const getRandom = (max) => {
    return Math.ceil(Math.random() * max);
}
