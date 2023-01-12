<template>
    <v-card
        class="mx-auto"
        max-width="500"
    >
        <v-toolbar
            color="pink"
            dark
        >
            <v-toolbar-title>Список копилок</v-toolbar-title>
        </v-toolbar>

        <v-list two-line>
            <v-list-item-group
                active-class="pink--text"
                multiple
            >
                <template v-for="(item, index) in currentUserLists">
                    <v-list-item :key="item.name" @click="linkGo(index+1)">
                        <template v-slot:default="{ active }">
                            <v-list-item-content>
                                <v-list-item-title v-text="item.name"></v-list-item-title>
                            </v-list-item-content>

                            <v-list-item-action>
                                <v-list-item-action-text v-text="daysNamed(item.todayDay) "></v-list-item-action-text>
                            </v-list-item-action>
                        </template>
                    </v-list-item>

                    <v-divider
                        v-if="index < currentUserLists.length - 1"
                        :key="index"
                    ></v-divider>
                </template>
            </v-list-item-group>
        </v-list>
    </v-card>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: "TheList",
    methods: {
        daysNamed(day) {
            if (day) return `${day} день`
        },
        linkGo(id){
            this.$router.push(`/dashboard/list/${id}`)
        }
    },
    computed: {
        ...mapGetters('user', ['userLists']),
        currentUserLists() {
           return this.userLists;
        },
    },
}
</script>

<style scoped>

</style>
