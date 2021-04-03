import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Columns from '../../components/Columns/Columns'
import Loader from '../../components/Loader/Loader'
import CreateTaskModal from '../../components/CreateTaskModal/CreateTaskModal'
import { useTypedSelector } from '../../middleware/useTypedSelector'
import { useActions } from '../../middleware/useActions'
import styles from './ProjectPage.module.css'

const ProjectPage: React.FC = () => {

  enum ColumnFlag {
    ADD = 'ADD_COLUMN',
    REMOVE = 'REMOVE_COLUMN'
  }
  interface paramsType {
    id: string,
  }

  const {project, newTask} = useTypedSelector(state => state)
  const loading = useTypedSelector(state => state.showLoader)
  const token = useTypedSelector(state => state.userData.token)

  const { requestProjectById, saveProject, removeProject, setProject } = useActions()

  document.title = `${project?.title ?? 'Task '} | Desk`

  const history = useHistory()
  const linkId = useParams<paramsType>().id

  const editColumns = (flag: ColumnFlag, column: string): void => {

    if (!column || !column.trim()) return

    if (flag === ColumnFlag.ADD) {
      const newColumns = project!.data.columns.length > 0 ? [...project!.data.columns, column] : [ column ]
      setProject({...project!, data: {...project!.data, columns: newColumns}})
    }
    if (flag === ColumnFlag.REMOVE) {
      const newColumns = project!.data.columns.filter(col => col !== column)
      setProject({...project!, data: {...project!.data, columns: newColumns}})
    }
  }

  const removeHandler = (): void => {
    const submit = window.confirm('Это действие необратимо. Вы уверены?')

    if (submit) {
      removeProject(token!, linkId)
      history.push('/projects/')
    }
  }

  const goBackHandler = (): void => {
    saveProject(token!, linkId, project!)
    history.push('/projects/')
  }

  const saveHandler = (): void => {
    saveProject(token!, linkId, project!)
  }

  const addColumn = (): void => {
    const newTitle = prompt('Введите название:')
    if (newTitle?.trim()) {
      editColumns(ColumnFlag.ADD, newTitle)
    }
  }

  useEffect( () => {
    requestProjectById(token!, linkId)
    // eslint-disable-next-line
  }, [])

  return(
    <div>
      <header className={styles.header}>
        <h1>{project?.title}</h1>
        <button className={`${styles.rmBtn} btn btn-danger`} onClick={removeHandler}>Удалить проект</button>
      </header>
      <div className={styles.btnGroup}>
        <div className={styles.btnWithSave}>
          <button className={`${styles.backBtn} btn btn-dark`} onClick={goBackHandler}>Назад</button>
          <button className={`btn btn-dark`} onClick={saveHandler}>Сохранить</button>
        </div>
        <button className='btn btn-dark' onClick={addColumn}>Новый раздел</button>
      </div>
      {loading && <div className={styles.loaderWrapper}><Loader /></div>}
      {!loading && <>
        <Columns />
        </>}
      {newTask?.column && <CreateTaskModal />}
    </div>
  )
}

export default ProjectPage
