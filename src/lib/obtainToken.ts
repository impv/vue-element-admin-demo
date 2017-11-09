import { v4 as UUIDv4 } from 'uuid'

import { wait } from '../utils'

/**
 * Wait 1000ms then returns UUIDv4 (pseudo-token)
 * @param username user
 * @param password pass
 */
const obtainToken = (username: string, password: string): Promise<string> => {
  return wait(1000).then(() => {
    if (username !== 'user' || password !== 'pass') {
      return Promise.reject(new Error('Invalid credential'))
    }

    return Promise.resolve(UUIDv4())
  })
}

export default obtainToken
