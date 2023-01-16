<template>
    <v-form
        ref="form"
        @submit.prevent="changeList()"
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
        <v-row>
            <v-col>
                <v-color-picker
                    dot-size="17"
                    hide-mode-switch
                    hide-inputs
                    :swatches="swatches"
                    show-swatches
                    v-model="color"
                ></v-color-picker>
            </v-col>
            <v-col>
                <NumberCard :color="color" :number="Number(days)"/>
                <!--Number или parseInt-->
            </v-col>
        </v-row>
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
            Сохранить
        </v-btn>
    </v-form>
</template>

<script>
    import NumberCard from "~/components/NumberCard";
    import {mapState, mapMutations} from 'vuex';
    import { validationMixin } from 'vuelidate'
    import { required, maxLength, minLength} from 'vuelidate/lib/validators'
    export default {
        mixins: [validationMixin],
        components: {NumberCard},
        validations: {
            listName: {
                required,
                maxLength: maxLength(40),
                minLength: minLength(2)
            }
        },
        props: ['listId', 'defaultName', 'defaultColor', 'defaultDays'],
        data() {
            return {
                listName: this.defaultName,
                color: this.defaultColor,
                days: this.defaultDays,
                listNameMaxLength: 40,
            }
        },
        computed: {
            ...mapState(['baseColors']),
            swatches() {
                return this.baseColors
            },
            listNameErrors () {
                const errors = [];
                if (!this.$v.listName.$dirty) return errors;
                !this.$v.listName.maxLength && errors.push(`Название должно быть не более ${this.listNameMaxLength} символов`);
                !this.$v.listName.required && errors.push('Название нужно заполнить');
                return errors
            }
        },
        methods: {
            ...mapMutations('user', ['CHANGE_USER_LIST']),

            changeList() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    console.log(this.listId, this.listName, this.color, this.days);
                    this.CHANGE_USER_LIST(this.listId, this.listName, this.color, this.days);
                }

            },

        },
    };
</script>
<style lang="scss" scoped>
</style>
