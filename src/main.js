import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { ipcRenderer } from 'electron';

ipcRenderer.on('router:push', (_e, route) => {
  router.push(route);
});

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: function (h) { return h(App); }
}).$mount('#app');
