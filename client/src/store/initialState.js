const initialState = {
  showLoader: false,
  userData: {
    token: null,
    userId: null,
    isAuthorized: false,
    projects: [],
  },
  project: {},
  newTask: {},
  serverResponse: {
    // status: 'dark', // ok | error => dark | danger *Hi bootstrap*
    // message: 'Hi there!',
  },
}

export default initialState