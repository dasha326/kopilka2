import Vue from 'vue'
Vue.mixin({
    methods: {
        pluralFormat(num, one, two, many) {
            const endOnOne = num % 10 === 1 && num % 100 !== 11;
            const endOnTwo = num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20);
            const notOne = endOnTwo ? two : many;
            return endOnOne ? one : notOne;
        },
        removeDelimiters(val) {
            return String(val).replace(/[. ,:-]/g, '&nbsp;');
        },
        formatMoney(val, suffix) {
            suffix = (typeof suffix !== 'undefined') ? suffix : '';
            return String(parseInt(this.removeDelimiters(parseInt(val)))).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + (suffix ? ' ' + suffix : '');
        },
        calcTotal(count){
            return (1 + count) / 2 * count
        }
    }
})
