import React, { Fragment } from "react";
import cx from "classnames";
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
      value: this.props.valD
      // register form
    };
  }

  ch = (event) => {
    this.setState({
      value: event.target.value
    });
  };

  render() {
    const { classes, label, valD, id, input, type, placeholder, meta: { touched, error }, isHidden, ...rest } = this.props;
    // console.log(this.props);
    return (
      <Fragment>
        <CustomInput
          value={valD ? this.state.value : input.value}
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
          inputProps={valD ? {
            onChange: event =>
              this.ch(event)
          } : {}}
          // inputProps={{
          //   onChange: event =>
          //     this.ch(event)
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
