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
import { changeCalendar, getIsDay, getResource } from "../../modules/Calendar";
import AddEvents from "./Events/index";

class CalendarToolBar extends Component {
  isPrev = () => {
    if (this.props.view === "month") {
      return moment(this.props.date).month() <= moment().month();
    } else {
      return +moment(this.props.date).startOf("day") <= +moment().startOf("day");
    }
  };
  onClickNextMonth = () => this.props.onNavigate("NEXT", moment(this.props.date).toDate());
  onClickBackMonth = () => {
    return !this.isPrev() && this.props.onNavigate("PREV", moment(this.props.date).toDate());
  };
  onClickCurrentMonth = () => this.props.onNavigate("DATE", moment().toDate());
  onClickCurrentDate = () => this.props.onView("day");
  onClickMonth = () => {
    if (this.props.view === "month") {
      return;
    }
    if (this.isPrev()) {
      this.props.onView("month");
      return this.props.onNavigate("DATE", moment().toDate());
    }
    return this.props.onView("month");
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

const mapDispatchFromProps = ({ changeCalendar });

export default connect(mapStateFromProps, mapDispatchFromProps)(CalendarToolBar);
