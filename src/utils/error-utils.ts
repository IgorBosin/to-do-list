import {setErrorAC, setStatusAC, setStatusActionType} from "../app/appReducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";

type ErrorUtilsDispatchType = Dispatch<setStatusActionType>

export const handleServerNetworkError = (dispatch: ErrorUtilsDispatchType, error: string) => {
    dispatch(setErrorAC(error))
    dispatch(setStatusAC('failed'))
}

export const handleServerAppError = <T>(dispatch: ErrorUtilsDispatchType, data: ResponseType<T>) => {
    const error = data.messages[0]
    if (error) {
        dispatch(setErrorAC(error))
    } else {
        dispatch(setErrorAC('some error'))
    }
    dispatch(setStatusAC('succeded'))
}

