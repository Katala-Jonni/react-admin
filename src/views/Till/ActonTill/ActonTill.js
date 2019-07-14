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
  // isClick: false
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
        // isClick: false
      });
    }
  };

  handleClickAdd = () => {
    const { selectValue, countCart } = this.state;
    if (!countCart) return;
    if (selectValue && !this.props.isOutTill) return;
    const data = {
      count: countCart,
      title: selectValue ? selectValue.value : null
    };
    this.props.handleClickAdd(data);
    this.removeField();
    // this.setState({
    //   isClick: true
    // });
    if (this.props.changeClick) {
      this.props.changeClick();
    }
  };

  handleUp = evt => {
    if (evt.keyCode === 13) {
      this.handleClickAdd();
    }
  };

  render() {
    const {
      classes,
      btnAdd,
      isOutTill,
      options,
      label,
      selectLabel,
      selectName
    } = this.props;
    const { selectValue, countCart } = this.state;
    return (
      <div style={{ width: "100%" }}>
        <GridContainer spacing={16} direction="row" alignItems={"baseline"}>
          {isOutTill
            ? <ItemGrid xs={3}>
              <Select
                options={options}
                name={selectName}
                type="text"
                id={selectName}
                label={selectLabel}
                placeholder={selectLabel}
                classes={classes}
                value={selectValue}
                onChange={this.handleChange}
              />
            </ItemGrid>
            : null
          }
          <ItemGrid
            xs={!isOutTill ? 12 : 9}
            container
            spacing={16}
            justify={!isOutTill ? "center" : "flex-start"}
          >
            {selectValue || !isOutTill
              ? <ItemGrid xs={2}>
                <InputNumber
                  value={countCart}
                  onChange={this.handleChangeCountCart}
                  placeholder={label}
                  label={label}
                  name="tillFormInputNumber"
                  type="text"
                  autoFocus
                  // disabled={isClick}
                  onKeyUp={this.handleUp}
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
          </ItemGrid>
        </GridContainer>
      </div>
    );
  }
}

ActonTill.defaultProps = {
  btnAdd: "Внести",
  label: "Введите число",
  selectLabel: "Выберите вид расхода",
  selectName: "outTillSelect"
};

ActonTill.propTypes = {
  classes: propTypes.object,
  handleClickAdd: propTypes.func.isRequired,
  btnAdd: propTypes.string,
  selectLabel: propTypes.string,
  selectName: propTypes.string,
  options: propTypes.arrayOf(propTypes.object),
  isOutTill: propTypes.bool
};

export default withStyles(customEventsStyle)(ActonTill);
