import localforage from 'localforage'

import User from '../types/User'

const getUsers = (): Promise<User[]> => {
  return localforage.getItem('users').then((users: {}) => {
    return users as User[]
  })
}

export default getUsers

