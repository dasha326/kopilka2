<template>
  <v-app dark>
    <NavigationDrawer/>
    <TheHeader :isMenu="true"/>
    <v-main app >
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <TheFooter/>
  </v-app>
</template>

<script>

import TheHeader from "~/components/layouts/TheHeader";
import TheFooter from "~/components/layouts/TheFooter";
import NavigationDrawer from "~/components/layouts/NavigationDrawer";
export default {
  name: 'DefaultLayout',
  components: { TheHeader, TheFooter, NavigationDrawer},

  data () {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
    .v-main{
        height: 100vh;
        overflow: hidden;
        .container{
            height: 100%;
        }

    }
</style>
