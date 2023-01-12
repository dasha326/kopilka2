function pluralFormat(num, one, two, many) {
    const endOnOne = num % 10 === 1 && num % 100 !== 11;
    const endOnTwo = num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20);
    const notOne = endOnTwo ? two : many;
    return endOnOne ? one : notOne;
}
function removeDelimiters(val) {
    return String(val).replace(/[. ,:-]/g, '&nbsp;');
}
function formatMoney(val, suffix) {
    suffix = (typeof suffix !== 'undefined') ? suffix : '';
    return String(parseInt(removeDelimiters(parseInt(val)))).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + (suffix ? ' ' + suffix : '');
}
function calcTotal(count){
    return (1 + count) / 2 * count
}
function setCookie(name, value, options = {}) {
    //Проверяем наличие даты удаления куки
    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }
    document.cookie = updatedCookie;
}
export {pluralFormat, removeDelimiters, formatMoney, calcTotal, setCookie}
