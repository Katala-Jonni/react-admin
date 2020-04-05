import React, { Component } from "react";
import PropTypes from "prop-types";

import "../../assets/css/styles/app.scss";
import "../../assets/css/styles/bootstrap.scss";

import "jquery";
import "jquery-slimscroll/jquery.slimscroll.min";
import classNames from "classnames";

// core components
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import CustomButton from "components/CustomButtons/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

// import CatalogComponent from "./CatalogComponent";

import customEventsStyle from "../../assets/jss/material-dashboard-react/components/customEventsStyle";

// material-ui components
import ToDoList from "./ToDoList";
import ToDoDetail from "./ToDoDetail";
import SearchBox from "components/SearchBox";
import MasterForm from "views/Masters/Form";
import Progress from "components/Progress/Progress";

// @material-ui/icons

// data
import filters from "../../modules/Master/filters";
import labels from "../../modules/Master/labels";
import options from "../../modules/Master/options";
import { set_current_todo_null } from "../../modules/Master/actions";
import { endRemoveDay } from "../../modules/Shop/actions";

const ITEM_HEIGHT = 34;

class Masters extends Component {
  state = {
    isCatalog: false
  };
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.props.on_sortend({ oldIndex, newIndex });
  };
  onLabelSelect = event => {
    this.props.on_label_select();
    this.setState({
      anchorEl: event.currentTarget
    });
  };
  onOptionMenuSelect = event => {
    this.props.on_option_menu_select();
    this.setState({
      anchorEl: event.currentTarget
    });
  };
  handleRequestClose = event => {
    this.props.handle_request_close();
  };
  onOptionMenuItemSelect = (option) => {
    switch (option.title) {
      case "All":
        this.props.handle_request_close();
        this.props.select_all_todo();
        break;
      case "None":
        this.props.handle_request_close();
        this.props.get_unselected_all_todo();
        break;
      case "Starred":
        this.props.handle_request_close();
        this.props.get_starred_todo();
        break;
      case "Unstarred":
        this.props.handle_request_close();
        this.props.get_unstarred_todo();
        break;
      case "Important":
        this.props.handle_request_close();
        this.props.get_important_todo();
        break;
      case "Unimportant":
        this.props.handle_request_close();
        this.props.get_unimportant_todo();
        break;
    }
  };
  onLabelMenuItemSelect = (label) => {
    this.props.handle_request_close();
    this.props.on_label_menu_item_select(label);
  };
  onLabelUpdate = (data, label) => {
    this.props.handle_request_close();
    this.props.on_label_update({ data, label });
  };
  onToDoUpdate = (data) => {
    this.props.handle_request_close();
    this.props.on_todo_update(data);
  };
  onDeleteToDo = (data) => {
    this.props.on_delete_todo(data);
  };
  onTodoChecked = (data) => {
    this.props.on_todo_checked(data);
  };
  onAllTodoSelect = () => {
    const selectAll = this.props.selectedToDos < this.props.toDos.length;
    if (selectAll) {
      this.props.select_all_todo();
    } else {
      this.props.get_unselected_all_todo();
    }
  };

  onTodoAdd = (data) => {
    this.props.on_todo_add(data);
  };

  onTodoSelect = (todo) => {
    this.props.on_todo_select(todo);
    setTimeout(() => {
      this.props.on_hide_loader();
    }, 1500);
  };

  removeLabel = (todo, label) => {
    todo.labels.splice(todo.labels.indexOf(label), 1);
    return todo.labels;
  };

  addLabel = (todo, label) => {
    todo.labels = todo.labels.concat(label);
    return todo.labels;
  };

  onToggleDrawer = () => {
    this.props.on_toggle_drawer();

  };
  onSearchTodo = (searchText) => {
    this.props.search_todo(searchText);
  };
  updateSearch = (evt) => {
    this.props.update_search(evt.target.value);
    this.onSearchTodo(evt.target.value);
  };

  getNavFilters = () => {
    return filters.map((filter, index) =>
      <li key={index} onClick={() => {
        this.props.get_nav_filters(filter);
        setTimeout(() => {
          this.props.on_hide_loader();
        }, 1500);
      }
      }>
        <a href="javascript:void(0)" className={filter.id === this.props.selectedSectionId ? "active" : ""}>
          <i className={`zmdi zmdi-${filter.icon}`}/>
          <span>{filter.title}</span>
        </a>
      </li>
    );
  };

  getNavLabels = () => {
    // return labels.map((label, index) =>
    // console.log(this.props.labels);
    // console.log(this.props.categories);
    // console.log(labels);
    return this.props.labels.map((label, index) =>
      <li
        key={index}
        onClick={() => {
          this.props.get_nav_labels(label);
          setTimeout(() => {
            this.props.on_hide_loader();
          }, 500);
        }
        }>
        <a href="javascript:void(0)">
          <i
            className={`zmdi zmdi-label-alt text-${label.color}`}
          />
          <span>{label.value}</span>
        </a>
      </li>
    );
    // return this.props.labels.map((label, index) =>
    //   <li
    //     key={index}
    //     onClick={() => {
    //       this.props.get_nav_labels(label);
    //       setTimeout(() => {
    //         this.props.on_hide_loader();
    //       }, 500);
    //     }
    //     }>
    //     <a href="javascript:void(0)">
    //       <i
    //         className={`zmdi zmdi-label-alt text-${label.color}`}
    //       />
    //       <span>{label.title}</span>
    //     </a>
    //   </li>
    // );
  };

  ToDoSideBar = () => {
    const { headerTitle, buttonAddProduct, buttonAddCatalog, filterTextAll, sectionFilterText, sectionLabelText, currentTodo, classes } = this.props;
    const { isCatalog } = this.state;
    return <div className="module-side">
      <div className="module-side-header" style={{ marginBottom: "3rem" }}>
        <div className="module-logo mb-4">
          <i className="zmdi zmdi-edit mr-4"/>
          <span>{headerTitle}</span>
        </div>
      </div>
      <div className="module-side-content">
        <div className={classNames("module-side-scroll")}>
          {!currentTodo
            ? <div className="module-add-task">
              {isCatalog
                ? <Button
                  variant="contained"
                  color="primary"
                  className="btn btn-primary btn-block"
                  onClick={() => {
                    this.setState({ newMaster: true });
                  }}
                  // onClick={this.handleClickCatalog}
                >
                  {buttonAddCatalog}
                </Button>
                : <Button
                  variant="contained"
                  color="primary"
                  className="btn btn-primary btn-block"
                  onClick={() => {
                    this.setState({ newMaster: true });
                  }}
                  // onClick={this.handleClickServices}
                >
                  {buttonAddProduct}
                </Button>
              }
            </div>
            : null
          }

          <ul className="module-nav">
            <li onClick={() => {
              this.props.get_all_todo();
            }
            }>
              <a href="javascript:void(0)">
                <i className="zmdi zmdi-menu"/>
                <span>{filterTextAll}</span>
              </a>
            </li>

            {/*<li className="module-nav-label">*/}
            {/*{sectionFilterText}*/}
            {/*</li>*/}

            {/*{this.getNavFilters()}*/}

            <li className="module-nav-label">
              {sectionLabelText}
            </li>

            {this.getNavLabels()}

          </ul>
        </div>
      </div>
    </div>;
  };

  showToDos = ({ currentTodo, toDos, conversation, user, masters, loadLabel, labels }) => {
    // if (this.state.isCatalog) {
    //   return (
    //     <CatalogComponent/>
    //   );
    // }
    return currentTodo === null ?
      <ToDoList
        toDos={toDos || []}
        // toDos={masters}
        labels={labels}
        onSortEnd={this.onSortEnd}
        onTodoSelect={this.onTodoSelect.bind(this)}
        onTodoChecked={this.onTodoChecked.bind(this)}
        useDragHandle={true}
      />
      : <ToDoDetail
        todo={currentTodo}
        user={user}
        labels={labels}
        loadLabel={loadLabel}
        conversation={conversation}
        onLabelUpdate={this.onLabelUpdate.bind(this)}
        onToDoUpdate={this.onToDoUpdate.bind(this)}
        onDeleteToDo={this.onDeleteToDo.bind(this)}
      />;
  };

  onChangeIgnor = () => {
    const { todo, changeIgnoreMembers } = this.props;
    // let keys = ["null"];
    if (todo && todo.workPercent) {
      const keys = Object.keys(todo.workPercent).filter((el) => el);
      // console.log(keys);
      if (keys && keys.length) {
        keys.forEach((item, idx) => {
          changeIgnoreMembers({
            index: idx,
            value: {
              servicesGroup: item[0].toUpperCase() + item.slice(1).toLowerCase(),
              count: todo.workPercent[item]
            }
          });
        });
      }
    } else {
      changeIgnoreMembers({
        index: 0,
        value: {
          servicesGroup: "",
          count: 50
        }
      });
    }
  };

  handleSubmit = values => {
    // console.log(values);
    console.log(this.props);
    // console.log(this.props.form);
    const { startMasters } = this.props;
    this.setState({
      newMaster: false
    });
    return startMasters({ values });
  };

  handleClickCanceled = () => {
    this.setState({
      newMaster: false
    });
  };

  handleClickVewCatalog = () => {
    this.setState({
      isCatalog: true
    });
    return this.props.get_all_catalog();
  };

  handleClickVewServices = () => {
    this.setState({
      isCatalog: false
    });
    return this.props.get_all_todo();
  };

  // handleClickServices = () => this.props.get_all_todo();
  //
  // handleClickCatalog = () => this.props.get_all_catalog();

  constructor() {
    super();
    this.state = {
      width: 1200,
      anchorEl: null,
      newMaster: false
    };
  }

  componentDidMount() {
    this.props.loadMaster();
    // this.props.loadView();
    this.manageHeight();
  }

  componentDidUpdate() {
    this.manageHeight();
  }

  componentWillUnmount() {
    this.props.deleteState();
    this.props.endRemoveDay();
    this.props.editMasters({});
  }

  manageHeight() {
    let $ = window.$ = window.jQuery;
    const $body = $("#body");
    window.addEventListener("resize", () => {
      if ($body.width() >= 1200) {
        if (this.state.width !== 1200) {
          this.setState({ width: 1200 });
        }
      }
      else if ($body.width() >= 992) {
        if (this.state.width !== 992) {
          this.setState({ width: 992 });
        }
      }
      else if ($body.width() >= 768) {
        if (this.state.width !== 768) {
          this.setState({ width: 768 });
        }
      }
      else if ($body.width() >= 576) {
        if (this.state.width !== 576) {
          this.setState({ width: 576 });
        }
      }
      else if ($body.width() >= 0) {
        if (this.state.width !== 0) {
          this.setState({ width: 0 });
        }
      }

    });

    if ($body.width() >= 1200) {
      $(".loader-view").slimscroll({
        height: "calc(100vh - 321px)"
      });
      if (this.props.currentTodo === null) {
        $(".module-list-scroll").slimscroll({
          height: "calc(100vh - 321px)"
        });
      } else {
        $(".module-list-scroll").slimscroll({
          height: "calc(100vh - 382px)"
        });
      }
      $(".module-side-scroll").slimscroll({
        height: "calc(100vh - 323px)"
      });
    } else if ($body.width() >= 992) {
      $(".loader-view").slimscroll({
        height: "calc(100vh - 335px)"
      });
      if (this.props.currentTodo === null) {
        $(".module-list-scroll").slimscroll({
          height: "calc(100vh - 335px)"
        });
      } else {
        $(".module-list-scroll").slimscroll({
          height: "calc(100vh - 394px)"
        });
      }
      $(".module-side-scroll").slimscroll({
        height: "calc(100vh - 165px)"
      });
    } else {
      $(".loader-view").slimscroll({
        height: "calc(100vh - 300px)"
      });
      if (this.props.currentTodo === null) {
        $(".module-list-scroll").slimscroll({
          height: "calc(100vh - 300px)"
        });
      } else {
        $(".module-list-scroll").slimscroll({
          height: "calc(100vh - 360px)"
        });
      }
      $(".module-side-scroll").slimscroll({
        height: "calc(100vh - 165px)"
      });
    }
  }

  render() {
    const { categories, products, classes, todo, descriptionButtonCatalog, descriptionButtonServices, ignoreMembers, buttonTotalServicesText, buttonTotalCatalogText, selectedToDos, descriptionButton, loader, currentTodo, toDos, conversation, user, alertMessage, showMessage, SearchBoxPlaceholder } = this.props;
    const { isCatalog } = this.state;
    if (!categories.length && !products.length) {
      return (
        <Progress/>
      );
    }
    return (
      <div className="app-wrapper">
        <div className="animated slideInUpTiny animation-duration-3">
          <div className="app-module">
            <div className="d-block d-xl-none">
              <Drawer
                type="temporary"
                open={this.props.drawerState}
                onClose={this.onToggleDrawer.bind(this)}
              >
                {this.ToDoSideBar()}
              </Drawer>
            </div>
            <div className="app-module-sidenav d-none d-xl-flex">
              {this.ToDoSideBar()}
            </div>

            <div className="module-box">
              <div className="module-box-header">
                <IconButton
                  className="drawer-btn d-block d-xl-none"
                  aria-label="Menu"
                  onClick={this.onToggleDrawer.bind(this)}
                >
                  <i className="zmdi zmdi-menu"/>
                </IconButton>
                <SearchBox
                  placeholder={SearchBoxPlaceholder}
                  value={this.props.searchTodo}
                  onChange={this.updateSearch.bind(this)}
                />
              </div>
              <div className="module-box-content">
                {this.props.currentTodo === null
                  ? <div className="module-box-topbar">
                    {/*<h3>Список мастеров</h3>*/}
                    <Button
                      variant="outlined"
                      color="primary"
                      className={classes.indent}
                      onClick={this.handleClickVewServices}
                    >
                      {buttonTotalServicesText}
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      className={classes.indent}
                      onClick={this.handleClickVewCatalog}
                    >
                      {buttonTotalCatalogText}
                    </Button>
                  </div>
                  : <div className="module-box-topbar">
                    <IconButton
                      onClick={() => {
                        this.props.set_current_todo_null(this.props.products);
                        // this.props.set_current_todo_null(this.props.masters);
                        this.props.loadMaster();
                        // destroy(this.props.form);
                        console.log(this.props, "set_current_todo_null");
                      }}>
                      <i className="zmdi zmdi-arrow-back"/>
                    </IconButton>
                  </div>
                }

                <Menu
                  id="option-menu"
                  anchorEl={this.state.anchorEl}
                  open={this.props.optionMenuState}
                  onClose={this.props.handle_request_close}
                  // style={{ maxHeight: ITEM_HEIGHT * 4.5 }}
                  MenuListProps={{
                    style: {
                      width: 150
                    }
                  }}
                >
                  {options.map(option =>
                    <MenuItem
                      key={option.title}
                      onClick={this.onOptionMenuItemSelect.bind(this, option)}
                    >
                      {option.title}
                    </MenuItem>
                  )}
                </Menu>
                <Menu
                  id="label-menu"
                  anchorEl={this.state.anchorEl}
                  open={this.props.labelMenuState}
                  onClose={this.props.handle_request_close}
                  // style={{ maxHeight: ITEM_HEIGHT * 4.5 }}
                  MenuListProps={{
                    style: {
                      width: 150
                    }
                  }}
                >
                  {labels.map(label =>
                    <MenuItem
                      key={label.id}
                      onClick={this.onLabelMenuItemSelect.bind(this, label)}
                    >
                      {label.title}
                    </MenuItem>
                  )}
                </Menu>

                {loader ?
                  <div
                    className="loader-view-block">
                    <div className="loader-view">
                      <CircularProgress/>
                    </div>
                  </div> :
                  this.showToDos(this.props)
                }
              </div>
            </div>
          </div>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={showMessage}
            autoHideDuration={3000}
            onClose={this.handleRequestClose}
            SnackbarContentProps={{
              "aria-describedby": "message-id"
            }}
            message={<span id="message-id">{alertMessage}</span>}
          />
        </div>
        <Dialog
          maxWidth="sm"
          scroll="body"
          aria-labelledby="max-width-dialog-title"
          open={this.state.newMaster}
        >
          <DialogTitle id="max-width-dialog-title">
            {isCatalog ? descriptionButtonCatalog : descriptionButtonServices}
          </DialogTitle>
          <DialogContent>
            {isCatalog
              ? <p>Каталог</p>
              : <p>Услуги/товары</p>
            }

            {/*<AddEventsForm*/}
            {/*onSubmit={this.handleSubmit}*/}
            {/*handleClickClose={this.handleClickClose}*/}
            {/*/>*/}
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

Masters.defaultProps = {
  SearchBoxPlaceholder: "Введите услугу/товар",
  headerTitle: "Редактирование",
  buttonAddCatalog: "Добавить раздел",
  buttonAddProduct: "Добавить услугу/товар",
  descriptionButtonCatalog: "Добавить раздел",
  descriptionButtonServices: "Добавить услугу/товар",
  filterTextAll: "Весь каталог",
  sectionFilterText: "Фильтры",
  sectionLabelText: "Фильтры",
  buttonTotalServicesText: "Все услуги/товары",
  buttonTotalCatalogText: "Разделы каталога"
};

Masters.propTypes = {
  classes: PropTypes.object,
  SearchBoxPlaceholder: PropTypes.string,
  headerTitle: PropTypes.string,
  buttonAddCatalog: PropTypes.string,
  buttonAddProduct: PropTypes.string,
  filterTextAll: PropTypes.string,
  sectionLabelText: PropTypes.string,
  buttonTotalServicesText: PropTypes.string,
  buttonTotalCatalogText: PropTypes.string
};

// export default Masters;
export default withStyles(customEventsStyle)(Masters);
