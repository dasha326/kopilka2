<template>
    <v-sheet class="info-list pa-5">
        <v-row class="info-list__row">
            <v-col class="info-list__item" v-for="(item, i) in [currentDayText, totalSavingsText, remainsText]" :key="i" md="4" sm="6">
                <v-sheet class="info-list__card pa-4" elevation="3">{{item}}</v-sheet>
            </v-col>
        </v-row>
    </v-sheet>
</template>

<script>

    export default {
        name: "InfoList",
        props: {
            todayDay: Number,
            days: Number,
            name: String
        },
        data: () => ({

        }),
        computed: {
            totalPrice() {
                return this.calcTotal(this.todayDay)
            },
            remainsTotalPrice() {
                return this.calcTotal(this.days) - this.calcTotal(this.todayDay)
            },
            remainsTotalDays() {
                return this.days - this.todayDay;
            },
            totalSavingsText() {
                return `Вы уже накопили ${this.formatMoney(this.totalPrice, 'руб.')}`
            },
            currentDayText() {
                return `Сегодня ${this.todayDay} день из ${this.days} отведенных на ${this.name}`
            },
            remainsText(){
                return `Тебе сталось накопть ${this.formatMoney(this.remainsTotalPrice, 'руб.')} за ${this.remainsTotalDays} ${this.pluralFormat(this.remainsTotalDays, 'день', 'дня', 'дней')}`
            }
        },
        methods:{

        }
    }
</script>

<style lang="scss" scoped>
    .info-list{
        &__card{
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100%;
        }
    }
</style>
