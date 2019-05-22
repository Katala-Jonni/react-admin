import React, { Component } from "react";
import propTypes from "prop-types";

// const CustomField = ({ input, meta, type, ...rest }) => {
//   console.log(meta);
//   return (
//     <input {...input} type={type} {...rest}/>
//   );
// };
//
// class AddEventsForm extends Component {
//   state = {};
//
//   render() {
//     const { handleSubmit } = this.props;
//     return (
//       <form onSubmit={handleSubmit(val => console.log(val))}>
//         <div>
//           <Field
//             name='firsName'
//             type='text'
//             id='first-name'
//             placeholder='Maksim'
//             component={CustomField}
//           />
//         </div>
//         <button type='submit'>Submit</button>
//       </form>
//     );
//   }
// }
//
// export default reduxForm({
//   form: "addEvents"
// })(AddEventsForm);

// import { Field, FieldArray, reduxForm } from "redux-form";
// import validate from "./validate";
//
// const renderField = ({ input, label, type, meta: { touched, error } }) => (
//   <div>
//     <label>{label}</label>
//     <div>
//       <input {...input} type={type} placeholder={label}/>
//       {touched && error && <span>{error}</span>}
//     </div>
//   </div>
// );
//
// const renderHobbies = ({ fields, meta: { error } }) => (
//   <ul>
//     <li>
//       <button type="button" onClick={() => fields.push()}>Add Hobby</button>
//     </li>
//     {fields.map((hobby, index) => (
//       <li key={index}>
//         <button
//           type="button"
//           title="Remove Hobby"
//           onClick={() => fields.remove(index)}
//         />
//         <Field
//           name={hobby}
//           type="text"
//           component={renderField}
//           label={`Hobby #${index + 1}`}
//         />
//       </li>
//     ))}
//     {error && <li className="error">{error}</li>}
//   </ul>
// );
//
// const renderMembers = ({ fields, meta: { touched, error, submitFailed } }) => {
//   return (
//     <ul>
//       <li>
//         <button type="button" onClick={() => fields.push({})}>Add Member</button>
//         {(touched || submitFailed) && error && <span>{error}</span>}
//       </li>
//       {fields.map((member, index) => (
//         <li key={index}>
//           <button
//             type="button"
//             title="Remove Member"
//             onClick={() => fields.remove(index)}
//           />
//           <h4>Member #{index + 1}</h4>
//           <Field
//             name={`${member}.firstName`}
//             type="text"
//             component={renderField}
//             label="First Name"
//           />
//           <Field
//             name={`${member}.lastName`}
//             type="text"
//             component={renderField}
//             label="Last Name"
//           />
//           {/*<FieldArray name={`${member}.hobbies`} component={renderHobbies}/>*/}
//         </li>
//       ))}
//     </ul>
//   );
// };
//
// const FieldArraysForm = props => {
//   const { handleSubmit, pristine, reset, submitting } = props;
//   return (
//     <form onSubmit={handleSubmit(val => console.log(val))}>
//       <Field
//         name="clubName"
//         type="text"
//         component={renderField}
//         label="Club Name"
//       />
//       <FieldArray name="members" component={renderMembers}/>
//       <div>
//         <button type="submit" disabled={submitting}>Submit</button>
//         <button type="button" disabled={pristine || submitting} onClick={reset}>
//           Clear Values
//         </button>
//       </div>
//     </form>
//   );
// };
//
// export default reduxForm({
//   form: "fieldArrays", // a unique identifier for this form
//   validate
// })(FieldArraysForm);

import { Field, FieldArray, reduxForm } from "redux-form";
import validate from "./validate";
import CustomInputView from "./Inputs/CustomInputView";
import Input from "@material-ui/core/Input";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridContainer from "../../../../components/Grid/GridContainer";
import ItemGrid from "components/Grid/GridItem.jsx";
import HeaderCard from "../../../../components/Cards/HeaderCard";
import Button from "@material-ui/core/Button";
import customEventsStyle from "../../../../assets/jss/material-dashboard-react/components/customEventsStyle";
import Fab from "@material-ui/core/Fab";
import Remove from "@material-ui/icons/Remove";
import Picker from "./Inputs/Picker";


