import React, { Component } from "react";
import PropTypes from "prop-types";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";


class SwitchComponent extends Component {
  state = {
    checkedA: true,
    checkedB: true
  };

  handleChange = (evt) => {
    console.log(evt);
    const { name, checked } = evt.target;
    console.log(evt.target);
    this.setState({
      [name]: checked
    });
  };

  render() {
    const { checkedA, checkedB } = this.state;
    console.log(this.props);
    return (
      <FormGroup row>
        {/*<FormControlLabel*/}
        {/*control={*/}
        {/*<Switch checked={checkedA} onChange={this.handleChange} value="checkedA"/>*/}
        {/*}*/}
        {/*label="Secondary"*/}
        {/*/>*/}
        {/*<FormControlLabel*/}
        {/*control={*/}
        {/*<Switch*/}
        {/*checked={checkedB}*/}
        {/*onChange={this.handleChange}*/}
        {/*value="checkedB"*/}
        {/*color="primary"*/}
        {/*/>*/}
        {/*}*/}
        {/*label="Primary"*/}
        {/*/>*/}
        <FormControlLabel
          control={
            <Switch
              value="checkedC"
              name={this.props.input.name}
              // onChange={this.handleChange}
            />
          }
          label="Активный мастер?"/>
        {/*<FormControlLabel disabled control={<Switch value="checkedD"/>} label="Disabled"/>*/}
        {/*<FormControlLabel disabled control={<Switch checked value="checkedE"/>} label="Disabled"/>*/}
      </FormGroup>
    );
  }
}

SwitchComponent.defaultProps = {};

SwitchComponent.propTypes = {
  classes: PropTypes.object
};

export default SwitchComponent;
