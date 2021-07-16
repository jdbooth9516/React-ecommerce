import React, {useState} from 'react'
import axios from 'axios'
import useForm from "../UseForm/useForm"
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

export default function RegistrationForm(){
    const classes = useStyles();
    const {values, handleChange, handleSubmit} = useForm(() => {registerUser(values)})

    function registerUser(values) { 
        async function addUserToDatabase(values) { 
            try {
                console.log(values);
                const response = await axios.post("https://localhost:44394/api/authentication", values);
                console.log(response)
            }catch (error) {
                console.log(error);
            }
        }
        addUserToDatabase(values);
    }


    return (
        <div className="registration-container">
            <div className='form-block'>
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                  <TextField
                    required
                    id="outlined-required"
                    label="FirstName"
                    name="firstname"
                    defaultValue=""
                    variant="outlined"
                    onChange={handleChange}
                    value={values.firstname}
                    required
                  />
                  <TextField            
                    id="outlined-disabled"
                    label="LastName"
                    name="lastname"
                    defaultValue=""
                    variant="outlined"
                    onChange={handleChange}
                    value={values.lastname}
                  />
                  <TextField
                    id="outlined-disabled"
                    label="UserName"
                    name="username"
                    defaultValue=""
                    variant="outlined"
                    onChange={handleChange}
                    value={values.userName}
                  />
                  <TextField
                    id="outlined-password-input"
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.password}
                  />
                  <TextField
                    id="outlined-read-only-input"
                    label="Email"
                    name="email"
                    defaultValue=""
                    variant="outlined"
                    onChange={handleChange}
                    value={values.email}
                  /> 
                  <TextField
                  
                    id="outlined-disabled"
                    label="PhoneNumber"
                    name="phonenumber"
                    type="tel"
                    defaultValue=""
                    variant="outlined"
                    onChange={handleChange}
                    value={values.phonenumber}
                  />
                  <Button onClick={handleSubmit}> Sumbit</Button>
                </div>
            </form>
            </div>
        </div>
    );
}


