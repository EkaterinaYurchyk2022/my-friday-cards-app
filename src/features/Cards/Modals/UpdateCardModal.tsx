import React from 'react';
import {useAppDispatch} from "../../../app/store";
import {updateCardTC} from "../cards-reducer";
import {BasicModal} from "../../../common/Modal/BasicModal";
import {TextField} from "@mui/material";
import styles from "../../../common/Modal/BasicModal.module.css";

type UpdateCardType = {
    cardId: string | undefined
    cardQuestion: string | undefined
    cardAnswer: string | undefined
    isOpenModal: boolean
    setIsOpenModal: (value: boolean) => void
}

export const UpdateCardModal: React.FC<UpdateCardType> = React.memo(({
                                                                         cardId,
                                                                         cardQuestion,
                                                                         cardAnswer,
                                                                         isOpenModal,
                                                                         setIsOpenModal
                                                                     }) => {
    const [newCardQuestion, setNewCardQuestion] = React.useState(cardQuestion)
    const [newCardAnswer, setNewCardAnswer] = React.useState(cardAnswer)
    const dispatch = useAppDispatch()


    const updateCard = () => {
        if (cardId) {
            dispatch(updateCardTC(cardId, newCardQuestion, newCardAnswer))
            setNewCardQuestion('')
            setNewCardAnswer('')
        }
    }

    return (
        <BasicModal isOpenModal={isOpenModal}
                    setIsOpenModal={setIsOpenModal}
                    operationTitle={'Change Card'}
                    buttonName={'Save'}
                    handleOperation={updateCard}>

            <>
                <TextField
                    className={styles.addItemField}
                    label="Question"
                    variant="standard"
                    color="secondary"
                    value={newCardQuestion}
                    onChange={(e) => setNewCardQuestion(e.currentTarget.value)}/>
                <TextField
                    className={styles.addItemField}
                    label="Answer"
                    variant="standard"
                    color="secondary"
                    value={newCardAnswer}
                    onChange={(e) => setNewCardAnswer(e.currentTarget.value)}/>
                <div>Do you really want to change <b>{cardQuestion}</b> and <b>{cardAnswer}</b>?</div>
            </>
        </BasicModal>
    );
});