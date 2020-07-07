import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles/index";
import { Field, reduxForm, change } from "redux-form";

import LoginCard from "components/Cards/LoginCard.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Face from "@material-ui/icons/Face";
import InputAdornment from "@material-ui/core/InputAdornment";
import LockOutline from "@material-ui/icons/LockOutlined";

import CustomInputView from "../../../components/Inputs/CustomInputView";


class Form extends Component {
  state = {};

  render() {
    const { classes, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <LoginCard
          customCardClass={classes[this.state.cardAnimaton]}
          headerColor="green"
          cardTitle="Вход в систему"
          // cardSubtitle="Вход только по спискам =)))"
          footerAlign="center"
          footer={
            <Button color="roseNoBackground" wd size="lg" type='submit'>
              Войти
            </Button>
          }
          // socials={[
          //   "fab fa-facebook-square",
          //   "fab fa-twitter",
          //   "fab fa-google-plus"
          // ].map((prop, key) => {
          //   return (
          //     <Button
          //       color="simple"
          //       justIcon
          //       key={key}
          //       customClass={classes.customButtonClass}
          //     >
          //       <i className={prop}/>
          //     </Button>
          //   );
          // })}
          content={
            <div>
              <Field
                name='login'
                type="text"
                id="login"
                labelText="Логин"
                // placeholder='89114232988'
                // disabled={isDisabled}
                // value={cardNumber}
                // error={isVerifyCard}
                // helpText={!pristine && isVerifyCard ? verifyMessage : verifyMessage}

                inputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Face className={classes.inputAdornmentIcon}/>
                    </InputAdornment>
                  )
                }}

                formControlProps={{
                  fullWidth: true
                }}

                component={CustomInputView}

                // component={(props) => {
                //   return (
                //     <CustomInput
                //       labelText={props.labelText}
                //       id={props.id}
                //       formControlProps={{
                //         fullWidth: true
                //       }}
                //       name={props.name}
                //       inputProps={{
                //         endAdornment: (
                //           <InputAdornment position="end">
                //             <Face className={classes.inputAdornmentIcon}/>
                //           </InputAdornment>
                //         )
                //       }}
                //     />
                //   );
                // }}


                // onChange={this.handleChange}
              />

              <Field
                name='password'
                type="text"
                id="password"
                labelText="Пароль"
                // placeholder='89114232988'
                // disabled={isDisabled}
                // value={cardNumber}
                // error={isVerifyCard}
                // helpText={!pristine && isVerifyCard ? verifyMessage : verifyMessage}

                formControlProps={{
                  fullWidth: true
                }}

                inputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LockOutline
                        className={classes.inputAdornmentIcon}
                      />
                    </InputAdornment>
                  )
                }}

                component={CustomInputView}

                // component={(props) => {
                //   return (
                //     <CustomInput
                //       labelText={props.labelText}
                //       id={props.id}
                //       formControlProps={{
                //         fullWidth: true
                //       }}
                //       name={props.name}
                //       inputProps={{
                //         endAdornment: (
                //           <InputAdornment position="end">
                //             <LockOutline
                //               className={classes.inputAdornmentIcon}
                //             />
                //           </InputAdornment>
                //         )
                //       }}
                //     />
                //   );
                // }}
                // onChange={this.handleChange}
              />
            </div>
          }
        />
      </form>
    );
  }
}

Form.defaultProps = {};

Form.propTypes = {
  classes: PropTypes.object
};

export default reduxForm({
  form: "auth"
  // validate
})(Form);

// export default Form;
