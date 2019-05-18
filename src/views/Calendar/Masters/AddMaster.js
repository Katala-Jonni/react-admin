import React, { Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
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
import mastersData from "../../../modules/Calendar/mastersData";
import defaultResource from "../../../modules/Calendar/defaultResource";
import EditItems from "./EditItems";
import { editMastersStart } from "../../../modules/Calendar";
import moment from "moment/moment";
// const EditItems = ({ classes, startOptions, residueOptions, handleOnChangeSelect }) => {
//   console.log(residueOptions);
//   return (
//     <Fragment>
//       <Select
//         className={classNames(classes.mBottom, "basic-single")}
//         classNamePrefix="select"
//         name="masters"
//         options={startOptions}
//         placeholder="Выберите что НЕ нужно ..."
//         maxMenuHeight={200}
//         onChange={handleOnChangeSelect}
//       />
//       <Select
//         className={classNames(classes.bottom, "basic-single")}
//         classNamePrefix="select"
//         name="masters"
//         options={residueOptions}
//         placeholder="Выберите что нужно ..."
//         maxMenuHeight={200}
//         onChange={handleOnChangeSelect}
//       />
//     </Fragment>
//
//   );
// };

const styles = () => ({
  bottom: {
    marginBottom: "200px"
  },
  mBottom: {
    marginBottom: "30px"
  }
});

class AddMaster extends React.Component {
  state = {
    open: false,
    fullWidth: true,
    maxWidth: "sm",
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
    this.handleClose();
    this.state.value && this.state.value.length && this.props.changeMasters({
      date: moment(this.props.date).format("DD.MM.YY"),
      totalResource: this.props.totalResource,
      value: this.state.value
    });

    this.setState({
      value: []
    });
  };

  editResource = data => {
    if (!data) {
      return null;
    }
    // this.state.value && this.props.changeMasters(this.state.value);
  };

  changeState = value => {
    console.log(value);
    this.setState({
      editValue: value
    });
  };

  handleEdit = evt => {
    // console.log(evt);
    this.handleClose();
    // console.log(this.state.editValue);
    if (!this.state.editValue) {
      return null;
    }
    // console.log(this.props);
    // возможно нужно поставить лоадер,
    // здесь идет загрузка и обновление данных
    // console.log(this.props);
    // console.log(this.state);
    this.props.editMastersStart({
      ...this.state.editValue,
      date: this.props.date,
      resource: this.props.resource,
      events: this.props.events
    });

    this.setState({
      editValue: null
    });
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

  getTitleOptions = () => this.props.resource.map(item => item.resourceTitle);

  getOptions = () => this.props.masters.filter(item => !this.getTitleOptions().includes(item.value));

  getStartOptions = () =>
    this.props.masters.filter(item =>
      this.getTitleOptions().includes(item.value)
      && item.value.toLowerCase() !== defaultResource[0].resourceTitle.toLowerCase()
    );

  render() {
    const { classes, isNew } = this.props;
    return (
      <Fragment>
        <Tooltip title={isNew ? "Изменить мастера" : "Добавить мастера"}>
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
            Выберите мастера
          </DialogTitle>
          <DialogContent>
            {isNew
              ? <EditItems
                classes={classes}
                startOptions={this.getStartOptions()}
                resource={this.props.resource}
                handleEdit={this.editResource}
                changeState={this.changeState}
                // date={date}
              />
              : <Select
                className={classNames(classes.bottom, "basic-single")}
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
              Выбрать
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

AddMaster.propTypes = {
  classes: PropTypes.object.isRequired,
  changeMasters: PropTypes.func.isRequired,
  isNew: PropTypes.bool
};

export default withStyles(styles)(AddMaster);
