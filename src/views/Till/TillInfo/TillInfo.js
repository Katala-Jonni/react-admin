import React, { Component } from "react";
import PropTypes from "prop-types";

// material-ui components
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogTable from "../DialogTable";

// material-ui icons
import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";


const useStyles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit * 1
  }
});

class TillInfo extends Component {
  state = {
    inTillDialog: false,
    outTillDialog: false
  };


  componentDidMount() {
    this.props.loadTill();
  }

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

  getAmount = value => {
    let amount = 0;
    this.props[value].forEach((a) => amount += a.count);
    return amount;
  };

  render() {
    const { classes, inTill, outTill } = this.props;
    const { inTillDialog, outTillDialog } = this.state;
    return (
      <div className={classes.root}>
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
              // col={inTillDialog ? "0" : "1"}
              getAmount={this.getAmount}
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
            label={`Приход ${this.getAmount("inTill")} ₽`}
            onClick={() => this.handleClick("inTillDialog")}
            className={classes.chip}
            color={"primary"}
          />
        </Tooltip>
        <Tooltip title="Добавить расход" placement="top">
          <Chip
            icon={<Remove/>}
            label={`Расход ${this.getAmount("outTill")} ₽`}
            onClick={() => this.handleClick("outTillDialog")}
            className={classes.chip}
            color={"secondary"}
          />
        </Tooltip>
      </div>
    );
  }
}

TillInfo.defaultProps = {};

TillInfo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(TillInfo);
