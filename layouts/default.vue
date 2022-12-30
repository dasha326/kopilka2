<template>
  <v-app dark>
    <TheHeader :isMenu="false"/>
    <v-main>
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
export default {
  name: 'DefaultLayout',
  components: {TheHeader, TheFooter},
  data () {
    return{
    }
  }
}
</script>
