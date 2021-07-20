import React from "react";
import axios from "axios";
import useForm from "../UseForm/useForm";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import PasswordField from "material-ui-password-field";
import "./RegistrationForm.css";

export default function RegistrationForm() {
  const { values, handleChange, handleSubmit } = useForm(() => {
    registerUser(values);
  });

  function registerUser(values) {
    async function addUserToDatabase(values) {
      try {
        const response = await axios.post(
          "https://localhost:44394/api/authentication",
          values
        );
        window.location.href = "/login";
      } catch (error) {
        const response = error.response.data;
        if (response.DuplicateUserName) {
          alert(response.DuplicateUserName[0]);
        } else {
          alert("One or more field are missing or incomplete plese try again");
        }
        window.location.href = "/register";
      }
    }
    addUserToDatabase(values);
  }

  return (
    <div>
      <div className="form-block">
        <form className="form-container" noValidate autoComplete="off">
          <div className="reg-form">
            <h1>Register New Account</h1>
            <div className="form-item">
              <TextField
                required={true}
                id="outlined-required"
                label="FirstName"
                name="firstname"
                defaultValue=""
                variant="outlined"
                onChange={handleChange}
                value={values.firstname}
              />
            </div>
            <div className="form-item">
              <TextField
                required={true}
                id="outlined-disabled"
                label="LastName"
                name="lastname"
                defaultValue=""
                variant="outlined"
                onChange={handleChange}
                value={values.lastname}
              />
            </div>
            <div className="form-item">
              <TextField
                required={true}
                id="outlined-disabled"
                label="UserName"
                name="username"
                defaultValue=""
                variant="outlined"
                onChange={handleChange}
                value={values.userName}
              />
            </div>
            <div className="form-item">
              <PasswordField
                hintText="At least 8 characters"
                floatingLabelText="Enter your password"
                errorText="Invaild input make sure at least 8 charaters and 1 number"
                required={true}
                name="password"
                type="password"
                autoComplete="current-password"
                onChange={handleChange}
                value={values.password}
              />
            </div>
            <div className="form-item">
              <TextField
                required={true}
                id="outlined-read-only-input"
                label="Email"
                name="email"
                defaultValue=""
                variant="outlined"
                onChange={handleChange}
                value={values.email}
              />
            </div>
            <div className="form-item">
              <TextField
                required={true}
                id="outlined-disabled"
                label="PhoneNumber"
                name="phonenumber"
                type="tel"
                defaultValue=""
                variant="outlined"
                onChange={handleChange}
                value={values.phonenumber}
              />
            </div>
            <div>
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
