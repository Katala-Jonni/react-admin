import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import GridContainer from "components/Grid/GridContainer.jsx";
import ActonTill from "../../views/Till/ActonTill";
import isOnline from "is-online";
// core components
import Snackbar from "@material-ui/core/Snackbar";

import Admin from "layouts/Admin.jsx";
import Error from "components/Modal/Error";

import "assets/css/material-dashboard-react.css?v=1.6.0";
import { startApp } from "../../modules/Admin";
import Progress from "components/Progress/Progress";

class App extends Component {

  state = {
    isClick: false
  };

  componentDidMount() {
    const { place } = this.props;
    // this.props.startApp({ place: this.props.place });
    this.props.startApp();
  }

  isValidData = data => {
    if (!data || typeof data !== "object") return false;
    const keys = Object.keys(data);
    return !!keys.length;
  };

  handleClickAddInTill = data => {
    if (!this.isValidData(data)) return;
    return this.props.loadTill(data);
  };

  changeClick = () => {
    this.setState({
      isClick: true
    });
  };

  handleRequestClose = event => {
    this.props.handle_request_close();
  };

  render() {
    const { administrators, isDay, isError, showMessage, alertMessage, lastDay } = this.props;
    const { isClick } = this.state;
    // console.log(isError);
    if (isError === null) {
      return (
        <Progress/>
      );
    }
    else if (isError === true) {
      return <Error/>;
    }
    return (
      <Fragment>
        {/*{!this.state.isClick && !isDay*/}
        {/*{!isClick ?*/}
        {/*<div*/}
        {/*className="loader-view-block">*/}
        {/*<div className="loader-view">*/}
        {/*<CircularProgress/>*/}
        {/*</div>*/}
        {/*</div>*/}
        {/*: null*/}
        {/*}*/}
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={showMessage}
          autoHideDuration={3000}
          onClose={this.handleRequestClose}
          message={<span id="message-id">{alertMessage}</span>}
        />
        {!isDay && !isClick
          ? <Dialog
            maxWidth={"lg"}
            // fullScreen={lock}
            fullScreen={true}
            fullWidth={true}
            open={!isDay}
            // open={!!(lock && isLoad) && !viewTill}
            // onClose={inTill.length ? this.handleClickLock : () => ({})}
            scroll="body"
          >
            <DialogTitle>
              Для продолжения необходимо выбрать администратора, внести сумму прихода и открыть смену.
            </DialogTitle>
            <DialogContent>
              <GridContainer
                direction={"row"}
                justify={"center"}
                alignItems={"center"}
                alignContent={"center"}
              >
                <ActonTill
                  handleClickAdd={this.handleClickAddInTill}
                  btnAdd={"Открыть смену"}
                  label={"Введите сумму"}
                  changeClick={this.changeClick}
                  options={administrators}
                  selectName={"administrators"}
                  selectLabel={"Выберите администратора"}
                  isOutTill
                  // решить вопрос касательно внесения суммы чтобы мог только один раз внести сумму
                />
              </GridContainer>
            </DialogContent>
            <DialogActions>
            </DialogActions>
          </Dialog>
          : isClick && !isDay ? <Progress/> : <Admin {...this.props}/>
        }
      </Fragment>
    );
  }
}

App.defaultProps = {};

App.propTypes = {
  classes: PropTypes.object
};

export default App;
