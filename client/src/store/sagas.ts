import { requestLoginStart, requestLoginError, requestLoginSuccess } from './actionCreators/setAuthorisation'
import { requestRegStart, requestRegError, requestRegSuccess } from './actionCreators/setAuthorisation'

import { requestProjects, requestProjectsStart, requestProjectsError, requestProjectsSuccess } from './actionCreators/setProjects'
import { createProjectStart, createProjectError, createProjectSuccess } from './actionCreators/setProjects'
import { requestProjectByIdStart, requestProjectByIdError, requestProjectByIdSuccess } from './actionCreators/setProjects'
import { saveProjectError } from './actionCreators/setProjects'
import { removeProjectStart, removeProjectError, removeProjectSuccess } from './actionCreators/setProjects'

import { REQUEST_LOGIN, REQUEST_REG } from './actions/authorisation'
import { REQUEST_PROJECTS, CREATE_PROJECT, REQUEST_PROJECT_BY_ID, SAVE_PROJECT, REMOVE_PROJECT } from './actions/projects'

import { ILoginData, userDataActionTypes } from '../types/userDataTypes'
import * as createAction from './actionCreators/setAuthorisation'

import { takeEvery, put, call } from 'redux-saga/effects'
import httpMiddleware from '../middleware/http'
import { login, logout as clearStorage } from '../middleware/auth'

const { request } = httpMiddleware()

export function* loginRequestWatcher() {
  yield takeEvery(userDataActionTypes.REQUEST_LOGIN, requestLoginAsync)
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
  yield takeEvery(userDataActionTypes.REQUEST_REG, requestRegAsync)
}

function* requestRegAsync(params: any): any {   //TODO
  try {
    yield put(createAction.requestRegStart())
    const response = yield call(() => {
      return request('/api/auth/register', 'POST', {...params.data})
    })
    yield put(createAction.requestRegSuccess(response))
  } catch (error) {
    yield put(createAction.requestRegError(error.message))
  }
}


// export function* requestProjectsWatcher() {
//   yield takeEvery(userDataActionTypes.REQUEST_PROJECTS, requestProjectsAsync)
// }

// function* requestProjectsAsync(action) {
//   try {
//     yield put(requestProjectsStart())
//     const response = yield call(() => {
//       return request('/api/projects/', 'GET', null, {
//         Authorization: `Bearer ${action.token}`
//       })
//     })
//     yield put(requestProjectsSuccess(response))
//   } catch (error) {
//     if (error.message === 'No authorisation') {
//       yield clearStorage()
//       yield put(requestProjectsError({errorCode: 401, message: 'Токен устарел'}))
//     } else {
//       yield put(requestProjectsError(error.message))
//     }
//   }
// }

// export function* createProjectWatcher() {
//   yield takeEvery(userDataActionTypes.CREATE_PROJECT, createProjectAsync)
// }

// function* createProjectAsync(action) {
//   try {
//     yield put(createProjectStart())
//     const response = yield call(() => {
//       return request('/api/projects/create', 'POST', {...action}, {
//         Authorization: `Bearer ${action.token}`
//       })
//     })
//     yield put(createProjectSuccess(response))
//     yield put(requestProjects(action.token))
//   } catch (error) {
//     yield put(createProjectError(error.message))
//     yield put(requestProjects(action.token))
//   }
// }


// export function* requestProjectByIdWatcher() {
//   yield takeEvery(REQUEST_PROJECT_BY_ID, requestProjectByIdAsync)
// }

// function* requestProjectByIdAsync(action) {
//   try {
//     yield put(requestProjectByIdStart(action.token))
//     const response = yield call(() => {
//       return request(`/api/projects/${action.linkId}`, 'GET', null, {
//         Authorization: `Bearer ${action.token}`
//       })
//     })
//     yield put(requestProjectByIdSuccess(response))
//   } catch (error) {
//     yield put(requestProjectByIdError(error.message))
//   }
// }

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

// export function* removeProjectWatcher() {
//   yield takeEvery(userDataActionTypes.REMOVE_PROJECT, removeProjectAsync)
// }

// function* removeProjectAsync(action) {
//   try {
//     yield put(removeProjectStart())
//     yield call(() => {
//       return request(`/api/projects/${action.linkId}/remove`, 'DELETE', null, {
//         Authorization: `Bearer ${action.token}`
//       })
//     })
//     yield put(removeProjectSuccess())
//     yield put(requestProjects(action.token))
//   } catch (error) {
//     yield put(removeProjectError(error.message))
//   }
// }
