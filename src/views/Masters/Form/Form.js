import React, { Component } from "react";
import PropTypes from "prop-types";
import { change, Field, FieldArray, reduxForm } from "redux-form";
import { withStyles } from "@material-ui/core/styles/index";
import customEventsStyle from "../../../assets/jss/material-dashboard-react/components/customEventsStyle";
import validate from "./validate";
import CustomInputView from "../../../components/Inputs/CustomInputView";
import RenderMembers from "../RenderMembers";
import Button from "@material-ui/core/Button";
import CustomSelectView from "../../../components/Inputs/CustomSelectView";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

class MasterForm extends Component {
  state = {
    form: {
      surname: null,
      name: null,
      middleName: null,
      phone: null,
      defaultPercent: null,
      labels: [],
      active: true
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
    // console.log(this.props.ignoreMembers);

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
        labels: values || this.getDefaultSelectOption()
      }
    });
  };

  getOptions = () => {
    let count = 0;
    // if (!this.props.products.length) return [];
    if (this.props.resetForm) {
      return [];
    }
    return this.props.labels
      .reduce((start, item) => {
        start.push({
          value: `${item.title}`,
          label: item.title
        });
        return start;
      }, []);
  };

  getDefaultSelectOption = () => {
    const { todo: { labels } } = this.props;
    if (labels && labels.length) {
      const keys = labels.map((item) => item.title.toLowerCase());
      return this.getOptions().filter(item => keys.includes(item.value.toLowerCase())) || [];
    }
  };

  handleChangeActive = (evt) => {
    const { name, value, checked } = evt.target;
    // console.log(name, value, checked);
    this.setState({
      form: {
        ...this.state.form,
        active: !this.state.form.active
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
      // handleClickClose,
      valid,
      todo
      // labels
      // btnAdd,
      // btnClean,
      // btnCanceled
    } = this.props;
    const { form: { surname, name, middleName, phone, defaultPercent, labels, active } } = this.state;
    const { ignoreMembers, handleClickCanceled, isNew, isStart, errorMessage } = this.props;
    let keys = [];
    if (ignoreMembers) {
      keys = Object.keys(ignoreMembers);
    }
    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="surname"
          type="text"
          id="lastName"
          label="Фамилия*"
          placeholder='Солнцева'
          initialSelectValue={this.props.todo.surname}
          component={CustomInputView}
        />
        <Field
          name="name"
          type="text"
          id="name"
          label="Имя*"
          placeholder='Наталья'
          // value={name}
          initialSelectValue={this.props.todo.name}
          // onChange={this.handleChange}
          component={CustomInputView}
        />
        <Field
          name="middleName"
          type="text"
          id="middleName"
          label="Отчество*"
          placeholder='Михайловна'
          // value={middleName}
          initialSelectValue={this.props.todo.middleName}
          // onChange={this.handleChange}
          component={CustomInputView}
        />
        <Field
          name="phone"
          type="text"
          id="phone"
          labelText="Номер телефона*"
          placeholder='89212287228'
          // value={phone}
          initialSelectValue={this.props.todo.phone}
          // onChange={this.handleChange}
          component={CustomInputView}
        />
        <Field
          name="defaultPercent"
          type="number"
          id="defaultPercent"
          labelText="Процент по умолчанию*"
          placeholder='50'
          initialSelectValue={`${this.props.todo.defaultPercent}`}
          // onChange={this.handleChange}
          component={CustomInputView}
        />
        {!isStart
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
                      label='Действующий мастер?'
                      onChange={props.input.onChange}
                    />
                  }
                  label="Активный мастер?"/>
              );
            }}
            // component={SwitchComponent}
            // component={CustomRadioCheckBox}
            onChange={this.handleChangeActive}
          />
          : null
        }

        <Field
          name="labels"
          // classes={classes}
          id="labels"
          // menuIsOpen
          isMulti
          label='Выберите метку'
          options={this.getOptions()}
          height={150}
          selectValues={labels}
          component={CustomSelectView}
          onChange={this.handleChangeType}
        />
        {keys.length
          ? <FieldArray
            keys={keys}
            name="members"
            classes={classes}
            isDisabledBtn={!valid && !submitting}
            // addField={this.addField}
            todo={todo}
            component={RenderMembers}
            // ignoreMembers={ignoreMembers}
            onChangeIgnor={this.props.onChangeIgnor}
          />
          : null
        }

        {/*<FieldArray*/}
        {/*keys={keys}*/}
        {/*name="members"*/}
        {/*classes={classes}*/}
        {/*isDisabledBtn={!valid && !submitting}*/}
        {/*// addField={this.addField}*/}
        {/*todo={todo}*/}
        {/*component={RenderMembers}*/}
        {/*// ignoreMembers={ignoreMembers}*/}
        {/*onChangeIgnor={this.props.onChangeIgnor}*/}
        {/*/>*/}

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
            onClick={handleClickCanceled}
          >
            {/*{btnAdd}*/}
            Отмена
          </Button>
        </div>
      </form>
    );
  }
}

MasterForm.defaultProps = {};

MasterForm.propTypes = {
  classes: PropTypes.object
};

export default reduxForm({
  form: "masterForm",
  validate
})(withStyles(customEventsStyle)(MasterForm));
