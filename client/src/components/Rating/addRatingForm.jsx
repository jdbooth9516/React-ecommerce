import React from "react";
import useForm from "../UseForm/useForm";
import axios from "axios";
import "./addRatingForm.css";

const AddRating = (props) => {
  const postRating = async () => {
    if (values.userRating) {
      const rating = {
        UserRating: parseInt(values.userRating),
        ProductId: props.productId,
        UserId: props.UserId,
      };
      let response = await axios.post(
        `https://localhost:44394/api/ratings`,
        rating
      );
      alert(`Successfully rated as ${values.userRating}`);
      window.location.href = `/products/${props.productId}`;
    } else {
      const rating = {
        userRating: 1,
        productId: props.productId,
        userId: props.UserId,
      };
      let response = await axios.post(
        `https://localhost:44394/api/ratings`,
        rating
      );
      alert(`Successfully rated as 1`);
    }
  };
  const { values, handleChange, handleSubmit } = useForm(postRating);

  return (
    <div className="rating-dropdown">
      <form onSubmit={handleSubmit} className="rating-form" method="post">
        <label className="rating-dropdown-label">Rate This Product:</label>
        <select
          className="selection"
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
        <input className="rating-btn" type="submit" value="Add Rating" />
      </form>
    </div>
  );
};

export default AddRating;
