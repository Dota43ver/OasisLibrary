import { BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import React, {useState, useEffect} from "react";
import jwt_decode from "jwt-decode";
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
import Success from "./components/Success/Success";
import Dashboard from "./components/Dashboard Admin/Dashboard";
import Reviews from "./components/Reviews/Reviews";
import Edit from "./components/AccountEdit/AccountEdit";
import { AiFillGoogleCircle } from "react-icons/ai";


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }

  async function isAuth(){
    try {
      const response = await fetch("http://localhost:3001/users/is-verify",{
        method: "GET",
        headers: {token: localStorage.token}
      });

      const parseRes = await response.json()

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false)
    } catch (err) {
      console.error(err.message)
    }
  }

  function handleCallbackResponse(response) {
    const userObject = jwt_decode(response.credential);
    console.log(userObject)
  }

  useEffect(()=>{
    isAuth()
  })

  useEffect(()=>{
    /*global google */
    google.accounts.id.initialize({
      client_id: "340086857333-sbcjo4c3pta23d842q27q4fid3bnhod7.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })

  })

  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/login" render={props => !isAuthenticated ? <Login {...props} setAuth={setAuth}/> : <Redirect to="/account" />} />
          <Route exact path="/register" render={props =><Register {...props} setAuth={setAuth}/>} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route path="/book/:id" component={BookDetails} />
          <Route exact path="/account" render={props => isAuthenticated ? <Account {...props} setAuth={setAuth}/> : <Redirect to="/login" />} />
          <Route path="/dashboard/bookcreate" component={BookCreate} />
          <Route path="/cart" component={Cart} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/author/:name" component={Author} />
          <Route path="/checkout" component={Checkout}/>
          <Route path="/about" component={AboutUs}/>
          <Route path="/success" component={Success}/>
          <Route exact path="/dashboard" component={Dashboard}/>
          <Route path="/review" component={Reviews}/>
          <Route exact path='/edit' component={Edit}/>

         </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;
