import { REQUEST_LOGIN, REQUEST_LOGIN_START, REQUEST_LOGIN_SUCCESS, REQUEST_LOGIN_FAILURE } from '../actions/authorisation'
import { REQUEST_REG, REQUEST_REG_START, REQUEST_REG_SUCCESS, REQUEST_REG_FAILURE } from '../actions/authorisation'
import { USER_LOGOUT, LOGIN_LOCALLY } from '../actions/authorisation'

export const requestLogin = (data) => {
  return { type: REQUEST_LOGIN, data}
}

export const requestLoginStart = (data) => {
  return { type: REQUEST_LOGIN_START, data}
}

export const requestLoginSuccess = (payload) => {
  return { type: REQUEST_LOGIN_SUCCESS, payload}
}

export const requestLoginError = (error) => {
  return { type: REQUEST_LOGIN_FAILURE, payload: error}
}

export const requestReg = (data) => {
  return { type: REQUEST_REG, data}
}

export const requestRegStart = (data) => {
  return { type: REQUEST_REG_START, data}
}

export const requestRegSuccess = (payload) => {
  return { type: REQUEST_REG_SUCCESS, payload}
}

export const requestRegError = (error) => {
  return { type: REQUEST_REG_FAILURE, payload: error}
}

export const logout = () => ({ type: USER_LOGOUT })

export const loginLocally = (payload) => ({ type : LOGIN_LOCALLY, payload})
