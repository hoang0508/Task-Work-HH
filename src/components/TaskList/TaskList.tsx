import React from 'react'
import { Todo } from '../@types/todo.type'
import styles from './TaskList.module.scss'
import { BiEdit } from 'react-icons/bi'
import { BsFillTrashFill } from 'react-icons/bs'

interface ITaskList {
  doneTaskList?: boolean
  todos: Todo[]
  handleCheckDoneTodo: (todoId: string, done: boolean) => void
  handleEditTodos: (id: string) => void
  handleDeleteItemTodo: (id: string) => void
}

const TaskList = ({ doneTaskList, todos, handleCheckDoneTodo, handleEditTodos, handleDeleteItemTodo }: ITaskList) => {
  // handle checked checkbox
  const handleCheckBox = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    handleCheckDoneTodo(id, e.target.checked)
  }
  return (
    <div className={styles.taskList}>
      <h3 className={styles['taskList-title']}>{doneTaskList ? 'Hoàn thành' : 'Chưa hoàn thành'}</h3>
      {todos.length <= 0 && <span className={styles['taskList-notfound']}>Chưa có công việc nào!!</span>}
      {todos &&
        todos.map((item) => (
          <div className={styles['taskList-list']} key={item.id}>
            <div className={styles['taskList-list--item']}>
              <input
                className={styles['taskList-list--item-check']}
                type='checkbox'
                checked={item.done}
                onChange={(e) => handleCheckBox(item.id, e)}
              />
              <span
                className={`${styles['taskList-list--item-text']} ${
                  item.done ? styles['taskList-list--item-done'] : ''
                }`}
              >
                {item.name}
              </span>
            </div>
            <div className={styles['taskList-list--action']}>
              <span className={styles['action-edit']} onClick={() => handleEditTodos(item.id)}>
                <BiEdit />
              </span>
              <span className={styles['action-remove']} onClick={() => handleDeleteItemTodo(item.id)}>
                <BsFillTrashFill />
              </span>
            </div>
          </div>
        ))}
    </div>
  )
}

export default TaskList
