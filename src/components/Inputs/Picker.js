import "date-fns";
import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { TimePicker, DatePicker } from "material-ui-pickers";
import "moment/locale/ru";

class MaterialUIPickers extends Component {
  onChange = (...rest) => {
    this.props.input.onChange(rest);
  };

  componentDidMount() {
    if (this.props.valD) {
      this.props.input.onChange(this.props.valD);
    }
  }

  render() {
    const {
      isEnd,
      isTime,
      id,
      input,
      meta: { error, valid },
      onChange,
      onOpen,
      onClose,
      disabled
    } = this.props;

    return (
      <Fragment>
        {
          isTime
            ? <TimePicker
              autoOk
              id={id}
              ampm={false}
              label={isEnd ? "Конечное время" : "Начальное время"}
              cancelLabel="Отмена"
              invalidLabel='Не указано'
              minutesStep={5}
              margin="normal"
              minDate={new Date()}
              disabled={disabled}
              helperText={error}
              error={(!valid && error) !== false}
              invalidDateMessage={`Укажите ${isEnd ? "конечное время" : "начальное время"}`}
              {...input}
            />
            : <DatePicker
              autoOk
              showTodayButton
              id={id}
              label="Выберите дату"
              format="DD/MM/YYYY"
              todayLabel="Сегодня"
              cancelLabel="Отмена"
              invalidLabel="Не указана"
              invalidDateMessage="Выберите дату"
              variant="outlined"
              margin="normal"
              disabled={disabled}
              minDate={new Date()}
              onChange={onChange}
              onOpen={onOpen}
              onClose={onClose}
              {...input}
            />
        }
      </Fragment>
    );
  }
}

MaterialUIPickers.propTypes = {
  isEnd: PropTypes.bool,
  isTime: PropTypes.bool,
  error: PropTypes.string,
  valid: PropTypes.bool,
  disabled: PropTypes.bool,
  valD: PropTypes.object,
  id: PropTypes.string,
  input: PropTypes.object,
  onChange: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func
};

export default MaterialUIPickers;
