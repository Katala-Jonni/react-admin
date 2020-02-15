import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment/min/moment-with-locales";
import classNames from "classnames";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import Today from "@material-ui/icons/Today";
import Month from "@material-ui/icons/ViewWeek";
import CurrentCalendar from "@material-ui/icons/CalendarToday";
import Typography from "@material-ui/core/Typography";
import AddMaster from "./Masters";
import { changeCalendar, getIsDay, getResource, initialResource, selectViewEvents } from "../../modules/Calendar";
import AddEvents from "./Events/index";
import { loadResource } from "../../modules/Calendar/actions";

class CalendarToolBar extends Component {
  isPrev = () => {
    if (this.props.view === "month") {
      return moment(this.props.date).month() <= moment().month();
    } else {
      return +moment(this.props.date).startOf("day") <= +moment().startOf("day");
    }
  };
  onClickNextMonth = () => {
    const { onNavigate, initialResource, loadResource, date } = this.props;
    console.log("onClickNextMonth");
    onNavigate("NEXT", moment(date).toDate());
    initialResource();
    return loadResource();
  };
  onClickBackMonth = () => {
    const { onNavigate, initialResource, loadResource, date } = this.props;
    console.log("onClickBackMonth");
    !this.isPrev() && onNavigate("PREV", moment(date).toDate());
    initialResource();
    return loadResource();
  };
  onClickCurrentMonth = () => {
    const { onNavigate, initialResource, loadResource } = this.props;
    console.log("onClickCurrentMonth");
    onNavigate("DATE", moment().toDate());
    initialResource();
    return loadResource();
  };
  onClickCurrentDate = () => {
    const { onView, onNavigate, initialResource, loadResource, selectViewEvents, date } = this.props;
    console.log("onClickCurrentDate");
    onNavigate("DATE", moment().startOf("day").toDate());
    onView("day");
    initialResource();
    loadResource();
    return selectViewEvents(moment().startOf("day").toDate());
  };
  onClickMonth = () => {
    const { onNavigate, onView, initialResource, loadResource, view } = this.props;
    console.log("onClickMonth");
    initialResource();
    loadResource();
    if (view === "month") {
      return;
    }
    if (this.isPrev()) {
      onView("month");
      return onNavigate("DATE", moment().toDate());
    }
    return onView("month");
  };

  render() {
    const {
      classes,
      date,
      label,
      view,
      resource
    } = this.props;

    const mapView = {
      month: "месяц",
      day: "день"
    };

    const isAdd =
      view === "day" &&
      (moment(date) >= moment() || moment(date).date() === moment().date());
    return (
      <div className={classes.container}>
        <div>
          {isAdd ? <AddEvents/> : null}
          {isAdd ? <AddMaster date={date} classes={classes}/> : null}
          {isAdd && resource.length >= 2 ? <AddMaster isNew date={date} classes={classes}/> : null}
          <Tooltip title={`Текущий ${mapView[view] || ""}`}>
            <Fab
              variant="extended"
              color="primary"
              className={classes.button}
              onClick={this.onClickCurrentMonth}
            >
              <CurrentCalendar/>
            </Fab>
          </Tooltip>
          <Tooltip title={`Предыдущий ${mapView[view] || ""}`}>
            <Fab
              variant="extended"
              onClick={this.onClickBackMonth}
              color={this.isPrev() ? "default" : "primary"}
            >
              <ArrowForwardIos
                color={this.isPrev() ? "disabled" : "inherit"}
                className={classes.rotate}
              />
            </Fab>
          </Tooltip>
          <Tooltip title={`Следующий ${mapView[view] || ""}`}>
            <Fab
              color="primary"
              variant="extended"
              className={classNames(classes.button)}
              onClick={this.onClickNextMonth}
            >
              <ArrowForwardIos/>
            </Fab>
          </Tooltip>
        </div>
        <Typography
          align={"center"}
          variant={view === "day" ? "title" : "h6"}
          color="inherit"
          className={classNames(classes.flexRight, classes.button)}
        >
          {view === "day" ? moment(date).format("dddd LL") : label}
        </Typography>
        <Tooltip title="Месяц">
          <Fab
            variant="extended"
            color="primary"
            onClick={this.onClickMonth}
            className={classNames(classes.button, classes.flexRight)}
          >
            <Month fontSize="large"/>
          </Fab>
        </Tooltip>
        {!isAdd ? <Tooltip title="День">
            <Fab
              variant="extended"
              color="primary"
              className={classNames(classes.button)}
              onClick={this.onClickCurrentDate}
            >
              <Today fontSize="large"/>
            </Fab>
          </Tooltip>
          : null
        }
      </div>
    );
  }
}

CalendarToolBar.propTypes = {
  classes: PropTypes.object.isRequired,
  onNavigate: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
  date: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired,
  resource: PropTypes.array.isRequired
};

const mapStateFromProps = state => ({
  resource: getResource(state),
  isDay: getIsDay(state)
});

const mapDispatchFromProps = ({ changeCalendar, loadResource, initialResource, selectViewEvents });

export default connect(mapStateFromProps, mapDispatchFromProps)(CalendarToolBar);
