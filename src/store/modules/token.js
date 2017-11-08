import {wait} from '../../utils'
import UUIDv4 from 'uuid/v4'

const SettingToken = 'TOKEN__SETTING_TOKEN'

/**
 * Obtains token
 */
export const ObtainToken = 'TOKEN__OBTAIN_TOKEN'

export default {
  state () {
    return {
      token: null
    }
  },
  mutations: {
    [SettingToken] (state, {token}) {
      state.token = token
    }
  },
  actions: {
    [ObtainToken] ({commit}, {username, password}) {
      return wait(1000).then(() => {
        if (username !== 'user' || password !== 'pass') {
          return Promise.reject(new Error('Invalid credential'))
        }

        commit(SettingToken, {token: UUIDv4()})
      })
    }
  }
}
