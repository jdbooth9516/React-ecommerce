import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import useForm from "../UseForm/useForm";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./login.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const Login = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const classes = useStyles();
  const { values, handleChange, handleSubmit } = useForm(() => {
    logInUser(values);
  });

  async function logInUser(values) {
    await getSetToken(values);
    await getSetUser();

    async function getSetToken(values) {
      try {
        console.log("Did we even make it here?");
        const response = await axios.post(
          "https://localhost:44394/api/authentication/login",
          values
        );
        console.log(values);
        console.log(response);

        const { token } = response.data;

        localStorage.setItem("token", token);
        console.log(localStorage, "hit jwt");
      } catch (error) {
        console.log("there was an error in the Token request");
        console.error(error);
      }
    }

    async function getSetUser() {
      try {
        const token = localStorage.getItem("token");
        let response = await axios.get(
          "https://localhost:44394/api/examples/user",
          { headers: { Authorization: "Bearer " + token } }
        );
        const { data } = response;
        console.log("user data: ", data);
        localStorage.setItem("user", data);
        setIsLoggedIn(true);
        props.getUser();
      } catch (err) {
        console.log("there was an error in the User request");
        console.error(err);
      }
    }
  }

  return (
    <container className="login-container" maxWidth="sm">
      <h2>Log In</h2>
      <div className="field-box">
        <form className={classes.root}>
          <div className="login-form">
            <TextField
              id="standard-basic"
              label="Username"
              name="username"
              onChange={handleChange}
              values={values.userId}
            />
            <TextField
              id="standard-basic"
              label="Password"
              name="password"
              onChange={handleChange}
              values={values.password}
            />
            <Button onClick={handleSubmit}>Log In</Button>
            {isLoggedIn ? <Redirect to="/allProducts" /> : null}
          </div>
        </form>
      </div>
    </container>
  );
};

export default Login;
