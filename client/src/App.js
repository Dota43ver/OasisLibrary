import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import AboutUs from "./components/About us/AboutUs";
import Account from "./components/Account/Account";
import Edit from "./components/AccountEdit/AccountEdit";
import Author from "./components/Author/Author";
import BookCreate from "./components/BookCreate/BookCreate";
import BookDetails from "./components/BookDetail/BookDetail";
import BookEdit from "./components/BookEdit/BookEdit";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import Dashboard from "./components/Dashboard Admin/Dashboard";
import Favorites from "./components/Favorites/Favorites";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./components/Login/Login";
import OrderCart from "./components/Orders/Orders";
import Register from "./components/Register/Register";
import Reviews from "./components/Reviews/Reviews";
import Success from "./components/Success/Success";

import { AiFillGoogleCircle } from "react-icons/ai";


import Users from "./components/Users/Users";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:3001/users/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  }

    
  //   function handleCallbackResponse(response) {
  //     const userObject = jwt_decode(response.credential);
  //   console.log(userObject)
  // }

  // useEffect(()=>{
  //   /*global google */
  //   google.accounts.id.initialize({
  //     client_id: "340086857333-sbcjo4c3pta23d842q27q4fid3bnhod7.apps.googleusercontent.com",
  //     callback: handleCallbackResponse
  //   })

  // })

  useEffect(() => {
    isAuth();
  });

  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route
            exact
            path="/login"
            render={(props) =>
              !isAuthenticated ? (
                <Login {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/account" />
              )
            }
          />
          <Route
            exact
            path="/register"
            render={(props) => <Register {...props} setAuth={setAuth} />}
          />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route path="/book/:id" component={BookDetails} />
          <Route
            exact
            path="/account"
            render={(props) =>
              isAuthenticated ? (
                <Account {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          
         
          <Route path="/dashboard/bookcreate" component={BookCreate} />
          <Route path="/dashboard/bookedit" component={BookEdit} />
          <Route path="/dashboard/users" component={Users} />
          <Route path="/cart" component={Cart} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/author/:name" component={Author} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/about" component={AboutUs} />
          <Route path="/success" component={Success} />
          <Route path="/review" component={Reviews} />
          <Route exact path="/order" component={OrderCart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/about" component={AboutUs} />
          <Route path="/success" component={Success} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="/review" component={Reviews} />
          <Route exact path="/edit" component={Edit} />
        </Switch>
      </div>
    </BrowserRouter>
  );


}



export default App;
