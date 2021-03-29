import React, { useEffect, useRef } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from '../../routes'
import { connect } from 'react-redux'
import { checkStorage } from '../../middleware/auth'
import { loginLocally } from '../../store/actionCreators/setAuthorisation'
import 'bootstrap/js/dist/alert'
import './App.css'

const mapStateToProps = state => {
  return {
    response: state.serverResponse,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginLocally: (payload) => dispatch(loginLocally(payload))
  }
}

const App = ({ response, loginLocally }) => {

  const alertRef = useRef()

  useEffect(() => {
    const localData = checkStorage()

    if (localData) {
      loginLocally({token: localData.token, id: localData.userId})
    }
  }, [loginLocally])

  useEffect( () => {
    alertRef.current.classList.add('showAlert')
    setTimeout(() => {alertRef.current.classList.remove('showAlert')}, 2500)
  }, [response])

  document.body.style.overflowX = 'hidden'
  const reactAppContainer = document.getElementById('root')

  reactAppContainer.style = 'position: relative; overflow-x: hidden'

  return (
    <Router>
      <div ref={alertRef} className={`alert alert-${response.status} alert-modal`} role="alert">
        {response.message}
      </div>
      <div className='container pt-5'>
        <Routes />
      </div>
    </Router>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
