import React from 'react';
import {useAppDispatch} from "../../../app/store";
import {BasicModal} from '../../../common/Modal/BasicModal';
import {deletePackTC} from "../packs-reducer";

type DeletePackType = {
    packId: string | undefined
    packName: string | undefined
    isOpenModal: boolean
    setIsOpenModal: (value: boolean) => void
}
export const DeletePackModal: React.FC<DeletePackType> = React.memo(({
                                                                         packId,
                                                                         packName,
                                                                         isOpenModal,
                                                                         setIsOpenModal
                                                                     }) => {
    const dispatch = useAppDispatch()


    const deletePack = () => {
        if (packId) {
            dispatch(deletePackTC(packId))
        }

    }

    return (
        <BasicModal isOpenModal={isOpenModal}
                    setIsOpenModal={setIsOpenModal}
                    operationTitle={'Add new Pack'}
                    buttonName={'Save'}
                    handleOperation={deletePack}>
            <div>Do you really want to remove pack <b>{packName}</b>?</div>
            <div>The pack will be removed.</div>
        </BasicModal>
    )
})