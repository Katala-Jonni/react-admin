import {
  endSearchNumber,
  endSearchPhoneNumber,
  endSendCard,
  endUseCard,
  endVerifyCard,
  resetErrorMessage, turnOnLoader
} from "./actions";
import moment from "moment";

moment.locale("ru");

const initialState = {
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
  loader: false
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case endSendCard.toString():
      // console.log(payload);
      return {
        ...state,
        ...payload,
        isVerifyCard: true
      };
    case endVerifyCard.toString():
      // console.log(payload);
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
      // console.log(payload);
      return {
        ...state,
        ...payload
      };
    case endSearchPhoneNumber.toString():
      console.log(payload);
      return {
        ...state,
        ...payload
      };
    case turnOnLoader.toString():
      // console.log(payload);
      return {
        ...state,
        loader: true
      };
    case endUseCard.toString():
      // console.log(payload);
      return {
        ...state,
        card: payload,
        loader: false
      };
    default: {
      return state;
    }
  }
};
