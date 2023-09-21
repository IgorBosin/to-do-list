import { authAPI, LoginParamsType } from 'api/todolists-api'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { appActions } from 'app/app-reducer'
import { todolistsActions } from 'features/TodolistsList/todolists-reducer'

const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      // return { ...state, isLoggedIn: action.value } // иммутабельно в Redux
      state.isLoggedIn = action.payload.isLoggedIn // мутабельно в Toolkit
    },
  },
})

// thunks
export const loginTC =
  (data: LoginParamsType): AppThunk =>
  (dispatch) => {
    // (data: LoginParamsType) => (dispatch: Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    authAPI
      .login(data)
      .then((res) => {
        if (res.data.resultCode === 0) {
          // dispatch(setIsLoggedInAC(true)) // было в Redux
          dispatch(authActions.setIsLoggedIn({ isLoggedIn: true })) // стало в Toolkit
          dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
export const logoutTC = (): AppThunk => (dispatch) => {
  // export const logoutTC = () => (dispatch: Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>) => {
  dispatch(appActions.setAppStatus({ status: 'loading' }))
  authAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        // dispatch(setIsLoggedInAC(false)) // было в Redux
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: false })) // стало в Toolkit
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        dispatch(todolistsActions.clearData())
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const authReducer = slice.reducer
// export const { setIsLoggedIn } = slice.actions // из док-ции Toolkit
export const authActions = slice.actions // упаковывам в объект
