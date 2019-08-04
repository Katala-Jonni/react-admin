import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware
} from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../modules";
import calendar from "../modules/Calendar";
import shop from "../modules/Shop";
import till from "../modules/Till";
import app from "../modules/Admin";
import sun from "../modules/Sun";
import certificate from "../modules/Certificate";
import { reducer as formReducer } from "redux-form";

const sagaMiddleware = createSagaMiddleware();

const mainReducer = combineReducers({
  calendar,
  shop,
  till,
  app,
  sun,
  certificate,
  form: formReducer
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
