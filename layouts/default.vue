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
import TheHeader from "@/components/TheHeader";
import TheFooter from "@/components/TheFooter";
export default {
  name: 'DefaultLayout',
  components: {TheHeader, TheFooter},
  data () {
    return{
    }
  }
}
</script>
