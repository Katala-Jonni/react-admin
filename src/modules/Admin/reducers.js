import {
  endApp,
  loadApp,
  startApp,
  startStateAdmin,
  getLoginEnd,
  setErrorMessage,
  endAuth,
  handle_request_close, handle_request_open
} from "./actions";
import { Storage, storageKey } from "../../storage";

const getInitialState = () => {
  return {
    alertMessage: "",
    showMessage: false,
    isLoad: false,
    isDay: false,
    isError: null,
    administrators: [],
    place: null,
    isAuthorized: null,
    roles: null,
    // frontUser: null,
    errorMessage: null,
    startLoader: true
  };
};

const initialState = {
  ...getInitialState()
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case loadApp.toString():
      // console.log(payload);
      return {
        ...state,
        isLoad: payload,
        startLoader: false
      };
    case endApp.toString():
      const { day, error, administrators } = payload;
      // console.log(payload);
      return {
        ...state,
        isDay: day,
        isError: error,
        administrators,
        startLoader: false
      };
    case startStateAdmin.toString():
      return {
        // ...getInitialState(),
        // isError: false,
        // administrators: payload.administrators
      };
    case getLoginEnd.toString():
      console.log(payload);
      return {
        ...state,
        place: payload.place,
        roles: payload.roles,
        // frontUser: payload.frontUser,
        errorMessage: null,
        isAuthorized: true,
        startLoader: false
      };
    case setErrorMessage.toString():
      return {
        ...state,
        errorMessage: payload.errorMessage,
        place: null,
        roles: null,
        // frontUser: null,
        isAuthorized: false,
        startLoader: false
      };
    case endAuth.toString():
      // console.log(payload);
      return {
        ...state,
        place: payload.place,
        roles: payload.roles,
        // frontUser: payload.frontUser,
        errorMessage: null,
        isAuthorized: !!payload.place,
        startLoader: false
      };
    case handle_request_open.toString(): {
      return {
        ...state,
        showMessage: true,
        alertMessage: payload.alertMessage
      };
    }
    case handle_request_close.toString(): {
      return {
        ...state,
        showMessage: false,
        alertMessage: ""
      };
    }
    default: {
      return state;
    }
  }
};
