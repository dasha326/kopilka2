import {setCookie} from "@/tools";
export const state = () => ({
    isAuth: false,
    user: null,
    userId: null
});

export const getters = {
    userName(state){
        if (state.user !== null){
            let name = '';
            if (state.user.preName) name += state.user.preName;
            if (state.user.name === '') {
                name += state.user.login;
            } else {
                name += state.user.name;
            }
            return name;
        }
    },
    userImage(state) {
        if (state.user !== null) {
            let img = '';
            if (state.user.img !== null) {
                img = state.user.img;
            } else {
                img = '/no-avatar.svg';
            }
            return img
        }
    },
    userLists(state){
        if (state.user !== null) return state.user.list;
    }
};

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
    CHANGE_LIST_BY_ID(state, {listId, listName, listColor, listDays}){
        const currentList = state.user.list[listId];
        if(currentList.name !== null) currentList.name = listName;
        if(currentList.color !== null) currentList.color = listColor;
        if(currentList.days !== null) currentList.days = parseInt(listDays);
    },
    DELETE_LIST_BY_ID(state, listId){
        state.user.list.splice(listId, 1);
    },
    ADD_NEW_LIST(state, payload) {
        state.user.list.push(payload);
    }
};
export const actions = {
    async checkUser({dispatch, commit}, signInData) {
        try {
           const response = await this.$axios.$post('https://1r10d.wiremockapi.cloud/user',
                JSON.stringify(signInData)
            );
            if(!response) return null;
            dispatch('getUserById', response.id);
            return true;
        } catch (error){
            console.error(error);
            return false;
        }
    },
    logIn({commit}, {user, id}) {
        commit('SET_USER', user);
        commit('SET_USER_ID', id);
        commit('SET_IS_AUTH', true);
        setCookie('userId', id, {
            'max-age': 36000
        });
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
            dispatch('logIn', {user, id});
        }

    },
    addNewList({state, commit, dispatch}, newList){
        commit('ADD_NEW_LIST', newList);
        this.$router.push(`/dashboard/list/${state.user.list.length}`);
    },
    addNewUser({dispatch}, user) {
        dispatch('logIn', {user, id: 2});
        this.$router.push('/dashboard')
    }
};
