import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
// import category from "../data/category";

const useStyles = theme => ({
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing.unit * 3
  }
});

class CheckboxesGroup extends Component {
  state = {};

  handleChange = event => this.props.handleChange(event);

  render() {
    const { classes, formLabel, categories } = this.props;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend" filled>{formLabel}</FormLabel>
          <FormGroup>
            {categories.map(item => {
              if (item.product.items.length) {
                return (
                  <FormControlLabel
                    key={item._id}
                    label={item.value}
                    control={
                      <Checkbox
                        checked={this.state[item]}
                        name={item.name}
                        onChange={this.handleChange}
                        value={item.value}
                        color={"primary"}
                      />
                    }
                  />
                );
              }
            })}
          </FormGroup>
          <FormHelperText>Be careful</FormHelperText>
        </FormControl>
      </div>
    );
  }
}

CheckboxesGroup.defaultProps = {
  formLabel: "Разделы Каталога"
};

CheckboxesGroup.propTypes = {
  classes: PropTypes.object,
  formLabel: PropTypes.string,
  handleChange: PropTypes.func.isRequired
};

export default withStyles(useStyles)(CheckboxesGroup);
