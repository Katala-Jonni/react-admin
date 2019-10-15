import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import "date-fns";
import "moment/locale/ru";

import Member from "../Member";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import services from "views/Shop/data/data.js";
import CustomSelectView from "../../../components/Inputs/CustomSelectView";

import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/GridItem.jsx";

import typesPay from "views/Shop/data/typePay.js";

class RenderMembers extends Component {
  state = {
    totalServices: [],
    targetTypes: {
      cash: false,
      card: false,
      certificate: false

    },
    options: []
    // totalServices: {}
  };

  componentDidMount() {
    console.log("componentDidMount");
    this.setState({
      options: typesPay.map(item => ({
        value: item.name,
        label: item.value
      }))
    });
  }

  handleClickButton = () => {
    const { addField, fields } = this.props;
    addField();
    return fields.push({});
  };

  addService = ({ id, value, group }) => {
    const { fields } = this.props;
    // console.log(id);
    // console.log(value);
    // console.log(group);
    let price = 0;
    if (services[group]) {
      const product = services[group].find(el => el.title.toLowerCase() === value.toLowerCase());
      if (product) {
        price = product.price;
      }
    } else {
      price = 0;
    }
    const newTotalCounts = [...this.state.totalServices];
    newTotalCounts[id] = price;
    this.setState({
      totalServices: newTotalCounts
      // totalServices: { ...this.state.totalServices, [id]: price }
    });
  };

  removeService = index => {
    console.log(index);
    // const totalServices = { ...this.state.totalServices };
    // delete totalServices[index];
    // console.log(this.state.totalServices[index]);
    // const data = this.state.totalServices.filter((item, idx) => idx !== index);
    // console.log(data);
    // this.setState({
    //   totalServices: this.state.totalServices.filter((item, idx) => idx !== index)
    // });
  };

  // onch = () => {
  //   this.setState({
  //     changeMember: !this.state.changeMember
  //   });
  // };

  getTotalSum = () => {
    let count = 0;

    // const keys = Object.keys(this.state.totalServices);
    // keys.forEach(a => {
    //   count += +this.state.totalServices[a];
    //   // console.log(this.state.totalServices[a]);
    // });
    this.state.totalServices.forEach(a => count += +a);
    return count;
  };

  getOptions = () => {
    const { targetTypes } = this.state;
    if (typesPay && typesPay.length) {
      // return typesPay
      //   .map(item => {
      //     console.log(targetTypes[item.name]);
      //     if (targetTypes[item.name]) {
      //       return {
      //         value: item.name,
      //         label: item.value
      //       };
      //     }
      //   });
      const list = typesPay
        .filter(item => !targetTypes[item.name])
        .map(item => ({
          value: item.name,
          label: item.value
        }));
      console.log(list);

      return list;
    }
    return [];
  };

  changeTargetTypes = (type, type2, pos) => {
    if (!type) return;
    console.log(type, type2, pos);
    // console.log(type);
    // this.setState({
    //   options: typesPay.map(item => {
    //     if (item.name !== type) {
    //       console.log(type);
    //       console.log(item.name);
    //       return {
    //         value: item.name,
    //         label: item.value
    //       };
    //     }
    //   })
    //     .filter(item => item)
    // });

    // console.log(type);
    this.setState({
      targetTypes: { ...this.state.targetTypes, [type]: !this.state.targetTypes[type] }
    });
  };

  render() {
    const { fields, classes, isDisabledBtn, noButton, btnText } = this.props;
    const { changeMember, options } = this.state;
    // console.log(this.props);
    // console.log(this.state.options);
    // console.log(this.state.targetTypes);
    return (
      <Fragment>
        <ul className={classes.list}>
          {noButton
            ? null
            : <Fragment>
              <li>
                <GridContainer justify="flex-start" spacing={16}>
                  <ItemGrid xs={12} item>
                    {!this.props.isAdd
                      ? <Button
                        type="button"
                        color='primary'
                        variant="contained"
                        size="small"
                        className={classes.addButton}
                        // disabled={isDisabledBtn}
                        onClick={() => fields.push({})}
                        // onClick={this.handleClickButton}
                      >
                        {btnText}
                      </Button>
                      : null
                    }

                    {/*<Button*/}
                    {/*type="button"*/}
                    {/*color='primary'*/}
                    {/*variant="contained"*/}
                    {/*size="small"*/}
                    {/*className={classes.addButton}*/}
                    {/*disabled={isDisabledBtn}*/}
                    {/*>*/}
                    {/*Посчитать*/}
                    {/*</Button>*/}
                  </ItemGrid>
                </GridContainer>
              </li>
            </Fragment>
          }

          {fields.map((member, index) => {
            return (
              <li key={index}>
                <Member
                  member={member}
                  index={index}
                  classes={classes}
                  fields={fields}
                  noButton={noButton}
                  changeCounts={this.props.changeCounts}
                  error={this.props.erorr}
                  options={options}
                  // options={this.getOptions()}
                  changeTargetTypes={this.changeTargetTypes}
                  // addService={this.addService}
                  // removeService={this.removeService}
                />
              </li>
            );
          })}
        </ul>
        <Typography
          color='textPrimary'
          className={classes.addCardForm}
          variant="subtitle1">
          Сертификат на сумму: {this.getTotalSum()} ₽
        </Typography>
      </Fragment>
    );
  }
}

RenderMembers.defaultProps = {
  btnText: "Добавить тип оплаты"
};

RenderMembers.propTypes = {
  classes: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired,
  addField: PropTypes.func.isRequired,
  isDisabledBtn: PropTypes.bool,
  noButton: PropTypes.bool,
  btnText: PropTypes.string
};

export default RenderMembers;
