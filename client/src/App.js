import { Switch, Route, Redirect, Router } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import DisplayProducts from "./components/DisplayProducts/displayProducts";
import { ProductDetails } from "./components/ProductDetails/ProductDetails";
import Login from "./components/LogIn/logIn";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import DisplayProductsForSale from "./components/ProductsForSale/productsForSale";
import Dashboard from "./components/Dashboard/dashboard";
import { CreateProduct } from "./components/CreateProduct/CreateProduct";
import Logout from "./components/Logout/logout";

function App() {
  const [products, setProducts] = useState([]);
  const [productID, setProductId] = useState(10);
  const [productReviews, setProductReviews] = useState([]);
  const [allProducts, setAllProducts] = useState(true);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [user, setUser] = useState({});
  const [categories, setCategories] = useState([]);
  const [productAvgRating, setProductAvgRating] = useState([]);

  useEffect(async () => {
    let response = await axios.get(`https://localhost:44394/api/products`);
    console.log(response.data);
    setProducts(response.data);
    getUserCart(user.id);
    getCategories();
  }, [user]);

  console.log(user);
  console.log(user.id);

  useEffect(async () => {
    getUserCart(user.id);
  },[ShoppingCart])

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
    let response = await axios.get(`https://localhost:44394/api/ratings/${productId}`);
    console.log(response.data);
    var sumRating = 0;
    var denom = 0;
    response.data.map((rating, index)=>{
      sumRating += rating.userRating;
      denom = index + 1;
    });
    const avgRating = sumRating/denom;
    const normAvgRating = avgRating.toFixed(1);
    console.log(avgRating);
    if(isNaN(avgRating)){
      setProductAvgRating(0);
    }else{
      setProductAvgRating(normAvgRating);
    }
  }

  useEffect(async () => {
    getUser();
  }, []);

  const getUser = async () => {
    const jwt = localStorage.getItem("token");
    console.log(jwt);
    try {
      let response = await axios.get(
        "https://localhost:44394/api/examples/user",
        { headers: { Authorization: "Bearer " + jwt } }
      );
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.log("There was an error in the USER GET request");
    }
  };

  const getCategories = async () => {
    let response = await axios.get(`https://localhost:44394/api/categories`);
    console.log(response.data);
    setCategories(response.data);
  };

  const getProductReviews = async (productId) => {
    let response = await axios.get(
      `https://localhost:44394/api/reviews/product/${productId}`
    );
    console.log(response.data);
    setProductReviews(response.data);
  };

  const searchProducts = async (searchInput) => {
    let response = await axios.get(
      `https://localhost:44394/api/products/search/${searchInput}`
    );
    console.log(response.data);
    setProducts(response.data);
  };

  return (
    <div className="App">
      <NavBar searchProducts={searchProducts} user={user} />
      {allProducts ? (
        <DisplayProducts
          products={products}
          setAll={setAllProducts}
          setProductId={setProductId}
        />
      ) : null}
      {/* links to other pages inside of switch    */}
      <Switch>
        <Route path="/register" component={RegistrationForm} />
        <Route path="/cart" 
          render ={(props)=>(
            <ShoppingCart
              {...props}
              component={ShoppingCart}
              user={user}
              products={products}
              shoppingCart={shoppingCart}/>
          )} />
        <Route
          path={"/product/" + productID}
          render={(props) => (
            <ProductDetails
              {...props}
              productReviews={productReviews}
              user={user}
              categories={categories}
              product={products.filter(
                (product) => product.productId == productID
              ).pop()}
              productAvgRating={productAvgRating}
              productId={productID}
              getProductReviews={getProductReviews}
            />
          )}
        />
        <Route
          path="/login"
          render={(props) => <Login {...props} getUser={getUser} />}
        />
        <Route path="/dashboard" component={Dashboard} />
        {/* need to create the logout function still */}
        <Route path="/logout" component={Logout} />
        <Route
          path="/create-product"
          /*will need to change auth to the users id once login works */
          render={(props) => <CreateProduct {...props} user={user} />}
        />
      </Switch>
    </div>
  );
}

export default App;
