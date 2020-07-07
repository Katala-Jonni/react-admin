import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginPage from "../../views/LoginPage";

// core components
import App from "../../views/App";
import PrivateRoute from "../PrivateRoute";

const AppComponent = (props) => <App {...props}/>;
const NewLogin = () => <LoginPage/>;


class Layout extends Component {
  render() {
    const { isAuthorized } = this.props;
    return (
      <>
        <Switch>
          {/*<PrivateRoute*/}
          {/*path="/"*/}
          {/*component={Comp}*/}
          {/*startUrl="/login"*/}
          {/*isAuthorized={isAuthorized}*/}
          {/*/>*/}
          <Route path="/admin" component={AppComponent}/>
          <Route path="/login-page" component={NewLogin}/>
          {/*<Redirect from="/" to="/admin/dashboard"/>*/}
          <Redirect to="/admin/calendar"/>
        </Switch>
      </>
    );
  }
}

export default Layout;
