import myEventsList from "./events";
import {
  showDay,
  addMasters,
  deleteMasters,
  editMastersEnd,
  editEvents,
  endLoadResource
} from "./actions";

const initialState = {
  resource: [],
  events: myEventsList || [],
  totalResource: {},
  masters: null,
  isDay: false,
  isWizardView: false
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case endLoadResource.toString():
      return {
        ...state,
        totalResource: payload.totalResource,
        masters: payload.masters
      };
    case showDay.toString():
      return {
        ...state,
        resource: [...payload.resource],
        totalResource: payload.date ? {
          ...state.totalResource,
          [payload.date]: payload.resource
        } : { ...state.totalResource }
      };
    case addMasters.toString():
      // console.log(payload);
      return {
        ...state,
        resource: payload.totalResource,
        totalResource: {
          ...state.totalResource,
          [payload.date]: payload.totalResource
        }
      };
    case deleteMasters.toString():
      // console.log(payload);
      return {
        ...state,
        resource: payload.resource,
        totalResource: { ...state.totalResource, [payload.date]: payload.resource }
      };
    case editMastersEnd.toString():
      const { resource, date, events } = payload;
      return {
        ...state,
        resource: resource,
        totalResource: { ...state.totalResource, [date]: [...resource] },
        events: events
      };
    case editEvents.toString():
      // console.log(payload);
      return {
        ...state,
        events: payload
      };
    // case openWizard.toString():
    //   console.log("ttt");
    //   return {
    //     ...state,
    //     isWizardView: true
    //   };
    // case closeWizard.toString():
    //   return {
    //     ...state,
    //     isWizardView: false
    //   };
    default: {
      return state;
    }
  }
};
