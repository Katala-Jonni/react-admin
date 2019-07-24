import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import { Field, FieldArray, reduxForm } from "redux-form";
import validate from "modules/Sun/validate.js";
import CustomInputView from "components/Inputs/CustomInputView";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import customEventsStyle from "assets/jss/material-dashboard-react/components/customEventsStyle";
import CustomSelectView from "../../../components/Inputs/CustomSelectView";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import Typography from "@material-ui/core/Typography";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import AddAlert from "@material-ui/icons/AddAlert";
import { startSearchPhoneNumber, startVerifyCard } from "../../../modules/Sun";

const SearchField = props => {
  const { input, classes, name, label, id, placeholder } = props;

  return (
    <TextField
      id={id}
      label={label}
      name={name}
      placeholder={placeholder}
      type="search"
      fullWidth
      className={classes.textField}
      {...input}
    />
  );
};

class EditCard extends Component {
  state = {
    form: {
      searchNumber: null,
      phoneNumber: null
    }
  };

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   const { errorMessage } = nextProps;
  //   if (!errorMessage) {
  //     return {
  //       isDisabled: false
  //     };
  //   }
  //   return null;
  // }

  componentDidMount() {
    const { searchNumber } = this.state;
    !searchNumber && this.props.startSearchNumber(searchNumber);
    console.log("test");
  }

  removeField = () => {
    this.setState({
      form: {}
    });
  };

  handleClickReset = () => {
    this.props.reset();
    return this.removeField();
  };

  handleSubmit = evt => {
    evt.preventDefault();
    console.log(evt);
    const { form: { searchNumber } } = this.state;
    this.props.startSearchNumber(searchNumber);
  };

  handleChange = (evt, callBack) => {
    const { name, value } = evt.target;
    this.setState({
      form: { ...this.state.form, [name]: value }
    });
    callBack && callBack(value);
  };

  getVerifyNumber = number => {
    if (!number) return false;
    if (!Number.isInteger(+number)) return false;
    const { card } = this.props;
    if (card && card.phoneNumber) {
      return card.phoneNumber === number;
    }
    return false;
  };

  getTableData = () => {
    const { data } = this.props;
    if (data) {
      return data.map((item, idx) => {
        const { title, count, price, totalCount } = item;
        return [
          idx + 1,
          title,
          price,
          count,
          totalCount
        ];
      });
    }
    return [];
  };

  render() {
    const {
      card,
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
      isVerifyCardNumber,
      isVerifyPhoneNumber,
      verifyCardMessage,
      verifyPhoneMessage,
      startSearchNumber,
      startSearchPhoneNumber,
      verifyMessage
    } = this.props;
    const { form: { phoneNumber, searchNumber } } = this.state;
    return (
      // решить проблему с заполненим формы неправильного номера карты
      // не очищать инпуты
      <Fragment>
        <Paper>
          <div className={classes.addCardForm}>
            <form onSubmit={this.handleSubmit}>
              <GridContainer
                spacing={16}
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                <ItemGrid xs={!isVerifyCardNumber ? 6 : 12} item>
                  <Field
                    name="searchNumber"
                    notViewIcon
                    id="searchNumber"
                    type={"search"}
                    label="Введите номер абонемента*"
                    placeholder='Начните вводить номер...'
                    // disabled={this.getVerifyNumber(phoneNumber)}
                    // classes={classes}
                    value={searchNumber}
                    autoFocus
                    error={isVerifyCardNumber}
                    helpText={!pristine && !isVerifyCardNumber ? null : verifyPhoneMessage}
                    component={CustomInputView}
                    onChange={(evt) => this.handleChange(evt, startSearchNumber)}
                  />
                </ItemGrid>
                {!isVerifyCardNumber && searchNumber && card && card.phoneNumber
                  ? <ItemGrid xs={6} item>
                    <Field
                      // реализовать функционал появления таблицы истории посещаемости
                      // и добавления новой истории посещения
                      name="phoneNumber"
                      type="search"
                      id="phoneNumber"
                      labelText="Номер телефона при регистрации*"
                      placeholder='89212287228'
                      error={!this.getVerifyNumber(phoneNumber)}
                      helpText={!pristine && !this.getVerifyNumber(phoneNumber) ? "Введите номер телефонв корректно" : null}
                      disabled={!isVerifyCardNumber && this.getVerifyNumber(phoneNumber)}
                      value={phoneNumber}
                      component={CustomInputView}
                      onChange={(evt) => this.handleChange(evt)}
                    />
                  </ItemGrid>
                  : null
                }
              </GridContainer>
            </form>
            {!isVerifyCardNumber && this.getVerifyNumber(phoneNumber)
              ? <div>
                <Table
                  striped
                  tableHead={[
                    "#",
                    "Салон",
                    "Количество",
                    "Дата"
                  ]}
                  tableData={[
                    ...this.getTableData(),
                    {
                      total: true,
                      colspan: "2",
                      amount: `${card && card.history && card.history.length ? 10 : card.typeCard} минут`
                    }
                  ]}
                  customCellClasses={[
                    classes.center,
                    classes.center,
                    classes.center,
                    classes.center,
                    classes.center
                  ]}
                  customClassesForCells={[0, 5, 6]}
                  customHeadCellClasses={[
                    classes.center,
                    classes.center,
                    classes.center,
                    classes.center,
                    classes.center
                  ]}
                  customHeadClassesForCells={[0, 5, 6]}
                />
              </div>
              : null
            }
          </div>
        </Paper>
      </Fragment>
    );
  }
}

EditCard.defaultProps = {
  btnClean: "Очистить",
  btnAdd: "Отправить"
};

EditCard.propTypes = {
  classes: PropTypes.object
};

export default reduxForm({
  form: "editCard"
  // validate
})(withStyles(customEventsStyle)(EditCard));
