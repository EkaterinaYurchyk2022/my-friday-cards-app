import React from 'react';
import Paper from '@mui/material/Paper/Paper';
import FormGroup from '@mui/material/FormGroup/FormGroup';
import {Link, useNavigate} from 'react-router-dom';
import classes from './PasswordRecovery.module.css'
import { useAppDispatch } from '../../../app/store';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {sendEmailTC} from '../auth-reducer';

export const PasswordRecovery = () => {
    const dispatch = useAppDispatch()

    const navigate = useNavigate()
    const {control, handleSubmit, reset, formState: {errors}} = useForm<FormData>({mode: 'onBlur'})

    const onSubmit: SubmitHandler<FormData> = async data => {
        const res = await dispatch(sendEmailTC(data.email))
        if (res) navigate(`/password-recovery/${data.email}`)
        reset()
    }

    return <Paper className={classes.paper} elevation={4}>

        <div className={classes.title}>Forgot your password?</div>

        <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
                <Controller
                    name="email"
                    defaultValue=''
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
                                   helperText={errors?.email && errors?.email?.message}
                                   error={!!errors?.email}
                                   {...field}
                        />
                    )}
                />

                <div className={classes.text}>
                    Enter your email address and we will send you further instructions
                </div>

                <Button type={'submit'} variant={'contained'} className={classes.submit}>
                    Send Instructions
                </Button>
            </FormGroup>
        </form>

        <div className={classes.question}>Did you remember your password?</div>

        <Link to="/login" className={classes.login}> Try logging in </Link>

    </Paper>
}

type FormData = {
    email: string
}
