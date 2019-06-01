import React, { Component, Fragment } from "react";
import propTypes from "prop-types";
import classNames from "classnames";
import Select from "react-select";
import { getEvents, getResource, getTotalMasters, getTotalResource } from "../../../../../modules/Calendar";
import { connect } from "react-redux";
import CustomInputView from "./CustomInputView";
import { Field } from "redux-form";

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

  componentWillUnmount(){
    console.log('componentWillUnmount');
  }


  render() {
    const { input, label, id, meta: { touched, error }, options, disabled, differenceDate, selectedDate, isFirst, switchDate } = this.props;
    // console.log("render");
    return (
      <Fragment>
        <Select
          className={classNames("basic-single")}
          name={input.name}
          id={id}
          options={options}
          placeholder={`Выберите ${label}`}
          // isMulti={!isNew}
          // menuIsOpen
          // isClearable
          value={this.state.value}
          isDisabled={disabled}
          maxMenuHeight={150}
          onChange={this.handleChange}
        />
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

