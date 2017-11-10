export default interface User {
  name: string
  password: string
}

export const isValid = (user: User): boolean => {
  return !validateName(user) && !validatePassword(user)
}

export const validateName = (user: User): string => {
  if (!user.name) {
    return 'Name is required'
  }

  return ''
}

export const validatePassword = (user: User): string => {
  if (!user.password) {
    return 'Password is required'
  }

  return ''
}
