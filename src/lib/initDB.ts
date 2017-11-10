import localforage from 'localforage'

const initDB = (): Promise<void> => {
  return initUsersCollection()
}

export default initDB

const initUsersCollection = (): Promise<void> => {
  return localforage.getItem('users').then(users => {
    if (!users) {
      return localforage.setItem('users', []).then(() => Promise.resolve())
    }
  })
}
