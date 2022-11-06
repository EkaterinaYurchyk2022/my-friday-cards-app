import React, {useState} from 'react';
import Paper from '@mui/material/Paper/Paper';
import FormGroup from '@mui/material/FormGroup/FormGroup';
import {useNavigate, useParams} from 'react-router-dom';
import classes from './NewPassword.module.css'
import {useAppDispatch} from '../../../app/store';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {setNewPasswordTC} from '../auth-reducer';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

export const NewPassword = () => {
    const dispatch = useAppDispatch()

    const [showPassword, setShowPassword] = useState(false)
    const {token} = useParams()
    const navigate = useNavigate()
    const {control, handleSubmit, reset, formState: {errors}} = useForm<FormData>({mode: 'onBlur'})

    const onClickShowPassword = () => setShowPassword(!showPassword)

    const onSubmit: SubmitHandler<FormData> = async data => {
        const res = await dispatch(setNewPasswordTC({password: data.password, resetPasswordToken: token}))
        if (res) navigate('/login')
        reset()
    }

    return <Paper className={classes.paper} elevation={4}>

        <div className={classes.title}>Create new password</div>

        <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
                <Controller
                    name="password"
                    defaultValue=''
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

                <div className={classes.text}>
                    Create new password and we will send you further instructions to email
                </div>

                <Button type={'submit'} variant={'contained'} className={classes.submit}>
                    Create new password
                </Button>
            </FormGroup>
        </form>
    </Paper>
}

type FormData = {
    password: string
}
