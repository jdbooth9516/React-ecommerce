import React, { useEffect } from "react";
import useForm from "../UseForm/useForm";
import axios from "axios";
import "./addRatingForm.css";

const AddRating = (props) => {
  const postRating = async () => {
    if (values.userRating) {
      const rating = {
        userRating: parseInt(values.userRating),
        productId: props.productId,
        userId: "75a188ee-076f-4a8e-aa6e-250ab945eaa1",
        //using hard coded userId for test
      };
      console.log(rating);
      let response = await axios.post(
        `https://localhost:44394/api/ratings`,
        rating
      );
      console.log(response.data);
      alert(`Successfully rated as ${values.userRating}`);
    } else {
      const rating = {
        userRating: 1,
        productId: props.productId,
        userId: "75a188ee-076f-4a8e-aa6e-250ab945eaa1",
        //using hard coded userId for test
      };
      console.log(rating);
      let response = await axios.post(
        `https://localhost:44394/api/ratings`,
        rating
      );
      console.log(response.data);
      alert(`Successfully rated as 1`);
    }
  };
  const { values, handleChange, handleSubmit } = useForm(postRating);

  return (
    <div className="rating-dropdown">
      <form onSubmit={handleSubmit} className="search-form" method="post">
        <label className="rating-dropdown-label">Add Rating:</label>
        <select
          value={values.userRating}
          onChange={handleChange}
          name="userRating"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddRating;
