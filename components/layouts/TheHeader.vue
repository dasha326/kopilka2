<template>
    <v-app-bar app clipped-left>
        <v-app-bar-nav-icon v-if="isMenu" @click.stop="isDrawer = !isDrawer"/>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer/>
        <v-list-item two-line v-if="userIsAuth">
            <v-list-item-avatar @click="$router.push('/dashboard/profile')">
                <img :src="currentUserImage" :alt="currentUserName">
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title @click="$router.push('/dashboard/profile')">{{currentUserName}}</v-list-item-title>
                <v-list-item-subtitle>
                    <v-btn class="pa-0" x-small tail @click="userLogOut">
                        Выйти
                        <v-icon right>mdi-export</v-icon>
                    </v-btn>
                </v-list-item-subtitle>

            </v-list-item-content>
        </v-list-item>
    </v-app-bar>
</template>

<script>
import {mapState, mapActions, mapGetters} from "vuex";

export default {
    name: "TheHeader",
    props: ['isMenu'],
    data() {
        return {
            isDrawer: true,
            title: 'Твоя копилка',
        }
    },
    watch: {
        isDrawer() {
            this.$store.commit('SET_DRAWER', this.isDrawer);
        }
    },
    methods: {
        ...mapActions('user', ['logOut']),
        userLogOut() {
            this.logOut();
            this.$router.push('/')
        }
    },
    computed: {
        ...mapState('user', ['isAuth', 'user']),
        ...mapGetters('user', ['userName', 'userImage']),
        userIsAuth() {
            return this.isAuth;
        },
        currentUserName() {
            return this.userName;
        },
        currentUserImage(){
            return this.userImage;
        }
    }
}
</script>

<style scoped>
    .v-list-item{
        flex: 0 0 auto !important;
    }
</style>
