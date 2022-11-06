import {authAPI, LoginDataType, NewPasswordDataType, SignupDataType} from './auth-api';
import {ThunkType} from '../../app/store';
import {setAppStatusAC} from '../../app/app-reducer';
import {commonError} from '../../utils/common-error';
import {setProfileAC} from '../profile/profile-reducer';

const initialState = {
    isLoggedIn: false,
}

export const authReducer = (
    state: InitialStateType = initialState, action: LoginActionType): InitialStateType => {
    switch (action.type) {
        case 'LOGIN/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

//actions
export const setIsLoggedInAC = (value: boolean) => ({type: 'LOGIN/SET-IS-LOGGED-IN', value} as const)

//thunks
export const loginTC = (data: LoginDataType): ThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.login(data)
        dispatch(setIsLoggedInAC(true))
        dispatch(setProfileAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        commonError(e, dispatch)
    }
}

export const logoutTC = (): ThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        await authAPI.logout()
        dispatch(setIsLoggedInAC(false))
        dispatch(setProfileAC(null))
        dispatch(setAppStatusAC('succeeded'))
    } catch(e) {
        commonError(e, dispatch)
    }
}

export const signupTC = (data: SignupDataType): ThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.signup(data)
        dispatch(setAppStatusAC('succeeded'))
        return res.data
    } catch (e) {
        commonError(e, dispatch)
    }
}

export const sendEmailTC = (email: string): ThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.forgot({
            email,
            from: 'Memo Cards Team <memocards@gmail.com>',
            message: 'Test mail for password recovery'
        })
        dispatch(setAppStatusAC('succeeded'))
        return res.data
    } catch (e) {
        commonError(e, dispatch)
    }
}

export const setNewPasswordTC = (data: NewPasswordDataType): ThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.newPassword(data)
        dispatch(setAppStatusAC('succeeded'))
        return res.data
    } catch (e) {
        commonError(e, dispatch)
    }
}

//types
export type InitialStateType = typeof initialState
export type LoginActionType = SetIsLoggedInActionType
export type SetIsLoggedInActionType = ReturnType<typeof setIsLoggedInAC>
