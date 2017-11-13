import localforage from 'localforage'

import User from '../types/User'

import getUsers from './getUsers'

const deleteUser = (user: User): Promise<void> => {
  return getUsers().then((users: User[]) => {
    if (!users.find(u => u.name === user.name)) {
      return Promise.reject(new Error(`Specified user "${name}" does not exist`))
    }

    const updatedList = users.filter(u => u.name !== user.name)

    return localforage.setItem('users', updatedList).then(() => Promise.resolve())
  })
}

export default deleteUser
