import React from "react";
import Button from "@material-ui/core/Button";
import DisplayProductReviews from "../DisplayReviews/displayReviews";
import AddRating from "../Rating/addRatingForm";
import ReviewForm from "../DisplayReviews/reviewForm";
import axios from "axios";
import "./ProductDetails.css";

function AddProductToCart(props) {
  async function sendProduct(props) {
    const body = {
      UserId: props.user.id,
      ProductId: props.product.productId,
    };
    try {
      const response = await axios.post(
        "https://localhost:44394/api/shoppingcart",
        body
      );
      window.location.href = "/cart";
    } catch (error) {
      console.error(error.response.data);
    }
  }
  sendProduct(props);
}

export const ProductDetails = (props) => {
  const category = props.categories
    .filter((c) => c.categoryId == props.product.categoryId)
    .pop();
  console.log(category);

  return (
    <div className="Product-container">
      <div className="main-body">
        <div className="text-container">
          <div>
            <h1>{props.product.name}</h1>
          </div>
          <div>
            <h2>{props.product.discription}</h2>
          </div>
          <div>
            <p>Category: {category.name}</p>
          </div>
        </div>
        <div className="buying">
          <div>
            <h3 className="price">Price: ${props.product.price}</h3>
          </div>
          <div>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => AddProductToCart(props)}
            >
              Add to Cart
            </Button>
          </div>
          <div>
            <p>Avg Rating: {props.productAvgRating}</p>
          </div>
        </div>
      </div>

      <div>
        <div>
          <AddRating productId={props.productId} />
        </div>
        <div className="reviews">
          <ReviewForm
            productId={props.productId}
            getProductReviews={props.getProductReviews}
            user={props.user}
          />
          <DisplayProductReviews productReviews={props.productReviews} />
        </div>
      </div>
    </div>
  );
};
