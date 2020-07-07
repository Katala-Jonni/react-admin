import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./views/LoginPage";
import MainLayout from "./views/MainLayout";


// core components
import App from "./views/App";

import "assets/css/material-dashboard-react.css?v=1.6.0";

import LoginPage from "./views/LoginPage";
import PrivateRoute from "./views/PrivateRoute";

const hist = createBrowserHistory();


const NewLogin = () => <LoginPage/>;


const AppComponent = (props) => <App {...props}/>;

ReactDOM.render(
  <Provider store={store}>

    <Router history={hist}>
      <Switch>
        <Route path="/auth" component={NewLogin}/>
        <PrivateRoute
          path="/admin"
          component={AppComponent}
          startUrl="/auth"
        />
        {/*<Route path="/admin" component={AppComponent}/>*/}
        {/*<Redirect from="/" to="/admin/dashboard"/>*/}
        <Redirect to="/admin/calendar"/>
      </Switch>
      {/*<MainLayout/>*/}
    </Router>

  </Provider>,
  document.getElementById("root")
);


//
// <BrowserRouter>
//   {/*<Switch>*/}
//   {/*<Route path="/admin" component={AppComponent}/>*/}
//   {/*/!*<Redirect from="/" to="/admin/dashboard"/>*!/*/}
//   {/*<Redirect to="/admin/login"/>*/}
//   {/*</Switch>*/}
//   <MainLayout/>
// </BrowserRouter>
//
