
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import Home from "./components/Home/Home"
import "./App.css";
import Register from "./components/Register/Register";
import BookCreate from "./components/BookCreate/BookCreate";
import BookDetails from "./components/BookDetail/BookDetail";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import Account from './components/Account/Account';

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
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;
