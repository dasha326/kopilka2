import {setCookie} from "@/tools";
export const state = () => ({
    isAuth: false,
    user: null,
    userId: null
})

export const getters = {
    userName(state){
        console.log(111)
        let name = '';
        if (state.user.preName) name += state.user.preName;
        if (state.user.name === '') {
            name += state.user.login;
        } else {
            name += state.user.name;
        }
        console.log(name)
        return name;
    },
    userLists(state){
        if (state.user !== null) return state.user.list;
    },
    userList(state, count){
        if (state.user !== null) return state.user.list[parseInt(count)];
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
    async checkUser({dispatch, commit}, signInData) {
        try {
           const response = await this.$axios.$post('https://1r10d.wiremockapi.cloud/user',
                JSON.stringify(signInData)
            )
            if(!response) return null;
            dispatch('getUserById', response.id);
            return true;
        } catch (error){
            console.error(error);
            return false;
        }
    },
    logIn({commit}, user, id) {
        commit('SET_USER', user);
        commit('SET_USER_ID', id);
        commit('SET_IS_AUTH', true);
        setCookie('userId', id, {
            'max-age': -1
        })
    },
    logOut({commit}) {
        commit('SET_USER', null);
        commit('SET_USER_ID', null);
        commit('SET_IS_AUTH', false);
        setCookie('userId', "", {
            'max-age': -1
        })
    },
    async getUserById({commit, dispatch}, id) {
        if(id === null){
            dispatch('logOut');
            this.$router.push('/');
        } else {
            const user = await this.$axios.$get('https://1r10d.wiremockapi.cloud/userProfile');
            if (!user){
                dispatch('logOut');
                return
            }
            dispatch('logIn', user, id);
        }

    },
    addNewList({state, commit, dispatch}, newList){
        commit('ADD_NEW_LIST', newList);
        this.$router.push(`/dashboard/list/${state.user.list.length}`);
    },
    addNewUser({dispatch}, user) {
        dispatch('logIn', user, 2);
        this.$router.push('/dashboard')
    }
}
