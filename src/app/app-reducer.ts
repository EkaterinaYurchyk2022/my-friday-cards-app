import { ThunkType } from './store';

import { setIsLoggedInAC } from '../features/auth/auth-reducer';
import { authAPI } from '../features/auth/auth-api';
import { setProfileAC } from '../features/profile/profile-reducer';

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false,
};
type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return { ...state, status: action.status };
        case 'APP/SET-ERROR':
            return { ...state, error: action.error };
        case 'APP/SET-IS-INITIALIZED':
            return { ...state, isInitialized: action.isInitialized };
        default:
            return state;
    }
};

//actions
export const setAppStatusAC = (status: RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const);
export const setAppErrorAC = (error: null | string) => ({ type: 'APP/SET-ERROR', error } as const);
export const setAppIsInitializedAC = (isInitialized: boolean) => ({
    type: 'APP/SET-IS-INITIALIZED',
    isInitialized,
} as const);

//thunks
export const authMeTC = (): ThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'));
    authAPI.me()
        .then((res) => {
            dispatch(setIsLoggedInAC(true));
            dispatch(setAppStatusAC('succeeded'));
            dispatch(setProfileAC(res.data));
        })
        .catch(error => {
            //complete handling errors
        })
        .finally(() => {
            dispatch(setAppIsInitializedAC(true));
            dispatch(setAppStatusAC('succeeded'));
        });
};

//types
export type RequestStatusType = 'idle' | 'succeeded' | 'loading' | 'failed'

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type setAppIsInitializedActionType = ReturnType<typeof setAppIsInitializedAC>

export type ActionsType = SetAppStatusActionType | SetAppErrorActionType | setAppIsInitializedActionType