import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { change, Field, FieldArray, reduxForm } from "redux-form";
import { withStyles } from "@material-ui/core/styles/index";
import customEventsStyle from "../../../../assets/jss/material-dashboard-react/components/customEventsStyle";
import validate from "./validate";
import CustomInputView from "../../../../components/Inputs/CustomInputView";
import Button from "@material-ui/core/Button";
import CustomSelectView from "../../../../components/Inputs/CustomSelectView";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import CustomCheckbox from "../../../../components/CustomInput/CustomCheckbox";
import { currentTodoNull } from "../../../../modules/Catalog";

const colors = [
  "red",
  "pink",
  "purple",
  // "deep purple",
  "indigo",
  "blue",
  // "lightblue",
  "cyan",
  "teal",
  "green",
  // "lightgreen",
  "lime",
  "yellow",
  "amber",
  "orange",
  // "deeporange",
  "brown",
  "grey"
  // "bluegrey",
  // "black",
  // "gold",
  // "aquamarine",
  // "coral",
  // "firebrick",
  // "fuchsia",
  // "turquoise",
  // "khaki",
  // "limegreen",
  // "navy",
  // "olive"
  // "plum",
  // "seagreen"
];

class CategoryForm extends Component {
  state = {
    form: {
      title: null,
      icon: null,
      img: null,
      price: null,
      labels: [],
      active: true,
      isMaster: null,
      category: null
    },
    isMember: false,


    color: false,
    pickerVisible: false,
    colorView: false
  };

  static getDerivedStateFromProps(nextProps) {
    const { errorMessage, loaderForm, handleClickCanceled, on_todo_update } = nextProps;
    if (loaderForm && !errorMessage) {
      handleClickCanceled && handleClickCanceled();
      on_todo_update();
    }
    return null;
  }

  handleClickViewColor = () => {
    this.setState({
      colorView: !this.state.colorView
    });
  };

  handleChangeColor = evt => {
    if (!evt.target) {
      return;
    }
    this.setState({
      color: evt.target.dataset.color
    });
  };

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      classes,
      valid,
      todo,
      handleClickCanceled,
      isEdit,
      currentTodoNull,
      labels,
      errorMessage
    } = this.props;

    const { colorView, color } = this.state;
    return (
      <Fragment>
        <form onSubmit={handleSubmit}>
          <Field
            name="value"
            type="text"
            id="valueCategory"
            label="Название категории*"
            placeholder='Уход за телом'
            initialSelectValue={todo.value}
            component={CustomInputView}
          />
          <Field
            name="name"
            type="text"
            id="nameCategory"
            label="Название категории на английском*"
            placeholder='body'
            initialSelectValue={todo.name}
            component={CustomInputView}
          />
          <p>Выберите цвет*</p>
          <div className={"row justify-content-between mt-5"}>
            {colors.map((item, idx) => {
                return (
                  <Field
                    className={"col mb-3"}
                    key={idx}
                    initialSelectValue={colors.includes(todo.color) && todo.color}
                    name="color"
                    color={item}
                    isChecked={item === (color || todo.color)}
                    type="radio"
                    id={`_checkbox-${idx + 1}`}
                    onChange={this.handleChangeColor}
                    datasetColor={item}
                    component={CustomCheckbox}
                  />
                );
              }
            )}
          </div>
          {errorMessage
            ? <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
            : null
          }
          <div>
            <Button
              type="submit"
              color='primary'
              variant="contained"
              // disabled={!this.state.isMember || (!valid && !submitting)}
              disabled={!valid && !submitting}
              className={classes.indent}
            >
              {/*{btnAdd}*/}
              Отправить
            </Button>

            <Button
              type="button"
              color='primary'
              variant="contained"
              className={classes.indent}
              onClick={isEdit ? () => currentTodoNull() : handleClickCanceled}
            >
              {/*{btnAdd}*/}
              Отмена
            </Button>
          </div>
        </form>
      </Fragment>

    );
  }
}

CategoryForm.defaultProps = {};

CategoryForm.propTypes = {
  classes: PropTypes.object
};

export default reduxForm({
  form: "CategoryForm",
  validate
})(withStyles(customEventsStyle)(CategoryForm));

/*
<div
  key={idx}
  className="js-color-picker"
  style={{
    backgroundColor: `${item}`,
    width: "40px",
    height: "40px",
    display: "inline-block",
    margin: "5px",
    borderRadius: "100%",
    opacity: "0.7",
    cursor: "pointer"
  }}
  data-color={item}
>

</div>
*/



