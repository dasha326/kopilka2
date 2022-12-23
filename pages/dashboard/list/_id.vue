<template>
    <v-card v-if="userList">
        <InfoList :todayDay="userList.todayDay" :days="userList.days" :name="userList.name"/>
        <CardsList :todayDay="userList.todayDay" :days="userList.days" :color="userList.color"/>
    </v-card>
</template>

<script>
export default {
    name: "listPage",
    layout: 'withSidebar',
    data: () => ({
        userList: null
    }),
    async created() {
        const currentPageId = this.$route.params.id;
        const user = this.$store.getters['user/getUser'];
        if (user) {
            this.userList = user.list[currentPageId]
        } else {
            const newUser = await this.$store.dispatch('user/setUser');
            this.userList = newUser.list[currentPageId];
        }
    }
}
</script>

<style scoped>

</style>
