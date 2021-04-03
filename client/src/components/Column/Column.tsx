import React, { useRef } from 'react'
import Task from '../Task/Task'
import styles from './Column.module.css'
import { ITask } from '../../types/stateTypes'
import { useTypedSelector } from '../../middleware/useTypedSelector'
import { useActions } from '../../middleware/useActions'

interface ColumnOwnProps {
  column: string
}

const Column: React.FC<ColumnOwnProps> = ({ column }) => {

  const project = useTypedSelector(state => state.project!)
  const { columns, tasks } = useTypedSelector(state => state.project!.data)

  const { setProject, createTask } = useActions()

  const columnName = useRef<HTMLHeadingElement>(null)

  const comparePriority = (a: ITask, b: ITask): number => {
    if (a.priority === 'high' && (b.priority === 'normal' || b.priority === 'low')) return -1;
    if (a.priority === 'normal' && b.priority === 'low') return -1;
    if (a.priority === b.priority) return 0;
    if (a.priority === 'normal' && b.priority === 'high') return 1;
    if (a.priority === 'low' && (b.priority === 'high' || b.priority === 'normal')) return 1;
    else return 0
  }

  const createNewTask = () => {
    createTask({
      column: columnName.current!.innerText,
      name: '',
      description: [],
      priority: 'normal',
      createdAt: new Date(),
    })
  }

  const removeColumnHandler = () => {
    const filteredColumns = columns.filter(existedColumn => existedColumn !== column)
    const filteredTasks = tasks.filter(task => task.column !== column)

    setProject({...project, data: {columns: [...filteredColumns], tasks: [...filteredTasks]}})
  }

  return (
    <div key={column} className={styles.column}>
      <div className={styles.header}>
        <h3 ref={columnName}>{column}</h3>
        <button className={'btn btn-light btn-sm ml-1'} onClick={createNewTask} title='Добавть задачу'>+</button>
      </div>
      <div>
        {tasks.filter((task: ITask) => task.column === column).sort(comparePriority).map((task: ITask) => <Task task={task} key={+task.createdAt} />)}
      </div>
      <button className={styles.deleteColumnButton + ' btn btn-outline-danger'} onClick={() => removeColumnHandler()}>
        Удалить
      </button>
    </div>
  )
}

export default Column
