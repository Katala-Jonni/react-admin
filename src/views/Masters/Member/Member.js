import React, { Component, PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field } from "redux-form";
import cx from "classnames";
import CustomInputView from "components/Inputs/CustomInputView";
import Fab from "@material-ui/core/Fab";
import Remove from "@material-ui/icons/Remove";
import CustomSelectView from "components/Inputs/CustomSelectView";
import services from "views/Shop/data/data.js";
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/GridItem.jsx";

class Member extends PureComponent {
  state = {
    selectedDate: "",
    switchDate: false,
    groupValue: {
      value: this.props.memberValue.servicesGroup,
      label: this.props.memberValue.servicesGroup
    },
    switchType: false,
    selectValue: null,
    countValue: this.props.memberValue.count
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log(nextProps, prevState);
    return null;
  }

  handleChangeGroup = value => {
    // console.log(value);
    // console.log(this.state.countValue);
    if (value) {
      // this.props.onChangeIgnoreMember({
      //   index: this.props.index,
      //   value: {
      //     servicesGroup: {
      //       value: value,
      //       label: value
      //     },
      //     count: this.state.countValue
      //   }
      // });
      // this.props.onChangeIgnoreMember({
      //   index: this.props.index,
      //   value: {
      //     servicesGroup: value,
      //     count: this.state.countValue
      //   }
      // });
      // return this.setState({
      //   groupValue: {
      //     value: value,
      //     label: value
      //   }
      // });
    }
  };

  handleChangeCount = evt => {
    // const { value } = evt.target;

    if (evt && evt.target) {
      // console.log(evt.target);
      // console.log(this.props);
    }
    // if (value) {
    //   this.props.onChangeIgnoreMember({
    //     index: this.props.index,
    //     value: {
    //       servicesGroup: this.state.groupValue,
    //       count: +value
    //     }
    //   });
    //   this.setState({
    //     countValue: +value
    //   });
    // }
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

  onMenuOpen = () => {
    // console.log("onMenuOpen");
    this.setState({
      switchType: false
      // groupValue: null
    });
    // this.handleChangeTypeService("notValue");
  };

  onMenuClose = () => {
    console.log("onMenuClose");
    this.setState({
      switchType: true
    });
  };

  handleDeleteMember = () => {
    const { index, fields, ignoreMembers, deleteIgnoreMembers } = this.props;

    const keysMembers = Object.keys(ignoreMembers)
      .map((item) => +item !== index && ignoreMembers[item])
      .filter((el) => el)
      .reduce((start, item, idx) => {
        start[idx] = item;
        return start;
      }, {});
    fields.remove(index);
    const defaultIgnorMember = { servicesGroup: "", count: 50 };
    const keysIgnorMembers = Object.keys(keysMembers);
    deleteIgnoreMembers({ ignoreMembers: keysIgnorMembers.length ? keysMembers : defaultIgnorMember });
  };

  render() {
    const { member, index, classes, fields, noButton, services, memberValue, todo, ignoreMembers, deleteIgnoreMembers, options } = this.props;
    const { groupValue, countValue } = this.state;
    const val = {
      value: memberValue.servicesGroup,
      label: memberValue.servicesGroup
    };
    return (
      <Fragment>
        {noButton
          ? null
          :
          <div className={cx(classes.flex, classes.bottomMargin)}>
            <h4 className={classes.itemHeader}>Исключение #{index + 1}</h4>
            <Fab
              color='secondary'
              variant="extended"
              size="small"
              className={classes.flexItem}
              onClick={this.handleDeleteMember}
            >
              <Remove/>
            </Fab>
          </div>
        }

        <GridContainer justify="flex-start" spacing={16}>
          <ItemGrid xs={12} sm={6} item>
            <div className={classes.bottomMargin}>
              <Field
                name={`${member}.servicesGroup`}
                classes={classes}
                id={`${member}.servicesGroup`}
                label='Выберите услугу'
                options={options}
                height={200}
                // disabled={isDisabled}
                component={CustomSelectView}
                onChange={this.handleChangeGroup}
                selectValues={val}
                // selectValues={groupValue}
                isMaster
              />
            </div>
          </ItemGrid>

          {groupValue
            ? <ItemGrid xs={12} sm={6} item>
              <Field
                name={`${member}.count`}
                label="Введите значение"
                type={"number"}
                id={`${member}.count`}
                onChange={this.handleChangeCount}
                value={countValue}
                // value={countValue}
                initialSelectValue={countValue || todo.defaultPercent}
                component={CustomInputView}
              />
            </ItemGrid>
            : null
          }

        </GridContainer>
      </Fragment>
    );
  }
}

Member.propTypes = {
  classes: PropTypes.object.isRequired,
  // totalResource: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired,
  member: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  noButton: PropTypes.bool
};

const mapStateFromProps = state => ({
  // totalResource: getTotalResource(state)
});

export default connect(mapStateFromProps, null)(Member);
