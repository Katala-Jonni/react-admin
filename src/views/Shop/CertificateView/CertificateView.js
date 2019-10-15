import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import customEventsStyle from "assets/jss/material-dashboard-react/components/customEventsStyle";
import { Field, FieldArray, reduxForm, unregisterField } from "redux-form";
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/GridItem.jsx";
import CustomInputView from "components/Inputs/CustomInputView";
import Button from "components/CustomButtons/Button.jsx";
import { withStyles } from "@material-ui/core/styles/index";
import RenderMembersType from "../RenderMembers";
import moment from "moment/moment";


const validate = value => {
  const errors = {};
  // console.log(value);
  const { members } = value;
  // console.log(members);
  if (members && members.length) {
    const membersArrayErrors = [];
    members.forEach((member, memberIndex) => {
      const memberErrors = {};
      // console.log(member);
      const lengthElems = Object.keys(member).length;
      // console.log(Object.keys(member).length);
      if (lengthElems !== 2) {
        memberErrors.typePay = "Заполните или удалите пустое поле";
        membersArrayErrors[memberIndex] = memberErrors;
      }

    });
    if (membersArrayErrors.length) {
      errors.members = membersArrayErrors;
    }
    // const isEveryItemTwoElem = members.forEach(item => {
    //   if (Object.keys(item).length !== 2) {
    //     errors[item[0]] = "Заполните или удалите пустое поле";
    //   }
    // });
    // console.log(isEveryItemTwoElem);
    // if (!isEveryItemTwoElem) {
    //   errors.members = "Заполните или удалите пустое поле";
    // }
  }
  return errors;
};

class CertificateView extends Component {
  state = {
    form: {
      searchNumber: null
    },
    isMember: false,
    counts: 0,
    cash: 0,
    card: 0,
    certificate: 0
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { form: { searchNumber } } = this.state;
    // this.props.startSearchNumber(searchNumber);
  };

  handleChange = (evt, callBack) => {
    const { name, value } = evt.target;
    this.setState({
      form: { ...this.state.form, [name]: value }
    });
    callBack && callBack(value);
  };

  handleClickResetSearchValue = () => {
    this.setState({
      form: {
        searchNumber: null
      }
    });
    this.props.reset();
    this.props.endSearchNumber({
      isCertificate: true,
      verifyMessage: "Такой сертификат не найден",
      certificate: null
    });
  };

  addField = () => {
    this.setState({
      isMember: true
    });
  };

  changeCounts = ({ item, value }) => {
    this.setState({
      [item]: +value ? +value : 0
    });
  };

  render() {
    const { classes, startSearchNumber, isCertificate, verifyMessage, pristine, certificate, totalPrice, handleSubmit } = this.props;
    const { form: { searchNumber }, counts, cash, card, certificate: crt } = this.state;
    // console.log(cash, "cash");
    // console.log(card, "card");
    // console.log(crt, "certificate");
    // console.log(this.props);
    // console.log(cash, "cash");
    // console.log(card, "card");
    // console.log(crt, "crt");
    return (
      <Fragment>
        <p>Сумма к оплате: {totalPrice}
          <small className={classes.tdNumberSmall}> ₽</small>
        </p>
        <p>Внесено: 0 <small className={classes.tdNumberSmall}> ₽</small></p>
        <p>Осталось Внести: {totalPrice - 15}
          <small className={classes.tdNumberSmall}> ₽</small>
        </p>
        <GridContainer
          spacing={8}
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <ItemGrid xs={12}>
            <div>Hello!</div>
            <form onSubmit={this.props.handleSubmit}>
              <FieldArray
                name="members"
                classes={classes}
                // isDisabledBtn={!valid && !submitting}
                changeFiledToRedux={this.props.change}
                addField={this.addField}
                component={RenderMembersType}
                changeCounts={this.changeCounts}
                error={this.props.erorr}
                isAdd={(cash + card + crt) === +totalPrice}
              />
              <div>
                {(cash + card + crt) === +totalPrice
                  ? <Button
                    type="submit"
                    color='primary'
                    variant="contained"
                    // disabled={!this.state.isMember || (!valid && !submitting)}
                    className={classes.indent}
                  >
                    Отправить
                  </Button>
                  : null
                }
                {/*<Button*/}
                {/*type="button"*/}
                {/*disabled={pristine || submitting}*/}
                {/*className={classes.indent}*/}
                {/*variant="contained"*/}
                {/*onClick={this.handleClickReset}*/}
                {/*>*/}
                {/*{btnClean}*/}
                {/*</Button>*/}
                {/*<Button*/}
                {/*type="button"*/}
                {/*color='primary'*/}
                {/*variant="contained"*/}
                {/*onClick={handleClickClose}*/}
                {/*>*/}
                {/*{btnCanceled}*/}
                {/*</Button>*/}
              </div>
            </form>
          </ItemGrid>
        </GridContainer>
      </Fragment>
    );
  }
}

CertificateView.defaultProps = {};

CertificateView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default reduxForm({
  form: "certificateInfo",
  validate
})(withStyles(customEventsStyle)(CertificateView));

/*
<Fragment>
  <GridContainer
    spacing={8}
    direction="row"
    justify="flex-start"
    alignItems="center"
  >
    <ItemGrid xs={12} md={searchNumber ? 10 : 12}>
      <div className={classes.addCardForm}>
        <form onSubmit={this.handleSubmit}>
          <Field
            name="searchNumber"
            notViewIcon
            id="searchNumber"
            // type={"search"}
            label="Введите номер сертификата*"
            placeholder='Начните вводить номер...'
            // disabled={loader}
            // classes={classes}
            value={searchNumber}
            autoFocus
            error={isCertificate}
            helpText={!pristine && !isCertificate ? null : verifyMessage}
            component={CustomInputView}
            onChange={(evt) => this.handleChange(evt, startSearchNumber)}
          />
        </form>
      </div>
    </ItemGrid>
    {searchNumber
      ? <ItemGrid xs={12} md={2}>
        <Button
          size={"xs"}
          color={"defaultNoBackground"}
          // disabled={loader}
          fullWidth
          onClick={this.handleClickResetSearchValue}
        >
          Очистить</Button>
      </ItemGrid>
      : null
    }
    {certificate
      ? <ItemGrid xs={12}>
        <h1>Номер сертификата # {`${certificate.certificateNumber}`}</h1>
      </ItemGrid>
      : null
    }
  </GridContainer>
</Fragment>
*/
