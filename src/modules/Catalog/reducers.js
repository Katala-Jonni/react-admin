import todoConversation from "./todoConversation";
import toDos from "./todo";

import arrayMove from "array-move";

import {
  get_all_todo,
  get_important_todo,
  get_nav_filters,
  get_nav_labels,
  get_starred_todo,
  get_todo_conversation,
  get_unimportant_todo,
  get_unselected_all_todo,
  get_unstarred_todo,
  handle_request_close,
  on_delete_todo,
  on_hide_loader,
  on_label_menu_item_select,
  on_label_select, // другой стейт
  on_label_update,
  on_option_menu_item_select,
  on_option_menu_select,
  on_sortend,
  on_todo_add,
  on_todo_checked,
  on_todo_select,
  on_todo_update,
  on_toggle_drawer,
  search_todo,
  select_all_todo,
  set_current_todo_null,
  show_todos,
  update_search,
  endLoadMaster,
  endLoadLabel,
  deleteState,
  changeIgnoreMembers,
  deleteIgnoreMembers,
  changeIgnoreCounts,
  endEditMasters,
  endPostMasters,
  changeReset,
  get_all_catalog,
  endEditCategory,
  endEditProduct,
  currentTodoNull,
  startErrorMessage
} from "./actions";

const INIT_STATE = {
  searchTodo: "",
  alertMessage: "",
  loader: false,
  loaderForm: false,
  showMessage: false,
  drawerState: false,
  // allToDos: toDos,
  allToDos: [],
  currentTodo: null,
  user: {
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    avatar: "http://via.placeholder.com/256x256"
  },
  selectedToDos: 0,
  labelMenuState: false,
  optionMenuState: false,
  // toDos: toDos,
  toDos: [],
  filter: -1,
  todoConversation,
  conversation: null,
  masters: [],
  labels: [],
  services: [],
  ignoreMembers: {},
  resetForm: false,
  errorMessage: null
};


