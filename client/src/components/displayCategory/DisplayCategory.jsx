import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./DisplayCategory.css";

const DisplayCategory = (props) => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    getCategoryProducts(props);
  }, []);

  function getCategoryProducts(props) {
    async function displayProducts(props) {
        const response = props.products.filter(p=> p.categoryId == props.categoryId);
        setFilteredProducts(response);
    }
    displayProducts(props);
  }

  const display = filteredProducts.map((product) => (
    <div
      onClick={() => {
        props.setProductId(product.productId);
      }}
      className="product-card"
    >
      <Link className="links" to={"/product/" + product.productId}>
        <h1>{product.name}</h1>
        <h2>{product.price}</h2>
      </Link>
    </div>
  ));

  const currentCategory = props.categories.filter(
    (category) => category.categoryId == props.categoryId
  );

  return (
    <div className="main-products-container">
      <h2>{currentCategory[0].name}</h2>
      <div>
        <div className="products-body">
          <div className="products-container-cat">{display}</div>
        </div>
      </div>
    </div>
  );
};

export default DisplayCategory;
