<template>
    <v-form
        ref="form"
        @submit.prevent="onLogIn()"
    >
        <v-text-field
            v-model="user.login"
            name="login"
            label="Логин"
            required
        ></v-text-field>

        <v-text-field
            v-model="user.password"
            name="password"
            label="Пороль"
            required
        ></v-text-field>

        <v-btn
            type="submit"
            color="purple"
            class="mr-4"
        >
            Войти
        </v-btn>
        <p v-if="$store.getters.getAuth">Вы вошли</p>
    </v-form>
</template>

<script>
import {mapActions} from 'vuex';
    export default {
        data: () => ({
            user: {
                login: '',
                password: ''
            }
        }),

        methods: {
            ...mapActions('user', ['logIn']),
            ...mapActions(['nuxtServerInit']),

            async onLogIn(){
                const isAuth = await this.logIn(this.user);
                if(isAuth) {
                    this.$router.push('/dashboard');
                }

            }
        },
    };
</script>
