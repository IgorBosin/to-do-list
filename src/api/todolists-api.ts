import axios from 'axios';


const settings = {
    withCredentials: true // если нужен cookies, то нужно это свойство
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    ...settings
})

type TodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}

// type CreateTodolistResponsType = {
//     data: {
//         item: TodolistType
//     }
//     messages: string[]
//     fieldsErrors: []
//     resultCode: number
// }

// type DeleteUpdateTodolistResponsType = {
//     data: {}
//     messages: string[]
//     fieldsErrors: []
//     resultCode: number
// }

type ResponsType<D={}> = { // дженерик тип, т.к. <>
    data: D
    messages: string[]
    fieldsErrors: []
    resultCode: number
}

type GetTasksResponsType = {
    error: null | string
    items: TaskType[]
    totalCount: 0
}

type TaskType = {
    addedDate: string
    deadline: null | string
    description: null | string
    id: string
    order: number
    priority: number
    startDate: null | string
    status: number
    title: string
    todoListId: string
}

export type UpdateTaskResponsType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}

export const todolistsApi = {
    getTodolists: () => {
        return instance.get<TodolistType[]>('')
    },
    createTodolist: (title: string) => {
        return instance.post<ResponsType<{ item: TodolistType }>>('', {title,})
    },
    deleteTodolist: (id: string) => {
        return instance.delete<ResponsType>(id)
    },
    updateTodolist: (todolistId: string, newTitle: string) => {
        return instance.put<ResponsType>(todolistId, {title: newTitle})
    },

    getTasks: (todolistId: string) => {
        return instance.get<GetTasksResponsType>(`${todolistId}/tasks`)
    },
    createTask: (todolistId: string, title: string) => {
        return instance.post<ResponsType<{item:TaskType}>>(`${todolistId}/tasks`, {title,})
    },
    deleteTask: (todolistId: string, taskId: string)=>{
        return instance.delete<ResponsType>(`${todolistId}/tasks/${taskId}`)
    },
    updateTask: (todolistId: string, taskId: string,properies:any)=>{
        return instance.put<ResponsType<{item:TaskType}>>(`${todolistId}/tasks/${taskId}`, properies)
    }

}