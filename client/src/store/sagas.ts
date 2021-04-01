// import { requestLoginStart, requestLoginError, requestLoginSuccess } from './actionCreators/setAuthorisation'
// import { requestRegStart, requestRegError, requestRegSuccess } from './actionCreators/setAuthorisation'

// import { requestProjects, requestProjectsStart, requestProjectsError, requestProjectsSuccess } from './actionCreators/setProjects'
// import { createProjectStart, createProjectError, createProjectSuccess } from './actionCreators/setProjects'
// import { requestProjectByIdStart, requestProjectByIdError, requestProjectByIdSuccess } from './actionCreators/setProjects'
// import { saveProjectError } from './actionCreators/setProjects'
// import { removeProjectStart, removeProjectError, removeProjectSuccess } from './actionCreators/setProjects'

import { actionTypes } from '../types/actionTypes'


import createAction from './actionCreators/index'

import { takeEvery, put, call } from 'redux-saga/effects'
import httpMiddleware from '../middleware/http'
import { login, logout as clearStorage } from '../middleware/auth'

const { request } = httpMiddleware()

export function* loginRequestWatcher() {
  yield takeEvery(actionTypes.REQUEST_LOGIN, requestLoginAsync)
}

function* requestLoginAsync(params: any): any {  //TODO
  try {
    yield put(createAction.requestLoginStart({...params.data}))
    const response = yield call(() => {
      return request('/api/auth/login', 'POST', {...params.data})
    })
    if (params.data.saveData) {
      yield login(response.token, response.userId)
    }
    yield put(createAction.requestLoginSuccess(response))
  } catch (error) {
    yield put(createAction.requestLoginError(error.message))
  }
}

export function* regRequestWatcher() {
  yield takeEvery(actionTypes.REQUEST_REG, requestRegAsync)
}

function* requestRegAsync(params: any): any {   //TODO
  try {
    yield put(createAction.requestRegStart({...params}))
    const response = yield call(() => {
      return request('/api/auth/register', 'POST', {...params.data})
    })
    yield put(createAction.requestRegSuccess(response.message))
  } catch (error) {
    yield put(createAction.requestRegError(error.message))
  }
}


export function* requestProjectsWatcher() {
  yield takeEvery(actionTypes.REQUEST_PROJECTS, requestProjectsAsync)
}

function* requestProjectsAsync(action: any): any {  // TODO
  try {
    yield put(createAction.requestProjectsStart())
    const response = yield call(() => {
      return request('/api/projects/', 'GET', null, {
        Authorization: `Bearer ${action.token}`
      })
    })
    yield put(createAction.requestProjectsSuccess(response))
  } catch (error) {
    if (error.message === 'No authorisation') {
      yield clearStorage()
      const message = 'Токен устарел'
      const errorCode = 401
      yield put(createAction.requestProjectsError( message, errorCode))
    } else {
      yield put(createAction.requestProjectsError(error.message))
    }
  }
}

export function* createProjectWatcher() {
  yield takeEvery(actionTypes.CREATE_PROJECT, createProjectAsync)
}

function* createProjectAsync(action: any): any {
  try {
    yield put(createAction.createProjectStart())
    const response = yield call(() => {
      return request('/api/projects/create', 'POST', {...action}, {
        Authorization: `Bearer ${action.token}`
      })
    })
    yield put(createAction.createProjectSuccess(response.message))
    yield put(createAction.requestProjects(action.token))
  } catch (error) {
    yield put(createAction.createProjectError(error.message))
    yield put(createAction.requestProjects(action.token))
  }
}


export function* requestProjectByIdWatcher() {
  yield takeEvery(actionTypes.REQUEST_PROJECT_BY_ID, requestProjectByIdAsync)
}

function* requestProjectByIdAsync(action: any): any {   // TODO
  try {
    yield put(createAction.requestProjectByIdStart())
    const response = yield call(() => {
      return request(`/api/projects/${action.linkId}`, 'GET', null, {
        Authorization: `Bearer ${action.token}`
      })
    })
    yield put(createAction.requestProjectByIdSuccess(response))
  } catch (error) {
    yield put(createAction.requestProjectByIdError(error.message))
  }
}

// export function* saveProjectWatcher() {
//   yield takeEvery(SAVE_PROJECT, saveProjectAsync)
// }

// function* saveProjectAsync(action) {
//   try {
//     yield call(() => {
//       return request(`/api/projects/${action.linkId}/update`, 'PUT', {...action.project}, {
//         Authorization: `Bearer ${action.token}`
//       })
//     })
//   } catch (error) {
//     yield put(saveProjectError(error.message))
//   }
// }

export function* removeProjectWatcher() {
  yield takeEvery(actionTypes.REMOVE_PROJECT, removeProjectAsync)
}

function* removeProjectAsync(action: any): any {    // TODO
  try {
    yield call(() => {
      return request(`/api/projects/${action.linkId}/remove`, 'DELETE', null, {
        Authorization: `Bearer ${action.token}`
      })
    })
    yield put(createAction.removeProjectSuccess('Проект удалён'))
    yield put(createAction.requestProjects(action.token))
  } catch (error) {
    yield put(createAction.removeProjectError(error.message))
  }
}
