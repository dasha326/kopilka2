<template>
    <v-card>
        <TheList/>
    </v-card>
</template>

<script>
import TheList from "@/components/TheList";

export default {
    name: "DashboardView",
    components: {TheList},
    middleware: ['auth'],
    layout: 'withSidebar'

}
</script>

<style scoped>

</style>
