// import { REQUEST_PROJECTS, REQUEST_PROJECTS_START, REQUEST_PROJECTS_FAILURE, REQUEST_PROJECTS_SUCCESS} from '../actions/projects'
// import { CREATE_PROJECT, CREATE_PROJECT_START, CREATE_PROJECT_SUCCESS, CREATE_PROJECT_FAILURE } from '../actions/projects'
// import { REQUEST_PROJECT_BY_ID, REQUEST_PROJECT_BY_ID_START, REQUEST_PROJECT_BY_ID_FAILURE, REQUEST_PROJECT_BY_ID_SUCCESS} from '../actions/projects'
// import { SAVE_PROJECT, SAVE_PROJECT_FAILURE } from '../actions/projects'
// import { REMOVE_PROJECT, REMOVE_PROJECT_START, REMOVE_PROJECT_SUCCESS, REMOVE_PROJECT_FAILURE } from '../actions/projects'
// import { SET_PROJECT, CREATE_TASK } from '../actions/projects'

import { actionTypes } from '../../types/actionTypes'
import { IProject, ITask } from '../../types/stateTypes'


export const requestProjects = (token: string) => {
  return { type: actionTypes.REQUEST_PROJECTS, token }
}
export const requestProjectsStart = () => {
  return { type: actionTypes.REQUEST_PROJECTS_START }
}
export const requestProjectsSuccess = (payload: any[]) => { // TODO
  return { type: actionTypes.REQUEST_PROJECTS_SUCCESS, payload }
}
export const requestProjectsError = (error: string, errorCode?: number) => {
  return { type: actionTypes.REQUEST_PROJECTS_FAILURE, payload: (errorCode ? {error, errorCode} : error) }
}


export const createProject = (token: string, title: string) => {
  return { type: actionTypes.CREATE_PROJECT, token, title }
}
export const createProjectStart = () => {
  return { type: actionTypes.CREATE_PROJECT_START }
}
export const createProjectSuccess = (payload: string) => {
  return { type: actionTypes.CREATE_PROJECT_SUCCESS, payload }
}
export const createProjectError = (error: string) => {
  return { type: actionTypes.CREATE_PROJECT_FAILURE, error }
}


export const requestProjectById = (token: string, linkId: string) => {
  return { type: actionTypes.REQUEST_PROJECT_BY_ID, token, linkId }
}
export const requestProjectByIdStart = () => {
  return { type: actionTypes.REQUEST_PROJECT_BY_ID_START }
}
export const requestProjectByIdSuccess = (payload: IProject) => {
  return { type: actionTypes.REQUEST_PROJECT_BY_ID_SUCCESS, payload }
}
export const requestProjectByIdError = (error: string) => {
  return { type: actionTypes.REQUEST_PROJECT_BY_ID_FAILURE, payload: error }
}


export const saveProject = (token: string, linkId: string, project: IProject ) => {
  return { type: actionTypes.SAVE_PROJECT, token, linkId, project }
}
export const saveProjectError = (error: string) => {
  return { type: actionTypes.SAVE_PROJECT_FAILURE, payload: error}
}


export const removeProject = (token: string, linkId: string) => {
  return { type: actionTypes.REMOVE_PROJECT, token, linkId }
}
export const removeProjectStart = () => {
  return { type: actionTypes.REMOVE_PROJECT_START }
}
export const removeProjectSuccess = (payload: string) => {
  return { type: actionTypes.REMOVE_PROJECT_SUCCESS, payload }
}
export const removeProjectError = (error: string) => {
  return { type: actionTypes.REMOVE_PROJECT_FAILURE, payload: error }
}


export const setProject = (project: IProject) => {
  return { type: actionTypes.SET_PROJECT, project}
}

export const createTask = (task: ITask) => {
  return { type: actionTypes.CREATE_TASK, task}
} 
