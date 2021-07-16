import {Switch, Route} from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import './App.css';
import NavBar from "./components/NavBar/NavBar"

function App() {
  const [products, setProducts] = useState([]);

  const searchProducts = async (searchInput) => {
    let response = await axios.post(`https://localhost:44394/api/products/name`, searchInput);
    console.log(response.data);
    setProducts(response.data);
  }

  return (
    <div className="App">
     <NavBar searchProducts={searchProducts}/>

      {/* links to other pages inside of switch    */}
     <Switch>

     </Switch>
    </div>
  );
}

export default App;
