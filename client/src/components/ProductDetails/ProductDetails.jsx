import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DisplayProductReviews from "../DisplayReviews/displayReviews";
import AddRating from "../Rating/addRatingForm";
import "./ProductDetails.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export const ProductDetails = (props) => {
  return (
    <div className="Product-container">
      <div className="main-body">
        <div className="text-container">
          <div>
            <h1>{props.product[0].name}</h1>
          </div>
          <div>
            <p>{props.product[0].discription}</p>
          </div>
        </div>
        <div className="buying">
          <div>
            <h4 className="price">{props.product[0].price}</h4>
          </div>
          <div>
            <Button variant="outlined" color="primary">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      <div className="reviews">
        <div>
          <AddRating productId={props.productId} />
        </div>
        <div>
          <DisplayProductReviews productReviews={props.productReviews} />
        </div>
      </div>
    </div>
  );
};
