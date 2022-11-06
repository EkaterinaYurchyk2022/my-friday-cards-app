import React, {useState} from 'react';
import {TextField} from '@mui/material';
import styles from '../../../common/Modal/BasicModal.module.css'
import {BasicModal} from '../../../common/Modal/BasicModal';
import {useAppDispatch} from "../../../app/store";
import {createPackTC} from "../packs-reducer";


type AddNewPackType = {
    isOpenModal: boolean
    setIsOpenModal: (value: boolean) => void
}

export const AddNewPackModal: React.FC<AddNewPackType> = React.memo(({isOpenModal, setIsOpenModal}) => {

    const [newPackName, setNewPackName] = useState('')

    const dispatch = useAppDispatch()


    const addNewPack = () => {
        dispatch(createPackTC(newPackName))
        setNewPackName(newPackName)


    }

    return (
        <BasicModal isOpenModal={isOpenModal}
                    setIsOpenModal={setIsOpenModal}
                    operationTitle={'Add new Card'}
                    buttonName={'Save'}
                    handleOperation={addNewPack}>

            <>
                <TextField
                    className={styles.addItemField}
                    label="Title"
                    variant="standard"
                    color="secondary"
                    value={newPackName}
                    onChange={(e) => setNewPackName(e.currentTarget.value)}/>

            </>
        </BasicModal>
    );
});