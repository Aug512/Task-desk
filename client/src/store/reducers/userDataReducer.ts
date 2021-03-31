import {initialState} from '../initialState'
import { userDataAction, userDataActionTypes } from '../../types/userDataTypes'
import { IUserData } from '../../types/stateTypes'

const reducer = (state = initialState.userData, action: userDataAction): IUserData => {
  switch (action.type) {

    case userDataActionTypes.REQUEST_LOGIN_START:
      return {
        ...state,
        showLoader: true,
        serverResponse: null,
      }

    case userDataActionTypes.REQUEST_LOGIN_SUCCESS:
      return {
        showLoader: false,
        token: action.payload.token,
        userId: action.payload.userId,
        isAuthorized: true,
        projects: [],
        serverResponse: {
          status: 'dark',
          message: action.payload.message,
        }
      }

    case userDataActionTypes.REQUEST_LOGIN_FAILURE:
      return {
        showLoader: false,
        token: null,
        userId: null,
        isAuthorized: false,
        projects: [],
        serverResponse: {
          status: 'danger',
          message: action.payload,
        }
      }

    case userDataActionTypes.REQUEST_REG_START:
      return {
        ...state,
        showLoader: true,
        serverResponse: null,
      }

    case userDataActionTypes.REQUEST_REG_SUCCESS:
      return {
        showLoader: false,
        token: null,
        userId: null,
        isAuthorized: false,
        projects: [],
        serverResponse: {
          status: 'dark',
          message: action.payload,
        }
      }

    case userDataActionTypes.REQUEST_REG_FAILURE:
      return {
        showLoader: false,
        token: null,
        userId: null,
        isAuthorized: false,
        projects: [],
        serverResponse: {
          status: 'danger',
          message: action.payload
        }
      }

    case userDataActionTypes.REQUEST_PROJECTS_START:
      return {
        ...state,
        showLoader: true,
        serverResponse: null,
      }

    case userDataActionTypes.REQUEST_PROJECTS_SUCCESS:
      return {
        ...state,
        showLoader: false,
        projects: [...action.payload],
      }

    case userDataActionTypes.REQUEST_PROJECTS_FAILURE:

      if (action.payload.errorCode === 401) {
        return {
          ...state,
          token: null,
          userId: null,
          isAuthorized: false,
          projects: [],
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
          message: action.payload.message
        }
      }

    case userDataActionTypes.CREATE_PROJECT_START:
      return {
        ...state,
        showLoader: true,
        serverResponse: null,
      }

    case userDataActionTypes.CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        serverResponse: {
          status: 'dark',
          message: action.payload,
        }
      }

    case userDataActionTypes.CREATE_PROJECT_FAILURE:
      return {
        ...state,
        serverResponse: {
          status: 'danger',
          message: action.payload
        }
      }

    case userDataActionTypes.REMOVE_PROJECT_START:
      return {
        ...state,
        showLoader: true,
        serverResponse: null,
      }

    case userDataActionTypes.REMOVE_PROJECT_SUCCESS:
      return {
        ...state,
        serverResponse: {
          status: 'dark',
          message: action.payload,
        }
      }

    case userDataActionTypes.REMOVE_PROJECT_FAILURE:
      return {
        ...state,
        showLoader: false,
        serverResponse: {
          status: 'danger',
          message: action.payload
        }
      }

    case userDataActionTypes.USER_LOGOUT:
      return {
        showLoader: false,
        token: null,
        userId: null,
        isAuthorized: false,
        projects: [],
        serverResponse: null,
      }

    case userDataActionTypes.LOGIN_LOCALLY:
      return {
        ...state,
        showLoader: false,
        token: action.payload.token,
        userId: action.payload.userId,
        isAuthorized: true,
        projects: [],
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
