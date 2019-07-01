import React, { Component } from "react";
import propTypes from "prop-types";
import { Field, FieldArray, reduxForm } from "redux-form";
import validate from "./validate";
import CustomInputView from "../../../../components/Inputs/CustomInputView";
import Button from "@material-ui/core/Button";
import RenderMembers from "./RenderMembers";
import { withStyles } from "@material-ui/core/styles";
import customEventsStyle from "../../../../assets/jss/material-dashboard-react/components/customEventsStyle";

class FieldArraysForm extends Component {
  state = {
    isMember: false
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

  handleClickReset = () => {
    this.removeField();
    return this.props.reset();
  };

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      classes,
      handleClickClose,
      valid,
      btnAdd,
      btnClean,
      btnCanceled
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="lastName"
          type="text"
          id="lastName"
          label="Имя*"
          placeholder='Наталья'
          component={CustomInputView}
        />
        <Field
          name="surname"
          type="text"
          id="surname"
          label="Отчество*"
          placeholder='Михайловна'
          component={CustomInputView}
        />
        <Field
          name="phoneNumber"
          type="text"
          id="phoneNumber"
          labelText="Номер телефона*"
          placeholder='89212287228'
          component={CustomInputView}
        />
        <FieldArray
          name="members"
          classes={classes}
          isDisabledBtn={!valid && !submitting}
          addField={this.addField}
          component={RenderMembers}
        />
        <div>
          <Button
            type="submit"
            color='primary'
            variant="contained"
            disabled={!this.state.isMember || (!valid && !submitting)}
            className={classes.indent}
          >
            {btnAdd}
          </Button>
          <Button
            type="button"
            disabled={pristine || submitting}
            className={classes.indent}
            variant="contained"
            onClick={this.handleClickReset}
          >
            {btnClean}
          </Button>
          <Button
            type="button"
            color='primary'
            variant="contained"
            onClick={handleClickClose}
          >
            {btnCanceled}
          </Button>
        </div>
      </form>
    );
  }
}

FieldArraysForm.defaultProps = {
  btnAdd: "Записать",
  btnClean: "Очистить",
  btnCanceled: "Отмена"
};

FieldArraysForm.propTypes = {
  classes: propTypes.object,
  onSubmit: propTypes.func.isRequired,
  handleClickClose: propTypes.func.isRequired,
  reset: propTypes.func.isRequired,
  btnAdd: propTypes.string,
  btnClean: propTypes.string,
  btnCanceled: propTypes.string,
  pristine: propTypes.bool.isRequired,
  submitting: propTypes.bool.isRequired,
  valid: propTypes.bool.isRequired
};

export default reduxForm({
  form: "fieldArrays",
  validate
})(withStyles(customEventsStyle)(FieldArraysForm));
