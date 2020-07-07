import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import { Field, FieldArray, reduxForm } from "redux-form";
import validate from "modules/Sun/validate.js";
import CustomInputView from "components/Inputs/CustomInputView";
import Button from "components/CustomButtons/Button.jsx";
import { withStyles } from "@material-ui/core/styles";
import customEventsStyle from "assets/jss/material-dashboard-react/components/customEventsStyle";
import CustomSelectView from "../../../components/Inputs/CustomSelectView";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/GridItem.jsx";
import Search from "views/Search";
import Table from "components/Table/Table.jsx";
import Typography from "@material-ui/core/Typography";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import AddAlert from "@material-ui/icons/AddAlert";
import { startSearchNumber, startSearchPhoneNumber, startVerifyCard } from "../../../modules/Sun";
import IconCard from "components/Cards/IconCard.jsx";
// import IconButton from "components/CustomButtons/IconButton.jsx";
import IconButton from "@material-ui/core/IconButton";
// import Button from "components/CustomButtons/Button.jsx";
import ReactTable from "react-table";
import Fab from "@material-ui/core/Fab";

import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";

import { dataTable } from "../../../variables/general.jsx";
import moment from "moment";
import Chip from "@material-ui/core/Chip";
import InputNumber from "components/Inputs/InputNumber.js";
import Progress from "components/Progress/Progress.js";
import { turnOnLoader } from "../../../modules/Sun/actions";
import CircularProgress from "@material-ui/core/CircularProgress";

const SearchField = props => {
  const { input, classes, name, label, id, placeholder } = props;

  return (
    <TextField
      id={id}
      label={label}
      name={name}
      placeholder={placeholder}
      type="search"
      fullWidth
      className={classes.textField}
      {...input}
    />
  );
};

class EditCard extends Component {
  state = {
    form: {
      searchNumber: null,
      phoneNumber: null
    },
    addCount: null,
    clickSearch: false
  };

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   const { startSearchNumber } = nextProps;
  //   const { form: { searchNumber } } = prevState;
  //   if (!searchNumber) {
  //     startSearchNumber(searchNumber);
  //     return null;
  //   }
  //   return null;
  // }

  componentDidMount() {
    // const { form: { searchNumber } } = this.state;
    // !searchNumber && this.props.startSearchNumber(searchNumber);
    this.onDeleteState();
  }

  onDeleteState = () => {
    this.props.deleteState();
    return this.setState({
      clickSearch: false
    });
  };

  searchData = value => {
    if (!value) {
      return false;
    }
    const { startSearchNumber } = this.props;
    startSearchNumber({ value });
    return this.setState({
      clickSearch: true
    });
  };

  // removeField = () => {
  //   this.setState({
  //     form: {}
  //   });
  // };
  //
  // handleClickReset = () => {
  //   this.props.reset();
  //   return this.removeField();
  // };
  //
  // handleSubmit = evt => {
  //   evt.preventDefault();
  //   const { form: { searchNumber } } = this.state;
  //   this.props.startSearchNumber(searchNumber);
  // };
  //
  // handleChange = (evt, callBack) => {
  //   const { name, value } = evt.target;
  //   this.setState({
  //     form: { ...this.state.form, [name]: value }
  //   });
  //   callBack && callBack(value);
  // };
  //
  // getVerifyNumber = number => {
  //   if (!number) return false;
  //   if (!Number.isInteger(+number)) return false;
  //   const { card } = this.props;
  //   if (card && card.phoneNumber) {
  //     return card.phoneNumber === number;
  //   }
  //   return false;
  // };
  //
  // handleDeleteIseCard = (item) => {
  //   const { card, deleteUseCard, turnOnLoader } = this.props;
  //   turnOnLoader();
  //   deleteUseCard({ card, id: item.id });
  // };

  getTableData = () => {
    const { card } = this.props;
    if (card && card.history) {
      return card.history.map((item, idx) => {
        const { out, place, date } = item;
        return [
          idx + 1,
          moment(date).format("LLLL"),
          out,
          place,
          <div>
            <GridContainer
              spacing={16}
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <ItemGrid xs={2}>
                <IconButton
                  aria-label="delete"
                  disabled={this.props.loader}
                  color="secondary"
                  onClick={() => this.handleDeleteIseCard(item, idx)}
                >
                  <Close/>
                </IconButton>
              </ItemGrid>
            </GridContainer>
          </div>
        ];
      });
    }
    return [];
  };

