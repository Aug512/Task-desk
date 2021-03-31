import * as authActionCreators from './setAuthorisation'
import * as projectsActionCreators from './setProjects'
import * as commonActionCreators from './common'

export default {
  ...authActionCreators,
  ...projectsActionCreators,
  ...commonActionCreators,
}
