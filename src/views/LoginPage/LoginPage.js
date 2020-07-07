import React from "react";
import PropTypes from "prop-types";

// material-ui components
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";
import LockOutline from "@material-ui/icons/LockOutlined";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/GridItem.jsx";
import LoginCard from "components/Cards/LoginCard.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Progress from "components/Progress/Progress";
import Form from "./Form/Form";

import loginPageStyle from "assets/jss/material-dashboard-react/views/loginPageStyle.jsx";
import { Redirect } from "react-router-dom";
import { getLoginStart } from "../../modules/Admin";


class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden"
    };
  }

  timer = null;

  componentDidMount() {
    this.props.startAuth();
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timer = setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  // handleSubmit = values => {
  //   console.log(values);
  // };

  handleSubmit = values => {
    console.log(values, "Можно ввести секретный код попросить для регистрации");
    this.props.getLoginStart(values);
    // const { reset, handleSubmit, deleteState } = this.props;
    // deleteState();
    // reset();
    // this.setState({
    //   ...initialState()
    // });
    // handleSubmit(evt);
  };

  render() {
    const { classes } = this.props;
    if (this.props.startLoader) {
      return (
        <Progress/>
      );
    }
    if (this.props.isAuthorized) {
      return <Redirect to='/admin/calendar'/>;
    }
    return (
      <div className={classes.content}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <ItemGrid xs={12} sm={6} md={4}>
              <Form
                classes={classes}
                onSubmit={this.handleSubmit}
              />
            </ItemGrid>
          </GridContainer>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

// export default reduxForm({
//   form: "auth"
//   // validate
// })(withStyles(loginPageStyle)(LoginPage));

export default withStyles(loginPageStyle)(LoginPage);
