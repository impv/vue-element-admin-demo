import Vue from 'vue'
import Vuex from 'vuex'

import token, { State as TokenState } from './modules/token'
import users, { State as UsersState } from './modules/users'

Vue.use(Vuex)

/**
 * Root state
 */
export interface State {
  token: TokenState
  users: UsersState
}

const store = new Vuex.Store({
  modules: { token, users }
})

export default store
