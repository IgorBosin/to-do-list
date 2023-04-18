import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type ActionType =
    addTodoListACReturnType
    | removeTodoListReturnType
    | changeTodoListFilterACReturnType
    | changeTitleTodolistACReturnType

type addTodoListACReturnType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        title: title

    } as const
}

type removeTodoListReturnType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todoListId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todoListId
    } as const
}

type changeTodoListFilterACReturnType = ReturnType<typeof changeTodoListFilterAC>
export const changeTodoListFilterAC = (todoListId: string, value: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todoListId,
        filter: value
    } as const
}

type changeTitleTodolistACReturnType = ReturnType<typeof changeTitleTodolistAC>
export const changeTitleTodolistAC = (todoListId: string, newTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todoListId,
        title: newTitle
    } as const
}

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const todolistsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistType = {id: v1(), title: action.title, filter: 'all'}
            return [...state, newTodolist]
        }
        case 'CHANGE-TODOLIST-TITLE' : {
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
        }
        case  'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        }
        default:
            throw new Error('I don\'t understand this type')
    }
}



