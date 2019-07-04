import React, { Component, Fragment } from "react";

// material-ui components
import { withStyles } from "@material-ui/core/styles";


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

class ExtendedTables extends Component {
  state = {
    tr: false
  };
  handleClickAdd = item => {
    const { totalCart, addToCart } = this.props;
    const products = totalCart.filter(a => {
      if (a.id === item.id) {
        a.count += 1;
      }
      return a;
    });

    addToCart(products);
  };

  handleClickRemove = item => {
    const { totalCart, addToCart } = this.props;
    const products = totalCart.filter(a => {
      if (a.id === item.id) {
        a.count = a.count <= 1 ? 1 : a.count - 1;
      }
      return a;
    });

    addToCart(products);
  };

  handleClickClose = item => {
    const { totalCart, addToCart } = this.props;
    addToCart(totalCart.filter(a => a.id !== item.id));
  };

  getTotalPrice = () => {
    const { totalCart } = this.props;
    let count = 0;
    totalCart.forEach(el => count += el.price * el.count);
    return count;
  };

  handleClickSubmit = evt => {
    const { value, dataSetType } = evt.currentTarget;
    const { totalCart, totalDay, totalOrders, startSendCart, masters } = this.props;
    startSendCart({ totalCart, totalDay, totalOrders, masters, payment: evt.currentTarget.dataset.type });
    this.props.handleCloseView();
    this.props.showNotification("tr");
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

  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
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
              // {
              //   purchase: true,
              //   colspan: "0",
              //   col: {
              //     colspan: 6,
              //     text: (
              //       null
              //     )
              //   }
              // }
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
          {/*<Fab*/}
            {/*variant="extended"*/}
            {/*aria-label="mixed"*/}
            {/*data-type={"mixed"}*/}
            {/*size={"large"}*/}
            {/*className={classes.margin}*/}
            {/*onClick={this.handleClickSubmit}*/}
          {/*>*/}
            {/*<CreditCard className={classes.extendedIcon}/>*/}
            {/*Смешанная оплата{" "}*/}
            {/*<KeyboardArrowRight className={classes.icon}/>*/}
          {/*</Fab>*/}
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

