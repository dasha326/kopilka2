<template>
    <v-form
        ref="form"
        @submit.prevent="createList()"
    >
        <v-text-field
            class="mt-4"
            v-model="listName"
            :error-messages="listNameErrors"
            :counter="listNameMaxLength"
            name="list-name"
            label="Название копилки"
            required
            @input="$v.listName.$touch()"
            @blur="$v.listName.$touch()"
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
            class="mt-5"
        ></v-text-field>

        <v-btn
            type="submit"
            color="purple"
            class="mt-4"
        >
            Создать
        </v-btn>
    </v-form>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
    import { validationMixin } from 'vuelidate'
    import { required, maxLength, minLength} from 'vuelidate/lib/validators'
    export default {
        mixins: [validationMixin],
        validations: {
            listName: {
                required,
                maxLength: maxLength(40),
                minLength: minLength(2)
            }
        },
        data: () => ({
            listName: '',
            color: '',
            days: 360,
            listNameMaxLength: 40,
        }),
        computed: {
            listNameErrors () {
                const errors = []
                if (!this.$v.listName.$dirty) return errors
                !this.$v.listName.maxLength && errors.push(`Название должно быть не более ${this.listNameMaxLength} символов`)
                !this.$v.listName.required && errors.push('Название нужно заполнить')
                return errors
            }
        },
        methods: {
            ...mapState('user', ['user']),
            ...mapActions('user', ['addNewList']),

            createList() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    const newList = {
                        "name": this.listName,
                        "icon": "mdi-clock",
                        "color": this.color,
                        "days": parseInt(this.days),
                        "lost": [],
                        "todayDay": 0
                    }
                    this.addNewList(newList);
                }

            },

        },
    };
</script>
<style lang="scss" scoped>
</style>
