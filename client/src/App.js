import { Switch, Route, Redirect } from "react-router-dom";
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

function App() {
  const [products, setProducts] = useState([]);
  const [productID, setProductId] = useState(10);
  const [productReviews, setProductReviews] = useState([]);
  const [allProducts, setAllProducts] = useState(true);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [user, setUser] = useState([]);
  const [auth, setAuth] = useState(null);

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

  const getProductReviews = async (productId) => {
    let response = await axios.get(
      `https://localhost:44394/api/reviews/product/${productId}`
    );
    console.log(response.data);
    setProductReviews(response.data);
  };

  const searchProducts = async (searchInput) => {
    let response = await axios.post(
      `https://localhost:44394/api/products/name`,
      searchInput
    );
    console.log(response.data);
    setProducts(response.data);
  };
  return (
    <div className="App">
      <NavBar searchProducts={searchProducts} auth={auth} />
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
            />
          )}
        />
        <Route path="/login" component={Login} />
        {/* need to create the logout function still */}
        {/* <Route path="/logout" component={Logout} /> */}
      </Switch>
    </div>
  );
}

export default App;
