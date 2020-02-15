import {
  endNumberCertificate,
  endVerifyCertificate,
  endSearchNumber,
  turnOnLoader,
  turnOnLoaderCertificate, deleteState
} from "./actions";

const getInitialState = () => {
  return {
    certificate: null,
    isCertificate: true,
    verifyMessage: null,
    loader: false,
    loaderCertificate: false,
    certificateStatus: false
  };
};

const initialState = {
  ...getInitialState()
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case endVerifyCertificate.toString():
      return {
        ...state,
        ...payload
      };
    case endSearchNumber.toString():
      return {
        ...state,
        ...payload,
        loaderCertificate: false
      };
    case turnOnLoader.toString():
      return {
        ...state,
        loader: true
      };
    case turnOnLoaderCertificate.toString():
      return {
        ...state,
        loaderCertificate: true,
        certificate: null
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
