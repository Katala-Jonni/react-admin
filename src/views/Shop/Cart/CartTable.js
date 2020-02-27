import React, { Component, Fragment } from "react";

// material-ui components
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

// material-ui icons
import Close from "@material-ui/icons/Close";
import Remove from "@material-ui/icons/Remove";
import Add from "@material-ui/icons/Add";
import AttachMoney from "@material-ui/icons/AttachMoney";
import CreditCard from "@material-ui/icons/CreditCard";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";

import extendedTablesStyle from "../../../assets/jss/material-dashboard-react/views/extendedTablesStyle";
import CertificateView from "../CertificateView";
import MixedPay from "../../MixedPay/index";
import { sendCertificate as startSendCertificate } from "../../../modules/Certificate";
import { deleteState } from "../../../modules/Certificate/actions";

class ExtendedTables extends Component {
  state = {
    tr: false,
    openViewCertificate: false
  };
  handleClickAdd = item => {
    const { totalCart, addToCartStart } = this.props;
    const products = totalCart.filter(a => {
      if (a._id === item._id) {
        a.count += 1;
      }
      return a;
    });

    addToCartStart(products);
  };

  handleClickRemove = item => {
    const { totalCart, addToCartStart } = this.props;
    const products = totalCart.filter(a => {
      if (a._id === item._id) {
        a.count = a.count <= 1 ? 1 : a.count - 1;
      }
      return a;
    });

    addToCartStart(products);
  };

  handleClickClose = item => {
    const { totalCart, addToCartStart } = this.props;
    addToCartStart(totalCart.filter(a => a._id !== item._id));
  };

  getTotalPrice = () => {
    const { totalCart } = this.props;
    let count = 0;
    totalCart.forEach(el => count += el.price * el.count);
    return count;
  };

  handleCloseViewCart = () => {
    this.setState({
      openViewCertificate: false
    });
    this.props.endSearchNumber({
      isCertificate: true,
      verifyMessage: "Такой сертификат не найден",
      certificate: null
    });
  };

  handleClickMixed = evt => {
    // console.log(this.props);
    this.setState({
      openViewCertificate: true
    });
    // this.handleClickSubmit(evt);
  };

  handleClickSubmit = evt => {
    const { value, dataSetType } = evt.currentTarget;
    const { totalCart, totalDay, totalOrders, startSendCart, masters } = this.props;
    const data = {
      totalCart,
      totalDay,
      totalOrders,
      masters,
      payment: evt.currentTarget.dataset.type,
      infoPay: [{ typePay: evt.currentTarget.dataset.type, count: 1 }],
      certificateNumber: 0
    };
    startSendCart(data);
    this.props.handleCloseView();
    this.props.showNotification("tr");
  };


  // handleClickSubmit = evt => {
  //   const { value, dataSetType } = evt.currentTarget;
  //   const { totalCart, totalDay, totalOrders, startSendCart, masters } = this.props;
  //   const data = {
  //     totalCart,
  //     // totalDay,
  //     // totalOrders,
  //     masters,
  //     payment: evt.currentTarget.dataset.type,
  //     infoPay: [{ typePay: evt.currentTarget.dataset.type, count: 0 }],
  //     certificateNumber: 0
  //   };
  //   startSendCart(data);
  //   this.props.handleCloseView();
  //   this.props.showNotification("tr");
  // };

  handleClickSubmitMixed = values => {
    const { members, number } = values;
    const { totalCart, totalDay, totalOrders, startSendCart, masters, certificate } = this.props;
    startSendCart({
      totalCart,
      totalDay,
      totalOrders,
      masters,
      payment: "mixed",
      typeMixed: values,
      infoPay: members,
      certificateNumber: number,
      certificateInfo: certificate
    });
    if (certificate) {
      this.props.deleteState();
    }
    // startSendCart({ totalCart, totalDay, totalOrders, masters, payment: "mixed", typeMixed: values});
    // this.props.handleCloseView();
    // this.props.showNotification("tr");
  };

  getTotalCell = () => {
    const { classes, totalCart } = this.props;
    return totalCart.map(item => {
      return [
        <div className={classes.imgContainer}>
          <img src={item.img} alt="..." className={classes.img}/>
        </div>,
        <div>
          <small className={classes.tdNameSmall}>
            {item.title}
          </small>
        </div>,
        <div>
          {item.isMaster ? item.name : item.title}
        </div>,
        <div className={classes.flex}>
          <span>{item.price}</span>
          <small className={classes.tdNumberSmall}>₽</small>
        </div>,
        <div className={classes.flex}>
          <Tooltip title={"Убрать один"} aria-label={"Убрать один"}>
            <IconButton onClick={() => this.handleClickRemove(item)}>
              <Remove color={"primary"}/>
            </IconButton>
          </Tooltip>
          <Typography variant="h5" color="textSecondary" component="span">
            {item.count}
          </Typography>
          <Tooltip title={"Добавить еще один"} aria-label={"Добавить еще один"}>
            <IconButton onClick={() => this.handleClickAdd(item)}>
              <Add color={"primary"}/>
            </IconButton>
          </Tooltip>
        </div>,
        <div className={classes.flex}>
          <span>{item.count * item.price}</span>
          <small className={classes.tdNumberSmall}>₽</small>
        </div>,
        <Tooltip title={"Удалить"} aria-label={"Удалить"}>
          <IconButton onClick={() => this.handleClickClose(item)}>
            <Close className={classes.icon}/>
          </IconButton>
        </Tooltip>
      ];
    });
  };

