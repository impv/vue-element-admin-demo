import { ActionContext } from 'vuex'
import { v4 as UUIDv4 } from 'uuid'

import { State as RootState } from '../'
import { wait } from '../../utils'

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
 * Module's state
 */
export interface State {
  token: string | null
}

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
    [ObtainToken]({ commit, rootState }: ActionContext<State, RootState>, credential: ObtainToken) {
      const { username, password } = credential

      return wait(1000).then(() => {
        if (username !== 'user' || password !== 'pass') {
          return Promise.reject(new Error('Invalid credential'))
        }

        commit(SettingToken, { token: UUIDv4() })

        return Promise.resolve()
      })
    }
  }
}
