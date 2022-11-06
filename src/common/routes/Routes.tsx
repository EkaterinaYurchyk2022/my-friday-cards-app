import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from '../../features/auth/login/Login';
import { Registration } from '../../features/auth/registration/Registration';
import { PasswordRecovery } from '../../features/auth/password-recovery/PasswordRecovery';
import { Profile } from '../../features/profile/Profile';
import { Page404 } from '../page404/Page404';
import { NewPassword } from '../../features/auth/new-password/NewPassword';
import { Packs } from '../../features/Packs/Packs';
import { Cards } from '../../features/Cards/Cards';
import { CheckMail } from '../check-mail/CheckMail';
import classes from './style.module.css';
import { LearnPage } from '../../features/learn/Learn';

export const ProjectRoutes = () => {
    return <div className={classes.container}>
        <Routes>
            <Route path={'/'} element={<Navigate to={'/profile'} />} />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/set-new-password/:token'} element={<NewPassword />} />
            <Route path={'/password-recovery'} element={<PasswordRecovery />} />
            <Route path={'/password-recovery/:email'} element={<CheckMail />} />
            <Route path={'/profile'} element={<Profile />} />
            <Route path={'/registration'} element={<Registration />} />
            <Route path={'/packs'} element={<Packs />} />
            <Route path={'/cards/:packId/:packName'} element={<Cards />} />
            <Route path={'/learn/:packId/:packName'} element={<LearnPage />} />
            <Route path={'/404'} element={<Page404 />} />
            <Route path={'*'} element={<Navigate to={'/404'} />} />
        </Routes>
    </div>;
};
