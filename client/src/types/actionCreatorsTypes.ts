import { actionTypes } from './actionTypes'
import { ILoginData, IWeakUserData, IProject, ITask } from './stateTypes'

export interface RequestLoginAction {
  type: actionTypes.REQUEST_LOGIN,
  data: ILoginData,
}
interface RequestLoginStartAction {
  type: actionTypes.REQUEST_LOGIN_START,
  data: ILoginData,
}
interface RequestLoginSuccessAction {
  type: actionTypes.REQUEST_LOGIN_SUCCESS,
  payload: IWeakUserData,
}
interface RequestLoginErrorAction {
  type: actionTypes.REQUEST_LOGIN_FAILURE,
  payload: string,
}


export interface RequestRegAction {
  type: actionTypes.REQUEST_REG,
  data: ILoginData,
}
interface RequestRegStartAction {
  type: actionTypes.REQUEST_REG_START,
  data: ILoginData,
}
interface RequestRegSuccessAction {
  type: actionTypes.REQUEST_REG_SUCCESS,
  payload: string,
}
interface RequestRegErrorAction {
  type: actionTypes.REQUEST_REG_FAILURE,
  payload: string,
}


interface LogoutAction {
  type: actionTypes.USER_LOGOUT,
}
interface LoginLocallyAction {
  type: actionTypes.LOGIN_LOCALLY,
  payload: IWeakUserData,
}


export interface RequestProjectsAction {
  type: actionTypes.REQUEST_PROJECTS,
  token: string,
}
interface RequestProjectsStartAction {
  type: actionTypes.REQUEST_PROJECTS_START,
  token: string,
}
interface RequestProjectsSuccessAction {
  type: actionTypes.REQUEST_PROJECTS_SUCCESS;
  payload: IProject[];
}
interface RequestProjectsErrorAction {
  type: actionTypes.REQUEST_PROJECTS_FAILURE;
  payload: {
    message: string,
    errorCode: number,
  }
}


export interface RequestProjectByIdAction {
  type: actionTypes.REQUEST_PROJECT_BY_ID,
  token: string,
  linkId: string,
}
interface RequestProjectByIdStartAction {
  type: actionTypes.REQUEST_PROJECT_BY_ID_START,
}
interface RequestProjectByIdSuccessAction {
  type: actionTypes.REQUEST_PROJECT_BY_ID_SUCCESS,
  payload: IProject,
}
interface RequestProjectByIdErrorAction {
  type: actionTypes.REQUEST_PROJECT_BY_ID_FAILURE,
  payload: string,
}


export interface CreateProjectAction {
  type: actionTypes.CREATE_PROJECT,
  token: string,
  title: string,
}
interface CreateProjectStartAction {
  type: actionTypes.CREATE_PROJECT_START,
}
interface CreateProjectSuccessAction {
  type: actionTypes.CREATE_PROJECT_SUCCESS,
  payload: string,
}
interface CreateProjectErrorAction {
  type: actionTypes.CREATE_PROJECT_FAILURE,
  payload: string,
}

export interface SaveProjectAction {
  type: actionTypes.SAVE_PROJECT,
  token: string,
  linkId: string,
  project: IProject,
}
interface saveProjectSuccessAction {
  type: actionTypes.SAVE_PROJECT_SUCCESS,
  payload: string,
}
interface saveProjectErrorAction {
  type: actionTypes.SAVE_PROJECT_FAILURE,
  payload: string,
}


export interface RemoveProjectAction {
  type: actionTypes.REMOVE_PROJECT,
  linkId: string,
  token: string,
}
interface RemoveProjectStartAction {
  type: actionTypes.REMOVE_PROJECT_START,
}
interface RemoveProjectSuccessAction {
  type: actionTypes.REMOVE_PROJECT_SUCCESS,
  payload: string,
}
interface RemoveProjectErrorAction {
  type: actionTypes.REMOVE_PROJECT_FAILURE,
  payload: string,
}

interface SetProjectAction {
  type: actionTypes.SET_PROJECT,
  payload: IProject,
}
interface SetTaskAction {
  type: actionTypes.SET_TASK,
  payload: ITask,
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
  | RequestProjectByIdAction
  | RequestProjectByIdStartAction
  | RequestProjectByIdSuccessAction
  | RequestProjectByIdErrorAction
  | CreateProjectAction
  | CreateProjectStartAction
  | CreateProjectSuccessAction
  | CreateProjectErrorAction
  | SaveProjectAction
  | saveProjectSuccessAction
  | saveProjectErrorAction
  | RemoveProjectAction
  | RemoveProjectStartAction
  | RemoveProjectSuccessAction
  | RemoveProjectErrorAction
  | SetProjectAction
  | SetTaskAction
