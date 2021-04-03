import { actionTypes } from '../../types/actionTypes'
import { IProject, ITask } from '../../types/stateTypes'


export const requestProjects = (token: string) => {
  return { type: actionTypes.REQUEST_PROJECTS, token }
}
export const requestProjectsStart = () => {
  return { type: actionTypes.REQUEST_PROJECTS_START }
}
export const requestProjectsSuccess = (payload: IProject[]) => {
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
export const saveProjectSuccess = (message: string) => {
  return { type: actionTypes.SAVE_PROJECT_SUCCESS, payload: message }
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
  return { type: actionTypes.SET_PROJECT, payload: project}
}

export const createTask = (task: ITask | null) => {
  return { type: actionTypes.SET_TASK, payload: task}
} 
