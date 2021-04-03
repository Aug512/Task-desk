import { takeEvery, put, call } from 'redux-saga/effects'
import { actionTypes } from '../types/actionTypes'
import { RequestLoginAction, RequestRegAction, RequestProjectsAction, CreateProjectAction, RequestProjectByIdAction, SaveProjectAction, RemoveProjectAction } from '../types/actionCreatorsTypes'
import createAction from './actionCreators/index'
import httpMiddleware from '../middleware/http'
import { login, logout as clearStorage } from '../middleware/auth'

const { request } = httpMiddleware()

export function* loginRequestWatcher() {
  yield takeEvery(actionTypes.REQUEST_LOGIN, requestLoginAsync)
}

function* requestLoginAsync(params: RequestLoginAction): any {
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

function* requestRegAsync(params: RequestRegAction): any {
  try {
    yield put(createAction.requestRegStart({...params.data}))
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

function* requestProjectsAsync(action: RequestProjectsAction): any {
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

function* createProjectAsync(action: CreateProjectAction): any {
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

function* requestProjectByIdAsync(action: RequestProjectByIdAction): any {
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

export function* saveProjectWatcher() {
  yield takeEvery(actionTypes.SAVE_PROJECT, saveProjectAsync)
}

function* saveProjectAsync(action: SaveProjectAction): any {
  try {
    yield call(() => {
      return request(`/api/projects/${action.linkId}`, 'PUT', {...action.project}, {
        Authorization: `Bearer ${action.token}`
      })
    })
    yield put(createAction.saveProjectSuccess('Проект сохранён'))
  } catch (error) {
    yield put(createAction.saveProjectError(error.message))
  }
}

export function* removeProjectWatcher() {
  yield takeEvery(actionTypes.REMOVE_PROJECT, removeProjectAsync)
}

function* removeProjectAsync(action: RemoveProjectAction): any {
  try {
    yield call(() => {
      return request(`/api/projects/${action.linkId}`, 'DELETE', null, {
        Authorization: `Bearer ${action.token}`
      })
    })
    yield put(createAction.removeProjectSuccess('Проект удалён'))
  } catch (error) {
    yield put(createAction.removeProjectError(error.message))
  }
}
