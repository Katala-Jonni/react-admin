import { endNumberCertificate, endVerifyCertificate, endSearchNumber } from "./actions";

const initialState = {
  certificate: null,
  isCertificate: true,
  verifyMessage: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case endVerifyCertificate.toString():
      // console.log(payload);
      return {
        ...state,
        ...payload
      };
    case endSearchNumber.toString():
      console.log(payload, 'payload');
      return {
        ...state,
        ...payload
      };
    default: {
      return state;
    }
  }
};
