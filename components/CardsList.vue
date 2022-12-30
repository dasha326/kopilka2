<template>
    <v-sheet class="cards">
        <h2 class="text-h4 pa-5">{{listName}}</h2>
        <v-sheet :rounded="true" class="cards__list pa-5" elevation="3">
            <v-row class="cards-list__row">
                <v-col class="cards-list__item" v-for="(item, i) in Array.from({length: days})" :key="i" sm="2" lg="1" cols="6">
                    <v-sheet
                        :rounded="true"
                        class="cards-list__card d-flex"
                        :color="i < todayDay ? '#ddd' : color"
                        @click="addDay(i)"
                    >
                        <div class="cards-list-card__title">{{++i}}</div>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-sheet>
    </v-sheet>
</template>

<script>
import {mapMutations} from "vuex";
    export default {
        name: "CardsList",

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
        &-list {
            &__card {
                display: flex;
                align-items: center;
                justify-content: center;
                aspect-ratio: 1/1;
                font-size: 20px;
                font-weight: 700;
                cursor: pointer;
            }
        }
    }
</style>
