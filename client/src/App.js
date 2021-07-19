import {Switch, Route, Redirect} from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm"
import React, { useEffect, useState } from "react";
import axios from 'axios';
import './App.css';
import NavBar from "./components/NavBar/NavBar"
import DisplayProducts from "./components/DisplayProducts/displayProducts";
import { ProductDetails } from "./components/ProductDetails/ProductDetails";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";

function App() {
  const [products, setProducts] = useState([]);
  const [productID, setProductId] = useState(10);
  const [allProducts, setAllProducts] = useState(true);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [user, setUser] = useState([]);


  useEffect(async()=>{
    let response = await axios.get(`https://localhost:44394/api/products`);
    console.log(response.data);
    setProducts(response.data);
    getUserCart(user.id);
  },[user]);


  const getUserCart = async (userId)=>{
    let response = await axios.post(`https://localhost:44394/api/shoppingcart/user`, userId);
    console.log(response.data);
    setShoppingCart(response.data);
  }

  const searchProducts = async (searchInput) => {
    let response = await axios.post(`https://localhost:44394/api/products/name`, searchInput);
    console.log(response.data);
    setProducts(response.data);
  }
  return (
    <div className="App">
     <NavBar searchProducts={searchProducts}/>
     {allProducts ? (
       <DisplayProducts products={products} setAll={setAllProducts} setProductId={setProductId}/>
     ) : null}  
      {/* links to other pages inside of switch    */}
     <Switch>
      <Route path="/register" component={RegistrationForm}/>
      <Route path="/cart" component={ShoppingCart}/>
      <Route path={"/product/" + productID} render={props => <ProductDetails {...props} product={products[productID]}/>}/>
     </Switch>
    </div>
  );
}

export default App;
