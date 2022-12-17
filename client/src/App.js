import { BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import React, {useState} from "react";
// import Home from "./components/Home/Home"
import "./App.css";
import Account from "./components/Account/Account";
import Author from "./components/Author/Author";
import BookCreate from "./components/BookCreate/BookCreate";
import BookDetails from "./components/BookDetail/BookDetail";
import Cart from "./components/Cart/Cart";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./components/Login/Login";
import Favorites from "./components/Favorites/Favorites";
import Checkout from "./components/Checkout/Checkout";
import AboutUs from "./components/About us/AboutUs";
import Register from "./components/Register/Register";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }

  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/login" render={props => !isAuthenticated ? <Login {...props} setAuth={setAuth}/> : <Redirect to="/account" />} />
          <Route exact path="/register" render={props =><Register {...props} setAuth={setAuth}/>} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route path="/book/:id" component={BookDetails} />
          <Route exact path="/account" render={props => isAuthenticated ? <Account {...props}/> : <Redirect to="/login" setAuth={setAuth}/>} />
          <Route path="/bookcreate" component={BookCreate} />
          <Route path="/cart" component={Cart} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/author/:name" component={Author} />
          <Route path="/checkout" component={Checkout}/>
          <Route path="/about" component={AboutUs}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;
