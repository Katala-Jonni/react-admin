import React, { Component, Fragment } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import "date-fns";
import moment from "moment/moment";
import "moment/locale/ru";
import { Field } from "redux-form";
import CustomInputView from "../../../../../components/Inputs/CustomInputView";
import Grid from "@material-ui/core/Grid";
import defaultResource from "../../../../../modules/Calendar/defaultResource";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import Picker from "../../../../../components/Inputs/Picker";
import MomentUtils from "@date-io/moment";
import CustomSelectView from "../../../../../components/Inputs/CustomSelectView";
import { getTotalResource } from "../../../../../modules/Calendar";


class MemberSelectEvent extends Component {
  state = {
    selectedDate: "",
    differenceDate: false,
    switchDate: false,
    isFirst: true
  };

  handleDateChange = date => {
    const isNewDate = moment(this.state.selectedDate).format("DD.MM.YY") === moment(date).format("DD.MM.YY");
    this.setState({
      selectedDate: date,
      differenceDate: !this.state.differenceDate,
      switchDate: !isNewDate
    });
  };

  getOptions = () => {
    const { selectedDate } = this.state;
    const date = moment(selectedDate).format("DD.MM.YY");
    const resources = this.props.totalResource[date] ? this.props.totalResource[date] : defaultResource;
    return [...resources].map(item => ({
      value: item.resourceTitle,
      label: item.resourceTitle
    }));
  };

  onOpen = () => {
    this.setState({
      switchDate: false,
      isFirst: false
    });
  };

  onClose = () => {
    this.setState({
      switchDate: true,
      isFirst: false
    });
  };

  getDefaultSelectOption = () => {
    const { fields, index } = this.props;
    const { resourceId } = fields[index];
    return this.getOptions().find(item => item.value === resourceId);
  };

  render() {
    const { member, index, classes, fields, switchButton } = this.props;
    const { selectedDate, differenceDate, switchDate, isFirst } = this.state;
    const { date, start, end, titleEvent } = fields[index];
    return (
      <Fragment>
        <MuiPickersUtilsProvider utils={MomentUtils} libInstance={moment}>
          <Grid container className={classes.grid} justify="space-between">
            <Field
              name={`${member}.date`}
              id={`${member}.date`}
              type="text"
              valD={new Date(date)}
              classes={classes}
              disabled={switchButton}
              onChange={this.handleDateChange}
              onOpen={this.onOpen}
              onClose={this.onClose}
              component={Picker}
            />
            <Field
              isTime
              name={`${member}.start`}
              id={`${member}.start`}
              type="text"
              valD={new Date(start)}
              classes={classes}
              disabled={switchButton}
              component={Picker}
            />
            <Field
              isTime
              isEnd
              name={`${member}.end`}
              id={`${member}.end`}
              type="text"
              valD={new Date(end)}
              classes={classes}
              disabled={switchButton}
              component={Picker}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        {switchDate
          ? <Field
            selectEvent
            name={`${member}.resourceId`}
            id={`${member}.resourceId`}
            type="text"
            label="Имя мастера/Солярий"
            classes={classes}
            disabled={!selectedDate || switchButton}
            selectedDate={selectedDate}
            differenceDate={differenceDate}
            switchDate={switchDate}
            isFirst={switchDate}
            options={this.getOptions()}
            defaultValue={(this.getDefaultSelectOption() && isFirst) ? this.getDefaultSelectOption() : null}
            component={CustomSelectView}
          />
          : null
        }
        <Field
          name={`${member}.title`}
          id={`${member}.title`}
          label="Описание услуги"
          initialSelectValue={titleEvent}
          inputProps={{
            multiline: true,
            rows: 3,
            disabled: switchButton
          }}
          component={CustomInputView}
        />
      </Fragment>
    );
  }
}

MemberSelectEvent.propTypes = {
  classes: propTypes.object.isRequired,
  noButton: propTypes.bool,
  switchButton: propTypes.bool,
  member: propTypes.string.isRequired,
  index: propTypes.number.isRequired,
  fields: propTypes.array.isRequired,
  totalResource: propTypes.object.isRequired
};

const mapStateFromProps = state => ({
  totalResource: getTotalResource(state)
});

export default connect(mapStateFromProps, null)(MemberSelectEvent);
