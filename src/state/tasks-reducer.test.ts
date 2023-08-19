import {setTodolistsAC, TodolistDomainType} from "./todolists-reducer";
import {addTaskAC, changeTaskAC, removeTaskAC, setTasksAC, tasksReducer} from "./tasks-reducer";
import {TasksStateType} from "../App";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";

let todolists: TodolistDomainType[]
let tasks: TaskType[]
let initialStateTasks: TasksStateType

beforeEach(() => {
    initialStateTasks = {
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ]
    }
    todolists = [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ]
    tasks = [
        {
            id: "1111", title: "1111", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
        }
    ]
})

test('todolists should be set to the state', () => {
    const action = setTodolistsAC(todolists)
    const endState: TasksStateType = tasksReducer({}, action)
    const keys = Object.keys(endState)

    expect(endState.todolistId1).toStrictEqual([]);
    expect(keys.length).toBe(2)
})

test('tasks should be added for todolist', () => {
    const action = setTasksAC(tasks)
    const endState: TasksStateType = tasksReducer({}, action)
    const keys = Object.keys(endState)

    expect(endState.todolistId1).toStrictEqual(tasks);
    expect(keys.length).toBe(1)
})

test('correct task should be added to correct array', () => {
    const task = {
        id: "1111", title: "1111", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
    }
    const action = addTaskAC(task)
    const endState: TasksStateType = tasksReducer(initialStateTasks, action)

    expect(endState['todolistId1'].length).toBe(4);
    expect(endState['todolistId2'].length).toBe(3);
    expect(endState['todolistId1'][0].id).toBe('1111');
})

test('task should be update', () => {
    const task = [
        {
            id: "1", title: "1111", status: TaskStatuses.New, todoListId: "todolistId1", description: 'bla',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
        }
    ]
    const action = changeTaskAC(task[0])
    const endState: TasksStateType = tasksReducer(initialStateTasks, action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(3);
    expect(endState['todolistId1'][0].title).toBe('1111');
    expect(endState['todolistId1'][0].description).toBe('bla');
})
test('correct task should be delete', () => {
    const action = removeTaskAC('1', 'todolistId1')
    const endState: TasksStateType = tasksReducer(initialStateTasks, action)

    expect(endState['todolistId1'].length).toBe(2);
})