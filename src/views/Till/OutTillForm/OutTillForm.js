import React, { Component } from "react";
import propTypes from "prop-types";
import { Field, FieldArray, reduxForm } from "redux-form";
import validate from "./validate";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import customEventsStyle from "assets/jss/material-dashboard-react/components/customEventsStyle";
import InputNumber from "../../../components/InputNumber/InputNumber";
import Select from "react-select";

class OutTillForm extends Component {
  state = {
    isMember: false
  };

  handleChangeCountCart = value => {
    this.setState({
      countCart: !value ? null : value
    });
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
          name="outTillFormInputNumber"
          type="text"
          id="outTillFormInputNumber"
          placeholder='Введите число'
          // value={countCart}
          onChange={this.handleChangeCountCart}
          label="Введите число"
          autoFocus
          component={InputNumber}
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
        </div>
      </form>
    );
  }
}

OutTillForm.defaultProps = {
  btnAdd: "Записать",
  btnClean: "Очистить",
  btnCanceled: "Отмена"
};

OutTillForm.propTypes = {
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
  form: "outTillForm"
  // validate
})(withStyles(customEventsStyle)(OutTillForm));

