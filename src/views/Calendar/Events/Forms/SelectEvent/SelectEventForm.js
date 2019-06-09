import React, { Component, Fragment } from "react";
import propTypes from "prop-types";
import { Field, FieldArray, reduxForm } from "redux-form";
import validate from "../validate";
import CustomInputView from "../Inputs/CustomInputView";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import customEventsStyle from "../../../../../assets/jss/material-dashboard-react/components/customEventsStyle";
import RenderMembers from "../RenderMembers";
import Member from "../Member";
import MemberSelectEvent from "./MemberSelectEvent";

class SelectEventForm extends Component {
  state = {
    isMember: false,
    deleteMessage: false,
    switchButton: true
  };

  addField = () => {
    this.setState({
      isMember: true
    });
  };

  removeField = () => {
    this.setState({
      isMember: false
    });
  };

  handleClickDelete = () => {
    console.log("Delete");
    this.setState({
      deleteMessage: true
    });
  };

  getLastName = () => "Наталья";

  onChange = value => {
    console.log(value);
  };

  handleClickChange = () => {
    console.log("handleClickChange");
    this.setState({
      switchButton: false
    });
  };

  render() {
    const { handleSubmit, pristine, reset, submitting, classes, handleClickClose, fields } = this.props;
    const { switchButton } = this.state;
    // console.log(fields, "SelectEventForm");
    const { lastName, surname, phoneNumber, ...rest } = fields;

    return (
      <Fragment>
        <form onSubmit={handleSubmit}>
          <Field
            name="lastName"
            type="text"
            component={CustomInputView}
            label="Имя*"
            id="lastName"
            placeholder='Наталья'
            disabled={switchButton}
            // нужно решить проблему с value
            valD={lastName}
            // initialValues={lastName}
            // defaultValue={lastName}
            // normalize={this.getLastName}
            // disabled
            // value={'Наталья'}
            // readOnly
          />
          <Field
            name="surname"
            type="text"
            component={CustomInputView}
            id="surname"
            label="Отчество*"
            placeholder='Михайловна'
            valD={surname}
            disabled={switchButton}
          />
          <Field
            name="phoneNumber"
            type="text"
            labelText="Номер телефона*"
            placeholder='89212287228'
            component={CustomInputView}
            id="phoneNumber"
            valD={phoneNumber}
            disabled={switchButton}
          />
          <MemberSelectEvent
            member={"member[0]"}
            index={0}
            classes={classes}
            fields={[fields]}
            switchButton={switchButton}
            noButton
          />
          <div>
            <Button
              type={switchButton ? "button" : "submit"}
              color='primary'
              variant="contained"
              // disabled={!switchButton && (!this.state.isMember || (!this.props.valid && !submitting))}
              className={classes.indent}
              onClick={this.handleClickChange}
            >
              {switchButton ? "Изменить" : "Записать"}

            </Button>
            <Button
              type="button"
              color='primary'
              onClick={this.handleClickDelete}
              variant="contained"
              className={classes.indent}
            >
              Удалить
            </Button>
            <Button
              type="button"
              color='primary'
              onClick={handleClickClose}
              variant="contained"
            >
              Отмена
            </Button>
          </div>
        </form>
      </Fragment>
    );
  }
}


SelectEventForm.defaultProps = {
  fields: []
};

export default reduxForm({
  form: "fieldArraysSelectEvents", // a unique identifier for this form
  // validate
  // initialValues: { lastName: 'Наталья', max: '10' },
})(withStyles(customEventsStyle)(SelectEventForm));


/*

   <Button
              type="button"
              disabled={pristine || submitting}
              onClick={() => {
                this.removeField();
                return reset();
              }}
              variant="contained"
              className={classes.indent}
            >
              Очистить
            </Button>

   <FieldArray
            name="members"
            component={RenderMembers}
            classes={classes}
            addField={this.addField}
            isDisabledBtn={!this.props.valid && !submitting}
            fields={[fields]}
            noButton
          />


 */
