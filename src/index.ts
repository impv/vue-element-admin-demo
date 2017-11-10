import localforage from 'localforage'
import Vue, { ComponentOptions } from 'vue'
import VueMeta from 'vue-meta'

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ja'
import 'element-ui/lib/theme-chalk/index.css'

import store from './store'

import App from './components/App.vue'
import initDB from './lib/initDB'

Vue.use(VueMeta)
Vue.use(ElementUI, { locale })

localforage.config({
  name: 'vue-element-admin-demo'
})

initDB()

/**
 * Root component
 */
const app = new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  store
})

export default app
