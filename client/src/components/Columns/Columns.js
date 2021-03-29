import React from 'react'
import Column from '../Column/Column'
import styles from './Columns.module.css'

const Columns = ({ data }) => {

  return (
    <div className={styles.wrapper}>
      {(!data || data.columns.length === 0) && <h4 className='mb-0'>Создайте первый раздел</h4>}
      <div className={styles.container}>
        {data && data.columns.length > 0 && data.columns.map(column => <Column key={column} column={column} />)}
      </div>
    </div>
  )
}

export default Columns
