
export interface ILoginData {
  login: string;
  password: string;
  saveData?: boolean;
}
export interface IWeakUserData {
  token: string,
  userId: string,
  message?: string,
}
export enum userDataActionTypes {
  REQUEST_LOGIN = 'REQUEST_LOGIN',
  REQUEST_LOGIN_START = 'REQUEST_LOGIN_START',
  REQUEST_LOGIN_FAILURE = 'REQUEST_LOGIN_FAILURE',
  REQUEST_LOGIN_SUCCESS = 'REQUEST_LOGIN_SUCCESS',
  REQUEST_REG = 'REQUEST_REG',
  REQUEST_REG_START = 'REQUEST_REG_START',
  REQUEST_REG_FAILURE = 'REQUEST_REG_FAILURE',
  REQUEST_REG_SUCCESS = 'REQUEST_REG_SUCCESS',
  USER_LOGOUT = 'USER_LOGOUT',
  LOGIN_LOCALLY = 'LOGIN_LOCALLY',
  REQUEST_PROJECTS = 'REQUEST_PROJECTS',
  REQUEST_PROJECTS_START = 'REQUEST_PROJECTS_START',
  REQUEST_PROJECTS_SUCCESS = 'REQUEST_PROJECTS_SUCCESS',
  REQUEST_PROJECTS_FAILURE = 'REQUEST_PROJECTS_FAILURE',
  CREATE_PROJECT = 'CREATE_PROJECT',
  CREATE_PROJECT_START = 'CREATE_PROJECT_START',
  CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS',
  CREATE_PROJECT_FAILURE = 'CREATE_PROJECT_FAILURE',
  REMOVE_PROJECT = 'REMOVE_PROJECT',
  REMOVE_PROJECT_START = 'REMOVE_PROJECT_START',
  REMOVE_PROJECT_SUCCESS = 'REMOVE_PROJECT_SUCCESS',
  REMOVE_PROJECT_FAILURE = 'REMOVE_PROJECT_FAILURE',
}

interface RequestLoginAction {
  type: userDataActionTypes.REQUEST_LOGIN;
  data: ILoginData; 
}
interface RequestLoginStartAction {
  type: userDataActionTypes.REQUEST_LOGIN_START;
  data: ILoginData; 
}
interface RequestLoginSuccessAction {
  type: userDataActionTypes.REQUEST_LOGIN_SUCCESS;
  payload: IWeakUserData;
}
interface RequestLoginErrorAction {
  type: userDataActionTypes.REQUEST_LOGIN_FAILURE;
  payload: string;
}

interface RequestRegAction {
  type: userDataActionTypes.REQUEST_REG;
  data: ILoginData; 
}
interface RequestRegStartAction {
  type: userDataActionTypes.REQUEST_REG_START;
  data: ILoginData; 
}
interface RequestRegSuccessAction {
  type: userDataActionTypes.REQUEST_REG_SUCCESS;
  payload: string;
}
interface RequestRegErrorAction {
  type: userDataActionTypes.REQUEST_REG_FAILURE;
  payload: string;
}

interface LogoutAction {
  type: userDataActionTypes.USER_LOGOUT
}
interface LoginLocallyAction {
  type: userDataActionTypes.LOGIN_LOCALLY;
  payload: IWeakUserData;
}

interface RequestProjectsAction {
  type: userDataActionTypes.REQUEST_PROJECTS;
  token: string;
}
interface RequestProjectsStartAction {
  type: userDataActionTypes.REQUEST_PROJECTS_START;
}
interface RequestProjectsSuccessAction {
  type: userDataActionTypes.REQUEST_PROJECTS_SUCCESS;
  payload: any[]; ///TODO
}
interface RequestProjectsErrorAction {
  type: userDataActionTypes.REQUEST_PROJECTS_FAILURE;
  payload: {
    message: string;
    errorCode: number;
  }
}

interface CreateProjectAction {
  type: userDataActionTypes.CREATE_PROJECT;
  token: string;
  title: string;
}
interface CreateProjectStartAction {
  type: userDataActionTypes.CREATE_PROJECT_START;
}
interface CreateProjectSuccessAction {
  type: userDataActionTypes.CREATE_PROJECT_SUCCESS;
  payload: string;
}
interface CreateProjectErrorAction {
  type: userDataActionTypes.CREATE_PROJECT_FAILURE;
  payload: string;
}

interface RemoveProjectAction {
  type: userDataActionTypes.REMOVE_PROJECT;
  linkId: string;
  title: string;
}
interface RemoveProjectStartAction {
  type: userDataActionTypes.REMOVE_PROJECT_START;
}
interface RemoveProjectSuccessAction {
  type: userDataActionTypes.REMOVE_PROJECT_SUCCESS;
  payload: string;
}
interface RemoveProjectErrorAction {
  type: userDataActionTypes.REMOVE_PROJECT_FAILURE;
  payload: string;
}

export type userDataAction =
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
