import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from '../../routes'
import { useActions } from '../../middleware/useActions'
import { useTypedSelector } from '../../middleware/useTypedSelector'
import { checkStorage } from '../../middleware/auth'
import 'bootstrap/js/dist/alert'
import './App.css'

const App: React.FC = () => {

  const { serverResponse } = useTypedSelector(state => state)
  const { loginLocally } = useActions()

  const alertRef: HTMLElement | null = document.getElementById('alertModalRef')

  useEffect(() => {
    const localData = checkStorage()

    if (localData) {
      loginLocally({token: localData.token, userId: localData.userId})
    }
  }, [])

  useEffect( () => {
    if (serverResponse?.message) {
      alertRef?.classList.add('showAlert')
      setTimeout(() => {alertRef?.classList.remove('showAlert')}, 2500)
    }
  }, [serverResponse])

  return (
    <Router>
      <div id='alertModalRef' className={`alert alert-${serverResponse?.status || 'dark'} alert-modal`} role="alert">
        {serverResponse?.message}
      </div>
      <div className='container pt-5'>
        <Routes />
      </div>
    </Router>
  )
}

export default App
