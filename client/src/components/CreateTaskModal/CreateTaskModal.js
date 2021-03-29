import React, {useRef} from 'react'
import { connect } from 'react-redux'
import { createTask, setProject } from '../../store/actionCreators/setProjects'
import styles from './CreateTaskModal.module.css'

const mapStateToProps = state => {
  return {
    project: state.project,
    columnName: state.newTask.column,
    existedTask: state.newTask,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setProject: proj => dispatch(setProject(proj)),
    createTask: task => dispatch(createTask(task))
  }
}

const CreateTaskModal = ({project, setProject, createTask, columnName, existedTask}) => {

  const taskName = useRef('')
  const taskPriority = useRef('normal')
  const taskDescription = useRef('')

  const taskCreatorHandler = (evt) => {

    evt.preventDefault()

    const newTask = {
      column: columnName,
      name: taskName.current.value,
      description: taskDescription.current.value.trim() ? taskDescription.current.value.split('\n') : ['*Без описания*'],
      priority: taskPriority.current.value,
      createdAt: Date.now()
    }

    if (!!existedTask.name) {
      newTask.createdAt = existedTask.createdAt

      const newTasks = project.data.tasks.map(task => task.createdAt === existedTask.createdAt ? newTask : task )

      setProject({...project, data: {...project.data, tasks: newTasks}})
      
      createTask({})
    } else {

      const newTasks = project.data.tasks.length !== 0 ? [...project.data.tasks, newTask] : [ newTask ]

      setProject({...project, data: {...project.data, tasks: newTasks}})
      
      createTask({})
    }
  }

  return (
    <div className={styles.overlay}>
      <form className={styles.container} onSubmit={e => taskCreatorHandler(e)}>
        <button type='button' className={styles.closeModal} onClick={() => createTask({})}>&times;</button>
        <div className={styles.header}>
          <h3>{columnName}</h3>
        </div>
        <hr />

        <label className={styles.inputLabel}>
          <h5>Введите название задачи:</h5>
          <input type='text' className="form-control fluid" defaultValue={existedTask.name ?? null} ref={taskName} autoFocus={true} required={true} />
        </label>

        <label className={styles.inputLabel}>
          <h6>Введите описание задачи (опционально)</h6>
          <textarea className="form-control" rows='3' ref={taskDescription} defaultValue={existedTask.description ? existedTask.description.join('\n') : null} />
        </label>

        <label className={styles.inputLabel}>
          <p className='m-0'>Приоритет:</p>
          <select className='form-control form-control-sm' defaultValue={existedTask.priority ?? 'normal'} ref={taskPriority}>
            <option value='low'>Низкий</option>
            <option value='normal'>Обычный</option>
            <option value='high'>Высокий</option>
          </select>
        </label>
      
        <div className={styles.submitBtn}>
          <button type='submit' className='btn btn-dark'>{existedTask.name ? 'Редактировать задачу' : 'Добавить задачу'}</button>
        </div>
      </form>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskModal)
