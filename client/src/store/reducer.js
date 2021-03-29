import initialState from './initialState'
import { REQUEST_LOGIN_START, REQUEST_LOGIN_SUCCESS, REQUEST_LOGIN_FAILURE } from './actions/authorisation'
import { REQUEST_REG_START, REQUEST_REG_SUCCESS, REQUEST_REG_FAILURE } from './actions/authorisation'
import { USER_LOGOUT, LOGIN_LOCALLY } from './actions/authorisation'

import { REQUEST_PROJECTS_START, REQUEST_PROJECTS_SUCCESS, REQUEST_PROJECTS_FAILURE } from './actions/projects'
import { CREATE_PROJECT_START, CREATE_PROJECT_SUCCESS, CREATE_PROJECT_FAILURE } from './actions/projects'
import { REQUEST_PROJECT_BY_ID_START, REQUEST_PROJECT_BY_ID_SUCCESS, REQUEST_PROJECT_BY_ID_FAILURE } from './actions/projects'
import { SAVE_PROJECT_START, SAVE_PROJECT_SUCCESS, SAVE_PROJECT_FAILURE } from './actions/projects'
import { REMOVE_PROJECT_START, REMOVE_PROJECT_SUCCESS, REMOVE_PROJECT_FAILURE } from './actions/projects'
import { SET_PROJECT, CREATE_TASK } from './actions/projects'

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case REQUEST_LOGIN_START:
      return {
        ...state,
        showLoader: true,
      }

    case REQUEST_LOGIN_SUCCESS:
      return {
        ...state,
        showLoader: false,
        userData: {
          token: action.payload.token,
          userId: action.payload.userId,
          isAuthorized: true,
          projects: [],
        },
        serverResponse: {
          status: 'dark',
          message: action.payload.message,
        }
      }

    case REQUEST_LOGIN_FAILURE:
      return {
        ...state,
        showLoader: false,
        serverResponse: {
          status: 'danger',
          message: action.payload,
        }
      }

    case REQUEST_REG_START:
      return {
        ...state,
        showLoader: true,
      }

    case REQUEST_REG_SUCCESS:
      return {
        ...state,
        showLoader: false,
        userData: {
          isAuthorized: false,
          projects: [],
        },
        serverResponse: {
          status: 'dark',
          message: action.payload.message,
        }
      }

    case REQUEST_REG_FAILURE:
      return {
        ...state,
        showLoader: false,
        serverResponse: {
          status: 'danger',
          message: action.payload
        }
      }

    case REQUEST_PROJECTS_START:
      return {
        ...state,
        showLoader: true,
      }

    case REQUEST_PROJECTS_SUCCESS:
      return {
        ...state,
        showLoader: false,
        userData: {
          ...state.userData,
          projects: [...action.payload],
        }
      }

    case REQUEST_PROJECTS_FAILURE:

      if (action.payload.errorCode === 401) {
        return {
          ...state,
          userData: {
            token: null,
            userId: null,
            isAuthorized: false,
            projects: [],
          },
          showLoader: false,
          serverResponse: {
            status: 'danger',
            message: action.payload.message
          }
        }
      }
      return {
        ...state,
        showLoader: false,
        serverResponse: {
          status: 'danger',
          message: action.payload
        }
      }

    case CREATE_PROJECT_START:
      return {
        ...state,
        showLoader: true,
      }

    case CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        serverResponse: {
          status: 'dark',
          message: action.payload.message,
        }
      }

    case CREATE_PROJECT_FAILURE:
      return {
        ...state,
        serverResponse: {
          status: 'danger',
          message: action.payload
        }
      }

    case REQUEST_PROJECT_BY_ID_START:
      return {
        ...state,
        showLoader: true,
      }

    case REQUEST_PROJECT_BY_ID_SUCCESS:
      return {
        ...state,
        showLoader: false,
        project: {...action.payload}
      }

    case REQUEST_PROJECT_BY_ID_FAILURE:
      return {
        ...state,
        showLoader: false,
        serverResponse: {
          status: 'danger',
          message: action.payload
        }
      }

    case SAVE_PROJECT_START:
      return {
        ...state,
        showLoader: true,
      }

    case SAVE_PROJECT_SUCCESS:
      return {
        ...state,
        showLoader: false,
      }

    case SAVE_PROJECT_FAILURE:
      return {
        ...state,
        showLoader: false,
        serverResponse: {
          status: 'danger',
          message: action.payload
        }
      }

    case REMOVE_PROJECT_START:
      return {
        ...state,
        showLoader: true,
      }

    case REMOVE_PROJECT_SUCCESS:
      return {
        ...state,
      }

    case REMOVE_PROJECT_FAILURE:
      return {
        ...state,
        showLoader: false,
        serverResponse: {
          status: 'danger',
          message: action.payload
        }
      }

    case SET_PROJECT:
      return {
        ...state,
        project: {...action.project}
      }

    case CREATE_TASK:
      return {
        ...state,
        newTask: {...action.task}
      }

    case USER_LOGOUT:
      return {
        ...state,
        userData: {
          token: null,
          userId: null,
          isAuthorized: false,
          projects: [],
        },
        project: {},
        newTask: {},
        serverResponse: {}
      }

    case LOGIN_LOCALLY:
      return {
        ...state,
        showLoader: false,
        userData: {
          token: action.payload.token,
          userId: action.payload.id,
          isAuthorized: true,
          projects: [],
        },
        serverResponse: {
          status: 'dark',
          message: 'Добро пожаловать!',
        }
      }  
  
    case 'SHOW_MESSAGE':
      return {
        ...state,
        serverResponse: {
          status: 'dark',
          message: action.message,
        }
      }

    case 'SHOW_ERROR':
      return {
        ...state,
        serverResponse: {
          status: 'danger',
          message: action.message,
        }
      }

    default:
      return state
  }
}

export default reducer
