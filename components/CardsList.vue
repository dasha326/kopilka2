<template>
    <v-sheet class="cards">
        <h2 class="text-h4 pa-5">{{listName}}</h2>
        <v-sheet :rounded="true" class="cards__list pa-5" elevation="3">
            <v-row class="cards-list__row">
                <v-col class="cards-list__item" v-for="(item, i) in Array.from({length: days})" :key="i" sm="2" lg="1" cols="6">
                    <NumberCard :color="i < todayDay ? '#ddd' : color" :number="++i" @click="addDay(i)"/>
                </v-col>
            </v-row>
        </v-sheet>
    </v-sheet>
</template>

<script>
    import NumberCard from "~/components/NumberCard";
    import {mapMutations} from "vuex";
    export default {
        name: "CardsList",
        components: {NumberCard},
        props: {
            listName: String,
            todayDay: Number,
            days: Number,
            color: String
        },
        methods: {
            ...mapMutations('user', ['SET_USER_TODAYDAY']),
            addDay(count){
                const currentPageId = this.$route.params.id - 1;

                //Если жмешь на предыдущий день
                if(this.todayDay >= count) return;

                this.SET_USER_TODAYDAY({currentPageId, count})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .cards{
        flex-grow: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        &__list{
            overflow-y: scroll;
        }
    }
</style>
