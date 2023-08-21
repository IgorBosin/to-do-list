export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppReducerActionsType = SetErrorType | SetStatusType
type SetErrorType = ReturnType<typeof setAppErrorAC>
type SetStatusType = ReturnType<typeof setAppStatusAC>

const initialState: InitialStateType = {
    status: "idle",
    error: null
}

export type InitialStateType = {
    status: RequestStatusType
    error: string | null
}

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS": {
            return {...state, status: action.status}
        }
        case "APP/SET-ERROR": {
            return {...state, error: action.error}
        }
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)



