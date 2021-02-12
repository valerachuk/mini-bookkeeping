<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-title>
        {{ routeTitle }}
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  mounted () {
    this.routeTitle = this.$route.meta.title;
  },

  watch: {
    $route (to) {
      console.log(to);
      this.routeTitle = to.meta.title;
    }
  },

  data: () => ({
    routeTitle: null
  })
};
</script>

<style>
html {
  overflow: auto !important;
}
</style>
