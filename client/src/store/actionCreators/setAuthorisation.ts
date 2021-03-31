import { IWeakUserData, userDataActionTypes } from '../../types/userDataTypes'
import { ILoginData } from '../../types/userDataTypes'

export const requestLogin = (data: ILoginData) => {
  return { type: userDataActionTypes.REQUEST_LOGIN, data }
}

export const requestLoginStart = (data: ILoginData) => {
  return { type: userDataActionTypes.REQUEST_LOGIN_START, data }
}

export const requestLoginSuccess = (payload: IWeakUserData) => {
  return { type: userDataActionTypes.REQUEST_LOGIN_SUCCESS, payload }
}

export const requestLoginError = (error: string) => {
  return { type: userDataActionTypes.REQUEST_LOGIN_FAILURE, payload: error }
}

export const requestReg = (data: ILoginData) => {
  return { type: userDataActionTypes.REQUEST_REG, data }
}

export const requestRegStart = () => {
  return { type: userDataActionTypes.REQUEST_REG_START }
}

export const requestRegSuccess = (message: string) => {
  return { type: userDataActionTypes.REQUEST_REG_SUCCESS, message }
}

export const requestRegError = (error: string) => {
  return { type: userDataActionTypes.REQUEST_REG_FAILURE, payload: error }
}

export const logout = () => ({ type: userDataActionTypes.USER_LOGOUT })

export const loginLocally = (payload: IWeakUserData) => {
  return { type : userDataActionTypes.LOGIN_LOCALLY, payload }
  }
