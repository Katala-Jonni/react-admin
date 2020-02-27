import {
  endSearchNumber,
  endSearchPhoneNumber,
  endSendCard,
  endUseCard,
  endVerifyCard,
  resetErrorMessage,
  turnOnLoader,
  deleteState
} from "./actions";
import moment from "moment";
// import { deleteState } from "../Certificate/actions";

moment.locale("ru");

const getInitialState = () => {
  return {
    card: null,
    // поменять местами
    // card: {
    //   cardNumber: "12345678901",
    //   date: "26.07.19",
    //   history: [
    //     {
    //       count: 5,
    //       place: "Ватутина, 37",
    //       date: moment().format("DD.MM.YY h:mm:ss")
    //     },
    //     {
    //       count: 13,
    //       place: "Древлянка 14, корпус 1",
    //       date: moment().format("DD.MM.YY h:mm:ss")
    //     }
    //   ],
    //   lastName: "Jonni",
    //   name: "Katala",
    //   phoneNumber: "111111",
    //   place: "Древлянка 14, корпус 1",
    //   surname: "Jonni",
    //   typePay: "Картой",
    //   typeCard: 50
    // },

    isVerifyPhoneNumber: false,
    isVerifyCardNumber: true,
    serverMessage: null,
    verifyCardMessage: null,
    verifyPhoneMessage: null,
    // serverMessage: null,
    verifySearchMessage: null,
    errorMessage: true,
    isVerifyCard: true,
    verifyMessage: null,
    loader: false,

    isCard: false,
    loaderCard: false,
    cardStatus: false
  };
};

const initialState = {
  ...getInitialState()
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case endSendCard.toString():
      return {
        ...state,
        ...payload,
        isVerifyCard: true
      };
    case endVerifyCard.toString():
      return {
        ...state,
        ...payload,
        errorMessage: true
      };
    case resetErrorMessage.toString():
      return {
        ...state,
        serverMessage: false
      };
    case endSearchNumber.toString():
      return {
        ...state,
        ...payload,
        loader: false
      };
    case endSearchPhoneNumber.toString():
      return {
        ...state,
        ...payload
      };
    case turnOnLoader.toString():
      return {
        ...state,
        loader: true
      };
    case endUseCard.toString():
      return {
        ...state,
        card: payload,
        loader: false
      };
    case deleteState.toString():
      return {
        ...getInitialState()
      };
    default: {
      return state;
    }
  }
};
