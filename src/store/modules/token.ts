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

export const ClearToken = 'TOKEN__CLEAR_TOKEN'

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
    [ObtainToken]({ commit, rootState }: Context, credential: ObtainToken) {
      const { username, password } = credential

      return obtainToken(username, password).then(token => {
        commit(SettingToken, { token })
      })
    },
    [ClearToken]({ commit }: Context) {
      commit(SettingToken, { token: null })
    }
  }
}
