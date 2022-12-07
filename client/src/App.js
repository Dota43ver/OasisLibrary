import './App.css';
import {  BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from "./components/Landing/Landing"

// import Home from "./components/Home/Home"

import NavBar from './components/NavBar/NavBar';
import Home from "./components/Home/Home"


function App() {
  return (
    <BrowserRouter>
        <div>
          <Switch>
            <Route exact path='/' component={Landing} />
            {/* <Route path= "/home" component={Home} /> */}    
            <Route path= "/home" component={Home} />
            </Switch>
        </div>
      </BrowserRouter>
    
  );
}

export default App;
{}