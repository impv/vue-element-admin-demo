import { ActionContext } from 'vuex'

import { State as RootState } from '../'

import User from '../../types/User'

import getUsers from '../../lib/getUsers'
import registerUser from '../../lib/registerUser'

const SettingUsers = 'USERS__SETTING_USERS'

/**
 * Get users list
 */
export const GetUsers = 'USERS__GET_USERS'

/**
 * Add user to local store
 */
export const AddUser = 'USERS__ADD_USER'

export type AddUser = User

/**
 * Module's state
 */
export interface State {
  users: User[]
}

type Context = ActionContext<State, RootState>

export default {
  state(): State {
    return {
      users: []
    }
  },
  mutations: {
    [SettingUsers](state: State, users: User[]) {
      state.users = users
    }
  },
  actions: {
    [GetUsers]({ commit }: Context) {
      return getUsers().then(users => {
        commit(SettingUsers, users)
      })
    },
    [AddUser]({ dispatch }: Context, user: User) {
      return registerUser(user).then(() => {
        return dispatch(GetUsers)
      })
    }
  }
}
