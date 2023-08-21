import {changeTodolistEntityStatusAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";

let initialState: TodolistDomainType[]

beforeEach(() => {
    initialState = [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'}
    ]
})

test('status should be changed', () => {
    const action = changeTodolistEntityStatusAC('todolistId1','loading')
    const endState = todolistsReducer(initialState, action)

    expect(endState[0].entityStatus).toBe('loading')
    expect(endState[1].entityStatus).toBe('idle')
})