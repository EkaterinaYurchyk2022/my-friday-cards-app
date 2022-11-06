import { ThunkType } from '../../app/store';
import { setAppStatusAC } from '../../app/app-reducer';
import axios from 'axios';
import { commonError } from '../../utils/common-error';
import { packsApi, PackType, ParamsGetRequestType } from './packsApi';

const initialState = {
    cardPacks: [] as PackType[],
    page: 1,
    pageCount: 5,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 110,
    token: '',
    tokenDeathTime: 0,
    filterValues: {
        sortOrder: undefined as string | undefined,
        filterByCardsCount: {
            min: undefined as number | undefined,
            max: undefined as number | undefined,
        },
        packName: '' as string | undefined,
        isOwn: false,
    },
};

export const packsReducer = (state: InitialStateType = initialState, action: PacksActionType): InitialStateType => {
    switch (action.type) {
        case 'PACKS/SET-PACKS':
            return { ...state, cardPacks: [...action.packs], cardPacksTotalCount: action.packsTotalCount };
        case 'PACKS/CREATE-PACK':
            return { ...state, cardPacks: [action.pack, ...state.cardPacks] };
        case 'PACKS/DELETE-PACK':
            return { ...state, cardPacks: state.cardPacks.filter(el => el._id !== action.packId) };
        case 'PACKS/UPDATE-PACK':
            return {
                ...state, cardPacks: state.cardPacks.map(el => el._id === action.packId
                    ? { ...el, name: action.newPackName }
                    : el),
            };
        case 'PACKS/SET-CURRENT-PAGE':
            return { ...state, page: action?.page };
        case 'PACKS/SET-CURRENT-PAGE-COUNT':
            return { ...state, pageCount: action?.pageCount };
        case 'PACKS/SET-SORT-ORDER':
            return { ...state, filterValues: { ...state.filterValues, sortOrder: action.sortOrder } };
        case 'PACKS/SORT-PACK-BY-CARDS-COUNT':
            return {
                ...state,
                filterValues: {
                    ...state.filterValues,
                    filterByCardsCount: { ...state.filterValues.filterByCardsCount, ...action.count },
                },
            };
        case 'PACKS/SORT-PACK-BY-NAME':
            return { ...state, filterValues: { ...state.filterValues, packName: action.name } };
        case 'PACKS/RESET-ALL-FILTERS':
            return {
                ...state,
                filterValues: {
                    packName: '',
                    filterByCardsCount: { min: undefined, max: undefined },
                    isOwn: false,
                    sortOrder: state.filterValues.sortOrder,
                },
            };
        case 'PACKS/SHOW-MY-PACKS':
            return { ...state, filterValues: { ...state.filterValues, isOwn: action.isOwn } };
        default:
            return state;
    }
};

const setPacksAC = (packs: PackType[], packsTotalCount: number) => ({
    type: 'PACKS/SET-PACKS',
    packs,
    packsTotalCount,
} as const);
const createPackAC = (pack: PackType) => ({ type: 'PACKS/CREATE-PACK', pack } as const);
const deletePackAC = (packId: string) => ({ type: 'PACKS/DELETE-PACK', packId } as const);
const updatePackAC = (packId: string, newPackName: string|undefined) => ({
    type: 'PACKS/UPDATE-PACK',
    packId,
    newPackName,
} as const);
export const setCurrentPageAC = (page: number) => ({ type: 'PACKS/SET-CURRENT-PAGE', page } as const);
export const setCurrentPageCountAC = (pageCount: number) => ({
    type: 'PACKS/SET-CURRENT-PAGE-COUNT',
    pageCount,
} as const);
export const setSortOrderAC = (sortOrder: string | undefined) => ({
    type: 'PACKS/SET-SORT-ORDER',
    sortOrder,
} as const);
export const sortPacksByCardsCountAC = (count: { min: number | undefined, max: number | undefined }) =>
    ({ type: 'PACKS/SORT-PACK-BY-CARDS-COUNT', count } as const);
export const sortPacksByNameAC = (name: string | undefined) =>
    ({ type: 'PACKS/SORT-PACK-BY-NAME', name } as const);
export const resetAllSortFiltersAC = () => ({ type: 'PACKS/RESET-ALL-FILTERS' } as const);
export const showMyPacksAC = (isOwn: boolean) => ({ type: 'PACKS/SHOW-MY-PACKS', isOwn } as const);

export const setPacksTC = (params: ParamsGetRequestType): ThunkType => async(dispatch) => {
    dispatch(setAppStatusAC('loading'));
    try {
        const res = await packsApi.setPacks(params);
        dispatch(setCurrentPageAC(params.page || 1));  ///
        dispatch(setCurrentPageCountAC(params.pageCount || 10)); ///+
        dispatch(setPacksAC(res.data.cardPacks, res.data.cardPacksTotalCount));
        dispatch(setAppStatusAC('succeeded'));
    } catch (error) {
        if (axios.isAxiosError(error)) {
            commonError(error, dispatch);
        }
    }
};
export const createPackTC = (newPackName: string): ThunkType => async(dispatch) => {
    dispatch(setAppStatusAC('loading'));
    try {
        const res = await packsApi.createPack(newPackName);
        dispatch(createPackAC(res.data.newCardsPack));
        dispatch(setAppStatusAC('succeeded'));
    } catch (error) {
        if (axios.isAxiosError(error)) {
            commonError(error, dispatch);
        }
    }

};
export const deletePackTC = (packId: string): ThunkType => async(dispatch) => {
    dispatch(setAppStatusAC('loading'));
    try {
        await packsApi.deletePack(packId);
        dispatch(deletePackAC(packId));
        dispatch(setAppStatusAC('succeeded'));
    } catch (error) {
        if (axios.isAxiosError(error)) {
            commonError(error, dispatch);
        }
    }
};
export const updatePackTC = (packId: string, newPackName: string|undefined): ThunkType =>
    async(dispatch) => {
        dispatch(setAppStatusAC('loading'));
        try {
            await packsApi.updatePack(packId, newPackName);
            dispatch(updatePackAC(packId, newPackName));
            dispatch(setAppStatusAC('succeeded'));
        } catch (error) {
            if (axios.isAxiosError(error)) {
                commonError(error, dispatch);
            }
        }
    };

type InitialStateType = typeof initialState

type PacksActionType =
    | ReturnType<typeof setPacksAC>
    | ReturnType<typeof createPackAC>
    | ReturnType<typeof deletePackAC>
    | ReturnType<typeof updatePackAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setCurrentPageCountAC>
    | ReturnType<typeof setSortOrderAC>
    | ReturnType<typeof sortPacksByCardsCountAC>
    | ReturnType<typeof sortPacksByNameAC>
    | ReturnType<typeof resetAllSortFiltersAC>
    | ReturnType<typeof showMyPacksAC>



