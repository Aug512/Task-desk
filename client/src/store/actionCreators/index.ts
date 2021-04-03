import * as authActionCreators from './setAuthorisation'
import * as projectsActionCreators from './setProjects'

const createAction = {
  ...authActionCreators,
  ...projectsActionCreators,
}

export default createAction
