import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from "./app-reducer";

let initialState: InitialStateType

beforeEach(() => {
    initialState = {
        status: "idle",
        error: null
    }
})

test('correct error message should be set', () => {
    const action = setAppErrorAC('hey')
    const endState = appReducer(initialState, action)

    expect(endState.error).toBe('hey')
})

test('correct status should be set', () => {
    const action = setAppStatusAC('loading')
    const endState = appReducer(initialState, action)

    expect(endState.status).toBe('loading')
})