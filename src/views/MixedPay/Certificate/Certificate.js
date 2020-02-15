import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";

// core components
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

// material-ui components
import CustomSelectView from "components/Inputs/CustomSelectView";
import ItemGrid from "components/Grid/GridItem.jsx";
import InputNumber from "components/Inputs/InputNumber";
import CustomInputView from "components/Inputs/CustomInputView";
import Button from "components/CustomButtons/Button.jsx";
import EditCertificate from "../../Certificate/EditCertificate";

class Certificate extends Component {
  state = {
    value: null,
    disabled: false,
    searchValue: null,
    groupValues: [],
    isClick: false
  };

  handleChange = event => {
    const { startSearchCertificate } = this.props;
    const { value } = event.target;
    startSearchCertificate({ value });
    this.setState({ searchValue: value });
  };

  handleChangeInputNumber = value => {
    this.setState({ value });
  };

  handleChangeGroup = values => {
    this.setState({
      groupValues: values && values.length ? values : [],
      isClick: values && values.length ? true : false
    });
  };

  getSertificateOptions = () => {
    const { totalCart, currentCertificate } = this.props;
    // const { groupValues } = this.state;
    if ((currentCertificate && currentCertificate.servicesType) && totalCart.length) {
      // if (!totalCart.length || !currentCertificate.servicesType) return [];
      const titles = currentCertificate.servicesType.map(item => item.label.toLowerCase());
      // console.log(titles);
      const map = {};
      return totalCart
        .filter(item => {
          if (titles.includes(item.title.toLowerCase()) && !map[item.title.toLowerCase()]) {
            map[item.title.toLowerCase()] = true;
            return item;
          }
        })
        .map(elem => {
          // console.log(elem);
          return {
            value: `${elem.category}-${elem._id}`,
            label: elem.title
          };
        });

      // const value = this.getValues(totalCart, titles);
      // const { count, values } = this.getValues(totalCart, titles);
    }

    // const labels = items.map(item => item.title.toLowerCase());
    // const options = servicesType.filter(item => labels.includes(item.label.toLowerCase()));
    return [];
  };

  changeCounts = (count, items) => {
    // console.log(items);
    const { changeType, type, changeAddType, changeDisabled, addStopOption, startEditCertificate, currentCertificate } = this.props;
    const { disabled } = this.state;
    if (disabled) return;
    console.log(type);
    changeType({ [type]: +count });
    changeAddType(true);
    this.setState({
      disabled: true,
      value: null
    });
    changeDisabled();
    addStopOption(type);
    // startEditCertificate({ value, number: certificateNumber });
  };

  handleClickAddCount = () => {
    this.changeCounts(this.state.value);
  };

  getValues = (box, titles) => {
    const map = {};
    const goods = box
      .filter(item => {
        if (titles.includes(item.title.toLowerCase()) && !map[item.title.toLowerCase()]) {
          map[item.title.toLowerCase()] = true;
          return item;
        }
      });
    // console.log(goods);
    if (!goods.length) {
      return {
        count: 0,
        values: []
      };
    }
    const sum = goods
      .map(item => item.price)
      .reduce((a, b) => a + b);
    // console.log(map);
    return {
      count: sum,
      values: goods
    };
  };

  handleClickAddCountCertificate = () => {
    const { totalCart } = this.props;
    const { groupValues } = this.state;
    if (!totalCart.length || !groupValues.length) return;
    const titles = groupValues.map(item => item.label.toLowerCase());
    const { count, values } = this.getValues(totalCart, titles);
    this.setState({
      isClick: false
    });
    this.changeCounts(count, values);
    // console.log("handleClickAddCountCertificate");
  };

