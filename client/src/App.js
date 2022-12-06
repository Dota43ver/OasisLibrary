import './App.css';
import {  BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from "./components/Landing/Landing"
import NavBar from './components/NavBar/NavBar';
import Home from "./components/Home/Home"

function App() {
  return (
    <BrowserRouter>
        <div>
          <Switch>
            <Route exact path='/' component={Landing} />

            <Route exact path='/a' component={NavBar}/>    

            <Route path= "/home" component={Home} />

            </Switch>
        </div>
      </BrowserRouter>
    
  );
}

export default App;
{}