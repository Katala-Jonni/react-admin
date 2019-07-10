import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment/min/moment-with-locales";

// material-ui components
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import CustomButton from "components/CustomButtons/Button.jsx";
import DialogTable from "../DialogTable";
import SweetAlert from "react-bootstrap-sweetalert";
import customEventsStyle from "../../../assets/jss/material-dashboard-react/components/customEventsStyle";

// material-ui icons
import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";
import Lock from "@material-ui/icons/Lock";
import LockOpen from "@material-ui/icons/LockOpen";
import { startRemoveDay } from "../../../modules/Shop";

//
// const useStyles = theme => ({
//   root: {
//     display: "flex",
//     flexWrap: "wrap"
//   },
//   chip: {
//     margin: theme.spacing.unit * 1
//   },
//   customEventsStyle
// });

class TillInfo extends Component {
  state = {
    inTillDialog: false,
    outTillDialog: false,
    alert: null
  };

  handleClick = data => {
    this.setState({
      [data]: true
    });
  };

  handleClickClose = () => {
    this.setState({
      inTillDialog: false,
      outTillDialog: false,
      fullScreen: false
    });
  };

  successDelete = () => {
    // this.props.deleteEvents();
    this.setState({
      alert: (
        <SweetAlert
          success
          style={{ display: "block", marginTop: "-100px" }}
          title={this.props.successAlertTitle}
          onConfirm={() => {}}
          onCancel={() => {}}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
        >
          {this.props.successAlertMessage}
        </SweetAlert>
      )
    });
    const { startRemoveDay, inTill, outTill, paymentByCard, revenue, income, totalDay, totalOrders, inTillSum, outTillSum } = this.props;
    const cash = revenue + inTillSum - (revenue - income) - outTillSum - paymentByCard;
    const data = {
      inTill,
      outTill,
      paymentByCard,
      revenue,
      income,
      totalDay,
      totalOrders,
      cash,
      date: moment().format("DD.MM.YY")
    };
    startRemoveDay(data);
  };

  handleClickLock = () => {
    this.setState({
      alert: (
        <SweetAlert
          warning
          style={{ display: "block", marginTop: "-100px" }}
          title={"Закрыть кассовую смену?"}
          onConfirm={() => this.successDelete()}
          onCancel={() => this.cancelDelete()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
          cancelBtnCssClass={
            this.props.classes.button + " " + this.props.classes.danger
          }
          confirmBtnText={this.props.confirmBtnText}
          cancelBtnText={this.props.cancelBtnText}
          showCancel
        >
          {this.props.deleteAlertMessage}
        </SweetAlert>
      )
    });
  };

  cancelDelete = () => {
    this.hideAlert();
  };

  hideAlert = () => {
    this.setState({
      alert: null
    });
  };

  getInfoTotalDay = () => {
    const { totalDay } = this.props;
    const keys = Object.keys(totalDay);
    return !!keys.length;
  };

  getTableHead = () => {
    return this.state.inTillDialog
      ? [
        "#",
        "Сумма",
        "Время"
      ]
      : [
        "#",
        "Наименование",
        "Сумма",
        "Время"
      ];
  };

  render() {
    const { classes, inTillSum, outTillSum } = this.props;
    const { inTillDialog, outTillDialog } = this.state;
    return (
      <div className={classes.root}>
        {this.state.alert}
        <Dialog
          maxWidth={"md"}
          open={inTillDialog || outTillDialog}
          onClose={this.handleClickClose}
          fullScreen={true}
          scroll="paper"
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">
            Информация по {inTillDialog ? "приходу" : "расходу"} в кассе
          </DialogTitle>
          <DialogContent>
            <DialogTable
              isInTill={inTillDialog}
              tableHead={this.getTableHead()}
              col={"1"}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleClickClose}
              color={"primary"}
              variant="contained"
            >
              Закрыть
            </Button>
          </DialogActions>
        </Dialog>
        <Tooltip title="Добавить приход" placement="top">
          <Chip
            icon={<Add/>}
            label={`Приход ${inTillSum} ₽`}
            onClick={() => this.handleClick("inTillDialog")}
            className={classes.chip}
            color={"primary"}
          />
        </Tooltip>
        <Tooltip title="Добавить расход" placement="top">
          <Chip
            icon={<Remove/>}
            label={`Расход ${outTillSum} ₽`}
            onClick={() => this.handleClick("outTillDialog")}
            className={classes.chip}
            color={"secondary"}
          />
        </Tooltip>
        <Tooltip title="Закрыть смену" placement="top">
          <CustomButton
            round
            size={"sm"}
            color={"warning"}
            onClick={this.handleClickLock}
          >
            <LockOpen/>
          </CustomButton>
        </Tooltip>
      </div>
    );
  }
}

TillInfo.defaultProps = {
  btnRemoveText: "Удалить",
  btnEditText: "Изменить",
  btnSaveText: "Сохранить",
  btnCanсeledText: "Отмена",
  deleteAlertTitle: "Вы уверены?",
  deleteAlertMessage: "Кассовые операции обнулятся, интерфейс приложения станет недоступным!",
  successAlertTitle: "Кассовая смена закрыта!",
  successAlertMessage: "Данные кассовой смены улетели куда-то в никуда!",
  confirmBtnText: "Да, закрыть кассовую смену!",
  cancelBtnText: "Отмена"
};

TillInfo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(customEventsStyle)(TillInfo);
