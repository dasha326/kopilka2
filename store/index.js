export const state = () => ({
    isAuth: false,
    user: null,
    sidebarOpening: true,
    alertError: ''
})

export const getters = {
    getSidebarOpening(state) {
        return state.sidebarOpening
    },
    getAuth(state) {
        return state.isAuth;
    },
    getAlertError(state) {
        return state.alertError;
    },
    getUser(state) {
        return state.user;
    }
}

export const mutations = {
    SET_SIDEBAR_OPENING(state, payload){
        state.sidebarOpening = payload.title;
    },
    SET_IS_AUTH(state, payload) {
        state.isAuth = payload;
    },
    SET_LOGIN_ERROR(state, payload) {
        state.alertError = "Ошибка HTTP: " + payload;
    },
    SET_USER(state, payload) {
        state.user = payload;
    }
}
export const actions = {
    async logIn({dispatch, commit}, user){
        this.$axios.$post('https://001lg.mocklab.io/user', {
            body: JSON.stringify(user)
        })
        // try {
        //     let response = await fetch(, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json; charset=UTF-8'
        //         },
        //
        //     });
        //     if (response.ok) {
        //         commit('SET_IS_AUTH', true);
        //         await dispatch('getUser');
        //     } else {
        //         commit('SET_LOGIN_ERROR', response.status);
        //     }
        // } catch(error) {
        //     console.log(error)
        // }
    },
    async getUser({commit}){
        try {
            let response = await fetch('https://001lg.mocklab.io/userProfile', {
                method: 'GET',
            });
            if (response.ok) {
                let user = await response.json();
                commit('SET_USER', user);
            } else {
                //commit('SET_LOGIN_ERROR', response.status);
            }
        } catch(error) {
            console.log(error)
        }
    }
}