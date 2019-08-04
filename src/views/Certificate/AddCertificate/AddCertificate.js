import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Field, FieldArray, reduxForm } from "redux-form";
//validate
// core components
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";

// material-ui components
import { withStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/GridItem.jsx";
import CustomSelectView from "../../../components/Inputs/CustomSelectView";
import CustomInputView from "components/Inputs/CustomInputView";
import Button from "components/CustomButtons/Button.jsx";
import CustomRadio from "components/Inputs/CustomRadioCheckBox";
// @material-ui/icons

import customEventsStyle from "assets/jss/material-dashboard-react/components/customEventsStyle";
import options from "modules/Certificate/options.js";
import validate from "modules/Certificate/validate.js";
import category from "views/Shop/data/category.js";
import services from "views/Shop/data/data.js";
import { payTypes } from "modules/Sun/options.js";
// import RenderMembers from "views/Calendar/Events/Forms/RenderMembers.js";

import RenderMembers from "../RenderMembers";
import { loadNumberCertificate } from "../../../modules/Certificate";


class AddCertificate extends Component {
  state = {
    isMember: false,
    cardNumber: null,
    form: {
      phoneNumber: null,
      certificateNumber: null,
      typeCard: null,
      certificateSum: null
    },
    isDisabled: false,
    isSubmit: false,
    amountView: false,
    serviceView: false,
    serviceViewSum: 1000,
    selectedDate: "",
    switchDate: false,
    groupValue: null,
    switchType: false,
    selectValues: [],
    totalSum: 0
  };

  componentDidMount() {
    const { form: { certificateNumber } } = this.state;
    this.props.loadNumberCertificate({ value: certificateNumber });
  }

  addField = () => {
    this.setState({
      isMember: true
    });
  };

  handleSubmit = values => {
    console.log(values);
  };

  removeField = () => {
    this.setState({
      isMember: false,
      form: { ...this.state.form, ["cardNumber"]: "" }
    });
    this.props.loadNumberCertificate({ value: null });
  };

  handleClickReset = () => {
    this.props.reset();
    this.setState({
      serviceViewSum: 0,
      totalSum: 0,
      selectValues: [],
      certificateSum: null
    });
    return this.removeField();
  };

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({
      form: { ...this.state.form, [name]: value }
    });
    // this.props.startVerifyCard(value);
  };

  handleChangeNumber = evt => {
    const { name, value } = evt.target;
    this.setState({
      form: { ...this.state.form, [name]: value }
    });
    this.props.loadNumberCertificate({ value });
  };

  handleChangeSelect = value => {
    // console.log(value);
    if (!value) return false;
    const form = {
      ...this.state.form,
      typeCertificate: value
    };
    if (value === "amount") {
      this.setState({
        amountView: true,
        serviceView: false,
        form,
        totalSum: 0,
        certificateSum: null,
        selectValues: [],
      });
    } else {
      this.setState({
        amountView: false,
        serviceView: true,
        form,
        // totalSum: 0,
        certificateSum: null
      });
    }
  };

  getServices = () => {
    const exceptionServices = ["certificate", "shop"];
    if (category && category.length) {
      return category.filter(item => !exceptionServices.includes(item.name))
        .map(item => ({
          value: item.name,
          label: item.value
        }));
    }
    return [];
  };

  addService = () => {
    console.log("addService");
    console.log(this.props);
  };

  handleChangeGroup = value => {
    this.setState({
      groupValue: value
    });
  };

  getOptions = () => {
    const exceptionServices = ["certificate", "shop", "solarium"];
    const keys = Object.keys(services);
    let count = 0;
    if (!keys) return [];
    return keys
      .filter(item => !exceptionServices.includes(item))
      .reduce((start, cur) => {
        start.push(...services[cur]);
        return start;
      }, [])
      .reduce((start, item) => {
        start.push({
          value: `${item.category}-${++count}`,
          label: item.title
        });
        return start;
      }, []);
  };

  onMenuOpen = () => {
    // console.log("onMenuOpen");
    this.setState({
      switchType: false
      // groupValue: null
    });
  };

  onMenuClose = () => {
    console.log("onMenuClose");
    this.setState({
      switchType: true
    });
  };

  handleChangeType = values => {
    if (!values) return;
    this.getTotalSum(values);
    this.setState({
      totalSum: this.getTotalSum(values),
      selectValues: values || []
    });
  };

  handleRemoveService = () => {
    console.log("handleRemoveService");
    const { index, fields, removeService } = this.props;
    console.log(index);
    fields.remove(index);
    // removeService(index);
  };

  getTotalSum = values => {
    let price = 0;
    values.map(item => (
      {
        value: item.value.split("-")[0].toString(),
        label: item.label
      }
    ))
      .forEach(item => {
        const { value, label } = item;
        if (services[value] && Array.isArray(services[value])) {
          const product = services[value].find(el => el.title.toLowerCase() === label.toLowerCase());
          if (product) {
            price += product.price;
          }
        }
      });
    // console.log(price);
    return price;
    // if (services[group]) {
    //   const product = services[group].find(el => el.title.toLowerCase() === value.toLowerCase());
    //   if (product) {
    //     price = product.price;
    //   }
    // } else {
    //   price = 0;
    // }
    // const newTotalCounts = [...this.state.totalServices];
    // newTotalCounts[id] = price;
    // this.setState({
    //   totalServices: newTotalCounts
    //   // totalServices: { ...this.state.totalServices, [id]: price }
    // });
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
      isCertificate,
      verifyMessage,
      certificate
    } = this.props;
    const {
      isMember,
      form: { certificateNumber, certificateSum },
      isDisabled,
      isSubmit,
      amountView,
      serviceView,
      groupValue,
      switchType,
      serviceViewSum,
      totalSum,
      selectValues,
      reset
    } = this.state;

    // возможно сделать только один переключатель
    // console.log(amountView, "amountView");
    // console.log(serviceView, "serviceView");
    return (
      <Fragment>
        <Paper style={{ height: "100vh" }}>
          <div className={classes.addCardForm}>
            <form onSubmit={handleSubmit}>
              <GridContainer justify="flex-start" alignItems="center" spacing={16}>
                <ItemGrid xs={12} sm={6} item>
                  <Field
                    name="phoneNumber"
                    type="text"
                    id="phoneNumber"
                    labelText="Введите номер телефона"
                    placeholder='89114232988'
                    // disabled={isDisabled}
                    // value={cardNumber}
                    // error={isVerifyCard}
                    // helpText={!pristine && isVerifyCard ? verifyMessage : verifyMessage}
                    component={CustomInputView}
                    // onChange={this.handleChange}
                  />
                </ItemGrid>
                <ItemGrid xs={12} sm={6} item>
                  <Field
                    name='typeCertificate'
                    classes={classes}
                    id='typeCertificate'
                    label='Выберите тип сертификата'
                    options={options}
                    height={200}
                    disabled={isDisabled}
                    // value={typeCard}
                    component={CustomSelectView}
                    onChange={this.handleChangeSelect}
                  />
                </ItemGrid>
                {amountView || serviceView
                  ?
                  <ItemGrid xs={12} sm={6} item>
                    <Field
                      name="certificateNumber"
                      type="text"
                      id="certificateNumber"
                      labelText="Введите номер сертификата*"
                      placeholder='1234567890'
                      // disabled={isDisabled}
                      value={certificateNumber}
                      error={!isCertificate}
                      helpText={!pristine && isCertificate ? undefined : verifyMessage}
                      component={CustomInputView}
                      onChange={this.handleChangeNumber}
                    />
                  </ItemGrid>
                  : null
                }
                {amountView && isCertificate
                  ? <ItemGrid xs={6} item>
                    <Field
                      name="certificateSum"
                      id="certificateSum"
                      // type='number'
                      label="Сумма сертификата*"
                      placeholder='1000'
                      disabled={serviceView}
                      value={certificateSum}
                      // value={cardNumber}
                      // error={isVerifyCard}
                      // helpText={!pristine && isVerifyCard ? verifyMessage : verifyMessage}
                      component={CustomInputView}
                      onChange={this.handleChange}
                    />
                  </ItemGrid>
                  : null
                }
                {serviceView && isCertificate
                  ? <ItemGrid xs={12} sm={6} item>
                    <Field
                      name={`servicesType`}
                      classes={classes}
                      id={`servicesType`}
                      // menuIsOpen
                      isMulti
                      label='Выберите услугу'
                      // defaultValue={selectValues}
                      reset={reset}
                      options={this.getOptions()}
                      height={300}
                      // disabled={isDisabled}
                      // value={selectValues}
                      selectValues={selectValues}
                      // onChange={this.handleChangeTypeService}
                      component={CustomSelectView}
                      onChange={this.handleChangeType}
                    />
                  </ItemGrid>
                  : null
                }
                {
                  (amountView || serviceView) && isCertificate && (selectValues.length || certificateSum)
                    ? <ItemGrid xs={12} item>
                      <Field
                        name='typePay'
                        id='typeCard'
                        // type={"radio"}
                        label='Выберите тип оплаты*'
                        options={payTypes}
                        // classes={classes}
                        // isVerifyCard={!isVerifyCard}
                        // disabled={isDisabled}
                        component={CustomRadio}
                        // isSubmit={isSubmit}
                      />
                    </ItemGrid>
                    : null
                }
                {serviceView && selectValues.length
                  ? <ItemGrid xs={12} item>
                    <Typography
                      color='textPrimary'
                      // className={classes.addCardForm}
                      variant="subtitle1">
                      Сертификат на сумму: {totalSum} ₽
                      {/*Сертификат на сумму: {this.getTotalSum()} ₽*/}
                    </Typography>
                  </ItemGrid>
                  : null
                }
                <ItemGrid xs={12}>
                  <div className={classes.topMargin}>
                    {
                      (amountView || serviceView) && isCertificate && (selectValues.length || certificateSum)
                        ? <Button
                          type="submit"
                          color='primary'
                          variant="contained"
                          // disabled={isMember || (!valid && !submitting)}
                          // disabled={isMember || (!valid && !submitting) || isVerifyCard}
                        >
                          {btnAdd}
                        </Button>
                        : null
                    }
                    {
                      amountView || serviceView
                        ? <Button
                          type="button"
                          color={"info"}
                          disabled={pristine || submitting}
                          // className={classes.indent}
                          // className={classes.leftMargin}
                          style={{ marginLeft: "10px" }}
                          variant="contained"
                          onClick={this.handleClickReset}
                        >
                          {btnClean}
                        </Button>
                        : null
                    }
                  </div>
                </ItemGrid>
              </GridContainer>
            </form>
          </div>
        </Paper>
      </Fragment>
    );
  }
}

AddCertificate.defaultProps = {
  btnClean: "Очистить",
  btnAdd: "Отправить"
};

AddCertificate.propTypes = {
  classes: PropTypes.object
};

export default reduxForm({
  form: "addCertificate",
  validate
})(withStyles(customEventsStyle)(AddCertificate));
