import React, { Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import moment from "moment/moment";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import DialogTitle from "@material-ui/core/DialogTitle";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Edit from "@material-ui/icons/Edit";
import Select from "react-select";
import defaultResource from "../../../modules/Calendar/defaultResource";
import EditItems from "./EditItems";

class AddMaster extends React.Component {
  state = {
    open: false,
    color: "primary",
    value: [],
    editValue: null
  };

  handleClickOpen = () => {
    this.setState({ open: true, value: [] });
  };

  handleClose = () => {
    this.setState({ open: false, color: "primary", value: [] });
  };

  handleAdd = () => {
    this.state.value && this.state.value.length && this.props.addResource({
      resourcesInfo: this.state.value,
      currentDate: moment(this.props.date).format("DD.MM.YY")
    });
    this.setState({ value: [] });
    this.handleClose();
  };

  changeState = value => this.setState({ editValue: value });

  handleEdit = () => {
    this.handleClose();
    if (!this.state.editValue) {
      return null;
    }

    const { endValue, startValue } = this.state.editValue;
    const endResource = {
      resourceId: endValue.label,
      resourceTitle: endValue.value
    };
    const startResource = {
      resourceId: startValue.label,
      resourceTitle: startValue.value
    };

    this.props.editMastersStart({
      startResource,
      endResource,
      currentDate: moment(this.props.date).valueOf()
    });

    this.setState({ editValue: null });
  };

  handleOnChangeSelect = data => {
    const items = Array.isArray(data) ? data : [data];
    const newData = items.map(item => {
      return {
        resourceId: item.value,
        resourceTitle: item.value
      };
    });
    this.setState({
      color: data.length ? "secondary" : "primary",
      value: newData
    });
  };

  getTitleOptions = () => this.props.resource.map(item => item.resourceTitle && item.resourceTitle);

  getOptions = () => this.props.masters && this.props.masters.filter(item => !this.getTitleOptions().includes(item.value));

  getStartOptions = () => {
    return this.props.masters.filter(item => {
      return this.getTitleOptions().includes(item.value) && item.value.toLowerCase() !== defaultResource[0].resourceTitle.toLowerCase();
    });
  };

  render() {
    const { classes, isNew, title, isNewEdit, isNewAdd, btnText } = this.props;
    return (
      <Fragment>
        <Tooltip title={isNew ? isNewEdit : isNewAdd}>
          <Fab
            variant="extended"
            color="primary"
            onClick={this.handleClickOpen}
            className={classes.button}
          >
            {isNew ? <Edit/> : <PersonAdd/>}
          </Fab>
        </Tooltip>
        <Dialog
          maxWidth={"sm"}
          open={this.state.open}
          onClose={this.handleClose}
          scroll="body"
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">
            {title}
          </DialogTitle>
          <DialogContent>
            {isNew
              ? <EditItems
                classes={classes}
                startOptions={this.getStartOptions()}
                changeState={this.changeState}
              />
              : <Select
                className={classNames(classes.bottom)}
                classNamePrefix="select"
                name="masters"
                options={this.getOptions()}
                placeholder="Начните печатать..."
                isMulti={!isNew}
                menuIsOpen
                maxMenuHeight={200}
                onChange={this.handleOnChangeSelect}
              />
            }
          </DialogContent>
          <DialogActions>
            <Button
              onClick={isNew ? this.handleEdit : this.handleAdd}
              color={this.state.color}
              variant="contained"
            >
              {btnText}
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

AddMaster.defaultProps = {
  title: "Выберите мастера",
  isNewEdit: "Изменить мастера",
  isNewAdd: "Добавить мастера",
  btnText: "Выбрать",
  btnAddText: "Добавить"
};

AddMaster.propTypes = {
  classes: PropTypes.object.isRequired,
  changeMasters: PropTypes.func.isRequired,
  isNew: PropTypes.bool,
  isNewEdit: PropTypes.string,
  isNewAdd: PropTypes.string,
  title: PropTypes.string,
  resource: PropTypes.arrayOf(PropTypes.object),
  date: PropTypes.object,
  totalResource: PropTypes.object.isRequired,
  btnText: PropTypes.string,
  btnAddText: PropTypes.string,
  masters: PropTypes.array
};

export default AddMaster;
