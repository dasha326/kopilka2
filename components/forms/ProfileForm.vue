<template>
    <v-form
        ref="form"
        @submit.prevent="submitNewData()"
    >
        <v-text-field
            class="mt-4"
            :error-messages="nameErrors"
            name="login"
            label="Логин"
            required
            v-model.trim="$v.currentUser.login.$model"
        />
        <v-text-field
            :error-messages="emailErrors"
            name="email"
            label="E-mail"
            type="email"
            required
            v-model="$v.currentUser.email.$model"
        />
        <h4>Дополнительная информация</h4>
        <v-text-field name="name" label="Ваше имя" v-model="currentUser.name"/>
        <v-text-field
            name="prename"
            label="Как к вам обращаться"
            placeholde="Госпожа / Господин"
            v-model="currentUser.preName"/>
        <v-text-field
            v-model="currentUser.birth"
            name="birth"
            type="tel"
            v-mask="['##.##.####']"
            placeholder="##.##.####"
            label="Дата рождения"/>
        <v-btn
            type="submit"
            color="purple"
            class="mt-4"
        >
            Сохранить
        </v-btn>
        <v-btn
            type="button"
            color="error"
            class="mt-4"
            @click.stop="passwordDialog = true"
        >
            Сменить пароль
        </v-btn>
        <v-dialog
            v-model="passwordDialog"
            max-width="500"
        >
            <v-card>
                <v-toolbar color="primary" class="pl-5 pr-5">Сменить пароль</v-toolbar>
                <v-card-text>
                    <v-text-field
                        class="mt-4"
                        :error-messages="oldPasswordErrors"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPassword ? 'text' : 'password'"
                        name="password"
                        label="Старый пароль"
                        required
                        v-model.trim="$v.oldPassword.$model"
                        @click:append="showPassword = !showPassword"/>
                    <v-text-field
                        class="mt-4"
                        :error-messages="newPasswordErrors"
                        :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPassword2 ? 'text' : 'password'"
                        name="password"
                        label="Новый пароль"
                        required
                        v-model.trim="$v.newPassword.$model"
                        @click:append="showPassword2 = !showPassword2"/>
                    <v-text-field
                        class="mt-4"
                        :error-messages="repeatNewPasswordErrors"
                        :append-icon="showPassword3 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPassword3 ? 'text' : 'password'"
                        name="password-repeat"
                        label="Повторить пороль"
                        required
                        v-model="$v.repeatNewPassword.$model"
                        @click:append="showPassword3 = !showPassword3"/>
                    <v-btn
                        type="button"
                        color="purple"
                        class="mt-4"
                        @click="submitNewData()"
                    >
                        Сохранить
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-form>
</template>

<script>
import {validationMixin} from "vuelidate";
import {required, email, sameAs} from "vuelidate/lib/validators";
import {mapActions, mapMutations, mapState} from "vuex";
import {mask} from 'vue-the-mask';

export default {
    name: 'ProfileForm',
    mixins: [validationMixin],
    directives: {mask},
    validations: {
        currentUser: {
            login: {required,},
            email: {
                required ,
                email
            }
        },
        oldPassword: {},
        newPassword: {},
        repeatNewPassword: {
            sameAsPassword: sameAs( function(){return this.newPassword} )
        },
    },
    data: () => ({
        showError: false,
        showPassword: false,
        showPassword2: false,
        showPassword3: false,
        currentUser: {},
        oldPassword: '',
        newPassword: null,
        repeatNewPassword: null,
        passwordDialog: false
    }),
    watch: {
        user: {
            immediate: true,
            handler(newValue) {
                if(newValue) {
                    this.currentUser = Object.assign(this.currentUser, newValue);
                }
            }
        }
    },
    computed: {
        ...mapState('user', ['user']),
        nameErrors() {
            const errors = [];
            if (!this.$v.currentUser.login.$dirty) return errors;
            if (!this.$v.currentUser.login.required) errors.push('Логин должен быть заполнен');
            return errors
        },
        oldPasswordErrors() {
            const errors = [];
            if (!this.$v.oldPassword.$dirty) return errors;
            if (this.oldPassword !== this.user.password) errors.push('Старый пароль не верен');
            return errors;
        },
        newPasswordErrors() {
            const errors = [];
            if (!this.$v.newPassword.$dirty) return errors;
            return errors;
        },
        repeatNewPasswordErrors() {
            const errors = [];
            if (!this.$v.repeatNewPassword.sameAsPassword) errors.push('Пароли должны совпадать');
            return errors;
        },
        emailErrors() {
            const errors = [];
            if (!this.$v.currentUser.email.$dirty) return errors;
            if (!this.$v.currentUser.email.email) errors.push('Необходима корректная почта для регистрации');
            if (!this.$v.currentUser.email.required) errors.push('Нужна почта');
            return errors
        },
    },
    methods: {
        ...mapActions('user', ['changeUser']),

        async submitNewData() {
            this.showError = false;
            this.$v.$touch();
            if (!this.$v.$invalid) {
                const user = Object.assign(this.currentUser, this.user, {password: this.newPassword || this.user.password});
                this.passwordDialog = false
                this.changeUser(user)
            }
        }
    },
};
</script>
<style lang="scss" scoped>
</style>
