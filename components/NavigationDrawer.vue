<template>
  <v-navigation-drawer
    app
    clipped
  >
    <v-list density="compact">
      <v-sheet
        color="primary"
        class="pa-4"
      >
        <v-avatar
          class="mb-4"
          color="white darken-1"
          size="64"
        ></v-avatar>

      </v-sheet>

      <v-divider></v-divider>
      <h2 class="pl-5 pt-5">Мои копилки</h2>

      <v-list-item
        v-for="(item, i) in userList"
        :key="item.name+i"
        :value="item"
        active-color="primary"
        pl-14
      >
        <template v-slot:prepend>
          <v-icon>{{ item.icon }}</v-icon>
        </template>
        <v-list-item-title v-text="item.name"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "NavigationDrawer",
  data() {
    return {
    }
  },
  computed:{
    userList(){
      const user = this.$store.getters.getUser
      console.log(user)
      return user;
    },
    // isDrawer(){
    //   return this.$store.getters.getIsDrawer;
    // }
  },
}
</script>

<style scoped>

</style>
