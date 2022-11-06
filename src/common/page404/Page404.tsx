import React from 'react';
import what from '../../assets/what.gif';
import Button from '@mui/material/Button';
import classes from './Page404.module.css';

export const Page404 = () => {
    return <div className={classes.container}>
        <div className={classes.wrapper}>
            <span className={classes.oops}> Ooops! </span>

            <span className={classes.sorry}> Sorry! Page not found! </span>

            <Button variant={'contained'}
                    className={classes.back}
                    href={'/'}
            >
                Back to home page
            </Button>
        </div>

        <img src={what} alt=''/>
    </div>
};
