import React, {useState} from 'react';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import {useAppDispatch} from '../../../app/store';
import {Link, useNavigate} from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import classes from './Registration.module.css';
import {signupTC} from '../auth-reducer';

export const Registration = () => {
    const dispatch = useAppDispatch()

    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const {control, handleSubmit, reset, formState: {errors}, getValues} = useForm<FormData>({
        mode: 'onBlur',
        defaultValues: {
            login: '',
            password: '',
            confirmPassword: '',
        },
    })

    const onClickShowPassword = () => setShowPassword(!showPassword)
    const onClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword)

    const onSubmit: SubmitHandler<FormData> = async data => {
        const {login: email, password} = data
        const res = await dispatch(signupTC({email, password}))
        if (res) navigate('/login')
        reset()
    }

    return <Paper className={classes.paper} elevation={4}>

        <div className={classes.title}>Sign Up</div>

        <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
                <Controller
                    name="login"
                    control={control}
                    rules={{
                        required: 'Required field',
                        pattern: {
                            value: /^[\w][\w-.]*@[\w-]+\.[a-z]{2,7}$/i,
                            message: 'Please, enter correct email address',
                        },
                    }}
                    render={({field}) => (
                        <TextField sx={{height: '71px', mt: '41px'}}
                                   label="Email"
                                   variant="standard"
                                   helperText={errors?.login && errors?.login?.message}
                                   error={!!errors?.login}
                                   {...field}
                        />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: 'Required field',
                        minLength: {
                            value: 8,
                            message: 'Password less than 8 symbols',
                        },
                    }}
                    render={({field}) => (<div className={classes.wrapper}>
                        <TextField sx={{width: '347px', height: '71px'}}
                                   label="Password"
                                   variant="standard"
                                   type={showPassword ? 'text' : 'password'}
                                   helperText={errors?.password && errors?.password?.message}
                                   error={!!errors?.password}
                                   {...field}
                        />
                        <IconButton className={classes.eye} onClick={onClickShowPassword}>
                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                    </div>)}
                />

                <Controller
                    name="confirmPassword"
                    control={control}
                    rules={{
                        required: 'Required field',
                        validate: {
                            equal: v => v === getValues().password ? true : 'Passwords don\'t match',
                        },
                    }}
                    render={({field}) => (<div className={classes.wrapper}>
                        <TextField sx={{width: '347px', height: '71px'}}
                                   label="Confirm password"
                                   variant="standard"
                                   type={showConfirmPassword ? 'text' : 'password'}
                                   helperText={errors?.confirmPassword && errors?.confirmPassword?.message}
                                   error={!!errors?.confirmPassword}
                                   {...field}
                        />
                        <IconButton className={classes.eye} onClick={onClickShowConfirmPassword}>
                            {showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                    </div>)}
                />

                <Button type={'submit'} variant={'contained'} className={classes.submit}>
                    Sign Up
                </Button>
            </FormGroup>
        </form>

        <div className={classes.question}>Already have an account?</div>

        <Link to="/login" className={classes.signIn}> Sign In </Link>
    </Paper>
}

type FormData = {
    login: string
    password: string
    confirmPassword: string
}
