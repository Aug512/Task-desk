import { actionTypes } from './actionTypes'
import { ILoginData, IWeakUserData, IProject } from './stateTypes'

interface RequestLoginAction {
  type: actionTypes.REQUEST_LOGIN;
  data: ILoginData; 
}
interface RequestLoginStartAction {
  type: actionTypes.REQUEST_LOGIN_START;
  data: ILoginData; 
}
interface RequestLoginSuccessAction {
  type: actionTypes.REQUEST_LOGIN_SUCCESS;
  payload: IWeakUserData;
}
interface RequestLoginErrorAction {
  type: actionTypes.REQUEST_LOGIN_FAILURE;
  payload: string;
}

interface RequestRegAction {
  type: actionTypes.REQUEST_REG;
  data: ILoginData; 
}
interface RequestRegStartAction {
  type: actionTypes.REQUEST_REG_START;
  data: ILoginData; 
}
interface RequestRegSuccessAction {
  type: actionTypes.REQUEST_REG_SUCCESS;
  payload: string;
}
interface RequestRegErrorAction {
  type: actionTypes.REQUEST_REG_FAILURE;
  payload: string;
}

interface LogoutAction {
  type: actionTypes.USER_LOGOUT
}
interface LoginLocallyAction {
  type: actionTypes.LOGIN_LOCALLY;
  payload: IWeakUserData;
}

interface RequestProjectsAction {
  type: actionTypes.REQUEST_PROJECTS;
  token: string;
}
interface RequestProjectsStartAction {
  type: actionTypes.REQUEST_PROJECTS_START;
}
interface RequestProjectsSuccessAction {
  type: actionTypes.REQUEST_PROJECTS_SUCCESS;
  payload: any[]; ///TODO
}
interface RequestProjectsErrorAction {
  type: actionTypes.REQUEST_PROJECTS_FAILURE;
  payload: {
    message: string;
    errorCode?: number;
  }
}

interface CreateProjectAction {
  type: actionTypes.CREATE_PROJECT;
  token: string;
  title: string;
}
interface CreateProjectStartAction {
  type: actionTypes.CREATE_PROJECT_START;
}
interface CreateProjectSuccessAction {
  type: actionTypes.CREATE_PROJECT_SUCCESS,
  payload: string,
}
interface CreateProjectErrorAction {
  type: actionTypes.CREATE_PROJECT_FAILURE;
  payload: string;
}

interface RemoveProjectAction {
  type: actionTypes.REMOVE_PROJECT;
  linkId: string;
  title: string;
}
interface RemoveProjectStartAction {
  type: actionTypes.REMOVE_PROJECT_START;
}
interface RemoveProjectSuccessAction {
  type: actionTypes.REMOVE_PROJECT_SUCCESS;
  payload: string;
}
interface RemoveProjectErrorAction {
  type: actionTypes.REMOVE_PROJECT_FAILURE;
  payload: string;
}

export type actionCreatorsType =
  RequestLoginAction
  | RequestLoginStartAction
  | RequestLoginSuccessAction
  | RequestLoginErrorAction
  | RequestRegAction
  | RequestRegStartAction
  | RequestRegSuccessAction
  | RequestRegErrorAction
  | LoginLocallyAction
  | LogoutAction
  | RequestProjectsAction
  | RequestProjectsStartAction
  | RequestProjectsSuccessAction
  | RequestProjectsErrorAction
  | CreateProjectAction
  | CreateProjectStartAction
  | CreateProjectSuccessAction
  | CreateProjectErrorAction
  | RemoveProjectAction
  | RemoveProjectStartAction
  | RemoveProjectSuccessAction
  | RemoveProjectErrorAction
