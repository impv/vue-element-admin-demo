import localforage from 'localforage'

import User from '../types/User'

import getUsers from './getUsers'

const registerUser = (user: User): Promise<void> => {
  return getUsers().then((users: User[]) => {
    if (users.find(({ name }) => user.name === name)) {
      return Promise.reject(new Error('Specified name already used'))
    }

    return localforage.setItem('users', [...users, user]).then(() => Promise.resolve())
  })
}

export default registerUser
