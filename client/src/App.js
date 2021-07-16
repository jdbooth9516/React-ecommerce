import {Switch, Route} from "react-router-dom";
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
     <NavBar searchProducts={searchProducts}/>
     <DisplayProducts products={products}/>

      {/* links to other pages inside of switch    */}
     <Switch>

     </Switch>
    </div>
  );
}

export default App;
