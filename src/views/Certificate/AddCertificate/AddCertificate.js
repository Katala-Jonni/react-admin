import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Field, reduxForm, change } from "redux-form";
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

const initialState = () => {
  return {
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
    totalSum: 0,
    radioValue: null,
    typeCard: null,
    isChange: false
  };
};

class AddCertificate extends Component {
  state = {
    ...initialState()
  };

  componentDidMount() {
    const { form: { certificateNumber } } = this.state;

    this.props.loadView();
    // console.log("test¬");
    // this.props.loadNumberCertificate({ value: certificateNumber });
  }

  addField = () => {
    this.setState({
      isMember: true
    });
  };

  handleSubmit = evt => {
    const { reset, handleSubmit, deleteState } = this.props;
    deleteState();
    reset();
    this.setState({
      ...initialState()
    });
    handleSubmit(evt);

  };

  removeField = () => {
    this.props.loadNumberCertificate({ value: null });
    this.props.dispatch(change("addCertificate", "typePay", ""));
  };

  handleClickReset = () => {
    console.log("test");
    this.props.reset();
    this.setState({
      serviceViewSum: 0,
      totalSum: 0,
      selectValues: [],
      certificateSum: null,
      isMember: false,
      form: { ...this.state.form, ["cardNumber"]: "" },
      radioValue: null,
      typeCard: null
      // isSubmit: true
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
    const { startVerifyCertificate } = this.props;
    this.setState({
      form: { ...this.state.form, [name]: value },
      selectValues: null
    });
    return startVerifyCertificate({ value });
  };

  handleChangeSelect = value => {
    if (!value) return false;
    const form = {
      ...this.state.form,
      typeCertificate: value
      // добавил
      // certificateSum: null
    };

    const typeCard = options.find(a => a.value.toLowerCase() === value.toLowerCase());
    if (value === "amount") {
      this.props.dispatch(change("addCertificate", "certificateSum", null));
      this.setState({
        amountView: true,
        serviceView: false,
        form,
        totalSum: 0,
        typeCard,
        selectValues: []
      });
    } else {
      this.setState({
        amountView: false,
        serviceView: true,
        form,
        totalSum: 0,
        typeCard
        // certificateSum: null
      });
    }
  };

  getOptions = () => {
    const exceptionServices = ["certificate", "shop", "solarium"];
    let count = 0;
    if (!this.props.products.length) return [];

    return this.props.products
      .filter(item => !exceptionServices.includes(item.categoryName))
      .reduce((start, item) => {
        start.push({
          value: `${item.categoryName}-${++count}`,
          label: item.title
        });
        return start;
      }, []);

    // return keys
    //   .filter(item => !exceptionServices.includes(item))
    //   .reduce((start, cur) => {
    //     start.push(...services[cur]);
    //     return start;
    //   }, [])
    //   .reduce((start, item) => {
    //     start.push({
    //       value: `${item.category}-${++count}`,
    //       label: item.title
    //     });
    //     return start;
    //   }, []);
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
    this.props.dispatch(change("addCertificate", "certificateSum", this.getTotalSum(values)));
    this.setState({
      totalSum: this.getTotalSum(values),
      selectValues: values || []
      // form: {
      //   ...this.state.form,
      //   certificateSum: null
      // }
    });
  };

  getTotalSum = values => {
    let price = 0;
    values.forEach(item => {
      const { label } = item;
      if (this.props.products.length) {
        const product = this.props.products.find(el => el.title.toLowerCase() === label.toLowerCase());
        if (product) {
          price += product.price;
        }
      }
    });
    return price;
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
      isCertificate,
      verifyMessage,
      certificate,
      isChange,
      changeViewTab
    } = this.props;

    console.log(this.props.isViev);

    // console.log(changeViewTab);
    const {
      form: { certificateNumber, certificateSum },
      isDisabled,
      amountView,
      serviceView,
      totalSum,
      selectValues,
      reset,
      radioValue,
      typeCard
    } = this.state;

    return (
      <Fragment>
        <Paper style={{ height: "100vh" }}>
          <div className={classes.addCardForm}>
            <form onSubmit={this.handleSubmit}>
              <GridContainer justify="flex-start" alignItems="center" spacing={16}>
                <ItemGrid xs={12} sm={6} item>
                  <Field
                    name="phoneNumber"
                    type="text"
                    id="phoneNumber"
                    labelText="Введите номер телефона владельца сертификата"
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
                    selectValues={typeCard}
                    component={CustomSelectView}
                    onChange={this.handleChangeSelect}
                  />
                </ItemGrid>
                {(amountView || serviceView) && typeCard
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
                {isCertificate
                  ? amountView
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
                    : serviceView
                      ? <ItemGrid xs={12} sm={6} item>
                        <Field
                          name="servicesType"
                          classes={classes}
                          id="servicesType"
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
                          component={CustomSelectView}
                          onChange={this.handleChangeType}
                        />
                      </ItemGrid>
                      : null
                  : null
                }
                {isCertificate
                  ? <ItemGrid xs={12} item>
                    <Field
                      name='typePay'
                      id='typePay'
                      // type={"radio"}
                      label='Выберите тип оплаты*'
                      options={payTypes}
                      // classes={classes}
                      // isVerifyCard={!isVerifyCard}
                      // disabled={isDisabled}
                      // isSubmit={isSubmit}
                      radioValue={radioValue}
                      component={CustomRadio}
                      onChange={this.handleChangeRadio}
                    />
                  </ItemGrid>
                  : null
                }

                {serviceView && selectValues && selectValues.length

                  ? <Fragment>
                    <ItemGrid xs={12} sm={6} item>
                      <Typography
                        color='textPrimary'
                        variant="subtitle1">
                        Сертификат на сумму: {totalSum} ₽
                      </Typography>
                    </ItemGrid>
                    {/*<ItemGrid xs={12} sm={6} item>*/}
                    {/*<Field*/}
                    {/*name="certificateSum"*/}
                    {/*id="certificateSum"*/}
                    {/*style={{ opacity: "0" }}*/}
                    {/*disabled={serviceView}*/}
                    {/*value={totalSum}*/}
                    {/*component={CustomInputView}*/}
                    {/*/>*/}
                    {/*</ItemGrid>*/}
                  </Fragment>
                  : null
                }
                <ItemGrid xs={12}>
                  <div className={classes.topMargin}>
                    {
                      valid && !submitting && isCertificate
                        ? <Button
                          type="submit"
                          color='primary'
                          variant="contained"
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
