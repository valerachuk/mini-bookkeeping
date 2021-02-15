<template>
  <v-app>
    <notifications> </notifications>

    <v-app-bar app color="primary" dark>
      <v-toolbar-title>
        {{ routeTitle }}
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { Notifications } from '@/components';
import { NotificationsService } from '@/services';
import { ipcRenderer } from 'electron';

export default {
  components: {
    Notifications
  },

  mounted () {
    this.routeTitle = this.$route.meta.title;
    window.onunhandledrejection = e =>
      NotificationsService.fireError(e.reason.message);
    window.onerror = e => NotificationsService.fireError(e);

    ipcRenderer.on('router:push', (_e, route) => {
      if (this.$route.name === route.name) return;
      this.$router.push(route);
    });
  },

  watch: {
    $route (to) {
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
