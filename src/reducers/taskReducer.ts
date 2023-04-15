import {TasksStateType} from "../App";
import {v1} from "uuid";

export const TaskReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'ADD-TASK' :
            const newTask = {id: v1(), title: action.payload.title, isDone: false};
            return {...state, [action.payload.todoListId]: [...state[action.payload.todoListId], newTask]}
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(el => el.id !== action.payload.taskId)
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(el => el.id === action.payload.taskId
                    ? {...el, isDone: action.payload.newIsDone}
                    : el)
            }
        case 'CHANGE-TITLE-TASK':
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(el => el.id === action.payload.taskId
                    ? {...el, title: action.payload.newTitle}
                    : el)
            }
        case 'ADD-TASK-FOR-TODOLIST':
            return {...state, [action.payload.newTodolistId]:[]}

        default:
            return state
    }
}

type ActionType =
    addTaskACReturnType
    | removeTaskACReturnType
    | changeTaskStatusACReturnType
    | changeTitleTaskACReturnType
    | addTaskForTodoReturnType

type addTaskACReturnType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todoListId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title,
            todoListId
        }
    } as const
}

type removeTaskACReturnType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todoListId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todoListId,
            taskId
        }
    } as const
}

type changeTaskStatusACReturnType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todoListId: string, taskId: string, newIsDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todoListId,
            taskId,
            newIsDone
        }
    } as const
}

type changeTitleTaskACReturnType = ReturnType<typeof changeTitleTaskAC>
export const changeTitleTaskAC = (todoListId: string, taskId: string, newTitle: string) => {
    return {
        type: 'CHANGE-TITLE-TASK',
        payload: {
            todoListId,
            taskId,
            newTitle
        }
    } as const
}

type addTaskForTodoReturnType = ReturnType<typeof addTaskForTodo>
export const addTaskForTodo = (newTodolistId: string) => {
    return {
        type: 'ADD-TASK-FOR-TODOLIST',
        payload: {
            newTodolistId
        }
    } as const
}