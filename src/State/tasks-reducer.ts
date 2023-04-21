import {TasksStateType} from "../App";
import {v1} from "uuid";

type ActionsType = RemoveTaskACType | AddTaskACType | ChangeTaskStatusACType

type RemoveTaskACType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}

type ChangeTaskStatusACType = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    taskId: string
    isDone: boolean
}

type AddTaskACType = ReturnType<typeof addTaskAC>

export const taskReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        }
        case 'ADD-TASK': {
            const newTask = {id: v1(), title: action.title, isDone: true}
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        }
        case "CHANGE-TASK-STATUS": {
            return {...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                    ...el,
                    isDone: action.isDone
                } : el)
            }
        }
        default:
            return {...state}
    }
}
export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskACType => {
    return {
        type: 'REMOVE-TASK',
        todolistId,
        taskId,
    }
} // 1 вариант с самостоятельной типиазацией type: 'REMOVE-TASK'
export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        title,
        todolistId,
    } as const
} // 2 вариант с автоматической типизацией ReturnType<typeof addTaskAC>

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean):ChangeTaskStatusACType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        todolistId,
        taskId,
        isDone,
    }
}