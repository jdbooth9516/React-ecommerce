import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));


export const ProductDetails = (props) => {
    return (

        <div>
            <div>
                <h1>{props.product.name}</h1>
            </div>
            <div>
                <p>{props.product.discription}</p>
            </div>
            <div> 
                <h4>{props.product.price}</h4>
            </div>
            <Button variant="outlined" color="primary">
        Add to Cart
      </Button>
        </div>
    )
}