  getTotalCount = () => {
    const { card } = this.props;
    let count = 0;
    if (card && card.history) {
      card.history.forEach((a) => {
        count += a.out;
      });
    }
    return count;
  };
  //
  setExpirationDate = () => {
    return moment(this.props.card.dateEnd).format("DD.MM.YY");
    // return moment(this.props.card.date, "DD.MM.YY").add(6, "month").format("DD.MM.YY");
  };

  getFormatDate = (date) => moment(date).format("DD.MM.YY");
  //
  // getStatus = () => {
  //   return moment().isSameOrBefore(moment(this.setExpirationDate(), "DD.MM.YY"));
  // };
  //
  getBalance = () => {
    const { card } = this.props;
    if (card) {
      return card && Array.isArray(card.history) && card.history.length ? +card.typeCard - this.getTotalCount() : card.typeCard;
    }
  };

  onChangeAddCount = data => {
    this.setState({
      addCount: +data
    });
  };

  handleClickAddCount = () => {
    const { card, startUseCard, turnOnLoader } = this.props;
    const { addCount } = this.state;
    if (!addCount) return;
    turnOnLoader();
    startUseCard({ card, addCount, date: moment().format("DD.MM.YY h:mm:ss") });
    this.setState({
      addCount: null
    });
  };
  //
  // handleClickResetSearchValue = () => {
  //   this.setState({
  //     form: {
  //       searchNumber: null,
  //       phoneNumber: null
  //     }
  //   });
  //   this.props.reset();
  // };

  handleKeyUp = evt => {
    if (evt.keyCode === 13 && this.getBalance() - this.state.addCount >= 0) {
      this.handleClickAddCount();
    }
    return false;
  };

