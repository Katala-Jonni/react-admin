import React, { Component } from "react";
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

class ProductForm extends Component {
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
    isMember: false
  };

  static getDerivedStateFromProps(nextProps) {
    const { errorMessage, loaderForm, handleClickCanceled, on_todo_update } = nextProps;
    if (loaderForm && !errorMessage) {
      handleClickCanceled && handleClickCanceled();
      on_todo_update();
    }
    return null;
  }

  componentDidMount() {
    const formKey = Object.keys(this.state.form);
    const form = formKey.reduce((start, item) => {
      start[item] = this.props.todo[item];
      return start;
    }, {});

    if (this.props.onChangeIgnor) {
      this.props.onChangeIgnor();
    }

    this.setState({
      form: {
        ...form,
        labels: this.getDefaultSelectOption()
      }
    });
  }

  addField = () => {
    this.setState({
      isMember: true
    });
  };

  handleChangeType = values => {
    if (!values) return;
    this.setState({
      form: {
        ...this.state.form,
        labels: {
          value: values,
          label: values
        } || this.getDefaultSelectOption()
      }
    });
  };

  getOptions = () => {
    if (this.props.resetForm) {
      return [];
    }

    // console.log(this.props.labels);
    return this.props.labels
      .reduce((start, item) => {
        start.push({
          value: item.value,
          label: item.value
        });
        return start;
      }, []);
  };

  getCategory = () => {
    const { labels, todo } = this.props;
    if (labels && labels.length) {
      return labels.find((item) => item._id === todo.category);
    }
  };

  getDefaultSelectOption = () => {
    const { labels, todo } = this.props;
    if (labels && labels.length && todo.category) {
      const label = this.getCategory();
      return this.getOptions().filter(item => label.value === item.value) || {};
    }
  };

  handleChangeActive = () => {
    this.setState({
      form: {
        ...this.state.form,
        active: !this.state.form.active
      }
    });
  };

  handleChangeIsMaster = () => {
    this.setState({
      form: {
        ...this.state.form,
        isMaster: !this.state.form.isMaster
      }
    });
  };

  handleClickReset = () => {
    return this.props.reduxResetForm();
    // return this.props.reset();
  };

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      classes,
      valid,
      isEdit,
      currentTodoNull,
      products
    } = this.props;
    const { form: { labels, active, isMaster } } = this.state;
    const { ignoreMembers, handleClickCanceled, isNew, todo, errorMessage } = this.props;
    let keys = [];
    if (ignoreMembers) {
      keys = Object.keys(ignoreMembers);
    }

    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="title"
          type="text"
          id="titleProduct"
          label="Название услуги/товара*"
          placeholder='Стрижка'
          initialSelectValue={todo.title}
          component={CustomInputView}
        />
        <Field
          name="icon"
          type="url"
          id="iconProduct"
          label="Иконка*"
          placeholder='Введите url иконки'
          initialSelectValue={todo.icon}
          component={CustomInputView}
        />
        <Field
          name="img"
          type="url"
          id="imgProduct"
          label="Картинка*"
          placeholder='Введите url картинки'
          initialSelectValue={todo.img}
          component={CustomInputView}
        />
        <Field
          name="price"
          type="number"
          id="priceProduct"
          labelText="Цена*"
          placeholder='100'
          initialSelectValue={`${todo.price}`}
          component={CustomInputView}
        />
        {isEdit
          ? <Field
            classes={classes}
            name="active"
            id="active"
            component={(props) => {
              return (
                <FormControlLabel
                  control={
                    <Switch
                      value="checkedC"
                      checked={active}
                      name={props.input.name}
                      onChange={props.input.onChange}
                    />
                  }
                  label="Активно?"/>
              );
            }}
            onChange={this.handleChangeActive}
          />
          : null
        }

        <Field
          selectEvent
          name="category"
          classes={classes}
          id="category"
          // menuIsOpen
          // isMulti
          label='Выберите категорию'
          options={this.getOptions()}
          height={150}
          // selectValues={labels}
          defaultValue={!isEdit ? undefined : labels[0] || this.getDefaultSelectOption()[0]}
          // isMaster={isEdit}
          component={CustomSelectView}
          onChange={this.handleChangeType}
        />

        <Field
          classes={classes}
          name="isMaster"
          id="isMasterProduct"
          component={(props) => {
            return (
              <FormControlLabel
                control={
                  <Switch
                    value="checkedC"
                    checked={isMaster}
                    name={props.input.name}
                    onChange={props.input.onChange}
                  />
                }
                label="Выполняет мастер?"/>
            );
          }}
          onChange={this.handleChangeIsMaster}
        />

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
          {
            isNew
              ? <Button
                type="button"
                disabled={pristine || submitting}
                className={classes.indent}
                variant="contained"
                onClick={this.handleClickReset}
              >
                Очистить
                {/*{btnClean}*/}
              </Button>
              : null
          }

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
    );
  }
}

ProductForm.defaultProps = {};

ProductForm.propTypes = {
  classes: PropTypes.object
};

export default reduxForm({
  form: "productForm",
  validate
})(withStyles(customEventsStyle)(ProductForm));
