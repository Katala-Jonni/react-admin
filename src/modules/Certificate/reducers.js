import { endNumberCertificate } from "./actions";

const initialState = {
  certificate: {},
  isCertificate: false,
  verifyMessage: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case endNumberCertificate.toString():
      // console.log(payload);
      return {
        ...state,
        ...payload
      };
    default: {
      return state;
    }
  }
};
