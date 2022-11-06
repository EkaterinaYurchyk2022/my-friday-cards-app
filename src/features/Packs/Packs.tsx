import React, {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {PacksTable} from './PacksTable';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {resetAllSortFiltersAC, setPacksTC, showMyPacksAC, sortPacksByNameAC} from './packs-reducer';
import useDebounce from '../../common/hooks/useDebounce';
import { Button } from '@mui/material';
import style from './Packs.module.css';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { SliderFilter } from './Slider';
import { BackButtonComponent } from '../../common/back-to-packs/BackButtonComponent';
import {AddNewPackModal} from "./Modals/AddNewPackModal";

export const Packs = () => {
    const dispatch = useAppDispatch();

    const { cardPacks, page, cardPacksTotalCount, pageCount } = useAppSelector(state => state.packs);
    const { sortOrder, filterByCardsCount, packName, isOwn } = useAppSelector(state => state.packs.filterValues);
    const userId = useAppSelector(state => state.profile._id);
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);

    const [isOpenAddPackModal, setIsOpenAddPackModal] = useState(false)

    const packNameDebounce = useDebounce(packName, 1000);
    const filterByCardsCountDebounce = useDebounce(filterByCardsCount, 1000);

    const resetAllFilters = () => {
        dispatch(resetAllSortFiltersAC());
    };

    const toggleOwnAllPackHandler = (isOwn: boolean) => {
        dispatch(showMyPacksAC(isOwn));
    };

    useEffect(() => {
        dispatch(setPacksTC(
            {
                page,
                pageCount,
                min: filterByCardsCount.min,
                max: filterByCardsCount.max,
                user_id: isOwn ? userId : undefined,
                packName: !!packName ? packName : undefined,
                sortPacks: sortOrder || undefined,
            }));
    }, [
        page,
        pageCount,
        isOwn,
        filterByCardsCountDebounce,
        packNameDebounce,
        sortOrder,
    ]);

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>;
    }

    return (
        <>
            <BackButtonComponent />
            <div className={style.wrapper}>
                <div className={style.container}>
                    <div className={style.sidebar}>
                        <div className={style.sidebarBlock}>
                            <h2>Show packs</h2>
                            <ButtonGroup disableElevation>
                                <Button
                                    onClick={() => toggleOwnAllPackHandler(false)}
                                    variant={!isOwn ? 'contained' : 'text'}
                                >All</Button>
                                <Button
                                    onClick={() => toggleOwnAllPackHandler(true)}
                                    variant={isOwn ? 'contained' : 'text'}
                                >My</Button>
                            </ButtonGroup>
                            <SliderFilter />
                            <Button
                                onClick={resetAllFilters}
                                variant="contained"
                            >Reset</Button>
                        </div>
                    </div>
                    <div className={style.mainBlock}>
                        <h1 className={style.title}>Packs list</h1>
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
                                    value={packName}
                                    onChange={(e) => dispatch(sortPacksByNameAC(e.target.value))}
                                />
                            </Box>
                            <Button
                                onClick={() => setIsOpenAddPackModal(true)}
                                variant="contained"
                            >Add new pack</Button>
                            <AddNewPackModal isOpenModal={isOpenAddPackModal} setIsOpenModal={setIsOpenAddPackModal}/>
                        </div>

                        <div className={style.table}>
                            <PacksTable
                                packs={cardPacks}
                                userId={userId}
                                rowsPerPage={pageCount}
                                pageCount={cardPacksTotalCount}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};