  handleSubmit = values => {
    // values.preventDefault();
    console.log(values, "values");
  };

  render() {
    const { classes } = this.props;
    const { openViewCertificate } = this.state;
    return (
      <GridContainer>
        <ItemGrid xs={12}>
          <Dialog
            maxWidth={"md"}
            open={openViewCertificate}
            onClose={this.handleCloseViewCart}
            fullScreen={true}
            scroll="paper"
            aria-labelledby="max-width-dialog-title"
          >
            <DialogTitle id="max-width-dialog-title">
              Выберите тип оплаты
            </DialogTitle>
            <DialogContent>
              <MixedPay
                onSubmit={this.handleClickSubmitMixed}
                // onSubmit={this.handleSubmit}
                totalPrice={this.getTotalPrice()}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleCloseViewCart}
                color={"primary"}
                variant="contained"
              >
                Закрыть
              </Button>
            </DialogActions>
          </Dialog>
        </ItemGrid>
        <ItemGrid xs={12}>
          <Table
            tableHead={[
              "",
              "Наименование",
              "Мастер/Услуга/Товар",
              "Цена",
              "Количество",
              "Стоимость",
              ""
            ]}
            tableData={[
              ...this.getTotalCell(),
              {
                total: true,
                colspan: "5",
                amount: (
                  <div>
                    <span>{this.getTotalPrice()}</span>
                    <small className={classes.tdNumberSmall}>₽</small>
                  </div>
                )
              }
            ]}
            tableShopping
            customHeadCellClasses={[
              classes.center,
              classes.description,
              classes.center,
              classes.center,
              classes.center
            ]}
            customHeadClassesForCells={[0, 2, 3, 4, 5]}
            customCellClasses={[
              classes.tdName,
              classes.customFont,
              classes.customFont,
              classes.tdNumber,
              classes.tdNumber + " " + classes.tdNumberAndButtonGroup,
              classes.tdNumber
            ]}
            customClassesForCells={[1, 2, 3, 4, 5]}
          />
        </ItemGrid>
        <div className={classes.buttonGroup}>
          <Fab
            variant="extended"
            aria-label="mixed"
            data-type={"mixed"}
            size={"large"}
            className={classes.margin}
            onClick={this.handleClickMixed}
          >
            <CreditCard className={classes.extendedIcon}/>
            Смешанная оплата{" "}
            <KeyboardArrowRight className={classes.icon}/>
          </Fab>
          <Fab
            variant="extended"
            color="primary"
            aria-label="cash"
            data-type={"cash"}
            size={"large"}
            className={classes.margin}
            onClick={this.handleClickSubmit}
          >
            <AttachMoney className={classes.extendedIcon}/>
            Наличкой{" "}
            <KeyboardArrowRight className={classes.icon}/>
          </Fab>
          <Fab
            variant="extended"
            color="secondary"
            aria-label="card"
            data-type={"card"}
            size={"large"}
            className={classes.margin}
            onClick={this.handleClickSubmit}
          >
            <CreditCard className={classes.extendedIcon}/>
            Картой{" "}
            <KeyboardArrowRight className={classes.icon}/>
          </Fab>
        </div>
      </GridContainer>
    );
  }
}

export default withStyles(extendedTablesStyle)(ExtendedTables);


/*
<Fragment>
  <GridContainer justify={"space-between"} direction={"row"} spacing={8}>
    <ItemGrid xs={3} item>
      <Fab
        variant="extended"
        aria-label="mixed"
        data-type={"mixed"}
        size={"large"}
        // className={classes.margin}
        onClick={this.handleClickSubmit}
      >
        <CreditCard className={classes.extendedIcon}/>
        Смешанная оплата{" "}
        <KeyboardArrowRight className={classes.icon}/>
      </Fab>
    </ItemGrid>
    <ItemGrid xs={3} item>
      <Fab
        variant="extended"
        color="secondary"
        aria-label="card"
        data-type={"card"}
        size={"large"}
        // className={classes.margin}
        onClick={this.handleClickSubmit}
      >
        <CreditCard className={classes.extendedIcon}/>
        Картой{" "}
        <KeyboardArrowRight className={classes.icon}/>
      </Fab>
    </ItemGrid>
    <ItemGrid xs={3} item>
      <Fab
        variant="extended"
        color="primary"
        aria-label="cash"
        data-type={"cash"}
        size={"large"}
        // className={classes.margin}
        onClick={this.handleClickSubmit}
      >
        <AttachMoney className={classes.extendedIcon}/>
        Наличкой{" "}
        <KeyboardArrowRight className={classes.icon}/>
      </Fab>
    </ItemGrid>
  </GridContainer>
</Fragment>
*/

