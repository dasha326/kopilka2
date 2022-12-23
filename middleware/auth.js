export default function ({store, redirect}){
    const isAuth = store.getters['user/getAuth'];
    console.log(isAuth)
    if (!isAuth) {
        store.dispatch('user/getUser');
    }
}
