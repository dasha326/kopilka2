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
    async logIn({dispatch, commit}, user) {
        this.$axios.$post('https://001lg.mocklab.io/user',
            JSON.stringify(user)
        )
            .then(function (response) {
                commit('SET_IS_AUTH', response);
                dispatch('getUser');

               // this.$nuxt._router.push('/dashboard');
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    async getUser({commit}) {
        console.log(5688)
        const user = await this.$axios.$get('https://001lg.mocklab.io/userProfile');
        console.log(user)
        commit('SET_USER', user);
    },
}
