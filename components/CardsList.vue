<template>
    <v-sheet>
        <h2 class="text-h4 mb-5">На часы</h2>
        <v-sheet :rounded="true" class="cards-list pa-5" elevation="3">
            <v-row class="cards-list__row">
                <v-col class="cards-list__item" v-for="(item, i) in Array.from({length: days})" :key="i" sm="2" lg="1" cols="6">
                    <v-sheet
                        :rounded="true"
                        class="cards-list__card d-flex"
                        :color="i < todayDay ? '#ddd' : color"
                    >
                        <div class="cards-list-card__title">{{++i}}</div>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-sheet>
    </v-sheet>
</template>

<script>
    export default {
        name: "CardsList",

        props: {
            todayDay: Number,
            days: Number,
            color: String
        },
    }
</script>

<style lang="scss" scoped>
    .cards-list{
        &__card{
            display: flex;
            align-items: center;
            justify-content: center;
            aspect-ratio: 1/1;
            font-size: 20px;
            font-weight: 700;
        }
    }
</style>
