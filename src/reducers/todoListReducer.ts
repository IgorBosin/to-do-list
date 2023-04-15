import {FilterValuesType, TodoListType} from "../App";

export const TodoListReducer = (state: TodoListType[], action: ActionType): TodoListType[] => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            return [...state, action.payload.newTodolist]
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.todoListId)
        }
        case 'CHANGE-FILTER-TODOLIST': {
            return state.map(el => el.id === action.payload.todoListId ? {...el, filter: action.payload.value} : el)
        }
        case "CHANGE-TITLE-TODOLIST": {
            return state.map(el => el.id === action.payload.todoListId ? {...el, title: action.payload.newTitle} : el)
        }
        default:
            return state
    }
}

type ActionType =
    addTodoListACReturnType
    | removeTodoListReturnType
    | changeTodoListFilterACReturnType
    | changeTitleTodolistACReturnType
type addTodoListACReturnType = ReturnType<typeof addTodoListAC>

export const addTodoListAC = (newTodolist: TodoListType) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTodolist
        }
    } as const
}

type removeTodoListReturnType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todoListId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todoListId
        }
    } as const
}

type changeTodoListFilterACReturnType = ReturnType<typeof changeTodoListFilterAC>
export const changeTodoListFilterAC = (todoListId: string, value: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER-TODOLIST',
        payload: {
            todoListId,
            value
        }
    } as const
}

type changeTitleTodolistACReturnType = ReturnType<typeof changeTitleTodolistAC>
export const changeTitleTodolistAC = (todoListId: string, newTitle: string) => {
    return {
        type: 'CHANGE-TITLE-TODOLIST',
        payload: {
            todoListId,
            newTitle
        }
    } as const
}