import React, { Component, PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field } from "redux-form";
import "date-fns";
import cx from "classnames";
import moment from "moment/moment";
import "moment/locale/ru";
import CustomInputView from "components/Inputs/CustomInputView";
import Fab from "@material-ui/core/Fab";
import Remove from "@material-ui/icons/Remove";
import Grid from "@material-ui/core/Grid";
import Picker from "components/Inputs/Picker";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import { getTotalResource } from "modules/Calendar";
import CustomSelectView from "components/Inputs/CustomSelectView";
import InputNumber from "components/Inputs/InputNumber";
import defaultResource from "modules/Calendar/defaultResource";
import category from "views/Shop/data/category.js";
import typesPay from "views/Shop/data/typePay.js";
import services from "views/Shop/data/data.js";
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";

class Member extends Component {
  state = {
    selectedDate: "",
    switchDate: false,
    groupValue: null,
    switchType: false,
    cash: null,
    card: null,
    certificate: null,
    form: {
      searchNumber: null
    },
    selectTypePay: false,
    selectTypePay: false,
    selectTypePay: false
  };

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log("getDerivedStateFromProps");
  //   console.log(nextProps);
  //   return null;
  // }

  handleDateChange = date => {
    const isNewDate = moment(this.state.selectedDate).format("DD.MM.YY") === moment(date).format("DD.MM.YY");
    this.setState({
      selectedDate: date,
      switchDate: !isNewDate
    });
  };

  onMenuOpen = () => {
    // console.log("onMenuOpen");

    // console.log(this.state.groupValue);
    // console.log(this.props);
    // this.props.fields.remove(this.props.index);
    // console.log(this.props.fields.getAll());
    // this.props.fields.map((item, idx) => {
    //   return idx !== this.props.index;
    //   // return item !== this.props.member;
    // });

    // typePay
    const index = this.props.index;
    this.props.fields.remove(index);
    this.props.fields.insert(index, { typePay: this.state.groupValue });


    // const gr = this.props.fields.get(this.props.index);
    // console.log(this.state.groupValue);
    // delete gr[this.state.groupValue];
    // console.log(gr);
    // gr.remove(this.state.groupValue);
    // console.log(gr);

    this.setState({
      switchType: false
      // groupValue: null
    });
    // this.handleChangeTypeService("notValue");
  };

  onMenuClose = () => {
    // console.log("onMenuClose");
    this.setState({
      switchType: true
    });
  };

  handleChangeGroup = value => {
    // console.log(this.props);
    // console.log(value, "value");
    // console.log(this.state.groupValue);

    // разобраться с переключением
    // посомтреть что в оптиях приходит со стейта

    if (value.toLowerCase() && value.toLowerCase() !== "certificate" && this.state.groupValue !== value.toLowerCase()) {
      const data = {
        [value.toLowerCase()]: !this.props.typePays[value.toLowerCase()]
      };
      // console.log(data);
      this.props.changePays(data);
    }
    if (this.state.groupValue && this.state.groupValue !== "certificate" && this.state.groupValue !== value.toLowerCase()) {
      const data = {
        [this.state.groupValue.toLowerCase()]: !this.props.typePays[this.state.groupValue.toLowerCase()]
      };
      // console.log(data);
      this.props.changePays(data);
      // this.props.changeTargetTypes(this.state.groupValue, "second");
    }
    //changePays

    this.props.changeCounts({
      item: this.state.groupValue,
      value: 0
    });
    // console.log(this.state.groupValue);
    // console.log(this.props);
    // this.props.fields.map(item => {
    //   console.log(item);
    // });
    // //
    // const gr = this.props.fields.get(this.props.index);
    // console.log(gr);
    // this.props.resetSection(this.props.formName, "members"[this.props.member]);
    // this.props.dispatch(this.props.unregisterField('members', this.state.groupValue));
    // if (this.state.groupValue) {
    //   this.props.unregisterField(this.props.formName, `members${this.props.member}.${this.state.groupValue}`);
    // }
    // console.log(this.props.fields.name);
    // this.props.changeFiledToRedux(this.props.fields.name, this.state.groupValue, 0);
    this.setState({
      groupValue: value,
      cash: null,
      card: null,
      certificate: null,
      selectTypePay: value ? true : false
    });
  };

