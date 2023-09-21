import { todolistsAPI, TodolistType } from 'api/todolists-api'
import { handleServerNetworkError } from 'utils/error-utils'
import { AppThunk } from 'app/store'
import { appActions, RequestStatusType } from 'app/app-reducer'
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { fetchTasksTC } from 'features/TodolistsList/tasks-reducer'

const slice = createSlice({
  name: 'todolists',
  initialState: [] as TodolistDomainType[],
  reducers: {
    addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      // если необходимо посомтреть что находится в стейте с помощью debugger, то необходимо state обернуть в current
      const stateForDebugger = current(state)

      state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' })
    },
    removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
      // state.filter((tl) => tl.id !== action.payload.id) // иммутабельно
      const index = state.findIndex((todo) => todo.id === action.payload.id) // преимущество перед filter - когда находит останавливает итерации
      if (index !== -1) state.splice(index, 1) // мутабельно
    },
    changeTodolistTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
      //1 variant - findIndex
      // const index = state.findIndex((todo) => todo.id === action.payload.id)
      // if (index !== -1) state[index].title = action.payload.title

      //2 variant - find
      const todo = state.find((todo) => todo.id === action.payload.id)
      if (todo) todo.title = action.payload.title
    },
    changeTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) state[index].filter = action.payload.filter
    },
    changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>) => {
      const todo = state.find((todo) => todo.id === action.payload.id)
      if (todo) todo.entityStatus = action.payload.entityStatus
    },
    setTodolists: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
      //1 variant
      // const todo = action.payload.todolists.map((el) => ({ ...el, filter: 'all', entityStatus: 'idle' }))
      // state.unshift(...(todo as TodolistDomainType[]))

      //2 variant
      // action.payload.todolists.forEach((el) => {
      //   state.push({ ...el, filter: 'all', entityStatus: 'idle' })
      // })

      //3 variant
      return action.payload.todolists.map((el) => ({ ...el, filter: 'all', entityStatus: 'idle' }))
    },
    clearData: (state, action: PayloadAction) => {
      return (state = [])
    },
  },
})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions

// thunks
export const fetchTodolistsTC = (): AppThunk => {
  return (dispatch) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))

    todolistsAPI
      .getTodolists()
      .then((res) => {
        dispatch(todolistsActions.setTodolists({ todolists: res.data }))
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        return res.data
      })
      .then((todos) => {
        todos.forEach((el) => {
          dispatch(fetchTasksTC(el.id))
        })
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
}
export const removeTodolistTC = (id: string): AppThunk => {
  return (dispatch) => {
    //изменим глобальный статус приложения, чтобы вверху полоса побежала
    dispatch(appActions.setAppStatus({ status: 'loading' }))

    //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
    dispatch(todolistsActions.changeTodolistEntityStatus({ id, entityStatus: 'loading' }))
    todolistsAPI.deleteTodolist(id).then((res) => {
      dispatch(todolistsActions.removeTodolist({ id }))
      //скажем глобально приложению, что асинхронная операция завершена
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
    })
  }
}
export const addTodolistTC = (title: string): AppThunk => {
  return (dispatch) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))

    todolistsAPI.createTodolist(title).then((res) => {
      dispatch(todolistsActions.addTodolist({ todolist: res.data.data.item }))
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
    })
  }
}
export const changeTodolistTitleTC = (id: string, title: string): AppThunk => {
  return (dispatch) => {
    todolistsAPI.updateTodolist(id, title).then((res) => {
      dispatch(todolistsActions.changeTodolistTitle({ id, title }))
    })
  }
}

// types
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}
