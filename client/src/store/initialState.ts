import { IState } from '../types/stateTypes'

export const initialState: IState = {
  userData: {
    showLoader: false,
    token: null,
    userId: null,
    isAuthorized: false,
    projects: [],
    // serverResponse: {
    //   // status: 'dark', // ok | error => dark | danger *Hi bootstrap*
    //   // message: 'Hi there!',
    // },
    serverResponse: null,
  },
  project: {},
  newTask: {}
}