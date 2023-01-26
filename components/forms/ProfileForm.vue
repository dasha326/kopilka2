<template>
    <v-form
        ref="form"
        @submit.prevent=""
    >
        <v-text-field
            class="mt-4"
            :error-messages="nameErrors"
            name="login"
            label="Логин"
            required
            :value="currentUser.name"
            v-model.trim="$v.currentUser.login.$model"
        />
        <v-text-field
            class="mt-4"
            :error-messages="passwordErrors"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            label="Пароль"
            required
            v-model.trim="$v.currentUser.password.$model"
            @click:append="showPassword = !showPassword"/>
        <v-text-field
            class="mt-4"
            :error-messages="repeatPasswordErrors"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            name="password-repeat"
            label="Повторить пороль"
            required
            v-model="$v.currentUser.repeatPassword.$model"
            @click:append="showPassword = !showPassword"/>
        <v-text-field
            :error-messages="emailErrors"
            name="email"
            label="E-mail"
            type="email"
            required
            v-model="$v.currentUser.email.$model"
        />
        <h4>Дополнительная информация</h4>
        <v-text-field name="name" label="Ваше имя" v-model="user.name"/>
        <v-text-field
            name="prename"
            label="Как к вам обращаться"
            placeholde="Госпожа / Господин"
            v-model="user.preName"/>
        <v-text-field
            v-model="user.birth"
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
            Создать
        </v-btn>
    </v-form>
</template>

<script>
import {validationMixin} from "vuelidate";
import {required, email, sameAs} from "vuelidate/lib/validators";
import {mapActions, mapState} from "vuex";
import {mask} from 'vue-the-mask';

export default {
    name: 'ProfileForm',
    mixins: [validationMixin],
    directives: {mask},
    validations: {
        currentUser: {
            login: {required,},
            password: {required},
            repeatPassword: {
                //sameAsPassword: sameAs('user.password')
                sameAsPassword: sameAs( function(){return this.user.password} )
            },
            email: {
                required ,
                email
            }
        }

    },
    data: () => ({
        ...mapState('user', ['user']),
        showError: false,
        showPassword: false,
        currentUser: {
            login: this.user.login,
            password: this.user.password,
            repeatPassword: '',
            email: this.user.email,
            name: this.user.name,
            preName: this.user.preName,
            birth: this.user.birth
        }
    }),
    computed: {
        nameErrors() {
            const errors = [];
            if (!this.$v.currentUser.login.$dirty) return errors;
            if (!this.$v.currentUser.login.required) errors.push('Без логина не зарегистрироваться');
            return errors
        },
        passwordErrors() {
            const errors = [];
            if (!this.$v.currentUser.password.$dirty) return errors;
            if (!this.$v.currentUser.password.required) errors.push('Пароль не заполнен');
            return errors;
        },
        repeatPasswordErrors() {
            const errors = [];
            if (!this.$v.currentUser.repeatPassword.sameAsPassword) errors.push('Пароли должны совпадать');
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
        ...mapActions('user', ['addNewUser']),

        async submitData() {
            this.showError = false;
            this.$v.$touch();
            if (!this.$v.$invalid) {
                const user = {
                    id: 2,
                    login: this.currentUser.login,
                    password: this.currentUser.password,
                    name: this.name || '',
                    preName: this.preName || '',
                    email: this.email,
                    birth: this.birth || '',
                    list: null
                }
                //this.addNewUser(user)

            }
        }
    },
};
</script>
<style lang="scss" scoped>
</style>
