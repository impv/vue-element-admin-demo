import Vue from 'vue'
import VueMeta from 'vue-meta'

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ja'
import 'element-ui/lib/theme-chalk/index.css'

import App from './components/App'

Vue.use(VueMeta)
Vue.use(ElementUI, {locale})

const app = new Vue({
  el: '#app',
  components: {App},
  template: '<App/>'
})

export default app