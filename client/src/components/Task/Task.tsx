import React, {useState} from 'react'
import { useActions } from '../../middleware/useActions'
import { useTypedSelector } from '../../middleware/useTypedSelector'
import { ITask } from '../../types/stateTypes'
import styles from './Task.module.css'

interface TaskOwnProps {
  task: ITask
}

type TaskDirection = 'forward' | 'back'

const Task: React.FC<TaskOwnProps> = ({ task }) => {

  const project = useTypedSelector(state => state.project)
  const columns = useTypedSelector(state => state.project?.data.columns)

  const { setProject, createTask } = useActions()

  const [isDescriptionOpen, setDescriptionVisibility] = useState(false)

  const columnIndex = columns!.findIndex(column => column === task.column)

  const moveTask = (direction: TaskDirection): void => {
    let newColumn = task.column

    if (direction === 'forward') {
      newColumn = columns![columnIndex + 1]
    }
    if (direction === 'back') {
      newColumn = columns![columnIndex - 1]
    }
    
    const editedTask = {...task, column: newColumn}
    const filteredTasks = project!.data.tasks.filter(existedTask => existedTask !== task)
    const editedTasks = [...filteredTasks, editedTask]

    setProject({...project!, data: {...project!.data, tasks: editedTasks}})
  }

  const removeTaskHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation()
    const filteredTasks = project!.data.tasks.filter(existedTask => existedTask !== task)

    setProject({...project!, data: {...project!.data, tasks: [...filteredTasks]}})
  }

  const editTaskHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation()
    createTask(task)
  }

  const editTaskByKeyboard = (evt: KeyboardEvent) => {
    if (evt.key === ' ' || evt.key === 'Enter') {
      const target: HTMLElement = evt.currentTarget as HTMLElement;
      target.click()
    }
  } 

  const focusTaskEditByKeyboard = (evt: React.FocusEvent<HTMLSpanElement>) => {
    evt.currentTarget.addEventListener('keypress', editTaskByKeyboard)
  }

  const blurTaskEditByKeyboard = (evt: React.FocusEvent<HTMLSpanElement>) => {
    evt.currentTarget.removeEventListener('keypress', editTaskByKeyboard)
  }

  return (
    <div className={`${styles.taskPriority} ${styles[`taskPriority-${task.priority}`]}`} onClick={() => setDescriptionVisibility(prev => !prev)}>
      <div className={styles.taskName}>
        <h4 
          className={styles.taskTitle}
          onFocus={() => setDescriptionVisibility(true)}
          onBlur={() => setDescriptionVisibility(false)}
          title='Показать описание'
          tabIndex={0}
        >
          {task.name}
        </h4>
        <span
          className={styles.editIcon}
          onClick={editTaskHandler}
          onFocus={focusTaskEditByKeyboard}
          onBlur={blurTaskEditByKeyboard}
          title='Изменить задачу'
          tabIndex={0}
        >
          &#9998;
        </span>
      </div>
      {isDescriptionOpen && <div className={styles.description}>
          {task.description.map((string, index) => <p key={index} className={styles.descriptionString}>{string}</p>)}
        </div>
      }
      <small>Создана: {new Date(task.createdAt).toLocaleString()}</small>
      <div className={styles.btnGroup}>
        {columnIndex !== 0 && <button
            onClick={e => {e.stopPropagation(); moveTask('back')}}
            className={styles.btnBack + ' btn btn-sm btn-outline-dark'}
            title='В предыдущую колонку'
          >
            &#8678;
          </button>
        }
        {columnIndex !== columns!.length - 1 && <button
            onClick={e => {e.stopPropagation(); moveTask('forward')}}
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

export default Task
