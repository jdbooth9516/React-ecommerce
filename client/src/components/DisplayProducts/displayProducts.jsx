import React from "react";
import { Link } from "react-router-dom";

const DisplayProducts = (props) => {
  const categories = props.categories.map((category) => (
    <div
      onClick={() => {
        props.setCategoryId(category.categoryId);
      }}
    >
      <Link className="links" to={"/category/" + category.categoryId}>
        {category.name}
      </Link>
    </div>
  ));
  const products = props.products.map((product, index) => (
    <div
      onClick={() => {
        props.setProductId(product.productId);
      }}
    >
      <Link className="links" to={"/product/" + product.productId}>
        <h1>{product.name}</h1>
        <h2>{product.price}</h2>
      </Link>
    </div>
  ));

  return (
    <div>
      <div>
        <h3>Categories</h3>
        {categories}
      </div>

      <div>
        <h3>Products</h3>
        {products}
      </div>
    </div>
  );
};

export default DisplayProducts;
