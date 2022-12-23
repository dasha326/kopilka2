export const state = () => ({
    isAuth: false,
    user: null,
})

export const getters = {
    getAuth(state) {
        return state.isAuth;
    },
    getUser(state) {
        return state.user;
    }
}

export const mutations = {
    SET_IS_AUTH(state, payload) {
        state.isAuth = payload;
    },
    SET_USER(state, payload) {
        state.user = payload;
    },
}
export const actions = {
    async logIn({dispatch, commit}, signInData) {
        try {
           const response = await this.$axios.$post('https://001lg.mocklab.io/user',
                JSON.stringify(signInData)
            )
            if(!response) return null;
            commit('SET_IS_AUTH', response);
            const user = dispatch('setUser');
            return user;
        } catch (error){
            console.log(error);
        }
    },
    async setUser({commit}) {
        const user = await this.$axios.$get('https://001lg.mocklab.io/userProfile');
        if(!user){
            commit('SET_USER', null);
            return null
        }
        commit('SET_USER', user);
        return user;
    },
}
