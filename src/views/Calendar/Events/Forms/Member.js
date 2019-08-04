import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field } from "redux-form";
import "date-fns";
import moment from "moment/moment";
import "moment/locale/ru";
import CustomInputView from "../../../../components/Inputs/CustomInputView";
import Fab from "@material-ui/core/Fab";
import Remove from "@material-ui/icons/Remove";
import Grid from "@material-ui/core/Grid";
import Picker from "../../../../components/Inputs/Picker";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import { getTotalResource } from "../../../../modules/Calendar";
import CustomSelectView from "../../../../components/Inputs/CustomSelectView";
import defaultResource from "../../../../modules/Calendar/defaultResource";

class Member extends Component {
  state = {
    selectedDate: "",
    switchDate: false
  };

  handleDateChange = date => {
    const isNewDate = moment(this.state.selectedDate).format("DD.MM.YY") === moment(date).format("DD.MM.YY");
    this.setState({
      selectedDate: date,
      switchDate: !isNewDate
    });
  };

  getOptions = () => {
    const { selectedDate } = this.state;
    const date = moment(selectedDate).format("DD.MM.YY");
    const resources = this.props.totalResource[date] ? this.props.totalResource[date] : defaultResource;
    return [...resources].map(item => ({
      value: item.resourceTitle,
      label: item.resourceTitle
    }));
  };

  onOpen = () => this.setState({ switchDate: false });

  onClose = () => this.setState({ switchDate: true });

  render() {
    const { member, index, classes, fields, noButton } = this.props;
    const { selectedDate, switchDate } = this.state;
    console.log(index);
    return (
      <Fragment>
        {noButton
          ? null
          :
          <div className={classes.flex}>
            <h4 className={classes.itemHeader}>Запись #{index + 1}</h4>
            <Fab
              color='secondary'
              variant="extended"
              size="small"
              className={classes.flexItem}
              onClick={() => fields.remove(index)}
            >
              <Remove/>
            </Fab>
          </div>
        }
        <MuiPickersUtilsProvider utils={MomentUtils} libInstance={moment}>
          <Grid container className={classes.grid} justify="space-between">
            <Field
              name={`${member}.date`}
              id={`${member}.date`}
              type="text"
              value={selectedDate}
              classes={classes}
              onOpen={this.onOpen}
              onClose={this.onClose}
              onChange={this.handleDateChange}
              component={Picker}
            />
            <Field
              name={`${member}.start`}
              id={`${member}.start`}
              type="text"
              classes={classes}
              isTime
              component={Picker}
            />
            <Field
              name={`${member}.end`}
              type="text"
              id={`${member}.end`}
              classes={classes}
              isEnd
              isTime
              component={Picker}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        {switchDate
          ? <Field
            name={`${member}.resourceId`}
            type="text"
            classes={classes}
            id={`${member}.resourceId`}
            label="Имя мастера/Солярий"
            options={this.getOptions()}
            disabled={!selectedDate}
            component={CustomSelectView}
          />
          : null
        }
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
