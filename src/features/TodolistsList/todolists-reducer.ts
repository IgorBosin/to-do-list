import {ResultCode, TaskType, todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {RequestStatusType, setErrorAC, setStatusAC, setStatusActionType} from "../../app/appReducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import axios from "axios";
import {ErrorType} from "./tasks-reducer";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: "idle"}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
        case "CHANGE-TODOLIST-STATUS":
            return state.map(el => el.id === action.id ? {...el, entityStatus: action.status} : el)
        default:
            return state
    }
}

// actions
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)
export const changeTodolistStatusAC = (id: string, status: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-STATUS',
    id,
    status
} as const)

// thunks
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setStatusAC('loading'))
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setStatusAC('succeded'))
            })
    }
}
// export const removeTodolistTC = (todolistId: string) => {
//     return (dispatch: Dispatch<ActionsType>) => {
//         dispatch(setStatusAC('loading'))
//         dispatch(changeTodolistStatusAC(todolistId, 'loading'))
//         todolistsAPI.deleteTodolist(todolistId)
//             .then((res) => {
//                 dispatch(removeTodolistAC(todolistId))
//                 dispatch(setStatusAC('succeded'))
//             })
//             .catch(error => {
//                 handleServerNetworkError(dispatch, error.message)
//                 // dispatch(setErrorAC(error.message))
//                 // dispatch(setStatusAC('succeded'))
//                 dispatch(changeTodolistStatusAC(todolistId, "idle"))
//             })
//     }
// }
export const removeTodolistTC = (todolistId: string) => {
    return async (dispatch: Dispatch<ActionsType>) => {
        dispatch(setStatusAC('loading'))
        dispatch(changeTodolistStatusAC(todolistId, 'loading'))
        try {
            const res = await todolistsAPI.deleteTodolist(todolistId)
            const a = res.data.messages.find(el=>el==='1')

            dispatch(removeTodolistAC(todolistId))
            dispatch(setStatusAC('succeded'))
        } catch (e) {
            if (axios.isAxiosError<ErrorType>(e)) {
                const error = e.response ? e.response.data.messages[0].message : e.message
                handleServerNetworkError(dispatch, error)
                dispatch(changeTodolistStatusAC(todolistId, "idle"))
                return
            }
            handleServerNetworkError(dispatch, (e as Error).message)
            dispatch(changeTodolistStatusAC(todolistId, "idle"))
        }
    }
}
// export const addTodolistTC = (title: string) => {
//     return (dispatch: Dispatch<ActionsType>) => {
//         dispatch(setStatusAC('loading'))
//         todolistsAPI.createTodolist(title)
//             .then((res) => {
//                 if (res.data.resultCode === ResultCode.OK) {
//                     dispatch(addTodolistAC(res.data.data.item))
//                     dispatch(setStatusAC('succeded'))
//                 } else {
//                     handleServerAppError(dispatch,res.data)
//                     // const error = res.data.messages[0]
//                     // if (error) {
//                     //     dispatch(setErrorAC(error))
//                     // } else {
//                     //     dispatch(setErrorAC('some error'))
//                     // }
//                     // dispatch(setStatusAC('succeded'))
//                 }
//             })
//             .catch(error => {
//                 handleServerNetworkError(dispatch,error.message)
//                 // dispatch(setStatusAC('succeded'))
//                 // dispatch(setErrorAC(error.message))
//             })
//     }
// }
export const addTodolistTC = (title: string) => {
    return async (dispatch: Dispatch<ActionsType>) => {
        dispatch(setStatusAC('loading'))
        try {
            const res = await todolistsAPI.createTodolist(title)
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setStatusAC('succeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        } catch (error) {
            if (axios.isAxiosError<ErrorType>(error)) {
                handleServerNetworkError(dispatch, error.message)
            }
            const err = (error as Error).message
            handleServerNetworkError(dispatch, err)
        }
    }
}

export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setStatusAC('loading'))
        todolistsAPI.updateTodolist(id, title)
            .then((res) => {
                if (res.data.resultCode === ResultCode.OK) {
                    dispatch(changeTodolistTitleAC(id, title))
                    dispatch(setStatusAC('succeded'))
                } else {
                    handleServerAppError(dispatch, res.data)
                    // const error = res.data.messages[0]
                    // if (error) {
                    //     dispatch(setErrorAC(error))
                    // } else {
                    //     dispatch(setErrorAC('some error'))
                    // }
                    // dispatch(setStatusAC('succeded'))
                }
            })
            .catch(error => {
                handleServerNetworkError(dispatch, error.message)
                // dispatch(setStatusAC('succeded'))
                // dispatch(setErrorAC(error.message))
            })
    }
}

// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistStatusAC>
    | SetTodolistsActionType
    | setStatusActionType
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
