export const state = () => ({
    isDrawer: true,
    baseColors:[
        ['#FFEB3B', '#FFC107', '#FF9800'],
        ['#CDDC39', '#8BC34A', '#4CAF50'],
        ['#F44336', '#E91E63', '#9C27B0'],
        ['#2196F3', '#00BCD4', '#009688'],
        ['#0000FF', '#0000AA', '#000055'],
    ],
})

export const getters = {
}
export const mutations = {
    SET_DRAWER(state, payload) {
        state.isDrawer = payload;
    }
}

export const actions = {
    async nuxtClientInit({dispatch}) {
        const cookie = document.cookie.match(/(userId=)\d+/ig, '');
        if(Boolean(cookie)){
            const userId = cookie[0].split('=')[1];
            await dispatch('user/getUserById', userId);
        } else {
            await dispatch('user/getUserById', null);
        }
    },
}
