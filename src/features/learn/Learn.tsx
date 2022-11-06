import React, { useEffect, useState } from 'react';
import { CardType } from '../Cards/cardsApi';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { setCardsTC, setDefaultPageCountValueAC, updateCardGradeTC } from '../Cards/cards-reducer';
import { Navigate, useParams } from 'react-router-dom';
import { Button, FormControl, FormControlLabel, Paper, Radio, RadioGroup } from '@mui/material';
import { useFormik } from 'formik';
import style from './style.module.css';
import { BackButtonComponent } from '../../common/back-to-packs/BackButtonComponent';

export const LearnPage = () => {

    const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал'];

    const getCard = (cards: CardType[]) => {
        const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
        const rand = Math.random() * sum;
        const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return { sum: newSum, id: newSum < rand ? i : acc.id };
        }, { sum: 0, id: -1 });
        return cards[res.id + 1];
    };

    const dispatch = useAppDispatch();
    const { packId, packName } = useParams();
    const cards = useAppSelector(state => state.cards.cards);
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount);
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [card, setCard] = useState<CardType>({} as CardType);

    const formik = useFormik({
        initialValues: {
            grade: 0,
        },
        onSubmit: values => {
            setIsChecked(false);
            setCard(getCard(cards));
            if (card._id) {
                dispatch(updateCardGradeTC(card._id, values.grade));
            }
        },
    });

    useEffect(() => {
        dispatch(setCardsTC({ cardsPack_id: packId, page: 1, pageCount: maxCardsCount }));
        return () => {
            dispatch(setDefaultPageCountValueAC());
        };
    }, [packId]);

    useEffect(() => {
        if (cards.length) {
            setCard(getCard(cards));
        }
    }, [cards]);

    if (!isLoggedIn) {
        return <Navigate to={'/login'} />;
    }

    return (
        <>
            <BackButtonComponent />
            <div className={style.container}>
                <h2>Learn {packName}</h2>
                <Paper className={style.content}>
                    <h3>Question:</h3>
                    <p>{card.question}</p>
                    <p>Количество попыток ответов на вопрос: {card.shots}</p>
                    {!isChecked
                        ? <Button variant="contained" onClick={() => setIsChecked(true)}>Show answer</Button>
                        : <>
                            <h3>Answer: {card.answer}</h3>
                            <h5>Rate yourself:</h5>
                            <FormControl>
                                <form onSubmit={formik.handleSubmit}>
                                    <RadioGroup
                                        name="grade"
                                    >
                                        {grades.map((el, index) =>
                                            <FormControlLabel
                                                key={index}
                                                value={grades.indexOf(el) + 1}
                                                control={<Radio />}
                                                label={el}
                                                onChange={formik.handleChange}
                                            />)}
                                    </RadioGroup>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                    >Next</Button>
                                </form>
                            </FormControl>
                        </>}
                </Paper>
            </div>
        </>
    );
};



