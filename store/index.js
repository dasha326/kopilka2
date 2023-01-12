export const state = () => ({
    isDrawer: true,
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
