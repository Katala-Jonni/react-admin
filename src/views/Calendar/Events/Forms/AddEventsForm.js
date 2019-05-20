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


// import React from 'react'
import { Field, FieldArray, reduxForm } from "redux-form";
import validate from "./validate";

const renderField = ({ input, label, type, placeholder, meta: { touched, error }, ...rest }) => {
  console.log(rest);
  return (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} type={type} placeholder={placeholder} {...rest}/>
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  );
};

const renderMembers = ({ fields, meta: { error, submitFailed } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>
        Добавить запись
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((member, index) => (
      <li key={index}>
        <h4>Запись #{index + 1}</h4>
        <Field
          name={`${member}.date`}
          type="text"
          component={renderField}
          label="Желаемая дата"
        />
        <Field
          name={`${member}.resourceId`}
          type="text"
          component={renderField}
          label="Имя мастера/Солярий"
        />
        <Field
          name={`${member}.start`}
          type="text"
          component={renderField}
          label="Начальное время"
        />
        <Field
          name={`${member}.end`}
          type="text"
          component={renderField}
          label="Конечное время"
        />
        <Field
          name={`${member}.title`}
          // type="text"
          component={"textarea"}
          label="Описание услуги"
        />
        <div>
          <button
            type="button"
            // title="Remove Member"
            onClick={() => fields.remove(index)}
          >
            Удалить запись
          </button>
        </div>
      </li>
    ))}
  </ul>
);

const FieldArraysForm = ({ handleSubmit, pristine, reset, submitting }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="firstName"
        type="text"
        component={renderField}
        label="Фамилия"
        placeholder='Солнцева'
      />
      <Field
        name="lastName"
        type="text"
        component={renderField}
        label="Имя"
        placeholder='Наталья'
      />
      <Field
        name="surname"
        type="text"
        component={renderField}
        label="Отчество"
        placeholder='Михайловна'
      />
      <Field
        name="phoneNumber"
        type="text"
        component={renderField}
        label="Номер телефона"
        placeholder='89114232988'
      />
      <FieldArray name="members" component={renderMembers}/>
      <div>
        <button type="submit" disabled={submitting}>
          Записать
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Очистить
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "fieldArrays" // a unique identifier for this form
  // validate
})(FieldArraysForm);

