<template>
    <v-sheet class="info-list">
        <v-row class="info-list__row">
            <v-col class="info-list__item" v-for="(item, i) in [currentDayText, totalSavingsText, remainsText]" :key="i" md="3" sm="6">
                <v-sheet class="info-list__car pa-4" elevation="3">{{item}}</v-sheet>
            </v-col>
        </v-row>
    </v-sheet>
</template>

<script>

    export default {
        name: "InfoList",
        data: () => ({

        }),
        computed: {
            totalSavingsText() {
                return `Вы уже накопили ${this.formatMoney(this.calcTotal(this.$store.getters.getUser.list[0].todayDay), 'руб.')}`
            },
            currentDayText() {
                return `Сегодня ${this.$store.getters.getUser.list[0].todayDay} день из ${this.$store.getters.getUser.list[0].days} отведенных на ${this.$store.getters.getUser.list[0].name}`
            },
            remainsText(){
                return `тебе сталось накопть 100000 рублей а 360 дней`
            }
        },
        methods:{

        }
    }
</script>

<style scoped>

</style>