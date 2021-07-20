import React from "react";
import axios from "axios";

const ShoppingCart = (props) => {
  function removeItem(id) {
    async function pullItemFromCart(id) {
      try {
        const response = await axios.delete(
          `https://localhost:44394/api/shoppingcart/${id}`
        );
        window.location.href = "/cart";
      } catch (error) {
        console.error(error.response.data);
      }
    }
    pullItemFromCart(id);
  }

  if (props.shoppingCart.length > 0) {
    let priceTotal = 0;
    var products = [];
    for (var i = 0; i < props.shoppingCart.length; i++) {
      const cartProduct = props.products.filter(
        (product) => product.productId == props.shoppingCart[i].productId
      );
      priceTotal += cartProduct[0].price;
      products.push(cartProduct.pop());
    }
    const productsInCart = products.map((product) => (
      <div>
        <h1>{product.name}</h1>
        <h2>{product.price}</h2>
        <button
          className="delete item"
          onClick={() => {
            removeItem(product.productId);
          }}
        >
          Remove
        </button>
      </div>
    ));

    return (
      <div>
        <div>
          <h1>{props.user.userName}'s Shopping Cart</h1>
        </div>
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
