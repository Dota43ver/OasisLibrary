import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

// import Home from "./components/Home/Home"
import BookDetails from "./components/BookDetail/BookDetail";
import Home from "./components/Home/Home";
import BookCreate from "./components/BookCreate/BookCreate";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route path="/book/:id" component={BookDetails} />
          <Route path="/bookcreate" component={BookCreate}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;