  render() {
    const {
      classes,
      loader,
      card,
      turnOnLoader,
      verifyMessage,
      cardStatus
    } = this.props;

    const { clickSearch, addCount } = this.state;

    return (
      <Fragment>
        <Paper>
          <GridContainer
            spacing={8}
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <ItemGrid xs={12}>
              <Search
                searchData={this.searchData}
                getLoader={turnOnLoader}
                // loader={loaderCertificate}
                onDeleteState={this.onDeleteState}
              />
            </ItemGrid>
            {loader
              ? <GridContainer
                spacing={8}
                direction="row"
                justify="center"
                alignItems="center"
                style={{ width: "100%" }}
              >
                <CircularProgress
                  size={35}
                  style={{ verticalAlign: "middle" }}
                  className={classes.addCardForm}
                />
              </GridContainer>
              : null
            }
            {card
              ? <GridContainer
                spacing={8}
                direction="row"
                justify="space-between"
                // alignContent="space-between"
                // justify="flex-start"
                // alignItems="center"
                style={{ width: "100%" }}
              >
                <ItemGrid xs={12} sm={5} item>
                  <Typography
                    variant="body1"
                    component="p"
                    className={classes.addCardForm}
                    color={"textSecondary"}
                  >
                    Абонемент: <span style={{ color: "black", fontSize: 18 }}>#{card.cardNumber}</span>
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    className={classes.addCardForm}
                    color={"textSecondary"}
                  >
                    Пользователь: <span
                    style={{ color: "black", fontSize: 18 }}>{card.lastName} {card.name} {card.surname}</span>
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    className={classes.addCardForm}
                    color={"textSecondary"}
                  >
                    Место приобретения: <span style={{ color: "black", fontSize: 18 }}>{card.place.address}</span>
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    className={classes.addCardForm}
                    color={"textSecondary"}
                  >
                    Тип: <span
                    style={{ color: "black", fontSize: 18 }}>{card.typeCard} минут</span>
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    className={classes.addCardForm}
                    color={"textSecondary"}
                  >
                    Тип оплаты: <span
                    style={{ color: "black", fontSize: 18 }}>{card.typePay}</span>
                  </Typography>
                  <Typography
                    variant="body1"
                    component="div"
                    className={classes.addCardForm}
                    color={"textSecondary"}
                  >
                    <GridContainer
                      spacing={16}
                      direction="row"
                      justify="flex-start"
                      alignItems="center"
                    >
                      <ItemGrid xs={12} sm={6} item>
                        {cardStatus && this.getBalance()
                          ? <Fragment>
                            <InputNumber
                              onChange={this.onChangeAddCount}
                              label={"Списать мин..."}
                              onKeyUp={this.handleKeyUp}
                              // placeholder={"Списать мин..."}
                              name="addCount"
                              value={addCount}
                              disabled={loader}
                            />
                            {
                              addCount && this.getBalance() - addCount < 0
                                ?
                                <span
                                  style={{ color: "rgba(255, 0, 0, 0.7)" }}>Не более {this.getBalance()} мин. </span>
                                : null
                            }
                          </Fragment>
                          : null
                        }

                      </ItemGrid>
                      {
                        addCount && this.getBalance() - addCount >= 0 && !loader
                          ? <ItemGrid xs={12} sm={6} item>
                            <Button
                              color={"success"}
                              size={"xs"}
                              onClick={this.handleClickAddCount}
                            >
                              Списать
                            </Button>
                          </ItemGrid>
                          : null
                      }
                    </GridContainer>
                  </Typography>
                </ItemGrid>
                <ItemGrid xs={12} sm={5} item>
                  <Typography
                    variant="body1"
                    component="p"
                    className={classes.addCardForm}
                    color={"textSecondary"}
                  >
                    <span>Статус: </span>
                    <Chip
                      component={"span"}
                      size="small"
                      label={cardStatus && this.getBalance() ? "Активный" : "Неактивный"}
                      color={cardStatus && this.getBalance() ? "primary" : "secondary"}
                    />
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    className={classes.addCardForm}
                    color={"textSecondary"}
                  >
                    Дата приобретения: <span
                    style={{ color: "black", fontSize: 18 }}>{this.getFormatDate(card.date)}</span>
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    className={classes.addCardForm}
                    color={"textSecondary"}
                  >
                    Действителен до: <span
                    style={{ color: "black", fontSize: 18 }}>{this.setExpirationDate()}</span>
                  </Typography>
                  <Typography
                    variant="body1"
                    component="div"
                    className={classes.addCardForm}
                    color={"textSecondary"}
                  >
                    <span>Остаток: </span>
                    <Chip
                      component={"span"}
                      size="small"
                      label={`${this.getBalance()} мин`}
                      color={"secondary"}
                    />
                    {loader
                      ? <CircularProgress
                        size={35}
                        style={{ verticalAlign: "middle" }}
                        className={classes.addCardForm}
                      />
                      : null
                    }
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    className={classes.addCardForm}
                    color={"textSecondary"}
                  >
                    <span>Использовано: </span>
                    <Chip
                      component={"span"}
                      size="small"
                      label={`${card.typeCard - this.getBalance()} мин`}
                      color={"primary"}
                    />
                  </Typography>
                </ItemGrid>
                {this.getTableData().length
                  ? <ItemGrid xs={12} item>
                    <Table
                      striped
                      tableHead={[
                        "#",
                        "Дата",
                        "Количество (мин.)",
                        "Салон",
                        "Действия"
                      ]}
                      tableData={[
                        ...this.getTableData()
                        // {
                        //   total: true,
                        //   colspan: "2",
                        //   amount: `${card && Array.isArray(card.history) && card.history.length ? +card.typeCard - this.getTotalCount() : card.typeCard} мин.`
                        // }
                      ]}
                      customCellClasses={[
                        classes.center,
                        classes.center,
                        classes.center,
                        classes.center,
                        classes.center
                      ]}
                      customClassesForCells={[0, 5, 6]}
                      customHeadCellClasses={[
                        classes.center,
                        classes.center,
                        classes.center,
                        classes.center,
                        classes.center
                      ]}
                      customHeadClassesForCells={[0, 5, 6]}
                    />
                  </ItemGrid>
                  : null
                }
              </GridContainer>
              : null
            }
            {!card && clickSearch && !loader
              ? <p
                className={classes.addCardForm}
              >
                {verifyMessage}
              </p>
              : null
            }
          </GridContainer>
        </Paper>
      </Fragment>
    );
  }
}

EditCard.defaultProps = {
  btnClean: "Очистить",
  btnAdd: "Отправить"
};

EditCard.propTypes = {
  classes: PropTypes.object
};

export default reduxForm({
  form: "cardInfo"
  // validate
})(withStyles(customEventsStyle)(EditCard));
