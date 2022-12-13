import { BrowserRouter, Route, Switch } from "react-router-dom";
// import Home from "./components/Home/Home"
import "./App.css";
import Account from "./components/Account/Account";
import BookCreate from "./components/BookCreate/BookCreate";
import BookDetails from "./components/BookDetail/BookDetail";
import Cart from "./components/Cart/Cart";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import Register from "./components/Register/Register";
function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/a" component={Register} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route path="/book/:id" component={BookDetails} />
          <Route exact path="/account" component={Account} />
          <Route path="/bookcreate" component={BookCreate} />
          <Route path="/cart" component={Cart} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;
