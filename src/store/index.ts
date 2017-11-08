import Vue from 'vue'
import Vuex from 'vuex'

import token, {State as TokenState} from './modules/token'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {token}
})

export default store

export interface State {
  token: TokenState
}