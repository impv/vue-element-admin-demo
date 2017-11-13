import { ActionContext } from 'vuex'

import { State as RootState } from '../'

import User from '../../types/User'

import getUsers from '../../lib/getUsers'
import registerUser from '../../lib/registerUser'
import updateUser from '../../lib/updateUser'

const SettingUsers = 'USERS__SETTING_USERS'

interface SettingUsers {
  users: User[]
}

/**
 * Get users list
 */
export const GetUsers = 'USERS__GET_USERS'

/**
 * Add user to local store
 */
export const AddUser = 'USERS__ADD_USER'

export interface AddUser {
  user: User
}

/**
 * Update existing user
 */
export const UpdateUser = 'USERS__UPDATE_USER'

export interface UpdateUser {
  name: string
  user: User
}

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
  getters: {
    getUserByName: (state: State) => (name: string) => state.users.find(
      user => user.name === name
    ) || null,
    getUsersExpect: (state: State) => (expect: User) => state.users.filter(
      user => user.name !== expect.name
    )
  },
  mutations: {
    [SettingUsers](state: State, { users }: SettingUsers) {
      state.users = users
    }
  },
  actions: {
    [GetUsers]({ commit }: Context) {
      return getUsers().then(users => {
        commit(SettingUsers, { users })
      })
    },
    [AddUser]({ dispatch }: Context, { user }: AddUser) {
      return registerUser(user).then(() => {
        return dispatch(GetUsers)
      })
    },
    [UpdateUser]({ dispatch }: Context, { name, user }: UpdateUser) {
      return updateUser(name, user).then(() => {
        return dispatch(GetUsers)
      })
    }
  }
}
