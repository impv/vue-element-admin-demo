import localforage from 'localforage'
import { ActionContext } from 'vuex'

import { State as RootState } from '../'

import obtainToken from '../../lib/obtainToken'

const SettingToken = 'TOKEN__SETTING_TOKEN'

/**
 * Obtains token
 */
export const ObtainToken = 'TOKEN__OBTAIN_TOKEN'

export interface ObtainToken {
  username: string
  password: string
}

/**
 * Clears token
 */
export const ClearToken = 'TOKEN__CLEAR_TOKEN'

/**
 * Load token using localforage
 */
export const LoadLocalToken = 'TOKEN__LOAD_LOCAL_TOKEN'

/**
 * Module's state
 */
export interface State {
  token: string | null
}

type Context = ActionContext<State, RootState>

export default {
  state(): State {
    return {
      token: null
    }
  },
  mutations: {
    [SettingToken](state: State, token: string) {
      state.token = token
    }
  },
  actions: {
    [LoadLocalToken]({ commit }: Context) {
      return localforage.getItem('token').then(token => {
        commit(SettingToken, token as string)
      })
    },
    [ObtainToken]({ commit, rootState }: Context, credential: ObtainToken) {
      const { username, password } = credential

      return obtainToken(username, password).then(token => {
        commit(SettingToken, token)

        localforage.setItem('token', token)

        return token
      })
    },
    [ClearToken]({ commit }: Context) {
      commit(SettingToken, null)

      localforage.removeItem('token')
    }
  }
}
