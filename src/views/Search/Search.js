import React, { Component, Fragment } from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import PropTypes from "prop-types";
import moment from "moment";
import validate from "modules/Sun/validate.js";

// core components
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import Chip from "@material-ui/core/Chip";
import CircularProgress from "@material-ui/core/CircularProgress";

// material-ui components
import CustomInputView from "components/Inputs/CustomInputView";
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import InputNumber from "components/Inputs/InputNumber.js";

// @material-ui/icons

// style
import customEventsStyle from "assets/jss/material-dashboard-react/components/customEventsStyle";

class Search extends Component {
  state = {
    searchNumber: null
  };

  handleClickResetSearchValue = () => {
    const { reset, searchData, onDeleteState } = this.props;
    this.setState({
      searchNumber: null
    });
    reset();
    onDeleteState();
    // searchData(null);
  };

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({
      [name]: value.trim()
    });
  };

  handleClickSearch = evt => {
    evt.preventDefault();
    const { searchNumber } = this.state;
    const { getLoader } = this.props;
    getLoader && getLoader();
    this.props.searchData(searchNumber);
    // this.props.startSearchNumber(searchNumber);
  };

  // handleClickSearch = evt => {
  //   console.log(evt);
  // };


  render() {
    const {
      label,
      placeholder,
      name,
      id,
      btnClean,
      btnAdd,
      viewIcon,
      classes,
      loader,
      isPay
    } = this.props;
    const { searchNumber } = this.state;
    return (
      <Fragment>
        <GridContainer
          spacing={8}
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <ItemGrid xs={12} md={searchNumber ? 9 : 12}>
            <div className={classes.addCardForm}>
              {/*<form onSubmit={this.handleSubmit}>*/}
              <Field
                autoFocus
                viewIcon={viewIcon}
                id={id}
                name={name}
                label={label}
                // disabled={loader}
                value={searchNumber}
                placeholder={placeholder}
                component={CustomInputView}
                onChange={this.handleChange}
                // error={true}
                // error={isVerifyCardNumber}
                // type={"search"}
                // helpText={!pristine && !isVerifyCardNumber ? null : verifyPhoneMessage}
              />
              {/*</form>*/}
            </div>
          </ItemGrid>
          {searchNumber
            ? <Fragment>
              <GridContainer
                item
                md={3}
                xs={12}
                spacing={8}
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                <ItemGrid xs={12} md={6}>
                  <Button
                    fullWidth
                    size={!isPay ? "xs" : "lg"}
                    color={"info"}
                    // disabled={loader}
                    type={"button"}
                    onClick={this.handleClickSearch}
                  >
                    {btnAdd}
                  </Button>
                </ItemGrid>
                {!isPay ?
                  <ItemGrid xs={12} md={6}>
                    <Button
                      fullWidth
                      size={"xs"}
                      color={"defaultNoBackground"}
                      // disabled={loader}
                      onClick={this.handleClickResetSearchValue}
                    >
                      {btnClean}
                    </Button>
                  </ItemGrid>
                  : null}
              </GridContainer>
            </Fragment>
            : null
          }
        </GridContainer>
      </Fragment>
    );
  }
}

Search.defaultProps = {
  btnClean: "Очистить",
  btnAdd: "Найти",
  label: "Введите номер*",
  name: "searchNumber",
  id: "searchNumber",
  placeholder: "1234567890"
};

Search.propTypes = {
  classes: PropTypes.object,
  btnClean: PropTypes.string,
  btnAdd: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  viewIcon: PropTypes.bool,
  getLoader: PropTypes.func,
  loader: PropTypes.bool
};

export default reduxForm({
  form: "searchInfo"
  // validate
})(withStyles(customEventsStyle)(Search));
