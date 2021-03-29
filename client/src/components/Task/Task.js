import React, {useState} from 'react'
import { connect } from 'react-redux'
import { setProject, createTask } from '../../store/actionCreators/setProjects'
import styles from './Task.module.css'

const mapStateToProps = (state, ownProps) => {
  return {
    project: state.project,
    columns: state.project.data.columns,
    task: ownProps.task,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setProject: proj => dispatch(setProject(proj)),
    createTask: task => dispatch(createTask(task)),
  }
}

const Task = ({ project, setProject, task, columns, createTask }) => {

  const [isDescriptionOpen, setDescriptionVisibility] = useState(false)

  const columnIndex = columns.findIndex(column => column === task.column)

  const moveTask = (direction) => {
    let newColumn = task.column

    if (direction === 'forward') {
      newColumn = columns[columnIndex + 1]
    } else if (direction === 'back') {
      newColumn = columns[columnIndex - 1]
    } else {
      throw new Error({message: 'Wrong function argument, doing nothing'})
    }
    
    const editedTask = {...task, column: newColumn}
    const filteredTasks = project.data.tasks.filter(existedTask => existedTask !== task)
    const editedTasks = [...filteredTasks, editedTask]

    setProject({...project, data: {...project.data, tasks: editedTasks}})
  }

  const removeTaskHandler = () => {
    const filteredTasks = project.data.tasks.filter(existedTask => existedTask !== task)

    setProject({...project, data: {...project.data, tasks: [...filteredTasks]}})
  }

  const editTaskHandler = evt => {
    evt.preventDefault()
    evt.stopPropagation()
    createTask(task)
  }

  return (
    <div className={`${styles.taskPriority} ${styles[`taskPriority-${task.priority}`]}`}>
      <div className={styles.taskName}>
        <h4 
          className={styles.taskTitle}
          onClick={() => setDescriptionVisibility(prev => !prev)}
          onFocus={() => setDescriptionVisibility(true)}
          onBlur={() => setDescriptionVisibility(false)}
          title='Показать описание'
          tabIndex='0'
        >
          {task.name}
        </h4>
        <i
          className={styles.editIcon}
          onClick={editTaskHandler}
          title='Изменить задачу'
          tabIndex='0'  
        >
          &#9998;
        </i>
      </div>
      {isDescriptionOpen && <div className={styles.description}>
          {task.description.map((string, index) => <p key={index} className={styles.descriptionString}>{string}</p>)}
        </div>
      }
      <small>Создана: {new Date(task.createdAt).toLocaleString()}</small>
      <div className={styles.btnGroup}>
        {columnIndex !== 0 && <button
            onClick={() => moveTask('back')}
            className={styles.btnBack + ' btn btn-sm btn-outline-dark'}
            title='В предыдущую колонку'
          >
            &#8678;
          </button>
        }
        {columnIndex !== columns.length - 1 && <button
            onClick={() => moveTask('forward')}
            className={styles.btnForward + ' btn btn-sm btn-outline-dark'}
            title='В следующую колонку'
          >
            &#8680;
          </button>
        }
      </div>
      
      <button className={styles.removeTask +' btn btn-danger btn-sm'} onClick={removeTaskHandler}>
        Удалить задачу
      </button>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Task)