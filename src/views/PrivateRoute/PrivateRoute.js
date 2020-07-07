import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getIsAuthorized, startAuth } from "../../modules/Admin";

class PrivateRoute extends Component {

  render() {
    const {
      component: PrivateComponent, isAuthorized, startUrl, path
    } = this.props;
    return (
      <Route
        path={path}
        render={props => (isAuthorized
          ? <PrivateComponent {...props} />
          : <Redirect to={startUrl}/>)}
      />
    );
  }
}

const mapStateFromProps = state => ({
  isAuthorized: getIsAuthorized(state)
});

const mapDispatchFromProps = {
  startAuth
};

export default connect(mapStateFromProps, mapDispatchFromProps)(PrivateRoute);
