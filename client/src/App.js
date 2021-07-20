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
import Dashboard from './components/Dashboard/dashboard';
import { CreateProduct } from "./components/CreateProduct/CreateProduct";

function App() {
  const [products, setProducts] = useState([]);
  const [productID, setProductId] = useState(10);
  const [productReviews, setProductReviews] = useState([]);
  const [allProducts, setAllProducts] = useState(true);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [user, setUser] = useState([]);
  const [auth, setAuth] = useState("013cc3ef-0606-4962-bb2b-09fc93a39015");

  useEffect(async () => {
    let response = await axios.get(`https://localhost:44394/api/products`);
    console.log(response.data);
    setProducts(response.data);
    getUserCart(user.id);
  }, [user]);

  useEffect(async () => {
    getProductReviews(productID);
  }, [productID]);

  const getUserCart = async (userId) => {
    let response = await axios.get(
      `https://localhost:44394/api/shoppingcart/user/${userId}`
    );
    console.log(response.data);
    setShoppingCart(response.data);
  };
  
  useEffect( async () => {
    getUser();
  }, []);

  const getUser = async () => {
    const jwt = localStorage.getItem('token');
    try {
      let response = await axios.get('https://localhost:44394/api/examples/user', { headers: { Authorization: 'Bearer ' + jwt }});
      console.log(response.data);
      setUser(user);
    }
    catch (error) {
        console.log("There was an error in the USER GET request")
    }
  }

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
      <NavBar searchProducts={searchProducts} auth={auth} user={user} />
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
        <Route path="/cart" component={ShoppingCart} />
        <Route
          path={"/product/" + productID}
          render={(props) => (
            <ProductDetails
              {...props}
              productReviews={productReviews}
              product={products.filter(
                (product) => product.productId == productID
              )}
              productId={productID}
            />
          )}
        />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard}/>
        {/* need to create the logout function still */}
        {/* <Route path="/logout" component={Logout} /> */}
        <Route
          path="/create-product"
          /*will need to change auth to the users id once login works */
          render={(props) => <CreateProduct {...props} user={auth} />}
        />
      </Switch>
    </div>
  );
}

export default App;