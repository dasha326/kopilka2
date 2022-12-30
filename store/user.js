export const state = () => ({
    isAuth: false,
    user: null,
    userId: null
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
    SET_USER_ID(state, payload) {
        state.userId = payload;
    },
    SET_USER_TODAYDAY(state, payload) {
        state.user.list[payload.currentPageId].todayDay = Number(payload.count)
    },
    ADD_NEW_LIST(state, payload) {
        state.user.list.push(payload);
    }
}
export const actions = {
    async logIn({dispatch, commit}, signInData) {
        try {
           const response = await this.$axios.$post('https://001lg.mocklab.io/user',
                JSON.stringify(signInData)
            )
            if(!response) return null;
            dispatch('getUserById', response);
            localStorage.setItem('userId', response);
            return true;
        } catch (error){
            console.log(error);
        }
    },
    logOut({commit}) {
        commit('SET_USER', null);
        commit('SET_IS_AUTH', false);
    },
    async getUserById({commit}, id) {
        const user = await this.$axios.$get('https://001lg.mocklab.io/userProfile');
        if(!user){
            commit('SET_USER', null);
            commit('SET_USER_ID', null);
            commit('SET_IS_AUTH', false);
            this.$router.push('/');
        }

        commit('SET_USER', user);
        commit('SET_USER_ID', id);
        commit('SET_IS_AUTH', true);
    },
    addNewList({state, commit}, newList){
        commit('ADD_NEW_LIST', newList);
        console.log(state.user.list.length)
        this.$router.push(`/dashboard/list/${state.user.list.length}`);
    }
}
