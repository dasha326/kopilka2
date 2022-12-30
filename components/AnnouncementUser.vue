<template>

</template>

<script>
import { mapState } from 'vuex'

export default {
    name: "announcementUser",
    computed:{
        ...mapState(['user/user'])
    },
}
</script>

<style scoped>

</style>
