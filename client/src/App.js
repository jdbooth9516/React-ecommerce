import {Switch, Route, Redirect} from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm"
import React, { useEffect, useState } from "react";
import axios from 'axios';
import './App.css';
import NavBar from "./components/NavBar/NavBar"
import DisplayProducts from "./components/DisplayProducts/displayProducts";


function App() {
  const [products, setProducts] = useState([]);


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
<<<<<<< HEAD
      <NavBar searchProducts={searchProducts}/>
=======
     <NavBar searchProducts={searchProducts}/>
     <DisplayProducts products={products}/>
>>>>>>> 05aa1f9fc43c57ceeab0512fef9176497ebe30fa

      {/* links to other pages inside of switch    */}
     <Switch>
      <Route path="/register" component={RegistrationForm}/>
      <Redirect to="/not-found"/>
     </Switch>
    </div>
  );
}

export default App;
