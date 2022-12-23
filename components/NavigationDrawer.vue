<template>
    <v-navigation-drawer
        app
        clipped
        :value="isDrawer"
    >
        <v-list density="compact">
            <v-sheet
                color="primary"
                class="pa-4"
            >
                <v-avatar
                    class="mb-4"
                    color="white darken-1"
                    size="64"
                ></v-avatar>

            </v-sheet>

            <v-divider></v-divider>
            <h2 class="pl-5 pt-5">Мои копилки</h2>

            <v-list-item
                v-for="(item, i) in userLists"
                :key="item.name+i"
                :value="item"
                active-color="primary"
                pl-14
            >
                <template v-slot:prepend>
                    <v-icon>{{ item.icon }}</v-icon>
                </template>
                <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
    name: "NavigationDrawer",
    data() {
        return {
            userLists: null
        }
    },
    computed: {
        ...mapActions('user', ['setUser']),
        ...mapGetters('user', ['getUser']),
        ...mapGetters(['getIsDrawer']),
        isDrawer(){
          return this.getIsDrawer;
        },

    },
    async created() {
        const user = this.$store.getters['user/getUser'];
        console.log(user)
        if (user) {
            this.userLists = user.list
        } else {
            const newUser = await this.$store.dispatch('user/setUser');
            this.userLists = newUser.list;
        }
    }
}
</script>

<style scoped>

</style>
