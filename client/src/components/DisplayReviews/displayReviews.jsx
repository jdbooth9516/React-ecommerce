import React from "react";
import "./displayReviews.css";

const DisplayProductReviews = (props) => {
  if (props.productReviews.length > 0) {
    const reviews = props.productReviews.map((review) => (
      <div className="reviews-body">
        <div>
          <h4>User {review.Name} review:</h4>
        </div>
        <div>
          <p className="review-text">{review.userReview}</p>
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
