import React, { useEffect, useState } from 'react'
import { Todo } from '../@types/todo.type'
import { TaskInput } from '../TaskInput'
import { TaskList } from '../TaskList'
import styles from './TodoList.module.scss'

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [currentTodos, setCurrentTodos] = useState<Todo | null>(null)

  const doneTodos = todos.filter((todo) => todo.done)
  const notDoneTodos = todos.filter((todo) => !todo.done)

  useEffect(() => {
    const todoString = localStorage.getItem('todos')
    const todoObj: Todo[] = JSON.parse(todoString || '[]')
    setTodos(todoObj)
  }, [])

  // handleAddTodo
  const handleAddTodo = (name: string) => {
    const newTodo: Todo[] = [
      ...todos,
      {
        id: new Date().toISOString(),
        name,
        done: false
      }
    ]
    setTodos(newTodo)

    // Localstrorage
    const newTodosLocal = [...newTodo]
    localStorage.setItem('todos', JSON.stringify(newTodosLocal))
  }

  // handleChecked Done Todo
  const handleCheckDoneTodo = (todoId: string, done: boolean) => {
    setTodos((prev) =>
      prev.map((item) => {
        if (item.id === todoId) {
          return { ...item, done }
        }
        return item
      })
    )
  }

  // handle ckick btn edit todo
  const handleEditTodos = (id: string) => {
    const findedTodos = todos.find((item) => item.id === id)
    if (findedTodos) {
      setCurrentTodos(findedTodos)
    }
  }

  // onChange edit to do
  const editTodos = (name: string) => {
    setCurrentTodos((prev) => {
      if (prev) {
        return { ...prev, name }
      }
      return null
    })
  }

  // submit handle edit todo
  const handleFinishEditTodo = () => {
    const handler = (todoObj: Todo[]) => {
      return todoObj.map((item) => {
        if (item.id === currentTodos?.id) {
          return currentTodos
        }
        return item
      })
    }

    setTodos(handler)
    setCurrentTodos(null)

    // localstrorage
    const todoString = localStorage.getItem('todos')
    const todoObj: Todo[] = JSON.parse(todoString || '[]')

    const newTodoObj = handler(todoObj)
    localStorage.setItem('todos', JSON.stringify(newTodoObj))
  }

  /// delete item todo
  const handleDeleteItemTodo = (id: string) => {
    if (currentTodos) {
      setCurrentTodos(null)
    }
    const itemTodo = todos.filter((item) => item.id !== id)
    setTodos(itemTodo)

    localStorage.setItem('todos', JSON.stringify(itemTodo))
  }

  return (
    <div className={styles.todoList}>
      <TaskInput
        handleAddTodo={handleAddTodo}
        currentTodos={currentTodos}
        editTodos={editTodos}
        handleFinishEditTodo={handleFinishEditTodo}
      />
      <TaskList
        todos={notDoneTodos}
        handleCheckDoneTodo={handleCheckDoneTodo}
        handleEditTodos={handleEditTodos}
        handleDeleteItemTodo={handleDeleteItemTodo}
      />
      <TaskList
        doneTaskList
        todos={doneTodos}
        handleCheckDoneTodo={handleCheckDoneTodo}
        handleEditTodos={handleEditTodos}
        handleDeleteItemTodo={handleDeleteItemTodo}
      />
    </div>
  )
}

export default TodoList
