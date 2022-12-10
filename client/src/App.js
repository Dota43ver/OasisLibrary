
import Register from './components/Register/Register';
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import Home from "./components/Home/Home"
import BookDetails from "./components/BookDetail/BookDetail";
import Home from "./components/Home/Home";
import BookCreate from "./components/BookCreate/BookCreate";
import LandingPage from "./components/LandingPage/LandingPage";


function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/a" component={Register}/>
          <Route exact path= '/' component= {LandingPage}/>
          <Route exact path="/home" component={Home} />
          <Route path="/book/:id" component={BookDetails} />
          <Route path="/bookcreate" component={BookCreate}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;
