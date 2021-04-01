import { actionTypes } from '../../types/actionTypes'
import { ILoginData, IWeakUserData } from '../../types/stateTypes'

export const requestLogin = (data: ILoginData) => {
  return { type: actionTypes.REQUEST_LOGIN, data }
}
export const requestLoginStart = (data: ILoginData) => {
  return { type: actionTypes.REQUEST_LOGIN_START, data }
}
export const requestLoginSuccess = (payload: IWeakUserData) => {
  return { type: actionTypes.REQUEST_LOGIN_SUCCESS, payload }
}
export const requestLoginError = (error: string) => {
  return { type: actionTypes.REQUEST_LOGIN_FAILURE, payload: error }
}


export const requestReg = (data: ILoginData) => {
  return { type: actionTypes.REQUEST_REG, data }
}
export const requestRegStart = (data: ILoginData) => {
  return { type: actionTypes.REQUEST_REG_START, data }
}
export const requestRegSuccess = (message: string) => {
  return { type: actionTypes.REQUEST_REG_SUCCESS, payload: message }
}
export const requestRegError = (error: string) => {
  return { type: actionTypes.REQUEST_REG_FAILURE, payload: error }
}


export const logout = () => ({ type: actionTypes.USER_LOGOUT })

export const loginLocally = (payload: IWeakUserData) => {
  return { type : actionTypes.LOGIN_LOCALLY, payload }
}
