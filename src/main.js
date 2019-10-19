import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import { routes } from './routes';

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.options.root = 'https://api.spotify.com/v1/browse/categories';
Vue.http.headers.common['Authorization'] = 'Bearer <YOUR ACCESS TOKEN HERE>' 

const router = new VueRouter({
  routes,
  mode: 'history'
});

export const eventBus = new Vue();

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});


