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
import moment from "moment";

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
    this.setState({
      switchButton: false
    });
    this.props.switchButton(false);
  };

  render() {
    const { handleSubmit, pristine, reset, submitting, classes, handleClickClose, fields, isButton, isIdentical, formReduxValues } = this.props;
    const { switchButton } = this.state;
    const { lastName, surname, phoneNumber, titleEvent, ...rest } = fields;
    let formValues;
    let isEqualValues;
    if (formReduxValues && formReduxValues.members) {
      const { members, ...res } = formReduxValues;
      formValues = { ...members[0], ...res };
      const keys = Object.keys(formValues);
      isEqualValues = keys.every(key => {
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
        return formValues[key].trim().toLowerCase() === fields[key].trim().toLowerCase();
      });
      console.log(isEqualValues);
    }
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
            initialSelectValue={lastName}
            // нужно решить проблему с value
            // valD={lastName}
            // inputProps={{
            //   defaultValue: lastName
            //   // disabled: switchButton
            // }}
            // value={lastName}
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
            // valD={surname}
            disabled={switchButton}
            initialSelectValue={surname}
            // inputProps={{
            //   defaultValue: surname
            //   // disabled: switchButton
            // }}
          />
          <Field
            name="phoneNumber"
            type="text"
            labelText="Номер телефона*"
            placeholder='89212287228'
            component={CustomInputView}
            id="phoneNumber"
            // valD={phoneNumber}
            // valD
            // inputProps={{
            //   defaultValue: phoneNumber
            //   // disabled: switchButton
            // }}
            disabled={switchButton}
            initialSelectValue={phoneNumber}
          />
          <MemberSelectEvent
            member={"members[0]"}
            index={0}
            classes={classes}
            fields={[fields]}
            switchButton={switchButton}
            noButton
          />

          <div>
            {!isButton && !isEqualValues
              ? <Button
                type="submit"
                color='secondary'
                variant="contained"
                disabled={!this.props.valid}
                // disabled={!switchButton && (!this.state.isMember || (!this.props.valid && !submitting))}
                className={classes.indent}
              >
                Сохранить
              </Button>
              : null
            }
            {isButton
              ? <Button
                type="button"
                color='primary'
                variant="contained"
                // disabled={!switchButton && (!this.state.isMember || (!this.props.valid && !submitting))}
                className={classes.indent}
                onClick={this.handleClickChange}
              >
                Изменить
              </Button>
              : null
            }
            {isButton
              ? <Button
                type="button"
                color='primary'
                onClick={this.handleClickDelete}
                variant="contained"
                className={classes.indent}
              >
                Удалить
              </Button>
              : null
            }

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
  validate
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


          <Field
            name="title"
            component={CustomInputView}
            label="Описание услуги"
            // id={`${member}.title`}
            inputProps={{
              multiline: true,
              rows: 3,
              disabled: switchButton
            }}
            initialSelectValue={titleEvent}
            // disabled={switchButton}
            // valD={titleEvent}
          />


 */