  getServices = () => {
    if (typesPay && typesPay.length) {
      return typesPay
        .map(item => ({
          value: item.name,
          label: item.value
        }))
        .filter(item => {
          if (item.value === "certificate") {
            return item;
          } else {
            return !this.props.typePays[item.value];
          }
        });
    }
    return [];
  };

  getOptions = () => {
    const { groupValue } = this.state;
    const resources = services[groupValue];
    if (!resources) return [];
    return resources.map(item => ({
      value: item.title,
      label: item.title
    }));
  };

  // onOpen = () => this.setState({ switchDate: false });
  //
  // onClose = () => this.setState({ switchDate: true });

  handleFocusSelect = () => {
    console.log("открыт");
  };

  // onInputChange = () => {
  //   console.log("onInputChange");
  //   this.setState({
  //     switchType: !this.state.switchType
  //   });
  // };

  handleChangeType = (value) => {
    console.log(value);
  };

  handleChangeTypeService = value => {
    if (!value) return;
    const { index, fields, addService } = this.props;
    const data = {
      id: index,
      value,
      group: this.state.groupValue,
      fields
    };

    addService(data);
  };

  handleRemoveService = () => {
    console.log("handleRemoveService");
    const { index, fields, removeService } = this.props;
    console.log(index);
    fields.remove(index);
    // removeService(index);
  };

  handleUp = evt => {
    // console.log(evt, "handleUp");
  };

  handleChangeCash = value => {
    this.props.changeCounts({
      item: "cash",
      value: !value ? null : value
    });
    this.setState({
      cash: !value ? null : value
    });
  };

  handleChangeCountCard = value => {
    this.props.changeCounts({
      item: "card",
      value: !value ? null : value
    });
    this.setState({
      card: !value ? null : value
    });
  };

  handleChangeCountCertificate = value => {
    this.props.changeCounts({
      item: "certificate",
      value: !value ? null : value
    });
    this.setState({
      certificate: !value ? null : value
    });
  };

  handleClickRemove = () => {
    const { fields, index, changeCounts, changeTargetTypes } = this.props;
    const { cash, card, certificate, groupValue } = this.state;
    // if (value.toLowerCase() !== "certificate") {
    //   this.props.changeTargetTypes(value.toLowerCase());
    // }
    // console.log(cash, "cash");
    // console.log(card, "card");

    console.log(this.props);
    console.log(groupValue);
    // console.log(this.props);

    if (groupValue) {
      const data = {
        [groupValue.toLowerCase()]: false
      };
      this.props.changePays(data);
      this.setState({
        groupValue: null
      });
      // return;
    }


    // if (cash) {
    //   // changeTargetTypes("cash");
    //   // this.props.changeTargetTypes("cash");
    //   const data = {
    //     ["cash".toLowerCase()]: false
    //   };
    //   this.props.changePays(data);
    //   changeCounts({
    //     item: "cash",
    //     value: 0
    //   });
    //
    // } else if (card) {
    //   // changeTargetTypes("card");
    //   // this.props.changeTargetTypes("card");
    //   const data = {
    //     ["card".toLowerCase()]: false
    //   };
    //   this.props.changePays(data);
    //   // this.props.changePays("card");
    //   changeCounts({
    //     item: "card",
    //     value: 0
    //   });
    //
    // } else {
    //   changeCounts({
    //     item: "certificate",
    //     value: 0
    //   });
    // }
    return fields.remove(index);
  };

