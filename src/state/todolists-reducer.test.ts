import {addTodolistAC, setTodolistsAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";

let todolists: TodolistDomainType[]

beforeEach(() => {
    todolists = [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ]
})

test('todolists should be set to the state', () => {
    const action = setTodolistsAC(todolists)
    const endState = todolistsReducer([], action)

    expect(endState.length).toBe(2);
})

test('todolists should be added', () => {
    const responseTodolist = {id: 'todolistId1', title: 'What to learn', addedDate: '', order: 0}
    const action = addTodolistAC(responseTodolist)
    const endState = todolistsReducer(todolists, action)

    expect(endState.length).toBe(3);
})