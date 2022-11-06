import {instance} from '../../app/appApi';
import {AxiosResponse} from 'axios';

export const packsApi = {
    setPacks(params: ParamsGetRequestType) {
        return instance.get<ParamsGetRequestType, AxiosResponse<GetRequestType>>(`cards/pack`, {
            params: {...params},
        });
    },
    createPack(newPackName: string | undefined) {
        return instance.post<{ cardsPack: { name?: string, deckCover?: string, private?: boolean } }, AxiosResponse<any>>
        ('cards/pack', {cardsPack: {name: newPackName}});
    },
    deletePack(packId: string) {
        return instance.delete<AxiosResponse<any>>(`cards/pack/?id=${packId}`);
    },
    updatePack(packId: string, newPackName: string | undefined) {
        return instance.put<{ cardsPack: { _id: string, name: string } }, AxiosResponse<any>>
        (`/cards/pack`, {cardsPack: {_id: packId, name: newPackName}});
    },
};

export type PackType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string | undefined
    path: string
    grade: number
    shots: number
    cardsCount: number
    type: string
    rating: number
    created: Date
    updated: Date
    more_id?: string
    __v: number
    deckCover?: any
};

export type ParamsGetRequestType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
}

type GetRequestType = {
    cardPacks: PackType[]
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    token: string
    tokenDeathTime: number
}