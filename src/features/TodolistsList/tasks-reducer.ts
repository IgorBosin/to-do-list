import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer'
import {
    ResultCode,
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI,
    TodolistType,
    UpdateTaskModelType
} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {AppRootStateType} from '../../app/store'
import {RequestStatusType, setErrorAC, setStatusAC, setStatusActionType} from "../../app/appReducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import axios, {Axios, AxiosError} from "axios";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET-TASKS':
            return {
                ...state, [action.todolistId]: action.tasks.map(el => ({...el, entityStatus: 'idle'}))
            }
        case 'SET-STATUS-PROMISING-TASK':
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId
                    ? {...el, entityStatus: action.status}
                    : el)
            }
        default:
            return state
    }
}

// actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', model, todolistId, taskId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)
export const setStatusPromisingTaskAC = (todolistId: string, taskId: string, status: RequestStatusType) =>
    ({type: 'SET-STATUS-PROMISING-TASK', todolistId, taskId, status} as const)

// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            const action = setTasksAC(tasks, todolistId)
            dispatch(setStatusAC('succeded'))
            dispatch(action)
        })
}
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))
    dispatch(setStatusPromisingTaskAC(todolistId, taskId, 'loading'))
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(res => {
            const action = removeTaskAC(taskId, todolistId)
            dispatch(setStatusAC('succeded'))
            dispatch(action)
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error.message)
            // dispatch(setStatusAC('succeded'))
            // dispatch(setErrorAC(error.message))
            dispatch(setStatusPromisingTaskAC(todolistId, taskId, 'idle'))
        })
}

// export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
// dispatch(setStatusAC('loading'))
// todolistsAPI.createTask(todolistId, title)
//     .then(res => {
//         if (res.data.resultCode === ResultCode.OK) {
//             const task = res.data.data.item
//             const action = addTaskAC(task)
//             dispatch(setStatusAC('succeded'))
//             dispatch(action)
//         } else {
//             handleServerAppError(dispatch, res.data)
//             // const error = res.data.messages[0]
//             // if(error){
//             //     dispatch(setErrorAC(error))
//             // } else {
//             //     dispatch(setErrorAC('some error'))
//             // }
//             // dispatch(setStatusAC('succeded'))
//         }
//     })
//     .catch((e: AxiosError<ErrorType>) => {
//         const error = e.response ? e.response.data.messages[0].message : e.message
//         handleServerNetworkError(dispatch, error)
//         // dispatch(setErrorAC(e.message))
//         // dispatch(setStatusAC('failed'))
//     })
// }
export const addTaskTC = (title: string, todolistId: string) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))
    try {
        const res = await todolistsAPI.createTask(todolistId, title)
        if (res.data.resultCode === ResultCode.OK) {
            const task = res.data.data.item
            const action = addTaskAC(task)
            dispatch(setStatusAC('succeded'))
            dispatch(action)
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        if (axios.isAxiosError<ErrorType>(e)) { // попадаем когда ошибка в запросе на бэкэнд
            const error = e.response ? e.response.data.messages[0].message : e.message
            handleServerNetworkError(dispatch, error)
            return
        }
        const error = (e as Error).message // попадаем когда ошибка в синхронном коде внутри try
        handleServerNetworkError(dispatch, error)
    }
}


export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        dispatch(setStatusAC('loading'))
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
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
            ...domainModel
        }
        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === ResultCode.OK) {
                    const action = updateTaskAC(taskId, domainModel, todolistId)
                    dispatch(action)
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
            .catch((error: AxiosError<ErrorType>) => { // без ErrorType получаем response от Axios(стандартный)
                console.log(error.response?.data) // из ErrorType - statusCode,messages,error
                const err = error.response ? error.response?.data.messages[0].message : error.message
                handleServerNetworkError(dispatch, err)
                // dispatch(setErrorAC(error.message))
                // dispatch(setStatusAC('succeded'))
            })
    }

// types
export type ErrorType = {
    statusCode: number,
    messages: [
        {
            message: string
            field: string
        }
    ],
    error: string
}
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
type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>
    | setStatusActionType
    | ReturnType<typeof setStatusPromisingTaskAC>
