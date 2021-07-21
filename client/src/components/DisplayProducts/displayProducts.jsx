import React from "react";
import { Link } from "react-router-dom";
import "./displayProducts.css";

const DisplayProducts = (props) => {
  const categories = props.categories.map((category) => (
    <div
      className="category-card"
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
      className="product-card"
    >
      <Link className="links" to={"/product/" + product.productId}>
        <h1 className="product-name">{product.name}</h1>
        <h2 className="product-price">{product.price}</h2>
      </Link>
    </div>
  ));

  return (
    <div className="main-products-container">
      <div className="category-container">
        <h3 className="category-title">Categories:</h3>
        <div className="category-links">{categories}</div>
      </div>
      <div className="products-body">
        <h3>Products</h3>
        <div className="products-container">{products}</div>
      </div>
    </div>
  );
};

export default DisplayProducts;
