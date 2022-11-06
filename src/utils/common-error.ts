import axios, {AxiosError} from 'axios';
import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from '../app/app-reducer';


export const commonError = (e: Error | AxiosError<{error: string}> | unknown, dispatch:Dispatch) => {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
        // @ts-ignore
        const error = err.response?.data ? err.response.data.error : err.message
        dispatch(setAppErrorAC(error))
    } else {
        dispatch(setAppErrorAC(`Native error ${err.message}`))
    }
    dispatch(setAppStatusAC('failed'))
}
