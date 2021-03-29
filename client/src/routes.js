import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import ProjectsListPage from './pages/ProjectsListPage/ProjectsListPage'
import ProjectPage from './pages/ProjectPage/ProjectPage'
import AuthPage from './pages/AuthPage/AuthPage'

const mapStateToProps = state => {
  return {
    isLoggedIn: state.userData.isAuthorized
  }
}

const useRoutes = ({isLoggedIn}) => {
  
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

export default connect(mapStateToProps, null)(useRoutes)