export default (state = INIT_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case startErrorMessage.toString(): {
      console.log(payload);
      return {
        ...state,
        // errorMessage: payload.errorMessage,
        // loaderForm: payload.loaderForm
        ...payload
      };
    }
    case changeIgnoreMembers.toString(): {
      // if (payload.value.servicesGroup) {
      return {
        ...state,
        ignoreMembers: { ...state.ignoreMembers, [payload.index]: payload.value }
      };
      // }
    }
    case changeReset.toString(): {
      return {
        ...state,
        resetForm: action.payload
      };
    }
    case changeIgnoreCounts.toString(): {
      console.log(payload.value.servicesGroup);
      // if (payload.value.servicesGroup) {
      return {
        ...state,
        ignoreMembers: {
          ...state.ignoreMembers,
          [payload.index]: {
            ...state.ignoreMembers[payload.index],
            [payload.name]: payload.value
          }
        }
      };
      // }
    }
    case deleteIgnoreMembers.toString(): {
      return {
        ...state,
        ignoreMembers: payload.ignoreMembers
      };
    }
    case endLoadMaster.toString(): {
      // console.log(payload.masters);
      // console.log(payload.labels);
      return {
        ...state,
        masters: payload.masters,
        allToDos: payload.masters,
        toDos: payload.masters,
        labels: payload.labels
        // services: payload.services
      };
    }

    case endEditProduct.toString(): {
      return {
        ...state,
        masters: payload.masters,
        allToDos: payload.masters,
        toDos: payload.masters,
        labels: payload.labels,
        currentTodo: payload.currentTodo,
        loaderForm: payload.loaderForm,
        errorMessage: payload.errorMessage
      };
    }

    case endEditCategory.toString(): {
      return {
        ...state,
        masters: payload.masters,
        allToDos: payload.masters,
        toDos: payload.labels,
        // toDos: payload.masters,
        labels: payload.labels,
        currentTodo: payload.currentTodo,
        loaderForm: payload.loaderForm,
        errorMessage: payload.errorMessage
      };
    }

    case endEditMasters.toString(): {
      console.log(payload.masters);
      return {
        ...state,
        masters: payload.masters,
        currentTodo: payload.currentTodo
      };
    }

    case endPostMasters.toString(): {
      return {
        ...state,
        masters: payload.masters
      };
    }

    case endLoadLabel.toString(): {
      return {
        ...state,
        masters: payload.masters,
        allToDos: payload.masters,
        toDos: payload.masters
      };
    }
    case deleteState.toString(): {
      return {
        ...INIT_STATE
      };
    }
    case on_sortend.toString(): {
      return {
        ...state,
        toDos: arrayMove(state.toDos, action.payload.oldIndex, action.payload.newIndex)
      };
    }
    case on_label_select.toString(): {
      return {
        ...state,
        labelMenuState: !state.labelMenuState
      };
    }
    case on_option_menu_select.toString(): {
      return {
        ...state,
        optionMenuState: !state.optionMenuState
      };
    }
    case on_option_menu_item_select.toString(): {
      return { ...state };
    }
    case select_all_todo.toString(): {
      let toDos = state.allToDos.map((todo) => todo ? {
        ...todo,
        selected: true
      } : todo);

      return {
        ...state,
        selectedToDos: toDos.length,
        allToDos: toDos,
        toDos: toDos
      };
    }
    case get_all_todo.toString(): {
      return {
        ...state,
        currentTodo: null,
        toDos: state.allToDos,
        searchTodo: ""
      };
    }
    case get_all_catalog.toString(): {
      return {
        ...state,
        currentTodo: null,
        // toDos: state.allToDos,
        toDos: state.labels,
        searchTodo: ""
      };
    }
    case get_unselected_all_todo.toString(): {

      let toDos = state.allToDos.map((todo) => todo ? {
        ...todo,
        selected: false
      } : todo);
      return {
        ...state,
        selectedToDos: 0,
        allToDos: toDos,
        toDos: toDos
      };
    }
    case get_starred_todo.toString(): {
      let selectedToDos = 0;
      let toDos = state.allToDos.map((todo) => {
        if (todo.starred) {
          selectedToDos++;
          return { ...todo, selected: true };
        }
        return { ...todo, selected: false };
      });
      // console.log(toDos);
      return {
        ...state,
        selectedToDos: selectedToDos,
        allToDos: toDos,
        toDos: toDos.filter(todo => !todo.deleted)
      };
    }
    case get_unstarred_todo.toString(): {
      let selectedToDos = 0;
      let toDos = state.allToDos.map((todo) => {
        if (!todo.starred) {
          selectedToDos++;
          return { ...todo, selected: true };
        }
        return { ...todo, selected: false };
      });
      return {
        ...state,
        selectedToDos: selectedToDos,
        allToDos: toDos,
        toDos: toDos.filter(todo => !todo.deleted)
      };
    }
    case get_important_todo.toString(): {
      let selectedToDos = 0;
      let toDos = state.allToDos.map((todo) => {
        if (todo.important) {
          selectedToDos++;
          return { ...todo, selected: true };
        }
        return { ...todo, selected: false };
      });
      return {
        ...state,
        selectedToDos: selectedToDos,
        allToDos: toDos,
        toDos: toDos.filter(todo => !todo.deleted)
      };
    }
    case get_unimportant_todo.toString(): {
      let selectedToDos = 0;
      let toDos = state.allToDos.map((todo) => {
        if (!todo.important) {
          selectedToDos++;
          return { ...todo, selected: true };
        }
        return { ...todo, selected: false };
      });

      return {
        ...state,
        selectedToDos: selectedToDos,
        allToDos: toDos,
        toDos: toDos.filter(todo => !todo.deleted)
      };
    }
    case on_label_menu_item_select.toString(): {
      const toDos = state.allToDos.map(todo => {
          if (todo.selected) {
            if (todo.labels.includes(action.payload.id)) {
              todo.labels.splice(todo.labels.indexOf(action.payload.id), 1);
              return { ...todo, labels: todo.labels };
            } else {
              return { ...todo, labels: todo.labels.concat(action.payload.id) };
            }
          } else {
            return todo;
          }
        }
      );
      return {
        ...state,
        alertMessage: "Label Updated Successfully",
        showMessage: true,
        allToDos: toDos,
        toDos: toDos
      };
    }
    case on_label_update.toString(): {
      if (action.payload.data.labels.includes(action.payload.label.id)) {
        action.payload.data.labels.splice(action.payload.data.labels.indexOf(action.payload.label.id), 1);
      } else {
        action.payload.data.labels = action.payload.data.labels.concat(action.payload.label.id);
      }
      const toDos = state.allToDos.map(todo => {
          if (todo.id === action.payload.data.id) {
            return action.payload.data;
          } else {
            return todo;
          }
        }
      );

      return {
        ...state,
        alertMessage: "Label Updated Successfully",
        showMessage: true,
        currentTodo: action.payload,
        allToDos: toDos,
        toDos: toDos
      };
    }
    case on_todo_update.toString(): {
      console.log("test");
      // const toDos = state.allToDos.map(todo => {
      //   if (todo.id === action.payload.id) {
      //     return action.payload;
      //   } else {
      //     return todo;
      //   }
      // });
      return {
        ...state,
        alertMessage: "Успешно добавлено!",
        showMessage: true
        // currentTodo: action.payload,
        // allToDos: toDos,
        // toDos: toDos
      };
    }
    case on_delete_todo.toString(): {
      let selectedToDos = 0;
      const toDos = state.allToDos.map(todo => {
          if (todo.selected) {
            selectedToDos++;
          }
          if (action.payload.id === todo.id) {
            if (todo.selected) {
              selectedToDos--;
            }
            return { ...todo, deleted: true };
          } else {
            return todo;
          }
        }
      );
      return {
        ...state,
        alertMessage: "ToDo Deleted Successfully",
        showMessage: true,
        allToDos: toDos,
        currentTodo: null,
        selectedToDos: selectedToDos,
        toDos: toDos.filter((todo) => !todo.deleted)
      };
    }

    case get_nav_labels.toString(): {
      const filterMails = state.allToDos.filter(todo => todo.category === action.payload._id);
      return {
        ...state,
        loader: true,
        currentTodo: null,
        toDos: filterMails
      };
    }
    case get_nav_filters.toString(): {
      const filterMails = state.allToDos.filter(todo => {
        if (action.payload.id === 0 && todo.starred) {
          return todo;
        } else if (action.payload.id === 1 && todo.important) {
          return todo;
        } else if (action.payload.id === 2 && todo.important) {
          return todo;
        } else if (action.payload.id === 3 && todo.important) {
          return todo;
        } else if (action.payload.id === 4 && todo.completed) {
          return todo;
        } else if (action.payload.id === 5 && todo.deleted) {
          return todo;
        }
      });
      return {
        ...state,
        loader: true,
        currentTodo: null,
        filter: action.payload.id,
        toDos: filterMails
      };
    }

    case search_todo.toString(): {
      const { searchText, isCatalog } = action.payload;
      if (searchText === "") {
        return { ...state, toDos: isCatalog ? [...state.labels] : [...state.allToDos] };
      } else {
        let searchToDos = state.allToDos.filter((todo) => {
          const { title } = todo;
          return title.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
        });
        if (isCatalog) {
          searchToDos = state.labels.filter((todo) => {
            const { value } = todo;
            return value.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
          });
        }

        // !todo.deleted && todo.title.toLowerCase().indexOf(action.payload.toLowerCase()) > -1);
        return { ...state, toDos: searchToDos };
      }
    }
    case show_todos.toString(): {
      return { ...state };
    }
    case get_todo_conversation.toString(): {
      return { ...state };
    }
    case on_todo_checked.toString(): {
      action.payload.selected = !action.payload.selected;
      let selectedToDos = 0;
      const toDos = state.toDos.map(todo => {
          if (todo.selected) {
            selectedToDos++;
          }
          if (todo.id === action.payload.id) {
            if (todo.selected) {
              selectedToDos++;
            }
            return action.payload;
          } else {
            return todo;
          }
        }
      );
      return {
        ...state,
        selectedToDos: selectedToDos,
        toDos: toDos
      };
    }
    case on_todo_add.toString(): {
      return {
        ...state,
        toDos: state.allToDos.concat(action.payload),
        allToDos: state.allToDos.concat(action.payload)
      };
    }
    case on_todo_select.toString(): {
      let conversationList = state.todoConversation.find((conversation) => conversation.id === action.payload.id);
      if (conversationList) {
        conversationList = conversationList.conversationData;
      } else {
        conversationList = [];
      }
      return {
        ...state,
        currentTodo: action.payload,
        loader: true,
        conversation: conversationList
      };
    }
    case set_current_todo_null.toString(): {
      return {
        ...state,
        currentTodo: null,
        ignoreMembers: {},
        masters: action.payload,
        allToDos: action.payload,
        toDos: action.payload
      };
    }
    case currentTodoNull.toString(): {
      return {
        ...state,
        currentTodo: null
      };
    }
    case update_search.toString(): {
      return { ...state, searchTodo: action.payload };
    }
    case on_toggle_drawer.toString(): {
      return { ...state, drawerState: !state.drawerState };
    }
    case handle_request_close.toString(): {
      return {
        ...state,
        showMessage: false,
        addTodo: false,
        labelMenuState: false,
        optionMenuState: false,
        alertMessage: "",
        loaderForm: false
      };
    }
    case on_hide_loader.toString(): {
      return { ...state, loader: false };
    }
    default:
      return state;
  }
};
