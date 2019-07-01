import React, { Component } from "react";
import propTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import Button from "../../../components/CustomButtons/Button";
import { withStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/GridItem.jsx";
import customEventsStyle from "assets/jss/material-dashboard-react/components/customEventsStyle";
import InputNumber from "../../../components/Inputs/InputNumber";
import Select from "react-select";

const getInitialState = () => ({
  selectValue: null,
  countCart: null
});

class ActonTill extends Component {
  state = {
    ...getInitialState()
  };

  handleChangeCountCart = value => {
    this.setState({
      countCart: !value ? null : value
    });
  };

  removeField = () => {
    this.setState({
      ...getInitialState()
    });
  };

  handleChange = data => {
    if (data) {
      this.setState({
        selectValue: data
      });
    }
  };

  handleClickAdd = () => {
    const { selectValue, countCart } = this.state;
    const data = {
      count: countCart,
      title: selectValue ? selectValue.value : null
    };
    this.props.handleClickAdd(data);
    this.removeField();
  };

  render() {
    const {
      classes,
      btnAdd,
      isOutTill,
      options
    } = this.props;
    const { selectValue, countCart } = this.state;
    console.log(countCart);
    return (
      <div style={{ width: "100%" }}>
        <GridContainer spacing={16} direction="row" alignItems={"baseline"}>
          {isOutTill
            ? <ItemGrid xs={3}>
              <Select
                options={options}
                name="outTillSelect"
                type="text"
                id="outTillSelect"
                label="Выберите вид расхода"
                placeholder='Выберите вид расхода'
                classes={classes}
                value={selectValue}
                onChange={this.handleChange}
              />
            </ItemGrid>
            : null
          }

          {selectValue || !isOutTill
            ? <ItemGrid xs={2}>
              <InputNumber
                value={countCart}
                onChange={this.handleChangeCountCart}
                placeholder='Введите число'
                label="Введите число"
                name="tillFormInputNumber"
                type="text"
                autoFocus
              />
            </ItemGrid>
            : null
          }
          {countCart || !isOutTill
            ? <ItemGrid xs={3}>
              <Button
                variant="contained"
                color={!countCart && countCart < 1 ? "danger" : "success"}
                disabled={!countCart && countCart < 1}
                onClick={this.handleClickAdd}
              >
                {btnAdd}
              </Button>
            </ItemGrid>
            : null
          }
        </GridContainer>
      </div>
    );
  }
}

ActonTill.defaultProps = {
  btnAdd: "Внести"
};

ActonTill.propTypes = {
  classes: propTypes.object,
  handleClickAdd: propTypes.func.isRequired,
  btnAdd: propTypes.string,
  options: propTypes.arrayOf(propTypes.object),
  isOutTill: propTypes.bool
};

export default withStyles(customEventsStyle)(ActonTill);
