import Vue from 'vue'
import Vuex from 'vuex'

import token, { State as TokenState } from './modules/token'

Vue.use(Vuex)

/**
 * Root state
 */
export interface State {
  token: TokenState
}

const store = new Vuex.Store({
  modules: { token },
})

export default store
