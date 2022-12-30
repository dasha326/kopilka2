<template>
    <v-form
        ref="form"
        @submit.prevent="createList()"
    >
        <v-text-field
            v-model="listName"
            name="list-name"
            label="Название копилки"
            required
        ></v-text-field>
        <h4 class="pt-4 pb-4">Выберите цвет копилки</h4>
        <v-color-picker
            dot-size="17"
            hide-mode-switch
            hide-sliders
            hide-inputs
            mode="hexa"
            show-swatches
            swatches-max-height="100"
            v-model="color"
        ></v-color-picker>
        <v-text-field
            v-model="days"
            name="number"
            label="Общее количество дней накопления"
            required
        ></v-text-field>

        <v-btn
            type="submit"
            color="purple"
            class="mr-4"
        >
            Создать
        </v-btn>
    </v-form>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
    export default {
        data: () => ({
            listName: '',
            color: '',
            days: 360
        }),

        methods: {
            ...mapState('user', ['user']),
            ...mapActions('user', ['addNewList']),

            createList() {
                const newList = {
                    "name": this.listName,
                    "icon": "mdi-clock",
                    "color": this.color,
                    "days": parseInt(this.days),
                    "lost": [],
                    "todayDay": 0
                }
                this.addNewList(newList);
            },

        },
    };
</script>
<style lang="scss" scoped>
</style>
