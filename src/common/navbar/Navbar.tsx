import React from 'react';
import {Link} from 'react-router-dom';
import style from './Navbar.module.css'

export const Navbar = () => {

    return (
        <div className={style.nav}>
            <Link className={style.active} to="/"> Главная </Link>
            <Link className={style.active} to="/login"> Вход </Link>
            <Link className={style.active} to="/registration"> Регистрация </Link>
            <Link className={style.active} to="/profile"> Профиль </Link>
            <Link className={style.active} to="/404"> 404 </Link>
            <Link className={style.active} to="/password-recovery"> Восстановление пароля </Link>
            <Link className={style.active} to="/password-recovery/mail@gmail.com"> Письмо </Link>
            <Link className={style.active} to="/set-new-password/token"> Смена пароля </Link>
            <Link className={style.active} to="/packs"> Колоды </Link>
            <Link className={style.active} to="/cards/:packId"> Карточки </Link>
        </div>
    );
};
