import React from 'react';
import { useAppDispatch } from '../../app/store';
import { setSortOrderAC } from './packs-reducer';
import TableCell from '@mui/material/TableCell';
import SortIcon from '@mui/icons-material/Sort';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export const SortTableCell: React.FC<SortTableCellPropsType> = ({ el, showIsAvailableToSort, changeSort }) => {

    const dispatch = useAppDispatch();

    const filterHandler = (sort: 'up' | 'down' | 'none') => {
        changeSort(el.title, sort);
        if (sort === 'down') {
            dispatch(setSortOrderAC(`1${el.value}`));
        } else if (sort === 'up') {
            dispatch(setSortOrderAC(`0${el.value}`));
        } else {
            dispatch(setSortOrderAC(undefined));
        }
    };

    return (
        <TableCell
            onMouseEnter={() => showIsAvailableToSort(el.title, true)}
            onMouseLeave={() => showIsAvailableToSort(el.title, false)}
            align="right">
            <span>{el.title}</span>
            <span style={{ display: 'inline-block', width: '20px' }}>
        {el.isAvailableToSort && el.sort === 'none' && <SortIcon onClick={() => {filterHandler('down');}} />}
                {el.sort === 'down' && <ExpandMoreIcon onClick={() => { filterHandler('up');}} />}
                {el.sort === 'up' && <ExpandLessIcon onClick={() => { filterHandler('none');}} />}
      </span>
        </TableCell>
    );
};

type SortTableCellPropsType = {
    el: {
        title: string
        value: string
        isAvailableToSort: boolean
        sort: string
    }
    showIsAvailableToSort: (title: string, is: boolean) => void
    changeSort: (title: string, sort: 'up' | 'down' | 'none') => void
}