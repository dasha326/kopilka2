<template>
    <v-navigation-drawer
        app
        clipped
        :value="isDrawerOpen"
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

            <v-list-item v-if="currentUserLists"
                v-for="(item, i) in currentUserLists"
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
            <v-sheet class="pa-5">
                <v-dialog transition="dialog-bottom-transition" max-width="600">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            small
                            color="secondary"
                            v-bind="attrs"
                            v-on="on"
                        >Добавить новую копилку
                        </v-btn>
                    </template>
                    <template v-slot:default="dialog">
                        <v-card>
                            <v-toolbar color="secondary" class="pl-5 pr-5">Создаем новую копилку</v-toolbar>
                            <v-card-text class="pt-4">
                                <AddList/>
                            </v-card-text>
                        </v-card>
                    </template>
                </v-dialog>
            </v-sheet>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import {mapState, mapGetters} from "vuex";
import AddList from "~/components/forms/AddList";
export default {
    name: "NavigationDrawer",
    components: {AddList},
    data() {
        return {

        }
    },
    computed: {
        ...mapState(['isDrawer']),
        ...mapGetters('user', ['userLists']),
        isDrawerOpen(){
          return this.isDrawer;
        },
        currentUserLists() {
           return this.userLists
        },
    },
}
</script>

<style scoped>

</style>
