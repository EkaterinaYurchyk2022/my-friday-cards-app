import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { deletePackTC, setCurrentPageAC, setCurrentPageCountAC, updatePackTC } from './packs-reducer';
import { useAppDispatch } from '../../app/store';
import TablePagination from '@mui/material/TablePagination';
import { PackType } from './packsApi';
import { PackItem } from './PackItem';
import { SortTableCell } from './SortTableSell';

export const formatDate = (date: Date | string | number) => {
    return new Date(date).toLocaleDateString('ru-RU') + ' ' + new Date(date).toLocaleTimeString();
};

export const PacksTable: React.FC<PacksTablePropsType> = (
    { packs, userId, pageCount, rowsPerPage }) => {

    const dispatch = useAppDispatch();
    const [page, setPage] = useState<number>(0);

    const [headersForSort, setHeadersForSort] = useState([
        {
            title: 'Name',
            value: 'name',
            isAvailableToSort: false,
            sort: 'none',
        },
        {
            title: 'Cards Count',
            value: 'cardsCount',
            isAvailableToSort: false,
            sort: 'none',
        },
        {
            title: 'Created By',
            value: 'user_name',
            isAvailableToSort: false,
            sort: 'none',
        },
        {
            title: 'Last Updated',
            value: 'updated',
            isAvailableToSort: false,
            sort: 'none',
        },
    ]);

    const showIsAvailableToSortHandler = (title: string, is: boolean) => {
        setHeadersForSort(headersForSort.map(
            el => el.title === title ? { ...el, isAvailableToSort: is } : { ...el, isAvailableToSort: false }));
    };

    const changeSortHandler = (title: string, sort: 'up' | 'down' | 'none') => {
        setHeadersForSort(headersForSort.map(
            el => el.title === title ? { ...el, sort, isAvailableToSort: false } : { ...el, sort: 'none' }));
    };

    const changePageHandler = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
        dispatch(setCurrentPageAC(newPage + 1));
    };

    const changeRowsPerPageHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        dispatch(setCurrentPageCountAC(+event.target.value));

    const deletePackHandler = (packId: string) => dispatch(deletePackTC(packId));

    const changePackNameHandler = (packId: string, newPackName: string) => dispatch(updatePackTC(packId, newPackName));

    return (
        <div>
            <TableContainer component={Paper}>
                {packs.length
                    ? <Table sx={{ minWidth: 400 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {headersForSort.map((el, index) => <SortTableCell
                                    key={index}
                                    el={el}
                                    showIsAvailableToSort={showIsAvailableToSortHandler}
                                    changeSort={changeSortHandler}
                                />)}
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {packs.map((pack) => (
                                <PackItem
                                    key={pack._id}
                                    pack={pack}
                                    userId={userId}
                                    deletePackHandler={deletePackHandler}
                                    changePackNameHandler={changePackNameHandler}
                                />
                            ))}
                        </TableBody>
                    </Table>
                    : <div>Packs not found</div>}
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
        </div>
    );
};

type PacksTablePropsType = {
    packs: PackType[]
    userId: string
    rowsPerPage: number
    pageCount: number
}


