import localforage from 'localforage'

import User from '../types/User'

import getUsers from './getUsers'

const updateUser = (name: string, user: User): Promise<void> => {
  return getUsers().then((users: User[]) => {
    if (!users.find(u => u.name === name)) {
      return Promise.reject(new Error(`Specified user "${name}" does not exist`))
    }

    const newUsers = users.map(u => {
      if (u.name !== name) {
        return u
      }

      return user
    })

    return localforage.setItem('users', newUsers).then(() => Promise.resolve())
  })
}

export default updateUser
