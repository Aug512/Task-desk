import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { requestProjectById, saveProject, removeProject, setProject } from '../../store/actionCreators/setProjects'
import { setMessage } from '../../store/actionCreators/common'
import { useParams, useHistory } from 'react-router-dom'
import Columns from '../../components/Columns/Columns'
import Loader from '../../components/Loader/Loader'
import styles from './ProjectPage.module.css'
import CreateTaskModal from '../../components/CreateTaskModal/CreateTaskModal'

const mapStateToProps = state => {
  return {
    token: state.userData.token,
    loading: state.showLoader,
    project: state.project,
    newTask: state.newTask
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestProjectById: (token, linkId) => dispatch(requestProjectById(token, linkId)),
    saveProject: (token, linkId, project) => dispatch(saveProject(token, linkId, project)),
    removeProject: (token, linkId) => dispatch(removeProject(token, linkId)),
    setProject: project => dispatch(setProject(project)),
    setMessage: message => dispatch(setMessage(message)),
  }
}

const ProjectPage = ({ project, token, loading, requestProjectById, saveProject, removeProject, setProject, newTask, setMessage }) => {

  const history = useHistory()
  const linkId = useParams().id

  const editColumns = (flag, column) => {

    if (!column || !column.trim()) return

    if (flag === 'add') {
      const newColumns = project.data.columns.length > 0 ? [...project.data.columns, column] : [ column ]
      setProject({...project, data: {...project.data, columns: newColumns}})
    }
    if (flag === 'remove') {
      const newColumns = project.data.columns.filter(col => col !== column)
      setProject({...project, data: {...project.data, columns: newColumns}})
    }
  }

  const removeHandler = () => {
    const submit = window.confirm('Это действие необратимо. Вы уверены?')

    if (submit) {
      removeProject(token, linkId)
      history.push('/projects/')
      setMessage('Проект удалён')
    }
  }

  const goBackHandler = () => {
    saveProject(token, linkId, project)
    history.push('/projects/')
    setMessage('Проект сохранён')
  }

  const addColumn = () => {
    const newTitle = prompt('Введите название:')
    editColumns('add', newTitle)
  }

  useEffect( () => {
    requestProjectById(token, linkId)
  }, [requestProjectById, token, linkId])

  return(
    <div>
      <header className={styles.header}>
        <h1>{project.title}</h1>
        <button className='btn btn-danger' onClick={removeHandler}>Удалить проект</button>
      </header>
      <div className={styles.btnGroup}>
        <button className='btn btn-dark' onClick={goBackHandler}>Go back</button>
        <button className='btn btn-dark' onClick={addColumn}>Новый раздел</button>
      </div>
      {loading && <div className={styles.loaderWrapper}><Loader /></div>}
      {!loading && <>
        <Columns data={project.data} />
        </>}
      {newTask.column && <CreateTaskModal />}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage)