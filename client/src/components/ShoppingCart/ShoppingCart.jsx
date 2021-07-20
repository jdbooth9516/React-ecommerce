import axios from "axios";
import React, { useState, useEffect } from "react";

const ShoppingCart = (props) => {
  if (props.shoppingCart.length > 0) {
    let priceTotal = 0;
    var products = [];
    for (var i = 0; i < props.shoppingCart.length; i++) {
      console.log(props.shoppingCart[i]);
      const cartProduct = props.products.filter(product=> product.productId == props.shoppingCart[i].productId);
      priceTotal += cartProduct[0].price;
      products.push(cartProduct.pop());
      console.log(products);
    }
    const productsInCart = products.map((product) => (
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
