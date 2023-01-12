<template>
    <v-form
        ref="form"
        @submit.prevent="onLogIn()"
    >
        <v-text-field
            class="mt-4"
            v-model="user.login"
            :error-messages="nameErrors"
            name="login"
            label="Логин"
            required
            @input="$v.user.login.$touch()"
            @blur="$v.user.login.$touch()"
        ></v-text-field>
        <v-text-field
            class="mt-4"
            v-model="user.password"
            :error-messages="passwordErrors"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            label="Пароль"
            required
            @input="$v.user.password.$touch()"
            @blur="$v.user.password.$touch()"
            @click:append="showPassword = !showPassword"
        ></v-text-field>
        <v-alert
            v-if="showError"
            border="right"
            colored-border
            type="error"
            elevation="2"
        >Логин или пароль, не верны. Попробуйте еще раз</v-alert>
        <v-btn
            type="submit"
            color="purple"
            class="mt-5"
        >
            Войти
        </v-btn>
<!--        <p v-if="$store.getters.getAuth">Вы вошли</p>-->
    </v-form>
</template>

<script>
import {mapActions} from 'vuex';
import { validationMixin } from 'vuelidate'
import { required} from 'vuelidate/lib/validators'
    export default {
        mixins: [validationMixin],
        validations: {
            user: {
                login: { required, },
                password: { required },
            }

        },
        data: () => ({
            showError: false,
            showPassword: false,
            user: {
                login: '',
                password: ''
            }
        }),
        computed: {
            nameErrors () {
                const errors = [];
                if (!this.$v.user.login.$dirty) return errors;
                if (!this.$v.user.login.required) errors.push('Логин надо бы заполнить');
                return errors
            },
            passwordErrors () {
                const errors = [];
                if (!this.$v.user.password.$dirty) return errors;
                if (!this.$v.user.password.required) errors.push('Пароль не заполнен');
                return errors;
            },
        },
        methods: {
            ...mapActions('user', ['checkUser']),
            ...mapActions(['nuxtServerInit']),

            async onLogIn(){
                this.showError = false;
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    const isAuth = await this.checkUser(this.user);
                    if (isAuth) {
                        this.$router.push('/dashboard');
                    } else {
                        this.showError = true;
                    }
                }
            }
        },
    };
</script>
