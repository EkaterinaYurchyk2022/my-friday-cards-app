import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableCell } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { useAppDispatch } from '../../app/store';
import { CardType } from './cardsApi';
import { deleteCardTC, setCurrentPageAC, setCurrentPageCountAC, updateCardTC } from './cards-reducer';
import TablePagination from '@mui/material/TablePagination';
import { CardItem } from './CardItem';

export const CardsTable: React.FC<CardsTablePropsType> = ({ cards, userId, pageCount, rowsPerPage }) => {

    const dispatch = useAppDispatch();
    const [page, setPage] = useState<number>(0);

    const changePageHandler = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
        dispatch(setCurrentPageAC(newPage + 1));
    };

    const changeRowsPerPageHandler = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        dispatch(setCurrentPageCountAC(+event.target.value));
    };

    const deleteCardHandler = (cardId: string | undefined) => {
        if (cardId) {
            dispatch(deleteCardTC(cardId));
        }
    };

    const updateCardHandler = (cardId: string | undefined, question: string, comment: string) => {
        if (cardId && question && comment) {
            dispatch(updateCardTC(cardId, question, comment));
        }
    };

    return (
        <>
            <TableContainer component={Paper}>
                {cards.length
                    ? <Table sx={{ minWidth: 400 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Question</TableCell>
                                <TableCell align="right">Answer</TableCell>
                                <TableCell align="right">Grade</TableCell>
                                <TableCell align="right">Updated</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cards.map((card) => (
                                <CardItem
                                    key={card._id}
                                    card={card}
                                    userId={userId}
                                    deleteCardHandler={deleteCardHandler}
                                    updateCardHandler={updateCardHandler}
                                />
                            ))
                            }
                        </TableBody>
                    </Table>
                    : <div>Cards not found</div>}
            </TableContainer>
            <TablePagination
                component="div"
                count={pageCount}
                page={page}
                onPageChange={changePageHandler}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={changeRowsPerPageHandler}
                rowsPerPageOptions={[5, 10, 15, 20]}
            />
        </>
    );
};

type CardsTablePropsType = {
    cards: CardType[]
    userId: string
    rowsPerPage: number
    pageCount: number
}