import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DisplayProductReviews from '../DisplayReviews/displayReviews';
import AddRating from '../Rating/addRatingForm';
import ReviewForm from '../DisplayReviews/reviewForm';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export const ProductDetails = (props) => {

  const category = props.categories.filter(c=> c.categoryId == props.product.categoryId).pop();
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
            <h4 className="price">Price: ${props.product.price}</h4>
          </div>
          <div>
            <Button variant="outlined" color="primary">
              Add to Cart
            </Button>
          </div>
          <div>
            <p>Avg Rating: {props.productAvgRating}</p>
          </div>
        </div>
      </div>

      <div className="reviews">
        <div>
      <AddRating productId={props.productId}/>
      <ReviewForm productId={props.productId} getProductReviews={props.getProductReviews} user={props.user}/>
      <DisplayProductReviews productReviews={props.productReviews}/>
        </div>
      </div>
    </div>
  );
};
