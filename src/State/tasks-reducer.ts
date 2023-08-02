import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsACType} from './todolists-reducer';
import {TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    tasks: TaskType
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    tasks: TaskType
}


type SetTasksACType = {
    type: 'SET-TASKS'
    tasks: TaskType[]
    todolistId: string
}

type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsACType
    | SetTasksACType


const initialState: TasksStateType = {
    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "SET-TASKS": {
            return {...state, [action.todolistId]: action.tasks}
        }
        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todos.forEach(el => copyState[el.id] = [])
            return copyState
        }
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)}
        }
        case 'ADD-TASK': {
            return {...state, [action.tasks.todoListId]: [...state[action.tasks.todoListId], action.tasks]}
        }
        case 'CHANGE-TASK-STATUS': { // через конкретные параметры action
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId
                    ? {...el, status: action.status}
                    : el)
            }
        }
        case 'CHANGE-TASK-TITLE': { // через полученный объект tasks
            return {
                ...state,
                [action.tasks.todoListId]: state[action.tasks.todoListId].map(el => el.id === action.tasks.id
                    ? {...el, title: action.tasks.title}
                    : el)
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todo.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (tasks: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', tasks}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}
export const changeTaskTitleAC = (tasks: TaskType): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', tasks}
}
export const setTasksAC = (tasks: TaskType[], todolistId: string): SetTasksACType => {
    return {type: 'SET-TASKS', tasks, todolistId}
}

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(res.data.items, todolistId))
        })
}
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
}
export const changeTaskTitleTC = (todolistId: string, taskId: string, newTitle: string) => (
    dispatch: Dispatch, getState: () => AppRootStateType) => {


    const task: TaskType | undefined = getState().tasks[todolistId].find(el => el.id === taskId)

    if (task) {
        const model: UpdateTaskModelType = {
            title: newTitle,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
        }
        todolistsAPI.updateTask(todolistId, taskId, model)
            .then(res => { // через полученный объект tasks в res
                dispatch(changeTaskTitleAC(res.data.data.item))
            })
    }
}
export const changeTaskStatusTC = (todolistId: string, taskId: string, newStatus: number) => (
    dispatch: Dispatch, getState: () => AppRootStateType) => {

    const tasks: TaskType = getState().tasks[todolistId].find(el => el.id === taskId)!

    const model: UpdateTaskModelType = {
        title: tasks.title,
        description: tasks.description,
        status: newStatus,
        priority: tasks.priority,
        startDate: tasks.startDate,
        deadline: tasks.deadline,
    }
    todolistsAPI.updateTask(todolistId, taskId, model)
        .then(res => {  // через конкретные параметры action, не используя res
            dispatch(changeTaskStatusAC(taskId, newStatus, todolistId))
        })
}
