import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createLogger from "redux-logger";
import todoApp from "./reducers";
import throttle from "lodash/throttle";
import { loadState, saveState } from "./localStorage";
import devToolsEnhancer from "remote-redux-devtools";
import { create } from "domain";

const configureStore = () => {
  const persistedState = loadState();
  const store = createStore(todoApp, persistedState, devToolsEnhancer());

  store.subscribe(
    throttle(() => {
      saveState({
        todos: store.getState().todos
      });
    }, 1000)
  );

  return store;
};

export default configureStore;

export const fakeAPIStore = () => {
  const middlewares = [thunk];
  if (process.env.NODE_ENV !== "production") {
    middlewares.push(createLogger());
  }
  return createStore(
    todoApp,
    applyMiddleware(...middlewares),
    devToolsEnhancer()
  );
};