  render() {
    const { name, label, addBtnText, balance, helpText, currentCertificate, labelNumber, labelGroup, certificate } = this.props;
    const { value, disabled, searchValue, groupValues, isClick } = this.state;
    // console.log(this.getSertificateOptions());
    return (
      <Fragment>
        <ItemGrid xs={12} md={6} item container justify="space-around" spacing={16}>
          {/*<ItemGrid xs={12}>*/}
            {/*<Field*/}
              {/*autoFocus*/}
              {/*fullWidth*/}
              {/*name={"number"}*/}
              {/*id={`${name}.search`}*/}
              {/*label={label}*/}
              {/*placeholder={label}*/}
              {/*value={searchValue}*/}
              {/*component={CustomInputView}*/}
              {/*error={!currentCertificate}*/}
              {/*helpText={!currentCertificate ? helpText : null}*/}
              {/*disabled={!!currentCertificate}*/}
              {/*onChange={this.handleChange}*/}
            {/*/>*/}
          {/*</ItemGrid>*/}
          <ItemGrid xs={12}>
            {/*<Field*/}
            {/*autoFocus*/}
            {/*fullWidth*/}
            {/*name={"number"}*/}
            {/*id={`${name}.search`}*/}
            {/*label={label}*/}
            {/*placeholder={label}*/}
            {/*value={searchValue}*/}
            {/*component={CustomInputView}*/}
            {/*error={!currentCertificate}*/}
            {/*helpText={!currentCertificate ? helpText : null}*/}
            {/*disabled={!!currentCertificate}*/}
            {/*onChange={this.handleChange}*/}
            {/*/>*/}
            <EditCertificate isPay/>
          </ItemGrid>
        </ItemGrid>
        {currentCertificate
          ? <ItemGrid xs={12} item container justify="flex-start" alignItems="baseline" spacing={16}>
            <ItemGrid xs={3}>
              <Typography variant="subtitle1" component="h3">
                Доступно:
                <Chip
                  label={currentCertificate && currentCertificate.typeCertificate === "service" ? "Услуга" : `${currentCertificate.certificateSum - certificate} ₽`}
                  color={"default"}
                  // color={currentCertificate.typeCertificate === "service" ? "primary" : "secondary"}
                />
              </Typography>
            </ItemGrid>
            {currentCertificate.typeCertificate === "amount"
              ? <Fragment>
                <ItemGrid xs={6} md={4} sm={3}>
                  <Field
                    autoFocus
                    name={name}
                    id={name}
                    label={labelNumber}
                    placeholder={labelNumber}
                    value={value}
                    component={InputNumber}
                    onChange={this.handleChangeInputNumber}
                    error={value > currentCertificate.certificateSum || value > balance}
                    errorMessage={value > currentCertificate.certificateSum ? `Не больше ${currentCertificate.certificateSum}` : `Остаток ${balance} ₽`}
                    disabled={disabled}
                    // fullWidth
                  />
                </ItemGrid>
                {value
                  ? <ItemGrid xs={6} md={4} sm={3}>
                    <Button
                      fullWidth
                      size={"xs"}
                      color={"success"}
                      disabled={disabled}
                      onClick={this.handleClickAddCount}
                    >
                      {addBtnText}
                    </Button>
                  </ItemGrid>
                  : null
                }
              </Fragment>
              : <Fragment>
                <ItemGrid xs={6} md={4} sm={3}>
                  {this.getSertificateOptions().length
                    ? <Field
                      isMulti
                      height={200}
                      label={labelGroup}
                      // classes={classes}
                      name={name}
                      id={name}
                      options={this.getSertificateOptions()}
                      // options={currentCertificate.servicesType}
                      onChange={this.handleChangeGroup}
                      component={CustomSelectView}
                      disabled={disabled}
                      // value={typeCard}
                    />
                    : <span>В сертификате нет услуг из корзины</span>
                  }

                </ItemGrid>
                {groupValues.length && isClick
                  ? <ItemGrid xs={6} md={4} sm={3}>
                    <Button
                      fullWidth
                      size={"xs"}
                      color={"success"}
                      disabled={disabled}
                      onClick={this.handleClickAddCountCertificate}
                    >
                      {addBtnText}
                    </Button>
                  </ItemGrid>
                  : null
                }
              </Fragment>
            }
          </ItemGrid>
          : null
        }
      </Fragment>
    );
  }
}

Certificate.defaultProps = {
  label: "Введите номер сертификата",
  labelNumber: "Введите сумму",
  labelGroup: "Выберите услугу",
  addBtnText: "Внести",
  helpText: "Номер не найден"
};

Certificate.propTypes = {
  classes: PropTypes.object,
  type: PropTypes.string,
  label: PropTypes.string,
  labelNumber: PropTypes.string,
  labelGroup: PropTypes.string,
  helpText: PropTypes.string,
  addBtnText: PropTypes.string,
  name: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  changeAddType: PropTypes.func.isRequired,
  changeDisabled: PropTypes.func.isRequired,
  addStopOption: PropTypes.func.isRequired
};

export default Certificate;
