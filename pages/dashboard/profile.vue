<template>
    <v-layout column>
        <v-card>
            <v-card-text>
                <v-flex class="mb-4">
                    <v-avatar size="96" class="mr-4">
                        <img :src="'/avatars/avatar_' + (form.avatar.toLowerCase()) + '.png'" alt="Avatar">
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
