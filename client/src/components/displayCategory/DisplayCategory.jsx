import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
    <div>
      <h2>{currentCategory[0].name}</h2>
      <div>{display}</div>
    </div>
  );
};

export default DisplayCategory;
