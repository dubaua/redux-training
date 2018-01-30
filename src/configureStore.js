import { createStore, applyMiddleware, compose } from "redux";
import promise from "redux-promise";
import createLogger from "redux-logger";
import todoApp from "./reducers";
import devToolsEnhancer from "remote-redux-devtools";

const configureStore = () => {
  const middlewares = [promise];

  if (process.env.NODE_ENV !== "production") {
    middlewares.push(createLogger);
  }

  return createStore(
    todoApp,
    compose(applyMiddleware(...middlewares), devToolsEnhancer())
  );
};

export default configureStore;
