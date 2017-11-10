export default interface User {
  name: string
  age: number
  password: string
}

export const isValid = (user: User, otherUsers: User[]): boolean => {
  return !validateName(user, otherUsers) && !validatePassword(user)
}

export const validateName = (user: User, otherUsers: User[]): string => {
  if (!user.name) {
    return 'Name is required'
  }

  if (otherUsers.some(({ name }) => name === user.name)) {
    return 'This name is already used by another user'
  }

  return ''
}

export const validatePassword = (user: User): string => {
  if (!user.password) {
    return 'Password is required'
  }

  if (user.password.length < 8) {
    return 'Password must be least 8 characters'
  }

  return ''
}

export const validateAge = (user: User): string => {
  if (user.age < 0 || user.age > 150) {
    return 'Please type correct age'
  }

  return ''
}
