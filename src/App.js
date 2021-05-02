import React from "react";
import "./App.css";
import {Switch, Route} from "react-router-dom";
import Home from "./Page/Home";
import Admin from "./Page/Admin";
import UpdateMovie from "./admin/updateMovie";

function App() {
  return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/admin" component={Admin} />
        <Route path="/update/:id" component={UpdateMovie} />
      </Switch>
  );
}

export default App;
