import React, { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { logout as clearStorage } from '../../middleware/auth'
import { useActions } from '../../middleware/useActions'
import { useTypedSelector } from '../../middleware/useTypedSelector'
import { IProject } from '../../types/stateTypes'
import Loader from '../../components/Loader/Loader'

const styles = require('./ProjectsListPage.module.css')

const ProjectsListPage: React.FC = () => {

  const loading = useTypedSelector(state => state.showLoader)
  const { token, projects, isAuthorized} = useTypedSelector(state => state.userData)
  const { requestProjects, createProject, removeProject, setMessage, logout } = useActions()

  const projectTitle = useRef<HTMLInputElement | null>(null)
  const history = useHistory()

  const logoutHandler = () => {
    clearStorage()
    logout()
  }

  const createHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    createProject(token!, projectTitle.current!.value)
    projectTitle.current!.value = ''
  }

  const removeHandler = (linkId: string): void => {
    const submit = window.confirm('Это действие необратимо. Вы уверены?')

    if (submit) {
      removeProject(token!, linkId)
      setMessage('Проект удалён')
    }
  }

  const openProjectByKeyboard = (evt: KeyboardEvent): void => {
    if (evt.key === ' ' || evt.key === 'Enter') {
      const target: HTMLElement = evt.currentTarget as HTMLElement
      target.click()
    }
  } 

  const focusProjectByKeyboard = (evt: React.FocusEvent): void => {
    const target: HTMLElement = evt.currentTarget as HTMLElement;
    (target.parentNode as HTMLElement).classList.add(styles.handlyFocused)
    target.addEventListener('keypress', openProjectByKeyboard)
  }

  const blurProjectByKeyboard = (evt: React.FocusEvent): void => {
    const target: HTMLElement = evt.currentTarget as HTMLElement;
    (target.parentNode as HTMLElement).classList.remove(styles.handlyFocused)
    target.removeEventListener('keypress', openProjectByKeyboard)
  }

  useEffect( () => {
    if (isAuthorized === false) history.push('/')
  }, [isAuthorized, history])

  useEffect( () => {
    async function fetchData() {
      await requestProjects(token!)
    }
    fetchData();
    // eslint-disable-next-line
  }, [])

  return(
    <div className={styles.projectListContainer}>
      <header className={styles.header}>
        <h1>Список проектов</h1>
        <a href='/' className='btn btn-dark' onClick={logoutHandler}>Выйти</a>
      </header>
      
      <button onClick={() => requestProjects(token!)} className='btn btn-dark mb-2'>Обновить список</button>

      <div className={styles.projectsList}>
        {loading && <div className={styles.loaderWrapper}><Loader /></div>}
        {!loading && projects.length === 0 && <p className='mb-0'>Проектов нет</p>}
        {!loading && projects.map((proj: IProject) => <div
            className={styles.project}
            key={proj._id}
            onClick={() => history.push(`/projects/${proj._id}`)}
          >
            <h3
              className={styles.projectTitle}
              tabIndex={0}
              onFocus={focusProjectByKeyboard}
              onBlur={blurProjectByKeyboard}
            >
              {proj.title}
            </h3>
            <button
              className='btn btn-sm btn-outline-danger ml-auto'
              onClick={ e => {e.stopPropagation(); removeHandler(proj._id)}}
              onFocus={e => e.target.parentElement!.classList.add(styles.handlyFocused)}
              onBlur={e => e.target.parentElement!.classList.remove(styles.handlyFocused)}
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
    </div>
  )
}

export default ProjectsListPage
