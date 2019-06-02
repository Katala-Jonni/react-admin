import React, { Component } from "react";
import propTypes from "prop-types";
import { Field, FieldArray, reduxForm } from "redux-form";
import validate from "./validate";
import CustomInputView from "./Inputs/CustomInputView";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import customEventsStyle from "../../../../assets/jss/material-dashboard-react/components/customEventsStyle";
import RenderMembers from "./RenderMembers";

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

  render() {
    const { handleSubmit, pristine, reset, submitting, classes, handleClickClose } = this.props;
    // console.log(this.props);
    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="lastName"
          type="text"
          component={CustomInputView}
          label="Имя*"
          id="lastName"
          placeholder='Наталья'
        />
        <Field
          name="surname"
          type="text"
          component={CustomInputView}
          id="surname"
          label="Отчество*"
          placeholder='Михайловна'
        />
        <Field
          name="phoneNumber"
          type="text"
          labelText="Номер телефона*"
          placeholder='89212287228'
          component={CustomInputView}
          id="phoneNumber"
        />
        <FieldArray
          name="members"
          component={RenderMembers}
          classes={classes}
          addField={this.addField}
          isDisabledBtn={!this.props.valid && !submitting}
        />
        <div>
          <Button
            type="submit"
            color='primary'
            variant="contained"
            disabled={!this.state.isMember || (!this.props.valid && !submitting)}
            className={classes.indent}
          >
            Записать
          </Button>
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
    );
  }
}

export default reduxForm({
  form: "fieldArrays", // a unique identifier for this form
  validate
})(withStyles(customEventsStyle)(FieldArraysForm));
