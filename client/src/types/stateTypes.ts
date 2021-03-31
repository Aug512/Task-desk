export interface IServerResponse {
  status: 'dark' | 'danger';
  message: string | undefined;
}

export interface IUserData {
  showLoader: boolean;
  token: string | null;
  userId: string | null;
  isAuthorized: boolean;
  projects: any[]; //TODO
  serverResponse: null | IServerResponse;
}

export interface IState {
  userData: IUserData;
  project: {}, //TODO
  newTask: {}, //TODO
}