import axios from "axios";
import React, { useState, useEffect } from "react";

const ShoppingCart = (props) => {
  if (props.shoppingCart.length > 0) {
    let priceTotal = 0;
    for (var i = 0; i < props.shoppingCart.length; i++) {
      console.log(props.shoppingCart[i]);
      priceTotal += props.shoppingCart[i].price;
    }
    const productsInCart = props.shoppingCart.map((product) => (
      <div>
        <h1>{product.name}</h1>
        <h2>{product.price}</h2>
      </div>
    ));
    return (
      <div>
        <div>{productsInCart}</div>
        <div>Total Cost: ${priceTotal}</div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>You have 0 products in cart.</h1>
      </div>
    );
  }
};

export default ShoppingCart;
