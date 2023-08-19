import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, setTodolistsAC} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

type ActionsType = RemoveTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskAC>

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
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)}
        }
        case 'ADD-TASK': {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case 'CHANGE-TASK': {
            return {
                ...state,
                [action.task.todoListId]: state[action.task.todoListId].map(el => el.id === action.task.id
                    ? {...el, ...action.task}
                    : el)
            }
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolist.id]: []}
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case "SET-TODOLISTS": {
            return action.todolists.reduce((acc, item) => {
                acc[item.id] = []
                return acc
            }, {} as TasksStateType)
            // }, {} as { [key: string]: Array<TaskType> })
            // }, {} as Record<string, TaskType[]>)
        }
        // case "SET-TODOLISTS": {
        //     const copyState: TasksStateType = {};
        //     action.todolists.forEach(el => copyState[el.id] = [])
        //     return copyState
        // }
        case "SET-TASKS": {
            const copyState = {...state};
            action.tasks.forEach((el, index, array) => copyState[el.todoListId] = array)
            return copyState
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}
export const changeTaskAC = (task: TaskType) => {
    return {type: 'CHANGE-TASK', task} as const
}
export const setTasksAC = (tasks: TaskType[]) => ({type: 'SET-TASKS', tasks} as const)
export const getTasksTC = (todolistID: string) => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistID)
        .then((res) => {
            dispatch(setTasksAC(res.data.items))
        })
}
export const removeTaskTC = (todolistID: string, taskId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistID, taskId)
        .then((res) => {
            const action = removeTaskAC(taskId, todolistID);
            dispatch(action);
        })
}
export const addTaskTC = (todolistID: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTask(todolistID, title)
        .then((res) => {
            const action = addTaskAC(res.data.data.item);
            dispatch(action);
        })
}
export const updateTaskTC = (todolistID: string, taskID: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistID].find(el => el.id === taskID)
        if (!task) {
            throw new Error('task not found')
        }
        const model: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }
        todolistsAPI.updateTask(todolistID, taskID, model)
            .then((res) => {
                const action = changeTaskAC(res.data.data.item);
                dispatch(action);
            })
    }