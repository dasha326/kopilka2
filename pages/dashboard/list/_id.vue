<template>
    <v-card class="user-list" v-if="userList">
        <InfoList :todayDay="userList.todayDay" :days="userList.days" :name="userList.name"/>
        <CardsList :listName="userList.name" :todayDay="userList.todayDay" :days="userList.days" :color="userList.color"/>
    </v-card>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "listPage",
    layout: 'withSidebar',
    data: () => ({
    }),
    computed: {
        ...mapState('user', ['user', 'isAuth']),
        userList() {
            const currentPageId = this.$route.params.id - 1;
            if (this.user !== null) return this.user.list[currentPageId];
        },
    },
}
</script>

<style scoped>
    .user-list{
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
</style>
