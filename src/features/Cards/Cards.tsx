import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { Navigate, useParams } from 'react-router-dom';
import { CardsTable } from './CardsTable';
import { setCardsTC } from './cards-reducer';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import useDebounce from '../../common/hooks/useDebounce';
import style from '../Packs/Packs.module.css';
import { AddNewCardModal } from './Modals/AddNewCardModal';
import { BackButtonComponent } from '../../common/back-to-packs/BackButtonComponent';

export const Cards = () => {

    const dispatch = useAppDispatch();
    const { packId, packName } = useParams();

    const { packUserId, cards, page, pageCount, cardsTotalCount } = useAppSelector(state => state.cards);
    const userId = useAppSelector(state => state.profile._id);
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);

    const [question, setQuestion] = useState<string>('');
    const questionDebounce = useDebounce(question, 1000);

    const [isOpenModalAddNewCard, setIsOpenModalAddNewCard] = useState(false);

    useEffect(() => {
        if (packId) {
            dispatch(setCardsTC(
                {
                    cardsPack_id: packId,
                    page,
                    pageCount,
                    cardQuestion: !!question ? question : undefined,
                }));
        }
    }, [packId, page, pageCount, questionDebounce]);

    if (!isLoggedIn) {
        return <Navigate to={'/login'} />;
    }

    return (
        <>
            <BackButtonComponent />
            <div className={style.wrapper}>
                <div className={style.container}>
                    <div>
                        {userId !== packUserId
                            ? <div><h3>{packName}</h3></div>
                            : <div>
                                <h3>{packName}</h3>
                                <div className={style.searchAndAdd}>
                                    <Box
                                        component="form"
                                        sx={{
                                            '& > :not(style)': { m: 1, width: '25ch' },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <TextField
                                            id="search"
                                            label="search"
                                            variant="outlined"
                                            value={question}
                                            onChange={(e) => setQuestion(e.target.value)}
                                        />
                                    </Box>
                                    <AddNewCardModal isOpenModal={isOpenModalAddNewCard} setIsOpenModal={setIsOpenModalAddNewCard} />
                                    <Button
                                        onClick={() => setIsOpenModalAddNewCard(true)}
                                        variant="contained"
                                    >Add new card</Button>
                                </div>
                            </div>}
                        <div className={style.table}>
                            <CardsTable cards={cards} userId={userId} pageCount={cardsTotalCount} rowsPerPage={pageCount} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};