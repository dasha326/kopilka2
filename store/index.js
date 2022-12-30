export const state = () => ({
    isDrawer: true,
    alertError: ''
})

export const getters = {
    getIsDrawer(state) {
        return state.isDrawer
    },
}
export const mutations = {
    SET_DRAWER(state, payload) {
        state.isDrawer = payload
    }
}

//const cookieparser = process.server ? require('cookieparser') : undefined
export const actions = {
    async nuxtServerInit({dispatch}) {
        let userId = null;
        if(this.$router.currentRoute.path !== '/'){
            userId = 1
        }
        if (userId !== null) await dispatch('user/getUserById', userId);
    },
}
