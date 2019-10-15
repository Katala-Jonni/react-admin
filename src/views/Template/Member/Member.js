import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";
import cx from "classnames";

// core components

// material-ui components
import CustomSelectView from "components/Inputs/CustomSelectView";
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/GridItem.jsx";

// @material-ui/icons

class Member extends Component {
  state = {
    groupValue: null,
    component: null,
    disabled: false
  };

  handleChangeGroup = value => {
    if (!value) return;
    const { options } = this.props;
    const typePay = options.find(item => item.value === value);
    this.setState({
      groupValue: value,
      component: typePay ? typePay.component : null,
      type: typePay ? typePay.value : null
    });
  };

  getOptions = () => {
    const { options } = this.props;
    if (options && options.length) {
      return options.map(({ label, value }) => ({ label, value }));
    }
    return [];
  };

  changeDisabled = () => {
    this.setState({
      disabled: true
    });
  };

  render() {
    const { member, index, classes, label, changeAddType, addStopOption, balance, reset } = this.props;
    const { groupValue, component: Component, type, disabled } = this.state;
    return (
      <Fragment>
        <div className={cx(classes.flex, classes.bottomMargin)}>
          <h4 className={classes.itemHeader}>Тип оплаты #{index + 1}</h4>
        </div>
        <GridContainer justify="flex-start" alignItems='baseline' spacing={16}>
          <ItemGrid xs={12} md={6} item>
            <div className={classes.bottomMargin}>
              <Field
                height={200}
                label={label}
                classes={classes}
                id={`${member}.typePay`}
                name={`${member}.typePay`}
                options={this.getOptions()}
                onChange={this.handleChangeGroup}
                component={CustomSelectView}
                disabled={disabled}
                // value={typeCard}
              />
            </div>
          </ItemGrid>
          {Component ?
            <Component
              name={`${member}.count`}
              type={type}
              changeAddType={changeAddType}
              changeDisabled={this.changeDisabled}
              addStopOption={addStopOption}
              balance={balance}
              reset={reset}
            />
            : null
          }
        </GridContainer>
      </Fragment>
    );
  }
}

Member.defaultProps = {
  label: "Выберите тип оплаты"
};

Member.propTypes = {
  options: PropTypes.array.isRequired,
  classes: PropTypes.object,
  member: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
  changeAddType: PropTypes.func.isRequired,
  addStopOption: PropTypes.func.isRequired,
  label: PropTypes.string
};

export default Member;
