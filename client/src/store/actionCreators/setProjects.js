import { REQUEST_PROJECTS, REQUEST_PROJECTS_START, REQUEST_PROJECTS_FAILURE, REQUEST_PROJECTS_SUCCESS} from '../actions/projects'
import { CREATE_PROJECT, CREATE_PROJECT_START, CREATE_PROJECT_SUCCESS, CREATE_PROJECT_FAILURE } from '../actions/projects'
import { REQUEST_PROJECT_BY_ID, REQUEST_PROJECT_BY_ID_START, REQUEST_PROJECT_BY_ID_FAILURE, REQUEST_PROJECT_BY_ID_SUCCESS} from '../actions/projects'
import { SAVE_PROJECT, SAVE_PROJECT_START, SAVE_PROJECT_SUCCESS, SAVE_PROJECT_FAILURE } from '../actions/projects'
import { REMOVE_PROJECT, REMOVE_PROJECT_START, REMOVE_PROJECT_SUCCESS, REMOVE_PROJECT_FAILURE } from '../actions/projects'
import { SET_PROJECT, CREATE_TASK } from '../actions/projects'

export const requestProjects = (token) => {
  return { type: REQUEST_PROJECTS, token }
}

export const requestProjectsStart = () => {
  return { type: REQUEST_PROJECTS_START }
}

export const requestProjectsSuccess = (payload) => {
  return { type: REQUEST_PROJECTS_SUCCESS, payload }
}

export const requestProjectsError = (error) => {
  return { type: REQUEST_PROJECTS_FAILURE, payload: error }
}

export const createProject = (token, title) => {
  return { type: CREATE_PROJECT, token, title }
}

export const createProjectStart = () => {
  return { type: CREATE_PROJECT_START }
}

export const createProjectSuccess = (payload) => {
  return { type: CREATE_PROJECT_SUCCESS, payload }
}

export const createProjectError = (error) => {
  return { type: CREATE_PROJECT_FAILURE, payload: error }
}

export const requestProjectById = (token, linkId) => {
  return { type: REQUEST_PROJECT_BY_ID, token, linkId }
}

export const requestProjectByIdStart = () => {
  return { type: REQUEST_PROJECT_BY_ID_START }
}

export const requestProjectByIdSuccess = (payload) => {
  return { type: REQUEST_PROJECT_BY_ID_SUCCESS, payload }
}

export const requestProjectByIdError = (error) => {
  return { type: REQUEST_PROJECT_BY_ID_FAILURE, payload: error }
}

export const saveProject = (token, linkId, project ) => {
  return { type: SAVE_PROJECT, token, linkId, project }
}

export const saveProjectStart = () => {
  return { type: SAVE_PROJECT_START }
}

export const saveProjectSuccess = () => {
  return { type: SAVE_PROJECT_SUCCESS }
}

export const saveProjectError = (error) => {
  return { type: SAVE_PROJECT_FAILURE, payload: error}
}

export const removeProject = (token, linkId ) => {
  return { type: REMOVE_PROJECT, token, linkId }
}

export const removeProjectStart = () => {
  return { type: REMOVE_PROJECT_START }
}

export const removeProjectSuccess = () => {
  return { type: REMOVE_PROJECT_SUCCESS }
}

export const removeProjectError = (error) => {
  return { type: REMOVE_PROJECT_FAILURE, payload: error }
}

export const setProject = (project) => {
  return { type: SET_PROJECT, project}
}

export const createTask = (task) => {
  return { type: CREATE_TASK, task}
} 
