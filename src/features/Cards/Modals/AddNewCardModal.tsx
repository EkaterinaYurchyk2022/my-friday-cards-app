import React from 'react';
import { TextField } from '@mui/material';
import styles from '../../../common/Modal/BasicModal.module.css';
import { BasicModal } from '../../../common/Modal/BasicModal';
import { useAppDispatch } from '../../../app/store';
import { useParams } from 'react-router-dom';
import { createCardTC } from '../cards-reducer';

type AddNewCardType = {
    isOpenModal: boolean
    setIsOpenModal: (value: boolean) => void
}

export const AddNewCardModal: React.FC<AddNewCardType> = React.memo(({ isOpenModal, setIsOpenModal }) => {
    const [newCardQuestion, setNewCardQuestion] = React.useState('');
    const [newCardAnswer, setNewCardAnswer] = React.useState('');
    const dispatch = useAppDispatch();
    const { packId } = useParams<'packId'>();

    const addNewCard = () => {
        if (packId) {
            dispatch(createCardTC({ cardsPack_id: packId, question: newCardQuestion, answer: newCardAnswer, grade: 0 }));
            setNewCardQuestion('');
            setNewCardAnswer('');
        }
    };

    return (
        <BasicModal isOpenModal={isOpenModal}
                    setIsOpenModal={setIsOpenModal}
                    operationTitle={'Add new Card'}
                    buttonName={'Save'}
                    handleOperation={addNewCard}>

            <>
                <TextField
                    className={styles.addItemField}
                    label="Question"
                    variant="standard"
                    color="secondary"
                    value={newCardQuestion}
                    onChange={(e) => setNewCardQuestion(e.currentTarget.value)} />
                <TextField
                    className={styles.addItemField}
                    label="Answer"
                    variant="standard"
                    color="secondary"
                    value={newCardAnswer}
                    onChange={(e) => setNewCardAnswer(e.currentTarget.value)} />
            </>
        </BasicModal>
    );
});