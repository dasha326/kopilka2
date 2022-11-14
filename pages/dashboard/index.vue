<template>
    <v-card>
<!--        <InfoList/>-->
<!--        <v-divider class="mt-10 mb-6"/>-->
<!--        <CardsList/>-->
    </v-card>
</template>

<script>
    import CardsList from "@/components/CardsList";
    import InfoList from "@/components/InfoList";
    export default {
        name: "DashboardView",
        components: {CardsList, InfoList},
        layout: 'withSidebar'

    }
</script>

<style scoped>

</style>