import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import momentTimeZone from "moment-timezone";
import moment from "moment";

import ExpansionPanel from "../ExpansionPanel";

// core components
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import Chip from "@material-ui/core/Chip";
import CircularProgress from "@material-ui/core/CircularProgress";

// material-ui components
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/GridItem.jsx";
import Search from "views/Search";
import Table from "components/Table/Table.jsx";

// @material-ui/icons

// style
import customEventsStyle from "assets/jss/material-dashboard-react/components/customEventsStyle";
import ListServices from "../ListServices/ListServices";
import CertificateHistory from "../CertificateHistory";

const options = [
  {
    label: "Сертификат",
    value: "#12345",
    isChip: false,
    component: null,
    separator: ":"
  },
  {
    label: "Номер телефона",
    value: "89114232988",
    isChip: false,
    component: null,
    separator: ":"
  },
  {
    label: "Место приобретения",
    value: "Древлянка 14, корпус 1",
    isChip: false,
    component: null,
    separator: ":"
  },
  {
    label: "Тип оплаты",
    value: "Смешанная",
    isChip: false,
    component: null,
    separator: ":"
  },
  {
    label: "Привилегии",
    value: "Сумма",
    isChip: false,
    component: null,
    separator: ":"
  },
  {
    label: "Статус",
    value: "Активный",
    isChip: true,
    chip: {
      component: "span",
      size: "small",
      color: "primary"
    },
    component: null,
    separator: ":"
  },
  {
    label: "Дата приобретения",
    value: "10.10.2019",
    isChip: false,
    component: null,
    separator: ":"
  },
  {
    label: "Действителен до",
    value: "10.10.2020",
    isChip: false,
    component: null,
    separator: ":"
  },
  {
    label: "Остаток",
    value: "1000 рублей",
    isChip: true,
    chip: {
      component: "span",
      size: "small",
      color: "secondary"
    },
    component: CircularProgress,
    componentProps: {
      size: 35,
      style: { verticalAlign: "middle" },
      color: "secondary"
    },
    separator: ":"
  },
  {
    label: "Использовано",
    value: "0 рублей",
    isChip: true,
    chip: {
      component: "span",
      size: "small",
      color: "primary"
    },
    component: null,
    separator: ":"
  }
];

const getTimeZone = (currentDate) => momentTimeZone.tz(currentDate, "Europe/Moscow");

class EditCertificate extends Component {
  state = {
    clickSearch: false
  };

  componentDidMount() {
    this.onDeleteState();
  }

  searchData = value => {
    const { startSearchNumber, certificateStatus, isPay } = this.props;
    startSearchNumber({ value, certificateStatus, isPay });
    return this.setState({
      clickSearch: true
    });
  };

