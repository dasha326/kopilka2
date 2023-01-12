<template>
    <v-card v-if="isUserAuth">
        <v-toolbar flat>
            <v-toolbar-title>Привет, {{currentUserName}}</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-banner>
           Рады снова тебя видеть
            <v-spacer></v-spacer>
            <v-btn
                class="mt-4"
                color="primary"
                @click="goToDashboard()"
            >К копилкам
            </v-btn>
        </v-banner>

    </v-card>
    <v-card v-else>
        <v-toolbar flat>
            <v-toolbar-title>Привет, незнакомец</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-banner>
            Тут ты сможешь создать свою копилку
            <template v-slot:actions="{ dismiss }">
                <v-dialog transition="dialog-bottom-transition" max-width="600">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary"
                            v-bind="attrs"
                            v-on="on"
                        >Войти
                        </v-btn>
                    </template>
                    <template v-slot:default="dialog">
                        <v-card>
                            <v-toolbar color="primary" class="pl-5 pr-5">Войти в акаунт</v-toolbar>
                            <v-card-text>
                                <SignIn/>
                            </v-card-text>
                            <v-card-actions class="justify-end">
                                <v-btn
                                    text
                                    @click="dialog.value = false"
                                >Закрыть
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </template>
                </v-dialog>
                <v-dialog transition="dialog-bottom-transition" max-width="600">
                    <template v-slot:activator="{on, attrs }">
                        <v-btn
                            color="primary"
                            v-bind="attrs"
                            v-on="on"
                        >Регистрация
                        </v-btn>
                    </template>
                    <template v-slot:default="{ dialog }">
                        <v-card>
                            <v-toolbar color="primary" class="pl-5 pr-5">Регистрируем нового пользователя</v-toolbar>
                            <v-card-text>
                                <SignUp/>
                            </v-card-text>
                            <v-card-actions class="justify-end">
                                <v-btn
                                    text
                                    @click="dialog.value = false"
                                >Закрыть
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </template>
                </v-dialog>
            </template>
        </v-banner>

    </v-card>
</template>

<script>
    import SignIn from "~/components/forms/SignIn";
    import SignUp from "~/components/forms/SignUp";
    import {mapState, mapGetters} from "vuex";

    export default {
        name: 'IndexPage',
        components: {SignIn, SignUp},
        methods: {
            goToDashboard(){
                this.$router.push(`/dashboard`)
            }
        },
        computed: {
            ...mapState('user', ['isAuth']),
            ...mapGetters('user', ['userName']),
            isUserAuth() {
                return this.isAuth
            },
            currentUserName(){
                return this.userName
            }
        }
    }
</script>
