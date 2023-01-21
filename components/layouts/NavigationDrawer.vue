<template>
    <v-navigation-drawer
        app
        clipped
        :value="isDrawerOpen"
    >
        <v-sheet
            color="primary"
        >
            <h2 class="pa-5">Мои копилки</h2>
        </v-sheet>
        <v-list v-if="currentUserLists">
            <v-list-item-group
                v-for="(item, i) in currentUserLists"
                :key="i"
                v-model="selectedItem"
                color="primary"
            >
                <v-list-item
                    :value="item"
                    active-color="primary"
                    pl-14
                    @click="$router.push(`/dashboard/list/${i+1}`)"
                >
                    <v-list-item-title v-text="item.name"></v-list-item-title>

                    <v-dialog transition="dialog-bottom-transition" max-width="600">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                x-small
                                fab
                                :color="item.color"
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-icon small dark>mdi-pencil</v-icon>
                            </v-btn>
                        </template>
                        <template v-slot:default="dialog">
                            <v-card>
                                <v-toolbar color="secondary" class="pl-5 pr-5">Редактировать копилку</v-toolbar>
                                <v-card-text class="pt-4">
                                    <ChangeList :defaultName="item.name" :defaultColor="item.color" :defaultDays="item.days" :listId="i" :defaultCurrentDays="item.todayDay" @closeChangeDialog="dialog.value = false"/>
                                </v-card-text>
                            </v-card>
                        </template>
                    </v-dialog>
                </v-list-item>
            </v-list-item-group>
        </v-list>
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
    </v-navigation-drawer>
</template>

<script>
    import {mapState, mapGetters} from "vuex";
    import AddList from "~/components/forms/AddList";
    import ChangeList from "~/components/forms/ChangeList";

    export default {
        name: "NavigationDrawer",
        components: {AddList, ChangeList},
        data() {
            return {
                selectedItem: ''
            }
        },
        computed: {
            ...mapState(['isDrawer']),
            ...mapGetters('user', ['userLists']),
            isDrawerOpen() {
                return this.isDrawer;
            },
            currentUserLists() {
                return this.userLists
            },
        }
    }
</script>

<style scoped>
    .v-list-item__title{
        cursor: pointer;
    }
</style>
