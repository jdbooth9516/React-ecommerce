import {Switch, Route} from "react-router-dom"

import './App.css';
import NavBar from "./components/NavBar/NavBar"

function App() {
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
