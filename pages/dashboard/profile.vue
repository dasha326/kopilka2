<template>
    <v-card class="column-card">
        <v-row>
            <v-col>
                <v-card
                    max-width="300"
                    class="mx-auto"
                >
                    <v-img
                        :src="updatedImage"
                        height="310px"
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
                        <v-btn>
                            <input id="file"
                                   type="file"
                                   ref="file"
                                   name="uploadFieldName"
                                   @change="onFileChange($event.target.files)"
                                   style="">
                            <label for="file" >{{updateImageBtnText}}</label>
                        </v-btn>
                    </v-flex>
                    <ProfileForm/>
                </v-card-text>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import ProfileForm from "~/components/forms/ProfileForm";
import {mapGetters, mapState} from "vuex";
export default {
    name: "profile",
    layout: 'withSidebar',
    components: {ProfileForm},
    data () {
        return {
            updatedImage: null,
            updateImageBtnText: 'Изменить аватар'
        }
    },
    methods: {
        onFileChange(files){
            const image = files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                this.updatedImage = e.target.result;
                this.updateImageBtnText = 'Сохранить'
            };
        }
    },
    watch: {
        userImage: {
            immediate: true,
            handler(newValue) {
                if(newValue) {
                    this.updatedImage = newValue
                }
            }
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
    }
}
</script>

<style scoped>
    .column-card{
        padding: 25px 15px;
        height: 100%;
        overflow-y: scroll;
    }
</style>
