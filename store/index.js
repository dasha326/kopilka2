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
