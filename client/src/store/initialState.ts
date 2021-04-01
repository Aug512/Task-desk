import { IState } from '../types/stateTypes'

export const initialState: IState = {
  showLoader: false,
  userData: {
    token: null,
    userId: null,
    isAuthorized: false,
    projects: [],
  },
  project: {},
  newTask: {},
  serverResponse: null,
}
