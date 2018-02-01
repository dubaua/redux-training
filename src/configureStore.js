import { createStore, applyMiddleware, compose } from "redux";
import createLogger from "redux-logger";
import thunk from "redux-thunk";
import todoApp from "./reducers";
import devToolsEnhancer from "remote-redux-devtools";

// thunks can dispatch both actions and another thunks
const configureStore = () => {
  const middlewares = [thunk];

  if (process.env.NODE_ENV !== "production") {
    middlewares.push(createLogger);
  }

  return createStore(
    todoApp,
    compose(applyMiddleware(...middlewares), devToolsEnhancer())
  );
};

export default configureStore;
