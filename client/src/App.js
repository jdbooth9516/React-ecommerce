import {Switch, Route, Redirect} from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm"
import React, { useEffect, useState } from "react";
import axios from 'axios';
import './App.css';
import NavBar from "./components/NavBar/NavBar"
import DisplayProducts from "./components/DisplayProducts/displayProducts";
import { ProductDetails } from "./components/ProductDetails/ProductDetails";


function App() {
  const [products, setProducts] = useState([]);
  const [productID, setProductId] = useState();

  useEffect(async()=>{
    let response = await axios.get(`https://localhost:44394/api/products`);
    console.log(response.data);
    setProducts(response.data);
  },[]);

  const searchProducts = async (searchInput) => {
    let response = await axios.post(`https://localhost:44394/api/products/name`, searchInput);
    console.log(response.data);
    setProducts(response.data);
  }
  return (
    <div className="App">
     <NavBar searchProducts={searchProducts}/>
     <DisplayProducts products={products} productID={productID} setProductId={setProductId}/>

      {/* links to other pages inside of switch    */}
     <Switch>
      <Route path="/register" component={RegistrationForm}/>
      <Route path={"/product/" + productID} render={props => <ProductDetails {...props} productID={productID}/>}/>
      <Redirect to="/not-found"/>
     </Switch>
    </div>
  );
}

export default App;
