import {Switch, Route} from "react-router-dom"

import './App.css';
import NavBar from "./components/NavBar/NavBar"

function App() {

  const searchProducts = async (searchInput) => {
    let response = await axios.post(`https://localhost:44394/api/products/name`, searchInput);
    console.log(response.data);
  }

  return (
    <div className="App">
     <NavBar/>

      {/* links to other pages inside of switch    */}
     <Switch>

     </Switch>
    </div>
  );
}

export default App;
