import React, {useRef} from 'react'
import { useActions } from '../../middleware/useActions'
import { useTypedSelector } from '../../middleware/useTypedSelector'
import { ITask } from '../../types/stateTypes'
import styles from './CreateTaskModal.module.css'

// const mapStateToProps = state => {
//   return {
//     project: state.project,
//     columnName: state.newTask.column,
//     existedTask: state.newTask,
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     setProject: proj => dispatch(setProject(proj)),
//     createTask: task => dispatch(createTask(task))
//   }
// }

const CreateTaskModal: React.FC = () => {

  // {project, setProject, createTask, columnName, existedTask}

  const project = useTypedSelector(state => state.project)
  const columnName = useTypedSelector(state => state.newTask!.column)
  const existedTask = useTypedSelector(state => state.newTask!)

  const { setProject, createTask } = useActions()

  const taskName = useRef<HTMLInputElement>(null)
  const taskPriority = useRef<HTMLSelectElement>(null)
  const taskDescription = useRef<HTMLTextAreaElement>(null)



  const taskCreatorHandler = (evt: React.FormEvent<HTMLFormElement>) => {

    evt.preventDefault()

    const newTask: ITask = {
      column: columnName,
      name: taskName.current!.value,
      description: taskDescription.current!.value.trim() ? taskDescription.current!.value.split('\n') : ['*Без описания*'],
      priority: taskPriority.current!.value,
      createdAt: new Date(),
    }

    if (!!existedTask.name) {
      newTask.createdAt = existedTask.createdAt

      const newTasks = project!.data.tasks.map(task => task.createdAt === existedTask.createdAt ? newTask : task )

      setProject({...project!, data: {...project!.data, tasks: newTasks}})
      
      createTask(null)
    } else {

      const newTasks = project!.data.tasks.length !== 0 ? [...project!.data.tasks, newTask] : [ newTask ]

      setProject({...project!, data: {...project!.data, tasks: newTasks}})
      
      createTask(null)
    }
  }

  return (
    <div className={styles.overlay} onClick={() => {createTask(null)}}>
      <form className={styles.container} onSubmit={e => taskCreatorHandler(e)} onClick={e => e.stopPropagation()}>
        <button type='button' className={styles.closeModal} onClick={() => createTask(null)}>&times;</button>
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
          <textarea className="form-control" rows={3} ref={taskDescription} defaultValue={existedTask.description ? existedTask.description.join('\n') : undefined} />
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

export default CreateTaskModal
// export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskModal)
