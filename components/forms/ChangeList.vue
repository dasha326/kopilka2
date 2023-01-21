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

        <v-row justify="space-between">
            <v-col cols="auto">
                <v-btn
                    type="submit"
                    color="purple"
                    class="mt-4"
                >
                    Сохранить
                </v-btn>
            </v-col>
            <v-col cols="auto">
                <v-btn
                    type="button"
                    color="error"
                    class="mt-4"
                    @click.stop="delDialog = true"
                >
                    Удалить копилку
                </v-btn>
                <v-dialog
                    v-model="delDialog"
                    max-width="300"
                >
                    <v-card>
                        <v-card-title class="text-h5 mb-3">Уверен что хочешь удалить копилку?</v-card-title>

                        <v-card-text v-if="isManyDays">
                            Не сдавайся, тебе осталось всего {{remainingDays}} дней. А это уже {{percentDays}}% от вашей цели
                        </v-card-text>
                        <v-card-text v-else>
                            Если вы согласитесь, то удалите копилку навсегда
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn
                                type="button"
                                color="green darken-1"
                                text
                                @click="deleteList()"
                            >
                                Точно удалить
                            </v-btn>

                            <v-btn
                                type="button"
                                color="red darken-1"
                                text
                                @click="delDialog = false"
                            >
                                Не удалять
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
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
        emits: ['closeChangeDialog'],
        props: ['listId', 'defaultName', 'defaultColor', 'defaultDays', 'defaultCurrentDays'],
        data() {
            return {
                delDialog: false,
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
            },
            remainingDays(){
                return this.defaultDays - this.defaultCurrentDays;
            },
            percentDays(){
                return Math.round(this.defaultCurrentDays * 100 / this.defaultDays);
            },
            isManyDays(){
                return this.percentDays > 20;
            }
        },
        methods: {
            ...mapMutations('user', ['CHANGE_LIST_BY_ID', 'DELETE_LIST_BY_ID']),

            changeList() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    console.log(this.listId)
                    this.CHANGE_LIST_BY_ID({
                        listId: this.listId,
                        listName: this.listName,
                        listColor: this.color,
                        listDays: this.days
                    });
                    this.$emit('closeChangeDialog')
                }

            },
            deleteList() {
                this.DELETE_LIST_BY_ID(this.listId);
                this.delDialog = false;
                this.$emit('closeChangeDialog')
            }

        },
    };
</script>
<style lang="scss" scoped>
    .v-card__title{
        word-break: normal;
    }
</style>
