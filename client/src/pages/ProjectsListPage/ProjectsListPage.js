import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { logout } from '../../store/actionCreators/setAuthorisation'
import { requestProjects, createProject, removeProject } from '../../store/actionCreators/setProjects'
import { setMessage } from '../../store/actionCreators/common'
import { useHistory } from 'react-router-dom'
import { logout as clearStorage } from '../../middleware/auth'
import Loader from '../../components/Loader/Loader'
import styles from './ProjectsListPage.module.css'

const mapStateToProps = state => {
  return {
    token: state.userData.token,
    loading: state.showLoader,
    projects: state.userData.projects,
    isAuthorised: state.userData.isAuthorised,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestProjects: token => dispatch(requestProjects(token)),
    createProject: (token, title) => dispatch(createProject(token, title)),
    removeProject: (token, linkId) => dispatch(removeProject(token, linkId)),
    setMessage: message => dispatch(setMessage(message)),
    logout: () => dispatch(logout()),
  }
}

const ProjectsListPage = ({ loading, token, projects, requestProjects, createProject, removeProject, setMessage, logout, isAuthorised }) => {

  const projectTitle = useRef('')
  const history = useHistory()

  const logoutHandler = () => {
    clearStorage()
    logout()
  }

  const createHandler = e => {
    e.preventDefault()
    createProject(token, projectTitle.current.value)
    projectTitle.current.value = ''
  }

  const removeHandler = (linkId) => {
    const submit = window.confirm('Это действие необратимо. Вы уверены?')

    if (submit) {
      removeProject(token, linkId)
      setMessage('Проект удалён')
    }
  }

  const openProjectByKeyboard = evt => {
    if (evt.key === ' ' || evt.key === 'Enter') {
      evt.target.click()
    }
  } 

  const focusProjectByKeyboard = evt => {
    evt.target.parentElement.classList.add(styles.handlyFocused)
    evt.target.addEventListener('keypress', openProjectByKeyboard)
  }

  const blurProjectByKeyboard = evt => {
    evt.target.parentElement.classList.remove(styles.handlyFocused)
    evt.target.removeEventListener('keypress', openProjectByKeyboard)
  }

  useEffect( () => {
    if (isAuthorised === false) history.push('/')
  }, [isAuthorised, history])

  useEffect( () => {
    async function fetchData() {
      await requestProjects(token)
    }
    fetchData();
    // eslint-disable-next-line
  }, [])

  return(
    <>
      <header className={styles.header}>
        <h1>Список проектов</h1>
        <a href='/' className='btn btn-dark' onClick={logoutHandler}>Выйти</a>
      </header>
      
      <button onClick={() => requestProjects(token)} className='btn btn-dark mb-2'>Обновить список</button>

      <div className={styles.projectsList}>
        {loading && <div className={styles.loaderWrapper}><Loader /></div>}
        {!loading && projects.length === 0 && <p className='mb-0'>Проектов нет</p>}
        {!loading && projects.map(proj => <div
            className={styles.project}
            key={proj._id}
            onClick={() => history.push(`/projects/${proj._id}`)}
          >
            <h3
              className={styles.projectTitle}
              tabIndex='0'
              onFocus={focusProjectByKeyboard}
              onBlur={blurProjectByKeyboard}
            >
              {proj.title}
            </h3>
            <button
              className='btn btn-sm btn-outline-danger ml-auto'
              onClick={ e => {e.stopPropagation(); removeHandler(proj._id)}}
              onFocus={e => e.target.parentElement.classList.add(styles.handlyFocused)}
              onBlur={e => e.target.parentElement.classList.remove(styles.handlyFocused)}
            >
              Удалить
            </button>
          </div>
        )}
      </div>

      <form className={styles.createForm} onSubmit={e => createHandler(e)}>
        <h2>Создать новый проект:</h2>
          <label className={styles.formLabel}>
            <p className='mb-0'>Название</p>
            <input
              type="text"
              className="form-control"
              autoComplete='off'
              placeholder="Введите название"
              required={true}
              ref={projectTitle}
            />
          </label>
        <button
          type='submit'
          className="btn btn-primary"
          disabled={loading}
        >
          Создать
        </button>
      </form>
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsListPage)
