import myEventsList from "./events";
import {
  showDay,
  addMasters,
  deleteMasters,
  editMastersEnd,
  editEvents,
  endLoadResource,
  loadViewEvents,
  editResource, initialResource, editMasters, resetResource
} from "./actions";

const initialState = {
  resource: [],
  // events: myEventsList || [],
  events: [],
  currentEvents: {
    events: [],
    resource: []
  },
  totalResource: {},
  masters: null,
  isDay: false,
  isWizardView: false,
  defaultResource: []
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case endLoadResource.toString():
      // console.log(payload);
      return {
        ...state,
        totalResource: payload.totalResource,
        masters: payload.masters,
        events: payload.events,
        defaultResource: payload.defaultResource
      };
    case editMasters.toString():
      // console.log(payload);
      return {
        ...state,
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
      console.log(payload);
      return {
        ...state,
        resource: payload.totalResource
        // totalResource: {
        //   ...state.totalResource,
        //   [payload.date]: payload.totalResource
        // }
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
    case loadViewEvents.toString():
      return {
        ...state,
        resource: payload.resource,
        events: payload.events || state.events,
        totalResource: payload.totalResource || state.totalResource
      };
    case editResource.toString():
      console.log(payload, "editResource");
      return {
        ...state,
        resource: payload.resource,
        events: payload.events
        // totalResource: payload.totalResource
      };
    case initialResource.toString():
      return {
        ...state,
        resource: [],
        events: []
        // totalResource: payload.totalResource
      };
    case resetResource.toString():
      return {
        ...state,
        resource: []
        // totalResource: payload.totalResource
      };
    default: {
      return state;
    }
  }
};
