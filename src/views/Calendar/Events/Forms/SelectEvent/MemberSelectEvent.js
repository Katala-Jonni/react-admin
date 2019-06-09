import React, { Component, Fragment } from "react";
import propTypes from "prop-types";
import { Field, FieldArray, reduxForm } from "redux-form";
import Picker from "../Inputs/Picker";
import CustomInputView from "../Inputs/CustomInputView";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import Remove from "@material-ui/icons/Remove";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from "material-ui-pickers";
import moment from "moment/moment";

import "moment/locale/ru";
import { connect } from "react-redux";
import { getEvents, getResource, getTotalMasters, getTotalResource } from "../../../../../modules/Calendar";
import CustomSelectView from "../Inputs/CustomSelectView";
import defaultResource from "../../../../../modules/Calendar/defaultResource";

class MemberSelectEvent extends Component {
  state = {
    selectedDate: "",
    differenceDate: false,
    switchDate: false
    // isFirst: true
  };

  handleDateChange = date => {
    const isNewDate = moment(this.state.selectedDate).format("DD.MM.YY") === moment(date).format("DD.MM.YY");
    // console.log(this.state.selectedDate);
    // console.log(date);
    this.setState({
      selectedDate: date,
      differenceDate: !this.state.differenceDate,
      switchDate: !isNewDate
      // isFirst: !isNewDate
    });
  };

  getOptions = () => {
    const { selectedDate } = this.state;
    const date = moment(selectedDate).format("DD.MM.YY");
    // console.log(date);
    const resources = this.props.totalResource[date] ? this.props.totalResource[date] : defaultResource;
    // console.log(resources, "resources");
    return [...resources].map(item => ({
      value: item.resourceTitle,
      label: item.resourceTitle
    }));
  };

  onOpen = (...rest) => {
    // console.log(rest);
    this.setState({
      switchDate: false
    });
  };

  onClose = (...rest) => {
    // console.log(rest);
    this.setState({
      switchDate: true
    });
  };

  render() {
    const { member, index, classes, fields, noButton, switchButton } = this.props;
    const { selectedDate, differenceDate, switchDate } = this.state;
    // console.log(fields);
    const { date, start, end, titleEvent, resourceId } = fields[index];
    // console.log(new Date(date));
    return (
      <Fragment>
        <MuiPickersUtilsProvider utils={MomentUtils} libInstance={moment}>
          <Grid container className={classes.grid} justify="space-between">
            <Field
              name={`${member}.date`}
              component={Picker}
              id={`${member}.date`}
              type={"text"}
              onChange={this.handleDateChange}
              onOpen={this.onOpen}
              onClose={this.onClose}
              valD={new Date(date)}
              // value={selectedDate}
              classes={classes}
              disabled={switchButton}
            />
            <Field
              name={`${member}.start`}
              component={Picker}
              isTime
              id={`${member}.start`}
              type={"text"}
              classes={classes}
              valD={new Date(start)}
              disabled={switchButton}
            />
            <Field
              name={`${member}.end`}
              component={Picker}
              isEnd
              isTime
              id={`${member}.end`}
              type={"text"}
              classes={classes}
              valD={new Date(end)}
              disabled={switchButton}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        {switchDate
          ? <Field
            name={`${member}.resourceId`}
            type="text"
            component={CustomSelectView}
            options={this.getOptions()}
            label="Имя мастера/Солярий"
            // id={`${member}.resourceId`}
            disabled={!selectedDate || switchButton}
            selectedDate={selectedDate}
            differenceDate={differenceDate}
            switchDate={switchDate}
            isFirst={switchDate}
            // className={classes.margin}
            selectEvent
            classes={classes}
            defaultValue={this.getOptions().filter(item => item.value === resourceId)[0]}

            // placeholder='Имя мастера/Солярий'
          />
          : null
        }
        <Field
          name={`${member}.title`}
          component={CustomInputView}
          label="Описание услуги"
          // id={`${member}.title`}
          inputProps={{
            multiline: true,
            rows: 3
          }}
          disabled={switchButton}
          valD={titleEvent}
        />
      </Fragment>
    );
  }
}

MemberSelectEvent.propTypes = {
  classes: propTypes.object.isRequired
};

const mapStateFromProps = state => ({
  resource: getResource(state),
  events: getEvents(state),
  masters: getTotalMasters(state),
  totalResource: getTotalResource(state)
});

// const mapDispatchFromProps = {};

const styleTooltip = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
  // button: {
  //   margin: theme.spacing.unit
  // }
});

export default connect(mapStateFromProps, null)(MemberSelectEvent);
