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
import {pluralFormat, formatMoney, calcTotal} from '@/tools'
    export default {
        name: "InfoList",
        props: {
            todayDay: Number,
            days: Number,
            name: String
        },
        computed: {
            totalPrice() {
                return calcTotal(this.todayDay)
            },
            remainsTotalPrice() {
                return calcTotal(this.days) - calcTotal(this.todayDay)
            },
            remainsTotalDays() {
                return this.days - this.todayDay;
            },
            totalSavingsText() {
                return `Вы уже накопили ${formatMoney(this.totalPrice, 'руб.')}`
            },
            currentDayText() {
                return `Сегодня ${this.todayDay} день из ${this.days} отведенных на ${this.name}`
            },
            remainsText(){
                return `Тебе сталось накопить ${formatMoney(this.remainsTotalPrice, 'руб.')} за ${this.remainsTotalDays} ${pluralFormat(this.remainsTotalDays, 'день', 'дня', 'дней')}`
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
