<template>
    <v-layout column>
        <v-card>
            <v-row>
                <v-col>

                </v-col>
                <v-col>

                </v-col>
            </v-row>
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
        </v-card>
    </v-layout>
  <!--  <v-card
        max-width="375"
        class="mx-auto"
    >
        <v-img
            src="https://cdn.vuetifyjs.com/images/lists/ali.png"
            height="300px"
            dark
        >
            <v-row class="fill-height">
                <v-card-title>
                    <v-btn
                        dark
                        icon
                    >
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>

                    <v-spacer></v-spacer>

                    <v-btn
                        dark
                        icon
                        class="mr-4"
                    >
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>

                    <v-btn
                        dark
                        icon
                    >
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </v-card-title>

                <v-spacer></v-spacer>

                <v-card-title class="white&#45;&#45;text pl-12 pt-12">
                    <div class="text-h4 pl-12 pt-12">
                        Ali Conners
                    </div>
                </v-card-title>
            </v-row>
        </v-img>

        <v-list two-line>
            <v-list-item>
                <v-list-item-icon>
                    <v-icon color="indigo">
                        mdi-phone
                    </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>(650) 555-1234</v-list-item-title>
                    <v-list-item-subtitle>Mobile</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-icon>
                    <v-icon>mdi-message-text</v-icon>
                </v-list-item-icon>
            </v-list-item>

            <v-list-item>
                <v-list-item-action></v-list-item-action>

                <v-list-item-content>
                    <v-list-item-title>(323) 555-6789</v-list-item-title>
                    <v-list-item-subtitle>Work</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-icon>
                    <v-icon>mdi-message-text</v-icon>
                </v-list-item-icon>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
                <v-list-item-icon>
                    <v-icon color="indigo">
                        mdi-email
                    </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>aliconnors@example.com</v-list-item-title>
                    <v-list-item-subtitle>Personal</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-list-item>
                <v-list-item-action></v-list-item-action>

                <v-list-item-content>
                    <v-list-item-title>ali_connors@example.com</v-list-item-title>
                    <v-list-item-subtitle>Work</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
                <v-list-item-icon>
                    <v-icon color="indigo">
                        mdi-map-marker
                    </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>1400 Main Street</v-list-item-title>
                    <v-list-item-subtitle>Orlando, FL 79938</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-card>-->
</template>

<script>
import ProfileForm from "@/components/forms/ProfileForm";
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
    }
}
</script>

<style scoped>
    .layout{
        height: 100%;
        overflow-y: scroll;
    }
</style>
