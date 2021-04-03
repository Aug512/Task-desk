import React from 'react'
// @ts-ignore
import { Switch, Route, Redirect } from 'react-router-dom'
import { useTypedSelector } from './middleware/useTypedSelector'
import ProjectsListPage from './pages/ProjectsListPage/ProjectsListPage'
import ProjectPage from './pages/ProjectPage/ProjectPage'
import AuthPage from './pages/AuthPage/AuthPage'

const Routes: React.FC = () => {

  const isLoggedIn = useTypedSelector(state => state.userData.isAuthorized)
  
  if (isLoggedIn) {
    return (
      <Switch>
        <Route path="/projects" exact>
          <ProjectsListPage />
        </Route>
        <Route path="/projects/:id">
          <ProjectPage />
        </Route>
        <Redirect to="/projects" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact >
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}

export default Routes
