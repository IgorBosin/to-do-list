import {v1} from "uuid";
import {TasksStateType} from "../App";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, taskReducer} from "./tasks-reducer";


let startState: TasksStateType;
let todolistId1 = v1();
let todolistId2 = v1();

beforeEach(() => {
    startState = {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true}
        ],
    }
})

test('correct task should be deleted from correct array', () => {
    // let todolistId1 = v1();
    // let todolistId2 = v1();
    // const startState: TasksStateType = {
    //     [todolistId1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true}
    //     ],
    //     [todolistId2]: [
    //         {id: v1(), title: "Milk", isDone: true},
    //         {id: v1(), title: "Bread", isDone: true}
    //     ]
    // }
    const action = removeTaskAC(todolistId2, startState[todolistId2][0].id)
    const endState = taskReducer(startState, action)

    expect(endState[todolistId1].length).toBe(2)
    expect(endState[todolistId2].length).toBe(1)
    expect(endState[todolistId2].every(t => t.title !== 'Milk')).toBeTruthy() // toBe(true)
    expect(endState[todolistId2].every(t => t.title !== 'Milk')).toBe(true) // toBeTruthy()
})
test('correct task should be added from correct array', () => {
    // let todolistId1 = v1();
    // let todolistId2 = v1();
    // const startState: TasksStateType = {
    //     [todolistId1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true}
    //     ],
    //     [todolistId2]: [
    //         {id: v1(), title: "Milk", isDone: true},
    //         {id: v1(), title: "React Book", isDone: true}
    //     ]
    // }
    let newTaskTitle = 'New Task'

    const action = addTaskAC(todolistId1, newTaskTitle)
    const endState = taskReducer(startState, action)

    expect(endState[todolistId1].length).toBe(3)
    expect(endState[todolistId2].length).toBe(2)
    expect(endState[todolistId1][0].title).toBe('New Task')
})
test('correct task should be change task status from array', ()=>{
    const action = changeTaskStatusAC(todolistId1, startState[todolistId1][0].id, true)
    const endState = taskReducer(startState, action)

    expect(endState[todolistId1][0].isDone)
})



