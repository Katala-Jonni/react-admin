import { changeType, endEditCertificate, endSearchCertificate, removeType } from "./actions";

const getInitialState = () => {
  return {
    cash: 0,
    card: 0,
    certificate: 0,
    currentCertificate: null
  };
};

const initialState = {
  ...getInitialState()
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case changeType.toString():
      return {
        ...state,
        ...payload
      };
    case removeType.toString():
      return {
        ...getInitialState()
      };
    case endSearchCertificate.toString():
      return {
        ...state,
        currentCertificate: { ...payload }
      };
    case endEditCertificate.toString():
      return {
        ...state,
        currentCertificate: { ...payload }
      };
    default: {
      return state;
    }
  }
};
