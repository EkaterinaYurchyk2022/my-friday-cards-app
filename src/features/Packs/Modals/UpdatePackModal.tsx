import React from 'react';
import {useAppDispatch} from "../../../app/store";
import {updatePackTC} from "../packs-reducer";
import {BasicModal} from "../../../common/Modal/BasicModal";
import {TextField} from "@mui/material";
import styles from "../../../common/Modal/BasicModal.module.css";

type UpdatePackType = {
    packId: string | undefined
    packName: string | undefined
    isOpenModal: boolean
    setIsOpenModal: (value: boolean) => void
}

export const UpdatePackModal: React.FC<UpdatePackType> = React.memo(({
                                                                         packId,
                                                                         packName,
                                                                         isOpenModal,
                                                                         setIsOpenModal
                                                                     }) => {
    const [newPackName, setNewPackName] = React.useState(packName)
    const dispatch = useAppDispatch()


    const updatePack = () => {
        if (packId) {
            dispatch(updatePackTC(packId, newPackName))
            setNewPackName('')

        }
    }

    return (
        <BasicModal isOpenModal={isOpenModal}
                    setIsOpenModal={setIsOpenModal}
                    operationTitle={'Change Pack'}
                    buttonName={'Save'}
                    handleOperation={updatePack}>

            <>
                <TextField
                    className={styles.addItemField}
                    label="Title"
                    variant="standard"
                    color="secondary"
                    value={newPackName}
                    onChange={(e) => setNewPackName(e.currentTarget.value)}/>
                <div>Do you really want to change <b>{packName}</b>?</div>
            </>
        </BasicModal>
    );
});