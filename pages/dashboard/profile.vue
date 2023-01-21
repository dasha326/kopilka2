<template>
    <v-layout column>

        <v-card>
            <v-row>
                <v-col>
                    <v-card
                        max-width="375"
                        class="mx-auto"
                    >
                        <v-img
                            :src="currentUserImage"
                            height="300px"
                            dark
                        ></v-img>
                        <v-card-title class="">
                            <div class="text-h4 ">
                                {{currentUserName}}
                            </div>
                        </v-card-title>
                        <v-list two-line>
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="indigo">
                                        mdi-email
                                    </v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                    <v-list-item-title>{{currentUser.email}}</v-list-item-title>
                                    <v-list-item-subtitle>Почта</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider inset></v-divider>

                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="indigo">
                                        mdi-calendar
                                    </v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                    <v-list-item-title>{{currentUser.birth}}</v-list-item-title>
                                    <v-list-item-subtitle>Дата рождения</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider inset></v-divider>

                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="indigo">
                                        mdi-chart-box-outline
                                    </v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                    <v-list-item-title>{{currentUser.list.length}}</v-list-item-title>
                                    <v-list-item-subtitle>Копилки</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card-text>
                        <v-flex class="mb-4">
                            <v-avatar size="96" class="mr-4">
                                <!--                        <img :src="'/avatars/avatar_' + (form.avatar.toLowerCase()) + '.png'" alt="Avatar">-->
                            </v-avatar>
                            <v-btn @click="openAvatarPicker">Change Avatar</v-btn>
                        </v-flex>
                        <ProfileForm/>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" :loading="loading" @click.native="update">
                            <v-icon left dark>check</v-icon>
                            Save Changes
                        </v-btn>
                    </v-card-actions>
                </v-col>
            </v-row>
        </v-card>

    </v-layout>
</template>

<script>
import ProfileForm from "@/components/forms/ProfileForm";
import {mapGetters, mapState} from "vuex";
export default {
    name: "profile",
    layout: 'withSidebar',
    components: {ProfileForm},
    data () {
        return {
            loading: false,

            showAvatarPicker: false
        }
    },
    methods: {
        openAvatarPicker () {
            this.showAvatarPicker = true
        },
        selectAvatar (avatar) {
            this.form.avatar = avatar
        }
    },
    computed: {
        ...mapState(['isDrawer']),
        ...mapState('user', ['isAuth', 'user']),
        ...mapGetters('user', ['userName', 'userImage']),
        currentUser(){
            return this.user;
        },
        userIsAuth() {
            return this.isAuth;
        },
        currentUserName() {
            return this.userName;
        },
        currentUserImage(){
            return this.userImage;
        },
    }
}
</script>

<style scoped>
    .layout{
        height: 100%;
        overflow-y: scroll;
    }
</style>
