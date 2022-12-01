<template>
  <v-app dark>
    <NavigationDrawer/>
    <TheHeader :isMenu="true"/>
    <v-main app>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <TheFooter/>
  </v-app>
</template>

<script>
import TheHeader from "~/components/TheHeader";
import TheFooter from "~/components/TheFooter";
import NavigationDrawer from "@/components/NavigationDrawer";
export default {
  name: 'DefaultLayout',
  components: {TheHeader, TheFooter, NavigationDrawer},

  data () {
    return {
    }
  }
}
</script>
