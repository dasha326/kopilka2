<template>
  <v-app-bar app clipped-left>
    <v-app-bar-nav-icon v-if="isMenu" @click.stop="isDrawer = !isDrawer" />
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer />
  </v-app-bar>
</template>

<script>
export default {
  name: "TheHeader",
  props: ['isMenu'],
  data() {
    return {
      isDrawer: true,
      title: 'Твоя копилка'
    }
  },
  watch: {
    isDrawer() {
      this.$store.commit('SET_DRAWER', this.isDrawer);
    }
  },
  mounted() {


  },
  created() {
  }
}
</script>

<style scoped>

</style>
