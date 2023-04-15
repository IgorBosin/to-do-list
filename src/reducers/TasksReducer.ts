import {TaskType} from "../Todolist";
import {v1} from "uuid";

export const TasksReducer = (state: TaskType[], action: TsarType): TaskType[] => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return state.filter(el => el.id !== action.payload.id)
        }
        case 'ADD-TASK': {
            const newTask = {id: v1(), title: action.payload.title, isDone: false}
            return (
                [...state, newTask]
            )
        }
        default:
            return state
    }
}

type TsarType = RemoveTaskACReturnType | AddTaskACReturnType

// type RemoveTaskACReturnType = typeof removeTaskAC // типизация всей функции
type RemoveTaskACReturnType = ReturnType<typeof removeTaskAC> // типизация ретёрна функции
export const removeTaskAC = (id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            id
        }
    } as const
}

type AddTaskACReturnType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title
        }
    } as const
}