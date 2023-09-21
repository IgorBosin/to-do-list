import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  addTodolistTC,
  changeTodolistTitleTC,
  fetchTodolistsTC,
  FilterValuesType,
  removeTodolistTC,
  todolistsActions,
} from './todolists-reducer'
import { addTaskTC, removeTaskTC, updateTaskTC } from './tasks-reducer'
import { TaskStatuses } from 'api/todolists-api'
import { Grid, Paper } from '@mui/material'
import { AddItemForm } from 'components/AddItemForm/AddItemForm'
import { Todolist } from './Todolist/Todolist'
import { Navigate } from 'react-router-dom'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { isLoggedInSelector, tasksSelector, todolistsSelector } from 'app/app-selector'

type PropsType = {
  demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({ demo = false }) => {
  const todolists = useSelector(todolistsSelector)
  const tasks = useSelector(tasksSelector)
  const isLoggedIn = useSelector(isLoggedInSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return
    }
    dispatch(fetchTodolistsTC())
  }, [dispatch, demo, isLoggedIn]) // БЫЛ ПУСТОЙ МАССИВ ЗАВИСИМОСТЕЙ

  const removeTask = useCallback(function (id: string, todolistId: string) {
    dispatch(removeTaskTC(id, todolistId))
  }, [])

  const addTask = useCallback(
    function (title: string, todolistId: string) {
      dispatch(addTaskTC(title, todolistId))
    },
    [dispatch],
  )

  const changeStatus = useCallback(
    function (id: string, status: TaskStatuses, todolistId: string) {
      dispatch(updateTaskTC(id, { status }, todolistId))
    },
    [dispatch],
  )

  const changeTaskTitle = useCallback(
    function (id: string, newTitle: string, todolistId: string) {
      dispatch(updateTaskTC(id, { title: newTitle }, todolistId))
    },
    [dispatch],
  )

  const changeFilter = useCallback(
    function (filter: FilterValuesType, todolistId: string) {
      dispatch(todolistsActions.changeTodolistFilter({ id: todolistId, filter }))
    },
    [dispatch],
  )

  const removeTodolist = useCallback(
    function (id: string) {
      dispatch(removeTodolistTC(id))
    },
    [dispatch],
  )

  const changeTodolistTitle = useCallback(
    function (id: string, title: string) {
      dispatch(changeTodolistTitleTC(id, title))
    },
    [dispatch],
  )

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolistTC(title))
    },
    [dispatch],
  )

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    <>
      <Grid container style={{ padding: '20px' }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          let allTodolistTasks = tasks[tl.id]

          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: '10px' }}>
                <Todolist
                  todolist={tl}
                  tasks={allTodolistTasks}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeStatus}
                  removeTodolist={removeTodolist}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
                  demo={demo}
                />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
