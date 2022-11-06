import {AxiosResponse} from 'axios';
import {instance} from '../../app/appApi';
import {UserType} from '../profile/profile-reducer';

//api
export const authAPI = {
    me() {
        return instance.post<{}, AxiosResponse<UserType>>('auth/me')
    },
    login(data: LoginDataType) {
        return instance.post<LoginDataType, AxiosResponse<LoginResponseType>>('auth/login', data)
    },
    logout() {
        return instance.delete<LoginResponseType>('auth/me')
    },
    signup(data: SignupDataType) {
        return instance.post<ResponseType>('auth/register', data)
    },
    forgot(data: ForgotDataType) {
        return instance.post<PasswordResponseType>('auth/forgot', data)
    },
    newPassword(data: NewPasswordDataType) {
        return instance.post<PasswordResponseType>('auth/set-new-password', data)
    },
}

//types
export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
}

export type LoginResponseType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
}

export type SignupDataType = {
    email: string
    password: string
}

export type ResponseType = {
    addedUser?: {
        created: string
        email: string
        isAdmin: boolean
        name: string
        publicCardPacksCount: number
        rememberMe: boolean
        updated: string
        verified: boolean
        __v: number
        _id: string
    }
}

export type PasswordResponseType = {
    info: string
    success: boolean
    answer: boolean
    html: boolean
    error: string
}

export type ForgotDataType = {
    email: string
    from: string
    message: string
}

export type NewPasswordDataType = {
    password: string
    resetPasswordToken: string | undefined
}
