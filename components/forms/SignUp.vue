<template>
    <v-form
        ref="form"
        @submit.prevent="submitData()">
        <v-text-field
            class="mt-4"
            :error-messages="nameErrors"
            name="login"
            label="Логин"
            required
            v-model.trim="$v.user.login.$model"
        />
        <v-text-field
            class="mt-4"
            :error-messages="passwordErrors"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            label="Пароль"
            required
            v-model.trim="$v.user.password.$model"
            @click:append="showPassword = !showPassword"/>
        <v-text-field
            class="mt-4"
            :error-messages="repeatPasswordErrors"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            name="password-repeat"
            label="Повторить пороль"
            required
            v-model="$v.user.repeatPassword.$model"
            @click:append="showPassword = !showPassword"/>
        <v-text-field
            :error-messages="emailErrors"
            name="email"
            label="E-mail"
            type="email"
            required
            v-model="$v.user.email.$model"
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
            color="purple"
            class="mr-4"
            type="submit"
        >Зарегистрироваться</v-btn>
    </v-form>
</template>

<script>
import {validationMixin} from "vuelidate";
import {required, email, sameAs} from "vuelidate/lib/validators";
import {mapActions} from "vuex";
import {mask} from 'vue-the-mask';

export default {
    mixins: [validationMixin],
    directives: {mask},
    validations: {
        user: {
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
        showError: false,
        showPassword: false,
        user: {
            login: '',
            password: '',
            repeatPassword: '',
            email: '',
            name: '',
            preName: '',
            birth: ''
        }
    }),
    computed: {
        nameErrors() {
            const errors = [];
            if (!this.$v.user.login.$dirty) return errors;
            if (!this.$v.user.login.required) errors.push('Без логина не зарегистрироваться');
            return errors
        },
        passwordErrors() {
            const errors = [];
            if (!this.$v.user.password.$dirty) return errors;
            if (!this.$v.user.password.required) errors.push('Пароль не заполнен');
            return errors;
        },
        repeatPasswordErrors() {
            const errors = [];
            if (!this.$v.user.repeatPassword.sameAsPassword) errors.push('Пароли должны совпадать');
            return errors;
        },
        emailErrors() {
            const errors = [];
            if (!this.$v.user.email.$dirty) return errors;
            if (!this.$v.user.email.email) errors.push('Необходима корректная почта для регистрации');
            if (!this.$v.user.email.required) errors.push('Нужна почта');
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
                    login: this.user.login,
                    password: this.user.password,
                    name: this.name || '',
                    preName: this.preName || '',
                    email: this.email,
                    birth: this.birth || '',
                    img: null,
                    list: null
                }
                console.log(user)
                this.addNewUser(user)
                // const isAuth = await this.logIn(this.user);
                // if (isAuth) {
                //     this.$router.push('/dashboard');
                // } else {
                //     this.showError = true;
                // }
            }
        }
    },
};
</script>
