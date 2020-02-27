import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import { Field, reduxForm } from "redux-form";
import validate from "modules/Sun/validate.js";
import { ticketTypes, payTypes } from "modules/Sun/options.js";
import CustomInputView from "components/Inputs/CustomInputView";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import customEventsStyle from "assets/jss/material-dashboard-react/components/customEventsStyle";
import CustomSelectView from "../../../components/Inputs/CustomSelectView";
import Paper from "@material-ui/core/Paper";
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/GridItem.jsx";
import CustomRadio from "components/Inputs/CustomRadioCheckBox";
import { startVerifyCard } from "../../../modules/Sun";

const style = (theme) => ({
  ...customEventsStyle(theme)
});

const initialState = () => {
  return {
    isMember: false,
    cardNumber: null,
    form: {
      lastName: null,
      name: null,
      surname: null,
      phoneNumber: null,
      cardNumber: null,
      typeCard: null
    },
    isDisabled: false,
    isSubmit: false,
    radioValue: null
  };
};

class AddCard extends Component {
  state = {
    ...initialState()
  };

  static getDerivedStateFromProps(nextProps) {
    const { errorMessage } = nextProps;
    // if (!errorMessage) {
    //   return {
    //     isDisabled: false,
    //     isSubmit: false
    //   };
    // }
    return null;
  }

  addField = () => {
    this.setState({
      isMember: true
    });
  };

  removeField = () => {
    this.setState({
      isMember: false,
      form: { ...this.state.form, ["cardNumber"]: "" },
      radioValue: null
    });
  };

  handleClickReset = () => {
    this.props.reset();
    return this.removeField();
  };

  handleSubmit = evt => {
    this.props.handleSubmit(evt);
    this.handleClickReset();
    this.setState({
      isDisabled: true,
      isSubmit: true
    });
  };

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({
      form: { ...this.state.form, [name]: value },
      isDisabled: false,
      isSubmit: false
    });
    this.props.startVerifyCard({ value });
  };

  handleChangeRadio = data => {
    this.setState({
      radioValue: data
    });
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
      dirty,
      serverMessage,
      errorMessage,
      isVerifyCard,
      verifyMessage,
      isCard
    } = this.props;
    const {
      isMember, form: { cardNumber, typeCard }, isDisabled, isSubmit, radioValue
    } = this.state;

    return (
      // решить проблему с заполненим формы неправильного номера карты
      // не очищать инпуты
      <Fragment>
        <Paper>
          <div className={classes.addCardForm}>
            <form onSubmit={this.handleSubmit}>
              <GridContainer justify="center" spacing={16}>
                <ItemGrid xs={isCard ? 6 : 12} item>
                  <Field
                    name="lastName"
                    type="text"
                    id="lastName"
                    label="Фамилия*"
                    placeholder='Наталья'
                    disabled={isDisabled && isCard}
                    // value={lastName}
                    component={CustomInputView}
                    // onChange={this.handleChange}
                  />
                  <Field
                    name="name"
                    type="text"
                    id="name"
                    label="Имя*"
                    placeholder='Наталья'
                    disabled={isDisabled && isCard}
                    // value={name}
                    component={CustomInputView}
                    // onChange={this.handleChange}
                  />
                  <Field
                    name="surname"
                    type="text"
                    id="surname"
                    label="Отчество*"
                    placeholder='Михайловна'
                    disabled={isDisabled && isCard}
                    // value={surname}
                    component={CustomInputView}
                    // onChange={this.handleChange}
                  />
                  <Field
                    name="phoneNumber"
                    type="text"
                    id="phoneNumber"
                    labelText="Номер телефона*"
                    placeholder='89212287228'
                    disabled={isDisabled && isCard}
                    // value={phoneNumber}
                    component={CustomInputView}
                    // onChange={this.handleChange}
                  />
                  <Field
                    name="cardNumber"
                    type="text"
                    id="cardNumber"
                    labelText="Номер абонемента"
                    placeholder='1234567890'
                    disabled={isDisabled && isCard}
                    value={cardNumber}
                    // error={isVerifyCard}
                    error={!isCard}
                    helpText={!pristine && isCard ? undefined : verifyMessage}
                    // helpText={!pristine && isVerifyCard ? verifyMessage : verifyMessage}
                    component={CustomInputView}
                    onChange={this.handleChange}
                  />
                  {isCard
                    ? <Field
                      name='typePay'
                      id='typeCard'
                      type="radio"
                      label='Выберите тип оплаты*'
                      options={payTypes}
                      isVerifyCard={isCard}
                      disabled={isDisabled && isCard}
                      component={CustomRadio}
                      radioValue={radioValue}
                      onChange={this.handleChangeRadio}
                      isSubmit={isSubmit}
                    />
                    : null
                  }
                </ItemGrid>
                {
                  // cardNumber && cardNumber.length === 11
                  // !isVerifyCard
                  isCard
                    ? <ItemGrid xs={12} sm={6} item>
                      <Field
                        name='typeCard'
                        type="text"
                        classes={classes}
                        id='typeCard'
                        label='Выберите тип абонемента'
                        options={ticketTypes}
                        menuIsOpen
                        height={200}
                        disabled={isDisabled && isCard}
                        // value={typeCard}
                        component={CustomSelectView}
                        // onChange={this.handleChangeSelect}
                      />
                    </ItemGrid>
                    : null
                }
              </GridContainer>
              <div>
                <Button
                  type="submit"
                  color='primary'
                  variant="contained"
                  disabled={isMember || (!valid && !submitting) || !isCard}
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
              </div>
            </form>
          </div>
        </Paper>
      </Fragment>
    );
  }
}

AddCard.defaultProps = {
  btnClean: "Очистить",
  btnAdd: "Отправить"
};

AddCard.propTypes = {
  classes: PropTypes.object
};

export default reduxForm({
  form: "addCard",
  validate
})(withStyles(style)(AddCard));
