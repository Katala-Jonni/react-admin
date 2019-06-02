import React, { Fragment } from "react";
import cx from 'classnames';
// material-ui components
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormLabel from "material-ui/Form/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";

// material ui icons
import MailOutline from "@material-ui/icons/MailOutline";
import Contacts from "@material-ui/icons/Contacts";
import Check from "@material-ui/icons/Check";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/GridItem.jsx";
import IconCard from "components/Cards/IconCard.jsx";
// import HeaderCard from "components/Cards/HeaderCard.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

// style for this view
// material-dashboard-pro-react/views/validationFormsStyle.jsx
import validationFormsStyle from "../../../../../assets/jss/material-dashboard-react/views/validationFormsStyle";

class ValidationForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // register form
      registerEmail: "",
      registerEmailState: "",
      registerPassword: "",
      registerPasswordState: "",
      registerConfirmPassword: "",
      registerConfirmPasswordState: "",
      registerCheckbox: false,
      registerCheckboxState: "",
      // login form
      loginEmail: "",
      loginEmailState: "",
      loginPassword: "",
      loginPasswordState: "",
      // type validation
      required: "",
      requiredState: "",
      typeEmail: "",
      typeEmailState: "",
      number: "",
      numberState: "",
      url: "",
      urlState: "",
      equalTo: "",
      whichEqualTo: "",
      equalToState: "",
      // range validation
      minLength: "",
      minLengthState: "",
      maxLength: "",
      maxLengthState: "",
      range: "",
      rangeState: "",
      minValue: "",
      minValueState: "",
      maxValue: "",
      maxValueState: ""
    };
    this.registerClick = this.registerClick.bind(this);
    this.loginClick = this.loginClick.bind(this);
    this.typeClick = this.typeClick.bind(this);
    this.rangeClick = this.rangeClick.bind(this);
  }

  // function that returns true if value is email, false otherwise
  verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }

  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }

  // function that verifies if two strings are equal
  compare(string1, string2) {
    if (string1 === string2) {
      return true;
    }
    return false;
  }

  // function that verifies if value contains only numbers
  verifyNumber(value) {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  }

  // verifies if value is a valid URL
  verifyUrl(value) {
    try {
      new URL(value);
      return true;
    } catch (_) {
      return false;
    }
  }

  change(event, stateName, type, stateNameEqualTo, maxValue) {
    switch (type) {
      case "email":
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "password":
        if (this.verifyLength(event.target.value, 1)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "equalTo":
        if (this.compare(event.target.value, this.state[stateNameEqualTo])) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "checkbox":
        if (event.target.checked) {
          this.setState({ [stateName + "State"]: "" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "number":
        if (this.verifyNumber(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "max-length":
        if (!this.verifyLength(event.target.value, stateNameEqualTo + 1)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "url":
        if (this.verifyUrl(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "min-value":
        if (
          this.verifyNumber(event.target.value) &&
          event.target.value >= stateNameEqualTo
        ) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "max-value":
        if (
          this.verifyNumber(event.target.value) &&
          event.target.value <= stateNameEqualTo
        ) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "range":
        if (
          this.verifyNumber(event.target.value) &&
          event.target.value >= stateNameEqualTo &&
          event.target.value <= maxValue
        ) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      default:
        break;
    }
    switch (type) {
      case "checkbox":
        this.setState({ [stateName]: event.target.checked });
        break;
      default:
        this.setState({ [stateName]: event.target.value });
        break;
    }
  }

  registerClick() {
    if (this.state.registerEmailState === "") {
      this.setState({ registerEmailState: "error" });
    }
    if (this.state.registerPasswordState === "") {
      this.setState({ registerPasswordState: "error" });
    }
    if (this.state.registerConfirmPasswordState === "") {
      this.setState({ registerConfirmPasswordState: "error" });
    }
    if (this.state.registerCheckboxState === "") {
      this.setState({ registerCheckboxState: "error" });
    }
  }

  loginClick() {
    if (this.state.loginEmailState === "") {
      this.setState({ loginEmailState: "error" });
    }
    if (this.state.loginPasswordState === "") {
      this.setState({ loginPasswordState: "error" });
    }
  }

  typeClick() {
    if (this.state.requiredState === "") {
      this.setState({ requiredState: "error" });
    }
    if (this.state.typeEmailState === "") {
      this.setState({ typeEmailState: "error" });
    }
    if (this.state.numberState === "") {
      this.setState({ numberState: "error" });
    }
    if (this.state.urlState === "") {
      this.setState({ urlState: "error" });
    }
    if (this.state.equalToState === "") {
      this.setState({ equalToState: "error" });
    }
  }

  rangeClick() {
    if (this.state.minLengthState === "") {
      this.setState({ minLengthState: "error" });
    }
    if (this.state.maxLengthState === "") {
      this.setState({ maxLengthState: "error" });
    }
    if (this.state.rangeState === "") {
      this.setState({ rangeState: "error" });
    }
    if (this.state.minValueState === "") {
      this.setState({ minValueState: "error" });
    }
    if (this.state.maxValueState === "") {
      this.setState({ maxValueState: "error" });
    }
  }

  render() {
    const { classes, label, id, input, type, placeholder, meta: { touched, error }, isHidden, ...rest } = this.props;
    // console.log(this.props);
    return (
      <Fragment>
        <CustomInput
          input={input}
          type={type}
          placeholder={placeholder}
          success={!(error)}
          // success={this.state.registerEmailState === "success"}
          error={!!(touched && error)}
          // error={this.state.registerEmailState === "error"}
          labelText={label}
          id={id}
          formControlProps={{
            fullWidth: true
          }}
          // inputProps={{
          //   onChange: event =>
          //     this.change(event, "registerEmail", "email"),
          //   type: "email"
          // }}
          {...rest}
        />
        {touched && error && <span className={cx(classes.labelErrorCustom)}>{error}</span>}
      </Fragment>

    );
  }
}

export default withStyles(validationFormsStyle)(ValidationForms);

//
// <GridContainer>
//   <ItemGrid xs={12} sm={12} md={6}>
//     <IconCard
//       icon={MailOutline}
//       iconColor="rose"
//       title="Register Forms"
//       content={
//         <form>
//           <CustomInput
//             success={this.state.registerEmailState === "success"}
//             error={this.state.registerEmailState === "error"}
//             labelText="Email Address *"
//             id="registeremail"
//             formControlProps={{
//               fullWidth: true
//             }}
//             inputProps={{
//               onChange: event =>
//                 this.change(event, "registerEmail", "email"),
//               type: "email"
//             }}
//           />
//           <CustomInput
//             success={this.state.registerPasswordState === "success"}
//             error={this.state.registerPasswordState === "error"}
//             labelText="Password *"
//             id="registerpassword"
//             formControlProps={{
//               fullWidth: true
//             }}
//             inputProps={{
//               onChange: event =>
//                 this.change(event, "registerPassword", "password"),
//               type: "password"
//             }}
//           />
//           <CustomInput
//             success={
//               this.state.registerConfirmPasswordState === "success"
//             }
//             error={this.state.registerConfirmPasswordState === "error"}
//             labelText="Confirm Password *"
//             id="registerconfirmpassword"
//             formControlProps={{
//               fullWidth: true
//             }}
//             inputProps={{
//               onChange: event =>
//                 this.change(
//                   event,
//                   "registerConfirmPassword",
//                   "equalTo",
//                   "registerPassword"
//                 ),
//               type: "password"
//             }}
//           />
//           <div className={classes.formCategory}>
//             <small>*</small>
//             Required fields
//           </div>
//           <FormControlLabel
//             control={
//               <Checkbox
//                 tabIndex={-1}
//                 onClick={event =>
//                   this.change(event, "registerCheckbox", "checkbox")
//                 }
//                 checkedIcon={<Check className={classes.checkedIcon}/>}
//                 icon={<Check className={classes.uncheckedIcon}/>}
//                 classes={{
//                   checked: classes.checked
//                 }}
//               />
//             }
//             classes={{
//               label:
//               classes.label +
//               (this.state.registerCheckboxState === "error"
//                 ? " " + classes.labelError
//                 : "")
//             }}
//             label="Subscribe to newsletter"
//           />
//           <Button color="rose" right onClick={this.registerClick}>
//             Register
//           </Button>
//         </form>
//       }
//     />
//   </ItemGrid>
//   <ItemGrid xs={12} sm={12} md={6}>
//     <IconCard
//       icon={Contacts}
//       iconColor="rose"
//       title="Login Form"
//       content={
//         <form>
//           <CustomInput
//             success={this.state.loginEmailState === "success"}
//             error={this.state.loginEmailState === "error"}
//             labelText="Email Address *"
//             id="loginemail"
//             formControlProps={{
//               fullWidth: true
//             }}
//             inputProps={{
//               onChange: event =>
//                 this.change(event, "loginEmail", "email"),
//               type: "email"
//             }}
//           />
//           <CustomInput
//             success={this.state.loginPasswordState === "success"}
//             error={this.state.loginPasswordState === "error"}
//             labelText="Password *"
//             id="loginpassword"
//             formControlProps={{
//               fullWidth: true
//             }}
//             inputProps={{
//               onChange: event =>
//                 this.change(event, "loginPassword", "password"),
//               type: "password"
//             }}
//           />
//           <div className={classes.formCategory}>
//             <small>*</small>
//             Required fields
//           </div>
//           <div className={classes.center}>
//             <Button color="rose" onClick={this.loginClick}>
//               Login
//             </Button>
//           </div>
//         </form>
//       }
//     />
//   </ItemGrid>
// </GridContainer>;
//
//
