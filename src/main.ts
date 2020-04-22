import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-image-lightbox/dist/vue-image-lightbox.min.css'
import VueLazyLoad from 'vue-lazyload'


Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(VueLazyLoad);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
