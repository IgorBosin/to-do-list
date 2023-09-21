import { TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType } from 'api/todolists-api'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import { AppThunk } from 'app/store'
import { appActions } from 'app/app-reducer'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { todolistsActions } from 'features/TodolistsList/todolists-reducer'

const slice = createSlice({
  name: 'tasks',
  initialState: {} as TasksStateType,
  reducers: {
    removeTask: (state, action: PayloadAction<{ taskId: string; todolistId: string }>) => {
      // 1 variant
      // const tasks: TaskType[] = state[action.payload.todolistId].filter((t) => t.id !== action.payload.taskId)
      // state[action.payload.todolistId] = tasks

      // 2 variant  !!! НЕ РАБОТАЕТ❗️❗❗️
      // const tasksForTodolist: TaskType[] = state[action.payload.todolistId]
      // const task = tasksForTodolist.find((el) => el.id === action.payload.taskId)
      // if (task) tasksForTodolist.forEach((el) => el !== task)

      // 3 variant
      const tasksForTodolist: TaskType[] = state[action.payload.todolistId]
      const index: number = tasksForTodolist.findIndex((el) => el.id === action.payload.taskId)
      if (index !== -1) tasksForTodolist.splice(index, 1)
    },
    addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
      state[action.payload.task.todoListId].unshift(action.payload.task)
    },
    updateTask: (
      state,
      action: PayloadAction<{ taskId: string; model: UpdateDomainTaskModelType; todolistId: string }>,
    ) => {
      // 1 variant
      const tasksForTodolist: TaskType[] = state[action.payload.todolistId]
      const index: number = tasksForTodolist.findIndex((el) => el.id === action.payload.taskId)
      if (index !== -1) tasksForTodolist[index] = { ...tasksForTodolist[index], ...action.payload.model }

      // 2 variant !!! НЕ РАБОТАЕТ❗️❗❗️
      // const tasksForTodolist: TaskType[] = state[action.payload.todolistId]
      // let task: TaskType | undefined = tasksForTodolist.find((el) => el.id === action.payload.taskId)
      // if (task) task = { ...task, ...action.payload.model }
    },
    setTasks: (state, action: PayloadAction<{ tasks: Array<TaskType>; todolistId: string }>) => {
      state[action.payload.todolistId] = action.payload.tasks
    },
  },
  extraReducers: (builder) => {
    // т.к. нужно воспользоваться actions, которые находятся в другом slice
    builder
      .addCase(todolistsActions.addTodolist, (state, action) => {
        // return { ...state, [action.todolist.id]: [] } // immutability
        state[action.payload.todolist.id] = [] // mutability
      })
      .addCase(todolistsActions.removeTodolist, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(todolistsActions.setTodolists, (state, action) => {
        action.payload.todolists.forEach((el) => {
          state[el.id] = []
        })
      })
      .addCase(todolistsActions.clearData, (state, action) => {
        return (state = {})
      })
  },
})

export const tasksReducer = slice.reducer
export const taskActions = slice.actions

// thunks
export const fetchTasksTC =
  (todolistId: string): AppThunk =>
  (dispatch) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    todolistsAPI.getTasks(todolistId).then((res) => {
      const tasks = res.data.items
      dispatch(taskActions.setTasks({ tasks, todolistId }))
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
    })
  }
export const removeTaskTC =
  (taskId: string, todolistId: string): AppThunk =>
  (dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId).then((res) => {
      const action = taskActions.removeTask({ taskId, todolistId })
      dispatch(action)
    })
  }
export const addTaskTC =
  (title: string, todolistId: string): AppThunk =>
  (dispatch) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))

    todolistsAPI
      .createTask(todolistId, title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          const task = res.data.data.item
          const action = taskActions.addTask({ task })
          dispatch(action)
          dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
export const updateTaskTC =
  (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string): AppThunk =>
  (dispatch, getState) => {
    const state = getState()
    const task = state.tasks[todolistId].find((t) => t.id === taskId)
    if (!task) {
      //throw new Error("task not found in the state");
      console.warn('task not found in the state')
      return
    }

    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...domainModel,
    }

    todolistsAPI
      .updateTask(todolistId, taskId, apiModel)
      .then((res) => {
        if (res.data.resultCode === 0) {
          const action = taskActions.updateTask({ taskId, model: domainModel, todolistId })
          dispatch(action)
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }

// types
export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}
