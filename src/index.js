import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

// core components
import App from "./views/App";

import "assets/css/material-dashboard-react.css?v=1.6.0";

const hist = createBrowserHistory();


const AppComponent = (props) => <App {...props}/>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/admin" component={AppComponent}/>
        <Redirect from="/" to="/admin/dashboard"/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
