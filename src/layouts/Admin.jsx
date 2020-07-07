/* eslint-disable */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
// core components
import Navbar from "components/Navbars/Navbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";
import Progress from "components/Progress/Progress";
import LinearProgress from "components/Progress/LinearProgress";
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/GridItem.jsx";
import ActonTill from "../views/Till/ActonTill";
import InfoPaper from "components/Typography/Info.jsx";

import { dashboardRoutes as routes, adminRoutes } from "routes.js";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/logo_solntseva.png";
// import Calendar from "../views/Calendar/Calendar";
// import { deleteMasters, editEvents, getEvents, getResource, loadResource, selectDay } from "../modules/Calendar";

import { connect } from "react-redux";
import { loadResource } from "../modules/Calendar";
import {
  endLockOpen,
  getInTill,
  getLock,
  lockOpen,
  loadTill,
  addInTill,
  openTill,
  loadStateTill,
  getstateTill,
  getAdministrators
} from "../modules/Till";
import { getTotalDay, loadTotalDay } from "../modules/Shop";
import { getDay, getIsAuthorized, getLoad, getRoles, loadApp } from "../modules/Admin";
import administrators from "../modules/Till/administrators";
import PrivateRoute from "../views/PrivateRoute";

import LoginPage from "../views/LoginPage";
import { Storage, storageKey } from "../storage";

const storage = Storage.getStorage(storageKey.authKey);

const newLogin = () => <LoginPage/>;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      // console.log(prop.component);
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
    })}
  </Switch>
);

// const switchRoutesLogin = (
//   <Switch>
//     <PrivateRoute
//       path="/"
//       component={newLogin}
//       startUrl="/login"
//       isAuthorized={isAuthorized}
//     />
//     {/*<Redirect*/}
//     {/*path='/admin/login-page'*/}
//     {/*component={newLogin}*/}
//     {/*/>*/}
//   </Switch>
// );

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: image,
      color: "blue",
      hasImage: true,
      fixedClasses: "dropdown",
      mobileOpen: false,
      isLock: null,
      isClick: false
    };
  }

  handleImageClick = image => {
    this.setState({ image: image });
  };
  handleColorClick = color => {
    this.setState({ color: color });
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  getRoute() {
    // return this.props.location.pathname !== "/admin/maps";
    // console.log(this.props.isAuthorized);
    return this.props.isAuthorized;
  }

  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { totalDay, endLockOpen, lock } = nextProps;

    const keys = Object.keys(totalDay);
    if (keys.length) {
      endLockOpen();
    }
    if (!lock) {
      return {
        isClick: false
      };
    }
    return null;
  }

  componentDidMount() {
    const { loadResource, loadTotalDay, loadStateTill } = this.props;
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    loadResource();
    loadTotalDay();
    loadStateTill();
    window.addEventListener("resize", this.resizeFunction);
  }

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }

  isValidData = data => {
    if (!data || typeof data !== "object") return false;
    const keys = Object.keys(data);
    return !!keys.length;
  };

  handleClickAddInTill = data => {
    if (!this.isValidData(data)) return;
    return this.props.loadTill(data);
  };

  changeClick = () => {
    this.setState({
      // isClick: true
    });
  };

  getRoutes = () => {
    return routes.filter((elem) => {
      return this.props.roles.includes(elem.access);
    });
  };

  render() {
    const { classes, lock, isLoad, viewTill, administrators, isDay, ...rest } = this.props;
    // console.log(!isDay);
    return (
      <div className={classes.wrapper}>
        <Fragment>
          <Sidebar
            //!lock && isLoad && viewTill
            routes={this.getRoutes()}
            logo={logo}
            image={this.state.image}
            handleDrawerToggle={this.handleDrawerToggle}
            open={this.state.mobileOpen}
            color={this.state.color}
            adminRoutes={adminRoutes}
            {...rest}
          />
          <div className={classes.mainPanel} ref="mainPanel">
            <Navbar
              routes={routes}
              handleDrawerToggle={this.handleDrawerToggle}
              {...rest}
            />
            {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
            {this.getRoute() ? (
              <div className={classes.content}>
                <div className={classes.container}>{switchRoutes}</div>
              </div>
            ) : (
              <div className={classes.content}>
                <Switch>
                  {/*<PrivateRoute*/}
                  {/*path="/"*/}
                  {/*component={newLogin}*/}
                  {/*startUrl="/admin/login-page"*/}
                  {/*isAuthorized={this.props.isAuthorized}*/}
                  {/*/>*/}
                  <Redirect to={"/auth"}/>
                  {/*<Redirect*/}
                  {/*path='/admin/login-page'*/}
                  {/*component={newLogin}*/}
                  {/*/>*/}
                </Switch>
              </div>
            )}
            {/*{this.getRoute() ? <Footer /> : null}*/}
            <FixedPlugin
              handleImageClick={this.handleImageClick}
              handleColorClick={this.handleColorClick}
              bgColor={this.state["color"]}
              bgImage={this.state["image"]}
              handleFixedClick={this.handleFixedClick}
              fixedClasses={this.state.fixedClasses}
            />
          </div>
        </Fragment>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateFromProps = state => ({
  lock: getLock(state),
  inTill: getInTill(state),
  totalDay: getTotalDay(state),
  isLoad: getLoad(state),
  viewTill: getstateTill(state),
  administrators: getAdministrators(state),
  isDay: getDay(state),
  isAuthorized: getIsAuthorized(state),
  roles: getRoles(state)
  // events: getEvents(state),
  // totalResource: getTotalResource(state)
});

const mapDispatchFromProps = {
  loadResource,
  lockOpen,
  endLockOpen,
  loadTotalDay,
  loadApp,
  addInTill,
  loadTill,
  openTill,
  loadStateTill
};

export default withStyles(dashboardStyle)(connect(mapStateFromProps, mapDispatchFromProps)(Dashboard));

// export default withStyles(dashboardStyle)(Dashboard);
