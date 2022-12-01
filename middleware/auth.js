export default function ({store, redirect}){
    const isAuth = store.getters['user/getAuth'];
    if (!isAuth) {
        store.dispatch('user/getUser');
    } else {
        redirect('/')
    }
}
