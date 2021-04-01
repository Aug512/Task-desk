export interface IServerResponse {
  status: 'dark' | 'danger',
  message: string | undefined,
}

export interface IUserData {
  token: string | null,
  userId: string | null,
  isAuthorized: boolean,
  projects: any[], //TODO
}

export interface IState {
  showLoader: boolean,
  userData: IUserData,
  project: {}, //TODO
  newTask: {}, //TODO
  serverResponse: null | IServerResponse,
}

export interface ILoginData {
  login: string,
  password: string,
  saveData?: boolean,
}
export interface IWeakUserData {
  token: string,
  userId: string,
  message?: string,
}
export interface IProjectData {
  columns: string[],
  tasks: any[], // TODO
}
export interface INewProjectResponse {
  project: IProject,
  message: string,
}
export interface IProject {
  _id: string,
  owner: string,
  title: string,
  data: IProjectData,
}

export interface ITask {
  name: string,
  description: string[],
  priority: string, // TODO -> edit this to enum
  createdAt: Date,
}
