<template>
    <v-app-bar app clipped-left>
        <v-app-bar-nav-icon v-if="isMenu" @click.stop="isDrawer = !isDrawer"/>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer/>
        <v-list-item two-line v-if="userIsAuth">
            <v-list-item-avatar>
                <img src="https://randomuser.me/api/portraits/women/81.jpg">
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title>{{currentUser.name}}</v-list-item-title>
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
import {mapState, mapActions} from "vuex";

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
        userIsAuth() {
            return this.isAuth;
        },
        currentUser() {
            return this.user;
        }
    }
}
</script>

<style scoped>
    .v-list-item{
        flex: 0 0 auto !important;
    }
</style>
