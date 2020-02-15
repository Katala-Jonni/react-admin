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
import defaultResource from "modules/Calendar/defaultResource";
import category from "views/Shop/data/category.js";
import services from "views/Shop/data/data.js";
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/GridItem.jsx";

class Member extends Component {
  state = {
    selectedDate: "",
    switchDate: false,
    groupValue: null,
    switchType: false

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

  handleChangeGroup = value => {
    this.setState({
      groupValue: value
    });
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
    // const keys = Object.keys(category)
    // if (keys.length) {
    //   return keys.map(item => {
    //     return services[item].filter(el => ({
    //       label: el.title,
    //       value: el.title,
    //       ...el
    //     }));
    //   });
    // }
    return [];
  };

  getOptions = () => {
    const { groupValue } = this.state;
    console.log(groupValue);
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

  render() {
    const { member, index, classes, fields, noButton } = this.props;
    const { selectedDate, switchDate, groupValue, switchType } = this.state;
    // console.log(groupValue);
    const arr = [1, 2, 3, 4, 5];
    return (
      <Fragment>
        {noButton
          ? null
          :
          <div className={cx(classes.flex, classes.bottomMargin)}>
            <h4 className={classes.itemHeader}>Услуга #{index + 1}</h4>
            <Fab
              color='secondary'
              variant="extended"
              size="small"
              className={classes.flexItem}
              onClick={() => fields.remove(index)}
              // onClick={this.handleRemoveService}
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
                label='Выберите вид услуги'
                options={this.getServices()}
                height={200}
                // disabled={isDisabled}
                // value={typeCard}
                component={CustomSelectView}
                onChange={this.handleChangeGroup}
                // handleFocus={this.handleFocusSelect}
                // onInputChange={this.onInputChange}
                onMenuOpen={this.onMenuOpen}
                onMenuClose={this.onMenuClose}
              />
            </div>
          </ItemGrid>

          {groupValue && switchType
            ? <ItemGrid xs={12} sm={6} item>
              <Field
                name={`${member}.servicesType`}
                classes={classes}
                id={`${member}.servicesType`}
                isMulti
                label='Выберите услугу'
                options={this.getOptions()}
                height={200}
                // disabled={isDisabled}
                // value={typeCard}
                // onChange={this.handleChangeTypeService}
                component={CustomSelectView}
                onChange={this.handleChangeType}
              />
            </ItemGrid>
            : null
          }

        </GridContainer>

        <Field
          name={`${member}.title`}
          label="Описание услуги"
          id={`${member}.title`}
          inputProps={{
            multiline: true,
            rows: 3
          }}
          component={CustomInputView}
        />

        {/*{switchDate*/}
        {/*? <Field*/}
        {/*name={`${member}.resourceId`}*/}
        {/*type="text"*/}
        {/*classes={classes}*/}
        {/*id={`${member}.resourceId`}*/}
        {/*label="Имя мастера/Солярий"*/}
        {/*options={this.getOptions()}*/}
        {/*disabled={!selectedDate}*/}
        {/*component={CustomSelectView}*/}
        {/*/>*/}
        {/*: null*/}
        {/*}*/}
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
