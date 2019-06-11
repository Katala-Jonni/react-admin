import React, { Component, Fragment } from "react";
import propTypes from "prop-types";
import classNames from "classnames";
import Select from "react-select";
import { getEvents, getResource, getTotalMasters, getTotalResource } from "../../../../../modules/Calendar";
import { connect } from "react-redux";
import CustomInputView from "./CustomInputView";
import { Field } from "redux-form";
import FormHelperText from "@material-ui/core/FormHelperText";
import { withStyles } from "@material-ui/core/styles/index";

const style = {
  option: (provided, state) => ({
    color: "red"
  })
};

class CustomSelectView extends Component {
  state = {
    value: ""
  };

  handleChange = data => {
    this.setState({
      value: data
    });
    return this.props.input.onChange(data.value);
  };

  componentDidMount() {
    // console.log("didmount");
    this.setState({
      value: ""
    });
    // console.log(this.props);
    if (this.props.selectEvent) {
      this.props.input.onChange(this.props.defaultValue);
    } else {
      this.props.input.onChange("");
    }
  }

  componentWillUnmount() {
    // console.log('componentWillUnmount');
  }


  render() {
    const { input, label, id, meta: { touched, error }, options, disabled, classes, differenceDate, selectedDate, isFirst, switchDate, defaultValue, selectEvent } = this.props;
    // console.log(this.state.value);
    // console.log(this.props);
    return (
      <Fragment>
        <Select
          // className={classNames(error ? classes.borderColor : null)}
          name={input.name}
          id={id}
          options={options}
          placeholder={`Выберите ${label}`}
          theme={theme => ({
            ...theme,
            // borderRadius: 0,
            colors: {
              ...theme.colors,
              // primary25: 'hotpink',
              primary: error ? "red" : "#3f51b5"
            }
          })}
          // label={`Выберите ${label}`}
          // isMulti={!isNew}
          // menuIsOpen
          // isClearable
          // value={this.state.value}
          defaultValue={defaultValue}
          isDisabled={disabled}
          maxMenuHeight={150}
          onChange={this.handleChange}
        />
        {error ? (
          <FormHelperText className={classes.errorColor} id={id + "-text"}>{error}</FormHelperText>
        ) : null}
      </Fragment>
    );
  }
}

const mapStateFromProps = state => ({
  resource: getResource(state),
  events: getEvents(state),
  masters: getTotalMasters(state),
  totalResource: getTotalResource(state)
});

// const mapDispatchFromProps = {};


export default connect(mapStateFromProps, null)(CustomSelectView);
// export default connect(mapStateFromProps, null)(CustomSelectView);


// withStyles(styleTooltip, { withTheme: true })(CustomSelectView);


// import React from "react";
// import { withStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
// import Button from "@material-ui/core/Button";
//
// const useStyles = (theme => ({
//   button: {
//     display: "block"
//     // marginTop: theme.spacing(2),
//   },
//   formControl: {
//     // margin: theme.spacing(1),
//     minWidth: 120
//   }
// }));
//
// function ControlledOpenSelect(props) {
//   const classes = useStyles();
//   const [age, setAge] = React.useState("");
//   const [open, setOpen] = React.useState(false);
//
//   function handleChange(event) {
//     setAge(event.target.value);
//   }
//
//   function handleClose() {
//     setOpen(false);
//   }
//
//   function handleOpen() {
//     setOpen(true);
//   }
//
//   return (
//     <form autoComplete="off">
//       <Button className={classes.button} onClick={handleOpen}>
//         Open the select
//       </Button>
//       <FormControl className={classes.formControl}>
//         <InputLabel htmlFor="demo-controlled-open-select">Age</InputLabel>
//         <Select
//           open={open}
//           onClose={handleClose}
//           onOpen={handleOpen}
//           value={age}
//           // onChange={handleChange}
//           inputProps={{
//             name: props.input.name,
//             id: "demo-controlled-open-select"
//           }}
//         >
//           <MenuItem value="">
//             <em>None</em>
//           </MenuItem>
//           <MenuItem value={10}>Ten</MenuItem>
//           <MenuItem value={20}>Twenty</MenuItem>
//           <MenuItem value={30}>Thirty</MenuItem>
//         </Select>
//       </FormControl>
//     </form>
//   );
// }
//
// export default withStyles(useStyles)(ControlledOpenSelect);

