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
      // value: this.props.valD
      // register form
    };
  }

  // componentDidMount() {
  //   console.log("didmount");
  //   // if (this.props.input && this.props.inputProps && this.props.inputProps.value) {
  //   //   // console.log(this.props.inputProps.value);
  //   //   this.props.input.onChange(this.props.inputProps.value);
  //   // }
  // }

  // ch = (event) => {
  //   console.log(event);
  //   // this.setState({
  //   //   value: event.target.value
  //   // });
  //   console.log(event.target.value);
  //   this.props.input.onChange(event.target.value);
  // };

  render() {
    const { classes, label, valD, id, input, type, placeholder, meta: { touched, error }, isHidden, ...rest } = this.props;
    // console.log(this.props);
    return (
      <Fragment>
        <CustomInput
          // value={this.state.value || input.value}
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
          //     this.ch(event)
          // }}
          // onChange={this.ch}
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
