import React, { useRef } from 'react'
import Task from '../Task/Task'
import { connect } from 'react-redux'
import { setProject, createTask } from '../../store/actionCreators/setProjects'
import styles from './Column.module.css'

const mapStateToProps = (state, ownProps) => {
  return {
    project: state.project,
    column: ownProps.column,
    columns: state.project.data.columns,
    tasks: state.project.data.tasks,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setProject: proj => dispatch(setProject(proj)),
    createTask: task => dispatch(createTask(task)),
  }
}

const Column = ({ project, setProject, createTask, column, columns, tasks }) => {

  const columnName = useRef(null)

  const comparePriority = (a, b) => {
    if (a.priority === 'high' && (b.priority === 'normal' || b.priority === 'low')) return -1;
    if (a.priority === 'normal' && b.priority === 'low') return -1;
    if (a.priority === b.priority) return 0;
    if (a.priority === 'normal' && b.priority === 'high') return 1;
    if (a.priority === 'low' && (b.priority === 'high' || b.priority === 'normal')) return 1;
  }

  const createNewTask = () => {
    createTask({column: columnName.current.innerText})
  }

  const removeColumnHandler = () => {
    const filteredColumns = columns.filter(existedColumn => existedColumn !== column)
    const filteredTasks = tasks.filter(task => task.column !== column)

    setProject({...project, data: {columns: [...filteredColumns], tasks: [...filteredTasks]}})
  }

  return (
    <div key={column} className={styles.column}>
      <div className={styles.header}>
        <h3 className={styles.columnnTitle} ref={columnName}>{column}</h3>
        <button className={styles.taskBtn + ' btn btn-light btn-sm'} onClick={createNewTask} title='Добавть задачу'>+</button>
      </div>
      <div>
        {tasks.filter(task => task.column === column).sort(comparePriority).map(task => <Task task={task} key={task.createdAt} columns={columns} projectLocal={project} setProjectLocal={setProject} />)}
      </div>
      <button className={styles.deleteColumnButton + ' btn btn-outline-danger'} onClick={() => removeColumnHandler()}>
        Удалить
      </button>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Column)
