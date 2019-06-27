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
    // justifyContent: "center",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit * 1
  }
});

class TillInfo extends Component {
  state = {
    inTill: 0,
    outTill: 0,
    inTillDialog: false,
    outTillDialog: false,
    fullScreen: false
  };

  componentDidMount() {

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

  // handleClickFullScreen = () => {
  //   this.setState({
  //     fullScreen: !this.state.fullScreen
  //   });
  // };

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
    const { classes } = this.props;
    const { inTill, outTill, inTillDialog, outTillDialog, fullScreen } = this.state;
    return (
      <div className={classes.root}>
        <Dialog
          maxWidth={"md"}
          open={inTillDialog || outTillDialog}
          onClose={this.handleClickClose}
          fullScreen={true}
          scroll="paper"
          // aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">
            Информация по {inTillDialog ? "приходу" : "расходу"} в кассе
          </DialogTitle>
          <DialogContent>
            <DialogTable
              isInTill={inTillDialog}
              tableHead={this.getTableHead()}
              col={inTillDialog ? "1" : "2"}
            />
          </DialogContent>
          <DialogActions>
            {/*<Button*/}
            {/*onClick={this.handleClickFullScreen}*/}
            {/*color={"primary"}*/}
            {/*variant="contained"*/}
            {/*>*/}
            {/*{fullScreen ? "Обычный экран" : "Во весь экран"}*/}
            {/*</Button>*/}
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
            label={`Приход ${inTill} ₽`}
            onClick={() => this.handleClick("inTillDialog")}
            className={classes.chip}
            color={"primary"}
          />
        </Tooltip>
        <Tooltip title="Добавить расход" placement="top">
          <Chip
            icon={<Remove/>}
            label={`Расход ${outTill} ₽`}
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
