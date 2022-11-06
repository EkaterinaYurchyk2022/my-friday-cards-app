import React from 'react';
import {useAppDispatch} from "../../../app/store";
import {BasicModal} from '../../../common/Modal/BasicModal';
import {deleteCardTC} from "../cards-reducer";

type DeleteCardType = {
    cardId: string|undefined
    cardQuestion?: string
    isOpenModal: boolean
    setIsOpenModal: (value: boolean) => void
}
export const DeleteCardModal: React.FC<DeleteCardType> = React.memo(({
                                                                         cardId,
                                                                         cardQuestion,
                                                                         isOpenModal,
                                                                         setIsOpenModal
                                                                     }) => {
    const dispatch = useAppDispatch()

    const deleteCard = () => {
        if (cardId) {
            dispatch(deleteCardTC(cardId))
        }

    }

    return (
        <BasicModal isOpenModal={isOpenModal}
                    setIsOpenModal={setIsOpenModal}
                    operationTitle={'Add new Card'}
                    buttonName={'Save'}
                    handleOperation={deleteCard}>
            <div>Do you really want to remove card with question <b>{cardQuestion}</b>?</div>
            <div>The card will be removed.</div>
        </BasicModal>
    )
})