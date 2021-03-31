import { IWeakUserData } from '../types/userDataTypes'

const storageName = 'userData'

export const login = (jwtToken: string, id: string): void => {
  localStorage.setItem(storageName, JSON.stringify({token: jwtToken, userId: id}))
}

export const logout = (): void => {
  localStorage.removeItem(storageName)
}

export const checkStorage = (): IWeakUserData | void => {
  const data = JSON.parse(localStorage.getItem(storageName) ?? '{"data": "false"}')

  if (data.userId && data.token) {
    return data
  }
}

