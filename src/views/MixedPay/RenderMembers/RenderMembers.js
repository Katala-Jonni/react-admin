import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import "date-fns";
import "moment/locale/ru";

// core components
import Member from "../Member/index";
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/GridItem.jsx";

// material-ui components
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import Remove from "@material-ui/icons/Remove";

// data
import options from "../data/index";

class RenderMembers extends Component {
  state = {
    // заполнен ли текущий вариант
    addType: true,
    // исключить options
    stopOptions: [],
    // исключения options
    exceptionOptions: []
    // exceptionOptions: ["certificate"]
  };

  componentWillUnmount() {
    this.handleRemoveAllFields();
  }

  // блок кнопки добавления типа
  changeAddType = bool => {
    this.setState({
      addType: bool
    });
  };

  handleRemoveAllFields = () => {
    const { fields, removeType } = this.props;
    fields.removeAll();
    removeType();
    this.props.reset();
    this.setState({
      stopOptions: []
    });
    return this.changeAddType(true);
  };

  handleAddField = () => {
    this.props.fields.push({});
    return this.changeAddType(false);
  };

  getOptions = () => {
    const { stopOptions } = this.state;
    return options.filter(item => !stopOptions.includes(item.value));
  };

  addStopOption = option => {
    const { stopOptions, exceptionOptions } = this.state;
    const exception = exceptionOptions.find(item => item === option);
    if (exception) return;
    this.setState({
      stopOptions: [...stopOptions, option]
    });
  };

  render() {
    const { fields, classes, btnText, totalSum, cash, card, certificate } = this.props;
    const { addType } = this.state;
    const deposit = cash + card + certificate;
    const balance = totalSum - deposit;
    return (
      <Fragment>
        <p>Сумма к оплате:
          <span>  {totalSum}</span>
          <small className={classes.tdNumberSmall}> ₽</small>
        </p>
        <p>Внесено:
          <span>  {deposit}</span>
          <small className={classes.tdNumberSmall}> ₽</small>
        </p>
        <p>Остаток:
          <span>  {balance}</span>
          <small className={classes.tdNumberSmall}> ₽</small>
          {balance < 0 && <span> Не может быть меньше 0</span>}
        </p>
        <ul className={classes.list}>
          <Fragment>
            <li>
              <GridContainer justify="flex-start" spacing={16}>
                {addType && totalSum - deposit > 0 && this.getOptions().length
                  ? <ItemGrid xs={3} item>
                    <Button
                      type="button"
                      color='primary'
                      variant="contained"
                      size="small"
                      className={classes.addButton}
                      // при нажатии блокировать, пока не заполнен первый вариант
                      // disabled={isDisabledBtn}
                      onClick={this.handleAddField}
                    >
                      {btnText}
                    </Button>
                  </ItemGrid>
                  : null
                }
                {fields.length
                  ? <ItemGrid xs={3} item>
                    <Tooltip title='Очистить все'>
                      <Fab
                        color='secondary'
                        variant="extended"
                        size="small"
                        className={classes.flexItem}
                        onClick={this.handleRemoveAllFields}
                      >
                        <Remove/>
                      </Fab>
                    </Tooltip>
                  </ItemGrid>
                  : null
                }
              </GridContainer>
            </li>
          </Fragment>

          {fields.map((member, index) => {
            return (
              <li key={index}>
                <Member
                  member={member}
                  index={index}
                  classes={classes}
                  reset={this.props.reset}
                  balance={balance}
                  options={[...this.getOptions()]}
                  changeAddType={this.changeAddType}
                  addStopOption={this.addStopOption}
                />
              </li>
            );
          })}
        </ul>
        {totalSum - deposit === 0
          // валидация поля, если введено больше искомой суммы, то ошибка
          ? <Button
            type="submit"
            color='primary'
            variant="contained"
            // disabled={!this.state.isMember || (!valid && !submitting)}
            className={classes.indent}
          >
            Отправить
          </Button>
          : null
        }
      </Fragment>
    );
  }
}

RenderMembers.defaultProps = {
  btnText: "Добавить тип оплаты",
  // totalSum: 0
};

RenderMembers.propTypes = {
  classes: PropTypes.object.isRequired,
  totalSum: PropTypes.number.isRequired,
  fields: PropTypes.object.isRequired,
  btnText: PropTypes.string
};

export default RenderMembers;
