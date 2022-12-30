export default function ({store, redirect}){
    //console.log(window)
    const isAuth = store.getters['user/getAuth'];
    if (!isAuth) {
        //store.dispatch('user/getUser');
    }
}
