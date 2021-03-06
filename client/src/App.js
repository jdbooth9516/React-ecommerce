import { Switch, Route, Redirect, Link } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./components/NavBar/NavBar";
import DisplayProducts from "./components/DisplayProducts/displayProducts";
import { ProductDetails } from "./components/ProductDetails/ProductDetails";
import Login from "./components/LogIn/logIn";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import DisplayCategory from "./components/displayCategory/DisplayCategory";

import Dashboard from "./components/Dashboard/dashboard";
import { CreateProduct } from "./components/CreateProduct/CreateProduct";
import Logout from "./components/Logout/logout";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [productID, setProductId] = useState(10);
  const [productReviews, setProductReviews] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [user, setUser] = useState({});
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [productAvgRating, setProductAvgRating] = useState([]);

  useEffect(async () => {
    let response = await axios.get(`https://localhost:44394/api/products`);
    setProducts(response.data);
    getUserCart(user.id);
    getCategories();
  }, [user]);

  useEffect(async () => {
    getUserCart(user.id);
  }, [ShoppingCart]);

  useEffect(async () => {
    getProductReviews(productID);
    getAvgRating(productID);
  }, [productID]);

  const getUserCart = async (userId) => {
    let response = await axios.get(
      `https://localhost:44394/api/shoppingcart/user/${userId}`
    );
    console.log(response.data);
    setShoppingCart(response.data);
  };

  const getAvgRating = async (productId) => {
    let response = await axios.get(
      `https://localhost:44394/api/ratings/${productId}`
    );
    var sumRating = 0;
    var denom = 0;
    response.data.map((rating, index) => {
      sumRating += rating.userRating;
      denom = index + 1;
    });
    const avgRating = sumRating / denom;
    const normAvgRating = avgRating.toFixed(1);
    if (isNaN(avgRating)) {
      setProductAvgRating(0);
    } else {
      setProductAvgRating(normAvgRating);
    }
  };

  useEffect(async () => {
    let response = await axios.get(`https://localhost:44394/api/products`);
    setProducts(response.data);
    console.log(products);
    getUser();
    <Redirect to="/allProducts" />;
  }, []);

  // get the information from the token so the site know which users is logged in
  const getUser = async () => {
    const jwt = localStorage.getItem("token");
    try {
      let response = await axios.get(
        "https://localhost:44394/api/examples/user",
        { headers: { Authorization: "Bearer " + jwt } }
      );
      setUser(response.data);
    } catch (error) {
      console.error("There was an error in the USER GET request");
    }
  };

  // gets the total number of categories
  const getCategories = async () => {
    let response = await axios.get(`https://localhost:44394/api/categories`);
    setCategories(response.data);
  };

  // finds the reviews for a product
  const getProductReviews = async (productId) => {
    let response = await axios.get(
      `https://localhost:44394/api/reviews/product/${productId}`
    );
    setProductReviews(response.data);
  };

  // Search function
  const searchProducts = async (searchInput) => {
    let response = await axios.get(
      `https://localhost:44394/api/products/search/${searchInput}`
    );
    setProducts(response.data);
  };

  return (
    <div className="App">
      <NavBar searchProducts={searchProducts} user={user} />
      {!user.firstName ? (
        <div>
          <h2> Welcome </h2>
          <h4> Please register and login for full access</h4>
        </div>
      ) : null}
      {/* links to other pages inside of switch    */}
      <Switch>
        <Route
          path="/allProducts"
          render={(props) => (
            <DisplayProducts
              {...props}
              products={products}
              setProductId={setProductId}
              categories={categories}
              setCategoryId={setCategoryId}
            />
          )}
        />
        <Route
          path={"/category/" + categoryId}
          render={(props) => (
            <DisplayCategory
              {...props}
              categoryId={categoryId}
              categories={categories}
              products={products}
              setProductId={setProductId}
            />
          )}
        />
        <Route path="/register" component={RegistrationForm} />
        <Route
          path="/cart"
          render={(props) => (
            <ShoppingCart
              {...props}
              component={ShoppingCart}
              user={user}
              products={products}
              shoppingCart={shoppingCart}
            />
          )}
        />
        <Route
          path={"/product/" + productID}
          render={(props) => (
            <ProductDetails
              {...props}
              productReviews={productReviews}
              user={user}
              categories={categories}
              product={products
                .filter((product) => product.productId == productID)
                .pop()}
              productAvgRating={productAvgRating}
              productId={productID}
              getProductReviews={getProductReviews}
              getAvgRating={getAvgRating}
            />
          )}
        />
        <Route
          path="/login"
          render={(props) => <Login {...props} getUser={getUser} />}
        />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/logout" component={Logout} />
        <Route
          path="/create-product"
          render={(props) => <CreateProduct {...props} user={user} />}
        />
      </Switch>
    </div>
  );
}

export default App;
