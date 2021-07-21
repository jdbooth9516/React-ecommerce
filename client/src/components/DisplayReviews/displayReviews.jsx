import React from "react";
import "./displayReviews.css";

const DisplayProductReviews = (props) => {
  if (props.productReviews.length > 0) {
    const reviews = props.productReviews.map((review) => (
      <div className="reviews">
        <div>
          <p>User {review.Name} review:</p>
        </div>
        <div>
          <h2>{review.userReview}</h2>
        </div>
      </div>
    ));
    return <div className="review-container">{reviews}</div>;
  } else {
    return (
      <div>
        <h1>This product has no reviews.</h1>
      </div>
    );
  }
};

export default DisplayProductReviews;
