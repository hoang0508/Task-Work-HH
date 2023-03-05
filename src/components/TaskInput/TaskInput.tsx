import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Todo } from '../@types/todo.type'
import styles from './TaskInput.module.scss'
import { AiTwotoneEdit } from 'react-icons/ai'
import { MdAddCircle } from 'react-icons/md'

interface ITaskInput {
  handleAddTodo: (name: string) => void
  editTodos: (name: string) => void
  currentTodos: Todo | null
  handleFinishEditTodo: () => void
}

const TaskInput = ({ handleAddTodo, editTodos, currentTodos, handleFinishEditTodo }: ITaskInput) => {
  const [name, setName] = useState<string>('')

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentTodos) {
      editTodos(e.target.value)
    } else {
      setName(e.target.value)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (name === '') {
      return toast.error('Bạn hãy nhập công việc...!!')
    }
    if (currentTodos) {
      handleFinishEditTodo()
      if (name) setName('')
    } else {
      handleAddTodo(name)
      setName('')
    }
  }
  return (
    <div className={styles.taskInput}>
      <h3 className={styles['taskInput-title']}>Công việc của bạn</h3>
      <form action='#' className={styles['taskInput-form']} onSubmit={(e) => handleSubmit(e)}>
        <input
          type='text'
          placeholder='Bạn hãy nhập...'
          className={styles['taskInput-form--input']}
          value={currentTodos ? currentTodos.name : name}
          onChange={(e) => handleChangeName(e)}
        />
        <button type='submit' className={styles['taskInput-form--btn']}>
          {currentTodos ? (
            <span className={styles['btn-edit']}>
              <AiTwotoneEdit />
            </span>
          ) : (
            <span className={styles['btn-add']}>
              <MdAddCircle />
            </span>
          )}
        </button>
      </form>
    </div>
  )
}

export default TaskInput
