import { initialState } from './initialState'
import { actionTypes } from '../types/actionTypes'
import { actionCreatorsType } from '../types/actionCreatorsTypes'
import { IState } from '../types/stateTypes'

const reducer = (state: IState = initialState, action: actionCreatorsType ) => {
  switch (action.type) {

    case actionTypes.REQUEST_LOGIN_START:
      return {
        ...state,
        showLoader: true,
      }

    case actionTypes.REQUEST_LOGIN_SUCCESS:
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
        },
      }

    case actionTypes.REQUEST_LOGIN_FAILURE:
      return {
        ...state,
        showLoader: false,
        serverResponse: {
          status: 'danger',
          message: action.payload,
        },
      }

    case actionTypes.REQUEST_REG_START:
      return {
        ...state,
        showLoader: true,
      }

    case actionTypes.REQUEST_REG_SUCCESS:
      return {
        ...state,
        showLoader: false,
        userData: {
          isAuthorized: false,
          projects: [],
        },
        serverResponse: {
          status: 'dark',
          message: action.payload,
        },
      }

    case actionTypes.REQUEST_REG_FAILURE:
      return {
        ...state,
        showLoader: false,
        serverResponse: {
          status: 'danger',
          message: action.payload
        },
      }

    case actionTypes.REQUEST_PROJECTS_START:
      return {
        ...state,
        showLoader: true,
      }

    case actionTypes.REQUEST_PROJECTS_SUCCESS:
      return {
        ...state,
        showLoader: false,
        userData: {
          ...state.userData,
          projects: action.payload,
        }
      }

    case actionTypes.REQUEST_PROJECTS_FAILURE:
      if (typeof action.payload === 'object' && action.payload.errorCode === 401) {
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

    case actionTypes.CREATE_PROJECT_START:
      return {
        ...state,
        showLoader: true,
      }

    case actionTypes.CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        serverResponse: {
          status: 'dark',
          message: action.payload,
        }
      }

    case actionTypes.CREATE_PROJECT_FAILURE:
      return {
        ...state,
        serverResponse: {
          status: 'danger',
          message: action.payload
        }
      }

    case actionTypes.REQUEST_PROJECT_BY_ID_START:
      return {
        ...state,
        showLoader: true,
      }

    case actionTypes.REQUEST_PROJECT_BY_ID_SUCCESS:
      return {
        ...state,
        showLoader: false,
        project: {...action.payload}
      }

    case actionTypes.REQUEST_PROJECT_BY_ID_FAILURE:
      return {
        ...state,
        showLoader: false,
        serverResponse: {
          status: 'danger',
          message: action.payload
        }
      }

    case actionTypes.SAVE_PROJECT_SUCCESS:
      return {
        ...state,
        showLoader: false,
        serverResponse: {
          status: 'dark',
          message: action.payload
        }
      }

    case actionTypes.SAVE_PROJECT_FAILURE:
      return {
        ...state,
        showLoader: false,
        serverResponse: {
          status: 'danger',
          message: action.payload
        }
      }

    case actionTypes.REMOVE_PROJECT_SUCCESS: {
      return {
        ...state,
        serverResponse: {
          status: 'dark',
          message: action.payload
        }
      }
    }

    case actionTypes.REMOVE_PROJECT_FAILURE:
      return {
        ...state,
        showLoader: false,
        serverResponse: {
          status: 'danger',
          message: action.payload
        }
      }

    case actionTypes.SET_PROJECT:
      return {
        ...state,
        project: {...action.payload}
      }

    case actionTypes.SET_TASK:
      return {
        ...state,
        newTask: {...action.payload}
      }

    case actionTypes.USER_LOGOUT:
      return {
        ...state,
        userData: {
          token: null,
          userId: null,
          isAuthorized: false,
          projects: [],
        },
        project: null,
        newTask: null,
        serverResponse: {}
      }

    case actionTypes.LOGIN_LOCALLY:
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
          message: 'Добро пожаловать!',
        }
      }

    default:
      return state
  }
}

export default reducer