  render() {
    const { member, index, classes, fields, noButton, options } = this.props;
    const { selectedDate, switchDate, groupValue, switchType, cash, card, certificate, form: { searchNumber }, selectTypePay } = this.state;
    // console.log(countCash, "countCash");
    // console.log(countCard, "countCard");
    // console.log(countCertificate, "countCertificate");
    // console.log(this.props);
    // console.log(this.getServices());
    // console.log(this.props);
    // console.log(this.props.typePays);
    // console.log(selectTypePay, "selectTypePay");
    return (
      <Fragment>
        {noButton
          ? null
          :
          <div className={cx(classes.flex, classes.bottomMargin)}>
            <h4 className={classes.itemHeader}>Тип оплаты #{index + 1}</h4>
            <Fab
              color='secondary'
              variant="extended"
              size="small"
              className={classes.flexItem}
              onClick={this.handleClickRemove}
            >
              <Remove/>
            </Fab>
          </div>
        }

        <GridContainer justify="flex-start" alignItems='baseline' spacing={16}>
          <ItemGrid xs={12} md={6} item>
            <div className={classes.bottomMargin}>
              <Field
                name={`${member}.typePay`}
                classes={classes}
                id={`${member}.typePay`}
                label='Выберите тип оплаты'
                // options={options}
                options={this.getServices()}
                height={200}
                // disabled={isDisabled}
                // value={typeCard}
                component={CustomSelectView}
                // disabled={selectTypePay}
                onChange={this.handleChangeGroup}
                // handleFocus={this.handleFocusSelect}
                // onInputChange={this.onInputChange}
                onMenuOpen={this.onMenuOpen}
                onMenuClose={this.onMenuClose}
              />
            </div>
          </ItemGrid>

          {groupValue === "cash"
            ? <ItemGrid xs={12} md={6} item container justify="space-around" spacing={16}>
              <ItemGrid xs={6} md={4} sm={3}>
                <Field
                  name={`${member}.${groupValue}`}
                  // classes={classes}
                  id={`${member}.${groupValue}`}
                  label='Введите сумму'
                  // options={this.getOptions()}
                  // options={this.getOptions()}
                  // disabled={isDisabled}
                  value={cash}
                  onChange={this.handleChangeCash}
                  placeholder={"Введите сумму"}
                  autoFocus
                  onKeyUp={this.handleUp}
                  component={InputNumber}
                />
              </ItemGrid>
              {cash
                ? <ItemGrid xs={6} md={4} sm={3}>
                  <Button
                    size={"xs"}
                    color={"success"}
                    // disabled={loader}
                    // fullWidth
                    // onClick={this.handleClickResetSearchValue}
                  >
                    Пересчитать
                  </Button>
                </ItemGrid>
                : null
              }
            </ItemGrid>
            : null
          }
          {/*{groupValue === "card"*/}
            {/*? <ItemGrid xs={12} sm={6} item>*/}
              {/*<Field*/}
                {/*name={`${member}.${groupValue}`}*/}
                {/*// classes={classes}*/}
                {/*id={`${member}.${groupValue}`}*/}
                {/*// isMulti*/}
                {/*label='Введите сумму'*/}
                {/*// options={this.getOptions()}*/}
                {/*// height={200}*/}
                {/*// disabled={isDisabled}*/}
                {/*// value={typeCard}*/}
                {/*// onChange={this.handleChangeTypeService}*/}
                {/*value={card}*/}
                {/*onChange={this.handleChangeCountCard}*/}
                {/*placeholder={"Введите сумму"}*/}
                {/*// type="text"*/}
                {/*autoFocus*/}
                {/*// disabled={isClick}*/}
                {/*onKeyUp={this.handleUp}*/}
                {/*component={InputNumber}*/}
                {/*// onChange={this.handleChangeType}*/}
              {/*/>*/}
            {/*</ItemGrid>*/}
            {/*: null*/}
          {/*}*/}
          {/*{groupValue === "certificate"*/}
            {/*? <ItemGrid xs={12} sm={6} item>*/}
              {/*<Field*/}
                {/*name={`${member}.${groupValue}`}*/}
                {/*// classes={classes}*/}
                {/*id={`${member}.${groupValue}`}*/}
                {/*// isMulti*/}
                {/*label='Введите сумму'*/}
                {/*// options={this.getOptions()}*/}
                {/*// height={200}*/}
                {/*// disabled={isDisabled}*/}
                {/*// value={typeCard}*/}
                {/*// onChange={this.handleChangeTypeService}*/}
                {/*value={certificate}*/}
                {/*onChange={this.handleChangeCountCertificate}*/}
                {/*placeholder={"Введите сумму"}*/}
                {/*// type="text"*/}
                {/*autoFocus*/}
                {/*// disabled={isClick}*/}
                {/*onKeyUp={this.handleUp}*/}
                {/*component={InputNumber}*/}
                {/*// onChange={this.handleChangeType}*/}
              {/*/>*/}
            {/*</ItemGrid>*/}
            {/*: null*/}
          {/*}*/}
        </GridContainer>
      </Fragment>
    );
  }
}

Member.propTypes = {
  classes: PropTypes.object.isRequired,
  totalResource: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired,
  member: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  noButton: PropTypes.bool
};

const mapStateFromProps = state => ({
  totalResource: getTotalResource(state)
});

export default connect(mapStateFromProps, null)(Member);
