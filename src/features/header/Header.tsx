import * as React from 'react';
import style from './style.module.css';
import testAva from '../../assets/avatar.png';
import {Avatar} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/store';
import incubatorLogo from '../../assets/incubator.png'
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import {logoutTC} from '../auth/auth-reducer';

export const Header = () => {
    const dispatch = useAppDispatch();

    const profile = useAppSelector(state => state.profile);
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);

    const navigate = useNavigate()

    return <header>
        <div className={style.container}>
            <div style={{width: '209px', height: '48px'}}>
                <img src={incubatorLogo} alt="it-incubator"/>
            </div>

            {isLoggedIn
                ? <div className={`${style.wrapper} ${style.dropdown}`}>
                    {profile.name}

                    <Avatar style={{height: '36px', width: '36px', marginLeft: '12px'}}
                            alt="Remy Sharp"
                            src={profile.avatar ? profile.avatar : testAva}
                    />

                    <div className={style.dropdownContent}>
                        <div onClick={() => navigate('/profile')}>

                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.99996 8.00004C9.84091 8.00004 11.3333 6.50766 11.3333 4.66671C11.3333 2.82576 9.84091 1.33337 7.99996 1.33337C6.15901 1.33337 4.66663 2.82576 4.66663 4.66671C4.66663 6.50766 6.15901 8.00004 7.99996 8.00004Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M13.7266 14.6667C13.7266 12.0867 11.16 10 7.99998 10C4.83998 10 2.27332 12.0867 2.27332 14.6667" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>Profile</span>
                        </div>

                        <div onClick={() => dispatch(logoutTC())}>

                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.6267 9.74671L13.3334 8.04004L11.6267 6.33337" stroke="black" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M6.50671 8.04004H13.2867" stroke="black" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M7.84005 13.3333C4.89338 13.3333 2.50671 11.3333 2.50671 7.99996C2.50671 4.66663 4.89338 2.66663 7.84005 2.66663" stroke="black" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span >Log out</span>
                        </div>
                    </div>
                </div>

                : <Button variant={'contained'}
                          className={style.signIn}
                          onClick={() => navigate('/login')}
                >
                    Sign in
                </Button>
            }
        </div>
    </header>
};
