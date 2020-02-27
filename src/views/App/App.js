import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";


import GridContainer from "components/Grid/GridContainer.jsx";
import ActonTill from "../../views/Till/ActonTill";

// core components
import Admin from "layouts/Admin.jsx";

import "assets/css/material-dashboard-react.css?v=1.6.0";

class App extends Component {

  state = {
    isClick: false
  };

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

  render() {
    const { administrators, isDay } = this.props;
    return (
      <Fragment>
        {!this.state.isClick && !isDay
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
          : isDay && <Admin {...this.props}/>
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
