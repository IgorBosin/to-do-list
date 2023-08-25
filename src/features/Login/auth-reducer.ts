import {Dispatch} from "redux";
import {
    SetAppErrorActionType,
    setAppInitializedAC,
    SetAppInitializedActionType,
    setAppStatusAC,
    SetAppStatusActionType
} from "../../app/app-reducer";
import {LoginType} from "./Login";
import {authAPI} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

type InitialStateType = typeof initialState
type ActionType =
    SetAppStatusActionType
    | SetAppErrorActionType
    | ReturnType<typeof setIsLoggedInAC>
    | SetAppInitializedActionType

const initialState = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'LOGIN/SET-IS-LOGGED-IN': {
            return {...state, isLoggedIn: action.value}
        }
        default:
            return state
    }
}

export const setIsLoggedInAC = (value: boolean) => ({type: 'LOGIN/SET-IS-LOGGED-IN', value} as const)
export const loginTC = (data: LoginType) => async (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const result = await authAPI.login(data)
        if (result.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(result.data, dispatch)
        }
    } catch (err) {
        const error = (err as { message: string })
        handleServerNetworkError(error, dispatch)

    }
}
export const meTC = () => async (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const result = await authAPI.me()
        if (result.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(result.data, dispatch)
        }
    } catch (err) {
        const error = (err as { message: string })
        handleServerNetworkError(error, dispatch)
    } finally {
        dispatch(setAppInitializedAC(true))
    }
}
export const logOutTC = () => async (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const result = await authAPI.logOut()
        if (result.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(result.data, dispatch)
        }
    } catch (err) {
        const error = (err as { message: string })
        handleServerNetworkError(error, dispatch)

    }
}