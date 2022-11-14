<template>
    <v-card>
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
                                >Close
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
                            >Close
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
    import SignIn from "../components/SignIn";
    import SignUp from "../components/SignUp";

    export default {
        name: 'IndexPage',
        components: {SignIn, SignUp}
    }
</script>