  getTableData = () => {
    const { card } = this.props;
    if (card && card.history) {
      return card.history.map((item, idx) => {
        const { count, place, date } = item;
        return [
          idx + 1,
          place,
          count,
          date,
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

  onDeleteState = () => {
    this.props.deleteState();
    return this.setState({
      clickSearch: false
    });
  };

  getStatus = (date) => {
    const dateZone = getTimeZone(date);
    return moment().isSameOrBefore(moment(dateZone));
  };

  getBalance = (isFull, isSpend) => {
    const { certificate } = this.props;
    let count = certificate.certificateSum;
    let historyCount = 0;
    if (certificate.history.length) {
      historyCount += certificate.history.reduce((start, item) => start += item.out, 0);
    }
    if (isFull) {
      count += historyCount;
    }
    if (isSpend) {
      count = historyCount;
    }
    // console.log(count);
    return count;
  };

  render() {
    const {
      classes,
      loader,
      certificate,
      loaderCertificate,
      turnOnLoaderCertificate,
      verifyMessage,
      isPay,
      certificateStatus
    } = this.props;
    const { clickSearch } = this.state;

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
                getLoader={turnOnLoaderCertificate}
                loader={loaderCertificate}
                onDeleteState={this.onDeleteState}
                isPay={isPay}
              />
            </ItemGrid>
            {loaderCertificate
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
            {certificate && !isPay
              ? <GridContainer
                style={{ width: "100%" }}
                spacing={16}
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <ItemGrid xs={12} sm={6} item>
                  <Typography
                    variant="body1"
                    component="p"
                    className={classes.addCardForm}
                    color={"textSecondary"}
                  >
                    Сертификат: <span style={{ color: "black", fontSize: 18 }}>#{certificate.certificateNumber}</span>
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    className={classes.addCardForm}
                    color={"textSecondary"}
                  >
                    Номер телефона: <span
                    style={{ color: "black", fontSize: 18 }}>{certificate.phoneNumber}</span>
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    className={classes.addCardForm}
                    color={"textSecondary"}
                  >
                    Место приобретения: <span
                    style={{ color: "black", fontSize: 18 }}>{certificate.place.address}</span>
                  </Typography>
                  <Typography
                    variant="body1"
                    component="div"
                    className={classes.addCardForm}
                    color={"textSecondary"}
                  >
                    Привилегии:
                    {
                      certificate.typeCertificate !== "service"
                        ? <span style={{ color: "black", fontSize: 18 }}> {this.getBalance(true)} ₽</span>
                        : <ListServices
                          options={certificate}
                          isFull
                          description="Услуга"
                        />
                    }
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    className={classes.addCardForm}
                    color={"textSecondary"}
                  >
                    Тип оплаты: <span
                    style={{ color: "black", fontSize: 18 }}>{certificate.typePay}</span>
                  </Typography>
                </ItemGrid>
                < ItemGrid xs={12} sm={6} item>
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
                      label={certificateStatus ? "Активный" : "Неактивный"}
                      color={certificateStatus ? "primary" : "secondary"}
                    />
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    className={classes.addCardForm}
                    color={"textSecondary"}
                  >
                    Дата приобретения: <span
                    style={{ color: "black", fontSize: 18 }}>{getTimeZone(certificate.date).format("DD.MM.YYYY")}</span>
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    className={classes.addCardForm}
                    color={"textSecondary"}
                  >
                    Действителен до: <span
                    style={{
                      color: "black",
                      fontSize: 18
                    }}>{getTimeZone(certificate.dateEnd).format("DD.MM.YYYY")}</span>
                  </Typography>
                  <Typography
                    variant="body1"
                    component="div"
                    className={classes.addCardForm}
                    color={"textSecondary"}
                  >
                    {
                      certificate.typeCertificate !== "service"
                        ? <Fragment>
                          <span>Остаток: </span>
                          <Chip
                            component={"span"}
                            size="small"
                            label={`${this.getBalance()} ₽`}
                            color={"secondary"}
                          />
                        </Fragment>
                        : <ListServices
                          options={certificate}
                          description="Остаток"
                          open
                        />
                    }
                    {loader ?
                      <CircularProgress
                        size={35}
                        style={{ verticalAlign: "middle" }}
                        className={classes.addCardForm}
                      />
                      : null
                    }
                  </Typography>
                  <Typography
                    variant="body1"
                    component="div"
                    className={classes.addCardForm}
                    color={"textSecondary"}
                  >
                    {
                      certificate.typeCertificate !== "service"
                        ? <Fragment>
                          <span>Использовано: </span>
                          <Chip
                            component={"span"}
                            size="small"
                            label={`${this.getBalance(false, true)} ₽`}
                            color={"primary"}
                          />
                        </Fragment>
                        : <ListServices
                          options={certificate}
                          isSpend
                          description="Использовано"
                        />
                    }
                  </Typography>
                </ItemGrid>
                {/*{this.getTableData().length*/}
                {/*? <ItemGrid xs={12} item>*/}
                {/*<Table*/}
                {/*striped*/}
                {/*tableHead={[*/}
                {/*"#",*/}
                {/*"Салон",*/}
                {/*"Услуга / Сумма",*/}
                {/*"Дата",*/}
                {/*"Действия"*/}
                {/*]}*/}
                {/*tableData={[*/}
                {/*...this.getTableData()*/}
                {/*]}*/}
                {/*customCellClasses={[*/}
                {/*classes.center,*/}
                {/*classes.center,*/}
                {/*classes.center,*/}
                {/*classes.center,*/}
                {/*classes.center*/}
                {/*]}*/}
                {/*customClassesForCells={[0, 5, 6]}*/}
                {/*customHeadCellClasses={[*/}
                {/*classes.center,*/}
                {/*classes.center,*/}
                {/*classes.center,*/}
                {/*classes.center,*/}
                {/*classes.center*/}
                {/*]}*/}
                {/*customHeadClassesForCells={[0, 5, 6]}*/}
                {/*/>*/}
                {/*</ItemGrid>*/}
                {/*: null*/}
                {/*}*/}
              </GridContainer>
              : null
            }
            {!certificate && clickSearch && !loaderCertificate
              ? <p
                className={classes.addCardForm}
              >
                {verifyMessage}
              </p>
              : null
            }
          </GridContainer>
          {/*{!isPay && certificate && certificate.history.length*/}
          {/*? <div className={classes.topMargin}>*/}
          {/*<Typography*/}
          {/*variant="h5"*/}
          {/*component="h5"*/}
          {/*align="center"*/}
          {/*>*/}
          {/*История сертификата*/}
          {/*</Typography>*/}
          {/*<CertificateHistory/>*/}
          {/*</div>*/}
          {/*: null*/}
          {/*}*/}
          {!isPay && certificate && certificate.history.length
            ? <ExpansionPanel data={certificate}/>
            : null
          }
        </Paper>

      </Fragment>
    );
  }
}

EditCertificate.defaultProps = {
  btnClean: "Очистить",
  btnAdd: "Найти",
  label: "Введите номер*",
  name: "searchNumber",
  id: "searchNumber",
  placeholder: "1234567890",
  verifyMessage: "Сертификат не найден"
};

EditCertificate.propTypes = {
  classes: PropTypes.object,
  btnClean: PropTypes.string,
  btnAdd: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  viewIcon: PropTypes.bool,
  verifyMessage: PropTypes.string
};

export default withStyles(customEventsStyle)(EditCertificate);

/*
<ItemGrid xs={12}>
  <div className={classes.addCardForm}>
    <GridContainer
      spacing={32}
      direction="row"
      justify="flex-start"
      alignItems="center"
    >
      <GridList
        options={options}
        loader={loader}
        classes={classes}
        step={5}
      >
        Привет
      </GridList>
      {this.getTableData().length
        ? <ItemGrid xs={12} item>
          <Table
            striped
            tableHead={[
              "#",
              "Салон",
              "Наименование",
              "Дата",
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
  </div>
</ItemGrid>
*/
