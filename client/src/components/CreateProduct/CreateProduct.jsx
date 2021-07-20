import axios from "axios";
import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import useForm from "../UseForm/useForm";

export const CreateProduct = (props) => {
  const { values, handleChange, handleSubmit } = useForm(() => {
    registerProduct(values);
  });

  function registerProduct(values) {
    async function addProductToDatabase(values) {
      const price = parseFloat(values.Price);
      const cat = parseInt(values.CategoryId);
      values.Price = price;
      values.CategoryId = cat;
      values.UserId = props.user.id;
      console.log(values);
      try {
        const response = await axios.post(
          "https://localhost:44394/api/products",
          values
        );
        console.log(response);
      } catch (error) {
        console.error(error.response.data);
      }
      window.location.href = "/";
    }
    addProductToDatabase(values);
  }

  return (
    <div>
      <form className="form-container" noValidate autoComplete="off">
        <div className="reg-form">
          <h1>Create New Listing</h1>
          <div className="form-item">
            <TextField
              required={true}
              id="outlined-required"
              label="Name"
              name="Name"
              defaultValue=""
              variant="outlined"
              onChange={handleChange}
              value={values.Name}
            />
          </div>
          <div className="form-item">
            <TextField
              required={true}
              id="outlined-required"
              label="Discription"
              name="Discription"
              defaultValue=""
              variant="outlined"
              onChange={handleChange}
              value={values.Discription}
            />
          </div>
          <div className="form-item">
            <TextField
              required={true}
              id="outlined-required"
              label="Price"
              name="Price"
              defaultValue=""
              type="number"
              step="0.01"
              variant="outlined"
              onChange={handleChange}
              value={values.Price}
            />
          </div>
          <div className="form-item">
            <TextField
              required={true}
              id="outlined-required"
              label="Photo"
              name="Photo"
              type="text"
              defaultValue="None"
              variant="outlined"
              onChange={handleChange}
              value={values.Photo}
            />
          </div>
          <div className="form-item">
            <TextField
              disabled
              required={true}
              id="outlined-read-only-input"
              label="UserId"
              name="UserId"
              defaultValue=" "
              variant="outlined"
              onChange={handleChange}
              value={values.UserId}
            />
          </div>
          <div className="form-item">
            <TextField
              required={true}
              id="outlined-required"
              label="CategoryId"
              name="CategoryId"
              type="number"
              defaultValue=""
              variant="outlined"
              onChange={handleChange}
              value={values.CategoryId}
            />
          </div>
          <div>
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      </form>
    </div>
  );
};
