export interface IServerResponse {
  status: 'dark' | 'danger',
  message: string | undefined,
}

export interface IUserData {
  token: string | null,
  userId: string | null,
  isAuthorized: boolean,
  projects: IProject[],
}

export interface IState {
  showLoader: boolean,
  userData: IUserData,
  project: IProject | null,
  newTask: ITask | null,
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
  tasks: ITask[],
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
  column: string,
  priority: string,
  createdAt: Date,
}
