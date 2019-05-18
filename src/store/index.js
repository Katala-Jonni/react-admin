import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware
} from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../modules";
import calendar from "../modules/Calendar";

const sagaMiddleware = createSagaMiddleware();

const mainReducer = combineReducers({
  calendar
});

const composeEnhancers = typeof window === "object"
&& window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware)
);
const store = createStore(mainReducer, enhancer);
sagaMiddleware.run(rootSaga);

export default store;