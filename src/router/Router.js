import React from "react";
import { Switch, Route } from "react-router-dom";
import { Router } from "react-router";
import AppBar from "../components/AppBar";
import App from "../App";
import Details from "../components/Details";
const history = require("history").createBrowserHistory();

export default function AppRouter() {
  return (
    <>
      <Router history={history}>
        <AppBar />
        <Switch>
          <Route exact path="/postcodes/:postcode">
            <Details />
          </Route>
          <Route path="/">
            <App />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