import "date-fns";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from "material-ui-pickers";
import moment from "moment";
import "moment/locale/ru";


const renderField = ({ input, label, type, placeholder, meta: { touched, error }, ...rest }) => {
  // console.log(rest);
  return (
    <div>
      <label>{label}</label>
      <div>
        <Input
          {...input}
          type={type}
          placeholder={placeholder}
          fullWidth
          // formControlProps={{
          //   fullWidth: true
          // }}
          {...rest}
        />
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  );
};

class renderMembers extends Component {
  state = {
    selectedDate: new Date()
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  render() {
    const { fields, meta: { error, submitFailed }, classes } = this.props;
    const { selectedDate } = this.state;
    // console.log(this.props);
    return (
      <ul className={classes.list}>
        <li>
          <Button
            type="button"
            color='primary'
            variant="contained"
            size={"small"}
            onClick={() => fields.push({})}
            className={classes.addButton}
          >
            Добавить запись
          </Button>
        </li>
        {fields.map((member, index) => (
          <li key={index}>
            <div className={classes.flex}>
              <h4 className={classes.itemHeader}>Запись #{index + 1}</h4>
              <Fab
                color='secondary'
                variant="extended"
                size={"small"}
                onClick={() => fields.remove(index)}
                className={classes.flexItem}
              >
                <Remove/>
              </Fab>
            </div>
            <MuiPickersUtilsProvider utils={MomentUtils} libInstance={moment}>
              <Grid container className={classes.grid} justify="space-between">
                <Field
                  name={`${member}.date`}
                  component={Picker}
                  id="dateTime"
                  type={"text"}
                  onChange={this.handleDateChange}
                  value={selectedDate}
                />
                <Field
                  name={`${member}.start`}
                  component={Picker}
                  isTime
                  id="startTime"
                  type={"text"}
                  onChange={this.handleDateChange}
                  // value={selectedDate}
                />
                <Field
                  name={`${member}.end`}
                  component={Picker}
                  isEnd
                  isTime
                  id="endTime"
                  type={"text"}
                  onChange={this.handleDateChange}
                  // value={selectedDate}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <Field
              name={`${member}.resourceId`}
              type="text"
              component={CustomInputView}
              label="Имя мастера/Солярий"
              id="resourceId"
              placeholder='Имя мастера/Солярий'
              disabled
            />
            <Field
              name={`${member}.title`}
              component={CustomInputView}
              label="Описание услуги"
              id="title"
              inputProps={{
                multiline: true,
                rows: 3
              }}
            />
          </li>
        ))}
      </ul>
    );
  }
}

renderMembers.propTypes = {
  classes: propTypes.object.isRequired
};

const FieldArraysForm = props => {
  const { handleSubmit, pristine, reset, submitting, classes, ...rest } = props;
  // console.log(props);
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="firstName"
        type="text"
        component={CustomInputView}
        label="Фамилия"
        id="firstName"
        placeholder='Солнцева'

      />
      <Field
        name="lastName"
        type="text"
        component={CustomInputView}
        label="Имя"
        id="lastName"
        placeholder='Наталья'
      />
      <Field
        name="surname"
        type="text"
        component={CustomInputView}
        id="surname"
        label="Отчество"
        placeholder='Михайловна'
      />
      <Field
        name="phoneNumber"
        type="text"
        labelText="Номер телефона"
        placeholder='89114232988'
        component={CustomInputView}
        id="phoneNumber"
      />
      <FieldArray
        name="members"
        component={renderMembers}
        classes={classes}
      />
      <div>
        <Button
          type="submit"
          color='primary'
          variant="contained"
          disabled={submitting}
          className={classes.indent}
        >
          Записать
        </Button>
        <Button
          type="button"
          disabled={pristine || submitting}
          onClick={reset}
          variant="contained"
        >
          Очистить
        </Button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "fieldArrays", // a unique identifier for this form
  validate
})(withStyles(customEventsStyle)(FieldArraysForm));
