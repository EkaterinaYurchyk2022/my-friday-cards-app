import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import styles from './Login.module.css';
import { loginTC } from '../auth-reducer';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { Link, Navigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';


export const Login = () => {

    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);

    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: boolean
    }

    type StatePassword = {
        password: string;
        showPassword: boolean;
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 8) {
                errors.password = 'Password must contain more than 8 symbols';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values));
        },
    });

    const [valuesPassword, setValuesPassword] = React.useState<StatePassword>({
        password: '',
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValuesPassword({
            ...valuesPassword,
            showPassword: !valuesPassword.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    if (isLoggedIn) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <div className={styles.title}>Sign In</div>
                <FormControl variant="standard">
                    <InputLabel color="secondary">Email</InputLabel>
                    <Input
                        id="email"
                        type="email"
                        placeholder={'Email'}
                        className={styles.input}
                        color="secondary"
                        {...formik.getFieldProps('email')}
                    />
                </FormControl>
                {formik.errors.email && formik.touched.email &&
                    <div style={{ color: 'red' }}>{formik.errors.email}</div>}

                <FormControl variant="standard">
                    <InputLabel color="secondary">Password</InputLabel>
                    <Input
                        id="password"
                        type={valuesPassword.showPassword ? 'text' : 'password'}
                        placeholder={'Password'}
                        className={styles.input}
                        color="primary"
                        {...formik.getFieldProps('password')}
                        autoComplete="on"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {valuesPassword.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                {formik.errors.password && formik.touched.password &&
                    <div style={{ color: 'red' }}>{formik.errors.password}</div>}

                <FormControlLabel label={'Remember me'}
                                  control={<Checkbox color="secondary"
                                                     checked={formik.values.rememberMe}
                                                     {...formik.getFieldProps('rememberMe')}
                                  />
                                  } />
                <Link className={styles.textLink} to={'password-recovery'}>Forgot Password</Link>
                <Button color="primary" variant={'contained'} type="submit">Login</Button>
                Don’t have an account?
                <Link className={styles.textLink} to={'/registration'}>Sign Up</Link>
            </form>
        </div>
    );
};