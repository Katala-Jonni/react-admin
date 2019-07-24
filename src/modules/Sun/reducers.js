import { endSearchNumber, endSearchPhoneNumber, endSendCard, endVerifyCard, resetErrorMessage } from "./actions";

const initialState = {
  card: null,
  isVerifyPhoneNumber: false,
  isVerifyCardNumber: true,
  serverMessage: null,
  verifyCardMessage: null,
  verifyPhoneMessage: null,
  // serverMessage: null,
  verifySearchMessage: null,
  errorMessage: true,
  isVerifyCard: true,
  verifyMessage: null
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
    default: {
      return state;
    }
  }
};
