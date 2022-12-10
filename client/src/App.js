import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";

// import Home from "./components/Home/Home"
import Register from './components/Register/Register';
import BookDetails from "./components/BookDetail/BookDetail";
import Home from "./components/Home/Home";
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
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;
