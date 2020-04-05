import React from "react";
// import "jquery-slimscroll/jquery.slimscroll.min";
import { Redirect } from "react-router-dom";

import Moment from "moment";
import ProductForm from "../../../views/Catalog/Form/ProductForm";

// core components
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";

import { connect } from "react-redux";
import {
  changeIgnoreMembers,
  deleteIgnoreMembers,
  getIgnoreMembers,
  getServices,
  startEditMasters,
  startDeleteMaster
} from "../../../modules/Master";


// data
import users from "../../../modules/Master/users";

const ITEM_HEIGHT = 34;

class ToDoDetail extends React.Component {
  handleLabelClick = event => {
    this.setState({ labelMenu: true, anchorEl: event.currentTarget });
  };
  handleUserClick = event => {
    // console.log(this.props.todo._id);
    // console.log(this.props.labels);
    this.props.loadLabel({
      id: this.props.todo._id, label: this.props.labels[2]
    });
    // this.setState({ userMenu: true, anchorEl: event.currentTarget });
  };
  handleRequestClose = () => {
    this.setState({ userMenu: false, labelMenu: false });
  };

  _handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.submitComment();
    }
  };

  handleEditTitle = () => {
    if (this.state.editTitle) {
      const todo = this.state.todo;
      todo.title = this.state.title;
      this.props.onToDoUpdate(todo);
    }
    this.setState({
      editTitle: !this.state.editTitle
    });
  };
  handleEditNote = () => {
    if (this.state.note) {
      const todo = this.state.todo;
      todo.note = this.state.note;
      this.props.onToDoUpdate(todo);
    }
    this.setState({
      editNote: !this.state.editNote
    });
  };
  handleDueDateChange = (date) => {
    this.setState({
      todo: { ...this.state.todo, dueDate: date }
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  constructor(props) {
    super(props);
    const { title, notes } = props.todo;
    const { conversation } = props;
    this.state = {
      todo: props.todo,
      title,
      notes,
      anchorEl: undefined,
      userMenu: false,
      labelMenu: false,
      editTitle: false,
      editNote: false,
      message: "",
      conversation
    };
  }

  componentDidMount() {
    let $ = window.$ = window.jQuery;
    $(".module-list-scroll").slimscroll({
      height: "calc(100vh - 320px)"
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      todo: nextProps.todo
    };
  }

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

  submitComment() {
    if (this.state.message !== "") {
      const updatedConversation = this.state.conversation.concat({
        "name": this.props.user.name,
        "thumb": this.props.user.avatar,
        "message": this.state.message,
        "sentAt": Moment(new Date).format("ddd DD, YYYY, hh:mm:ss A")
      });
      this.setState({
        conversation: updatedConversation,
        message: ""
      });
    }
  }

  updateMessageValue(evt) {
    this.setState({
      message: evt.target.value
    });
  }

  handleSubmit = values => {
    console.log(values);
    // const { todo: { _id }, startEditMasters } = this.props;
    // if (_id && values && startEditMasters) {
    //   return this.props.startEditMasters({ id: _id, values });
    // }
  };

  render() {
    const { onToDoUpdate, onLabelUpdate, onDeleteToDo, labels, ignoreMembers } = this.props;
    const { todo, editNote, editTitle, title, notes, message, conversation } = this.state;
    const label = labels.find((item) => item._id === todo.category);
    return (
      <div className="module-detail module-list">
        <div className="module-list-scroll">
          <div className="module-detail-item module-detail-header">
            <div className="row">
              <div className="col-sm-6 col-md-8">
                <div className="d-flex align-items-center">
                  <div
                    className="user-name mr-md-4 mr-2"
                  >
                    <div className="d-flex align-items-center pointer">
                      <Avatar
                        className="mr-2"
                        src={todo.img}
                        alt={todo.title}
                      />
                      <h4 className="mb-0">{todo.title}</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="d-flex flex-row-reverse">
                  <IconButton>
                     <span
                       className={`border-2 size-30 rounded-circle ${todo.active ? "text-green border-green" : "text-muted border-grey w-2"}`}
                     >
                    <i className="zmdi zmdi-check"/>
                  </span>
                  </IconButton>


                  <IconButton onClick={() => {
                    // onDeleteToDo(todo);
                    this.props.startDeleteMaster(todo);
                  }}>
                    <i className="zmdi zmdi-delete"/>
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
          <div className="module-detail-item">
            <div className="labels">
              <div
                className={`badge text-white bg-${label.color}`}
              >
                {label.value}
              </div>
            </div>
          </div>
          <div className="module-detail-item">
            <ProductForm
              todo={todo}
              labels={labels}
              onSubmit={this.handleSubmit}
              ignoreMembers={ignoreMembers}
              onChangeIgnor={this.onChangeIgnor}
            />
          </div>
        </div>
      </div>
    );
  }
}


const mapStateFromProps = state => ({
  ignoreMembers: getIgnoreMembers(state)
});

const mapDispatchFromProps = { changeIgnoreMembers, deleteIgnoreMembers, startEditMasters, startDeleteMaster };

export default connect(mapStateFromProps, mapDispatchFromProps)(ToDoDetail);


// export default ToDoDetail;
