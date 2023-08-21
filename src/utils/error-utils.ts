import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";
import {AppReducerActionsType, setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {AxiosError, AxiosResponse} from "axios";

export const handleServerAppError = <D>(data: AxiosResponse<ResponseType<D>>, dispatch: Dispatch<AppReducerActionsType>) => {
    if (data.data.messages.length) {
        dispatch(setAppErrorAC(data.data.messages[0]))
    } else {
        dispatch(setAppErrorAC('some Error'))
    }
    dispatch(setAppStatusAC('idle'))
}

export const handleServerNetworkError = (err: AxiosError, dispatch: Dispatch<AppReducerActionsType>) => {
    dispatch(setAppErrorAC(err.message ? err.message : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}