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

import routes from "routes.js";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/logo_solntseva.png";
// import Calendar from "../views/Calendar/Calendar";
// import { deleteMasters, editEvents, getEvents, getResource, loadResource, selectDay } from "../modules/Calendar";

import { connect } from "react-redux";
import {
  getResource,
  getEvents,
  getTotalResource,
  selectDay,
  deleteMasters,
  editEvents,
  loadResource
} from "../modules/Calendar";
import { endLockOpen, getInTill, getLock, lockOpen } from "../modules/Till";
import { getTotalDay, loadTotalDay } from "../modules/Shop";
import { getLoad, loadApp } from "../modules/Admin";

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
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

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: image,
      color: "blue",
      hasImage: true,
      fixedClasses: "dropdown",
      mobileOpen: false,
      isLock: null
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
    return this.props.location.pathname !== "/admin/maps";
  }

  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log(nextProps);
    // console.log(prevState);
    const { totalDay, endLockOpen } = nextProps;
    const keys = Object.keys(totalDay);
    if (keys.length) {
      endLockOpen();
    }
    return null;
  }


  componentDidMount() {
    const { loadResource, loadTotalDay, loadApp } = this.props;
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    loadResource();
    loadTotalDay();

    // решить проблему с загрузкой кассы
    // мигает как бы
    // надо чтобы один раз прогрузилась
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

  handleClickLock = () => {
    this.props.lockOpen(false);
    // this.props.endLockOpen(false);
  };

  render() {
    const { classes, lock, inTill, isLoad, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        <Dialog
          maxWidth={"lg"}
          fullScreen={lock}
          fullWidth={true}
          open={!!(lock && isLoad)}
          onClose={this.handleClickLock}
          // onClose={inTill.length ? this.handleClickLock : () => ({})}
          scroll="body"
        >
          <DialogTitle>
            Заголовок
          </DialogTitle>
          <DialogContent>
            Контент
          </DialogContent>
          <DialogActions>
            {inTill.length
              ? <Button
                // убрать здесь кнопку и добавить красивый на весь экран инпут
                // внести приход
                // поле только числа
                // ввожу появляется кнопка внести приход
                // после открываем интерфейс приложения
                // массив смен, а ключ это дата
                onClick={this.handleClickLock}
                color={"primary"}
                variant="contained"
              >
                Открыть смену
              </Button>
              : null
            }

          </DialogActions>
        </Dialog>
        {!lock && isLoad
          ? <Fragment>
            <Sidebar
              routes={routes}
              logo={logo}
              image={this.state.image}
              handleDrawerToggle={this.handleDrawerToggle}
              open={this.state.mobileOpen}
              color={this.state.color}
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
                <div className={classes.map}>{switchRoutes}</div>
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
          : <Progress/>
        }
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
  isLoad: getLoad(state)
  // events: getEvents(state),
  // totalResource: getTotalResource(state)
});

const mapDispatchFromProps = { loadResource, lockOpen, endLockOpen, loadTotalDay, loadApp };

export default withStyles(dashboardStyle)(connect(mapStateFromProps, mapDispatchFromProps)(Dashboard));

// export default withStyles(dashboardStyle)(Dashboard);
