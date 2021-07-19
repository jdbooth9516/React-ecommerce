import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useForm from '../UseForm/useForm';
import TextField from '@material-ui/core/TextField';
import { Button  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
        },
    },
}));

const Login = () => {
    const classes = useStyles();
    const { values, handleChange, handleSubmit } = useForm(() => {logInUser(values)})

    function logInUser(values) {
        async function sendUserToHome(values) {
            const response = await axios.post('https://localhost:44394/api/authentication/login')
            console.log(values);
            console.log(response);
        }
        sendUserToHome(values);
    }

    return (
        <container maxWidth="sm">
            <form className={classes.root}>
                <div>
                    <TextField id="standard-basic" 
                    label="Username" 
                    name="username" 
                    onChange={handleChange}
                    values={values.userId}
                    />
                    <TextField id="standard-basic" 
                    label="Password" 
                    name="password" 
                    onChange={handleChange}
                    values={values.password}
                    />
                    <Button onClick={handleSubmit}>Log In</Button>
                </div>
            </form>
        </container>
    );
}

export default Login;