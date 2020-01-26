import React, { Component, Fragment } from "react";
import propTypes from "prop-types";
import moment from "moment";
import { Field, reduxForm } from "redux-form";
import validate from "../validate";
import CustomInputView from "../../../../../components/Inputs/CustomInputView";
import Button from "@material-ui/core/Button";
import MemberSelectEvent from "./MemberSelectEvent";
import SweetAlert from "react-bootstrap-sweetalert";
import { withStyles } from "@material-ui/core/styles";
import customEventsStyle from "../../../../../assets/jss/material-dashboard-react/components/customEventsStyle";

class SelectEventForm extends Component {
  state = {
    switchButton: !this.props.isNewEvent && true,
    alert: null,
    isConfirm: false
  };

  successDelete = () => {
    this.props.deleteEvents(this.props.fields._id);
    this.setState({
      alert: (
        <SweetAlert
          success
          onConfirm={() => this.hideAlert(true)}
          style={{ display: "block", marginTop: "-100px" }}
          title={this.props.successAlertTitle}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
        >
          {this.props.successAlertMessage}
        </SweetAlert>
      )
    });
  };

  hideAlert = (bool) => {
    bool && this.props.handleClickClose();
    this.setState({
      alert: null,
      isConfirm: false
    });
  };

  cancelDelete = () => {
    this.hideAlert();
  };

  handleClickDelete = () => {
    this.setState({
      alert: (
        <SweetAlert
          warning
          style={{ display: "block", marginTop: "-100px" }}
          title={this.props.deleteAlertTitle}
          onConfirm={() => this.successDelete()}
          onCancel={() => this.cancelDelete()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
          cancelBtnCssClass={
            this.props.classes.button + " " + this.props.classes.danger
          }
          confirmBtnText={this.props.confirmBtnText}
          cancelBtnText={this.props.cancelBtnText}
          showCancel
        >
          {this.props.deleteAlertMessage}
        </SweetAlert>
      ),
      isConfirm: true
    });
  };

  handleClickChange = () => {
    this.setState({
      switchButton: false
    });
    this.props.switchButton(false);
  };

  getIsEqualValues = () => {
    const { formReduxValues, fields } = this.props;
    let formValues;
    if (formReduxValues && formReduxValues.members) {
      const { members, ...res } = formReduxValues;
      formValues = { ...members[0], ...res };
      const keys = Object.keys(formValues);
      return keys.every(key => {
        if (key === "date" || key === "start" || key === "end") {
          return (moment(fields[key]).isSame(formValues[key]));
        }
        if (key === "title") {
          return formValues[key].trim().toLowerCase() === fields["titleEvent"].trim().toLowerCase();
        }
        if (key === "resourceId") {
          const resourceIdValue = formValues[key] && formValues[key].value ? formValues[key].value : formValues[key];
          return resourceIdValue && resourceIdValue.trim().toLowerCase() === fields[key].trim().toLowerCase();
        }
        if (key === "id") {
          return formValues[`_${key}`].trim().toLowerCase() === fields[`_${key}`].trim().toLowerCase();
        }
        return formValues[key].trim().toLowerCase() === fields[key].trim().toLowerCase();
      });
    }
    return null;
  };

  getDifferenceTime = time => {
    const a = moment(time);
    const b = moment();
    if (a.diff(b) < 0) {
      return null;
    }
    return true;
  };

  render() {
    const {
      handleSubmit,
      classes,
      handleClickClose,
      fields,
      isButton,
      isNewEvent,
      valid,
      btnSaveText,
      btnRemoveText,
      btnEditText,
      btnCanсeledText
    } = this.props;

    const { switchButton } = this.state;
    const { lastName, surname, phoneNumber, start, _id } = fields;
    return (
      <Fragment>
        {this.state.alert}
        <form onSubmit={handleSubmit}>
          <Field
            name="lastName"
            type="text"
            label="Имя*"
            id="lastName"
            placeholder='Наталья'
            disabled={switchButton}
            initialSelectValue={lastName}
            component={CustomInputView}
          />
          <Field
            name="surname"
            type="text"
            id="surname"
            label="Отчество*"
            placeholder='Михайловна'
            disabled={switchButton}
            initialSelectValue={surname}
            component={CustomInputView}
          />
          <Field
            name="phoneNumber"
            type="text"
            labelText="Номер телефона*"
            placeholder='89212287228'
            id="phoneNumber"
            disabled={switchButton}
            initialSelectValue={phoneNumber}
            component={CustomInputView}
          />
          <MemberSelectEvent
            noButton
            member={"members[0]"}
            index={0}
            classes={classes}
            fields={[fields]}
            switchButton={switchButton}
          />

          <Field
            name="_id"
            type="hidden"
            id="_id"
            // disabled={switchButton}
            initialSelectValue={_id}
            component={CustomInputView}
          />


          <div>
            {(!isButton || isNewEvent) && !this.getIsEqualValues()
              ? <Button
                type="submit"
                color='secondary'
                variant="contained"
                disabled={!valid}
                className={classes.indent}
              >
                {btnSaveText}
              </Button>
              : null
            }
            {isButton && !isNewEvent && this.getDifferenceTime(start) && !this.state.isConfirm
              ? <Button
                type="button"
                color='primary'
                variant="contained"
                className={classes.indent}
                onClick={this.handleClickChange}
              >
                {btnEditText}
              </Button>
              : null
            }
            {isButton && !isNewEvent && this.getDifferenceTime(start) && !this.state.isConfirm
              ? <Button
                type="button"
                color='default'
                variant="contained"
                className={classes.indent}
                onClick={this.handleClickDelete}
              >
                {btnRemoveText}
              </Button>
              : null
            }

            <Button
              type="button"
              color='primary'
              variant="contained"
              onClick={handleClickClose}
            >
              {btnCanсeledText}
            </Button>
          </div>
        </form>
      </Fragment>
    );
  }
}

SelectEventForm.defaultProps = {
  fields: {},
  btnRemoveText: "Удалить",
  btnEditText: "Изменить",
  btnSaveText: "Сохранить",
  btnCanсeledText: "Отмена",
  deleteAlertTitle: "Удалить запись?",
  deleteAlertMessage: "Запись удалится полностью с календаря!",
  successAlertTitle: "Запись удалена!",
  successAlertMessage: "Запись успешно удалена!",
  confirmBtnText: "Да, удалить запись!",
  cancelBtnText: "Нет"
};

SelectEventForm.propTypes = {
  isButton: propTypes.bool,
  isNewEvent: propTypes.bool,
  isIdentical: propTypes.bool,
  valid: propTypes.bool,
  fields: propTypes.object,
  formReduxValues: propTypes.object.isRequired,
  classes: propTypes.object.isRequired,
  onSubmit: propTypes.func.isRequired,
  switchButton: propTypes.func.isRequired,
  deleteEvents: propTypes.func.isRequired,
  handleClickClose: propTypes.func.isRequired,
  handleClickChange: propTypes.func,
  btnRemoveText: propTypes.string,
  btnEditText: propTypes.string,
  btnSaveText: propTypes.string,
  btnCanсeledText: propTypes.string,
  deleteAlertTitle: propTypes.string,
  deleteAlertMessage: propTypes.string,
  successAlertTitle: propTypes.string,
  successAlertMessage: propTypes.string,
  confirmBtnText: propTypes.string,
  cancelBtnText: propTypes.string
};

export default reduxForm({
  form: "fieldArraysSelectEvents",
  validate
})(withStyles(customEventsStyle)(SelectEventForm));
