import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { authReducer } from '../features/auth/auth-reducer';
import { profileReducer } from '../features/profile/profile-reducer';
import { appReducer } from './app-reducer';
import { cardsReducer } from '../features/Cards/cards-reducer';
import { packsReducer } from '../features/Packs/packs-reducer';

let rootReducer = combineReducers({
    login: authReducer,
    profile: profileReducer,
    app: appReducer,
    cards: cardsReducer,
    packs: packsReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type RootStateType = ReturnType<typeof rootReducer>

export type DispatchType = ThunkDispatch<RootStateType, unknown, AnyAction>
export const useAppDispatch = () => useDispatch<DispatchType>();
export type ThunkType<ReturnType = Promise<any> | void> = ThunkAction<ReturnType, RootStateType, unknown, AnyAction>
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
